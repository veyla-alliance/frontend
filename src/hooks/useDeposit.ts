"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "@/lib/wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import { erc20Abi } from "@/lib/abi/erc20";
import { parseError } from "@/lib/txUtils";
import type { TxState } from "@/types";

/**
 * Handles the full deposit lifecycle with ERC-20 approval:
 * idle → awaiting-approval → approving → awaiting-signature → pending → success
 *
 * If the vault already has sufficient allowance the approval step is skipped:
 * idle → awaiting-signature → pending → success
 *
 * Usage:
 *   const { deposit, txState, reset } = useDeposit();
 *   deposit(tokenAddress, amountInWei);
 */
export function useDeposit() {
    const [txState, setTxState] = useState<TxState>({ status: "idle" });
    const { writeContractAsync } = useWriteContract();
    const { address } = useAccount();
    const queryClient = useQueryClient();

    // Watch mempool → confirmed for the main deposit tx only
    const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: txState.hash,
        query: { enabled: txState.status === "pending" },
    });

    useEffect(() => {
        if (!isConfirmed) return;
        setTxState((s) => ({ ...s, status: "success" }));
        // Invalidate all on-chain reads so balances + positions refresh immediately
        queryClient.invalidateQueries({ refetchType: "active" });
    }, [isConfirmed, queryClient]);

    async function deposit(tokenAddress: `0x${string}`, amount: bigint) {
        if (!env.vaultAddress) {
            setTxState({ status: "error", error: "Contract not deployed yet." });
            return;
        }
        if (!address) {
            setTxState({ status: "error", error: "Wallet not connected." });
            return;
        }

        try {
            // ── Step 1: Check current ERC-20 allowance ──────────────────────
            const allowance = await readContract(wagmiConfig, {
                address: tokenAddress,
                abi: erc20Abi,
                functionName: "allowance",
                args: [address, env.vaultAddress],
            });

            // ── Step 2: Request approval if needed ──────────────────────────
            if (allowance < amount) {
                setTxState({ status: "awaiting-approval" });

                const approvalHash = await writeContractAsync({
                    address: tokenAddress,
                    abi: erc20Abi,
                    functionName: "approve",
                    args: [env.vaultAddress, amount],
                });

                setTxState({ status: "approving", hash: approvalHash });

                // Block until approval is mined before sending the deposit
                await waitForTransactionReceipt(wagmiConfig, { hash: approvalHash });
            }

            // ── Step 3: Deposit ──────────────────────────────────────────────
            setTxState({ status: "awaiting-signature" });

            const hash = await writeContractAsync({
                address: env.vaultAddress,
                abi: vaultAbi,
                functionName: "deposit",
                args: [tokenAddress, amount],
            });

            setTxState({ status: "pending", hash });
        } catch (err) {
            setTxState({ status: "error", error: parseError(err) });
        }
    }

    function reset() {
        setTxState({ status: "idle", hash: undefined });
    }

    return { deposit, txState, reset };
}
