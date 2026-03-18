"use client";

import { useState, useEffect, useCallback } from "react";
import { useWaitForTransactionReceipt, useConnection } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { readContract, writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "@/lib/wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import { erc20Abi } from "@/lib/abi/erc20";
import { parseError, isUserRejection } from "@/lib/txUtils";
import type { TxState } from "@/types";

/**
 * Handles the full deposit lifecycle.
 *
 * DOT (address(0)) — native asset via msg.value, no ERC-20 approval:
 *   idle → awaiting-signature → pending → success
 *
 * USDT (ERC-20) — approve first if allowance is insufficient:
 *   idle → awaiting-approval → approving → awaiting-signature → pending → success
 *   idle → awaiting-signature → pending → success  (if allowance already sufficient)
 *
 * Usage:
 *   const { deposit, txState, reset } = useDeposit();
 *   deposit(tokenAddress, amountInWei);
 */
export function useDeposit() {
    const [txState, setTxState] = useState<TxState>({ status: "idle" });
    const { address } = useConnection();
    const queryClient = useQueryClient();

    // Watch mempool → confirmed for the main deposit tx only
    const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: txState.hash,
        query: { enabled: txState.status === "pending" },
    });

    useEffect(() => {
        if (!isConfirmed) return;
        setTxState((s) => ({ ...s, status: "success" }));
        queryClient.invalidateQueries({ refetchType: "active" });
    }, [isConfirmed, queryClient]);

    async function deposit(tokenAddress: `0x${string}`, amount: bigint) {
        if (!address) {
            setTxState({ status: "error", error: "Wallet not connected." });
            return;
        }

        const isDot = tokenAddress === env.dotTokenAddress;

        try {
            if (!isDot) {
                // ── ERC-20: Check allowance and approve if needed ────────────
                const allowance = await readContract(wagmiConfig, {
                    address: tokenAddress,
                    abi: erc20Abi,
                    functionName: "allowance",
                    args: [address, env.vaultAddress],
                });

                if (allowance < amount) {
                    setTxState({ status: "awaiting-approval" });

                    const approvalHash = await writeContract(wagmiConfig, {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "approve",
                        args: [env.vaultAddress, amount],
                    });

                    setTxState({ status: "approving", hash: approvalHash });
                    await waitForTransactionReceipt(wagmiConfig, { hash: approvalHash });
                }
            }

            // ── Deposit ──────────────────────────────────────────────────────
            setTxState({ status: "awaiting-signature" });

            const hash = await writeContract(wagmiConfig, {
                address: env.vaultAddress,
                abi: vaultAbi,
                functionName: "deposit",
                // DOT: send native value, amount arg is ignored by contract
                // USDT: send amount arg, no value
                ...(isDot
                    ? { args: [tokenAddress, 0n], value: amount }
                    : { args: [tokenAddress, amount] }
                ),
            });

            setTxState({ status: "pending", hash });
        } catch (err) {
            if (isUserRejection(err)) {
                setTxState({ status: "idle", hash: undefined });
            } else {
                setTxState({ status: "error", error: parseError(err) });
            }
        }
    }

    const reset = useCallback(() => {
        setTxState({ status: "idle", hash: undefined });
    }, []);

    return { deposit, txState, reset };
}
