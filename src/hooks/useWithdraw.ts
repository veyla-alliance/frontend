"use client";

import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { writeContract } from "@wagmi/core";
import { wagmiConfig } from "@/lib/wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import { parseError } from "@/lib/txUtils";
import type { TxState } from "@/types";

/**
 * Handles the full withdraw lifecycle:
 * idle → awaiting-signature → pending → confirmed → success
 *
 * Usage:
 *   const { withdraw, txState, reset } = useWithdraw();
 *   await withdraw(tokenAddress, amountInWei);
 */
export function useWithdraw() {
    const [txState, setTxState] = useState<TxState>({ status: "idle" });
    const queryClient = useQueryClient();

    // Watch mempool → confirmed transition
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

    async function withdraw(tokenAddress: `0x${string}`, amount: bigint) {
        if (!env.vaultAddress) {
            setTxState({ status: "error", error: "Contract not deployed yet." });
            return;
        }

        try {
            setTxState({ status: "awaiting-signature" });

            const hash = await writeContract(wagmiConfig, {
                address: env.vaultAddress,
                abi: vaultAbi,
                functionName: "withdraw",
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

    return { withdraw, txState, reset };
}
