"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import type { TxState } from "@/types";

function parseError(err: unknown): string {
    if (!(err instanceof Error)) return "Unknown error.";
    const msg = err.message;
    if (msg.includes("User rejected")) return "Transaction cancelled.";
    if (msg.includes("insufficient funds")) return "Insufficient balance for gas.";
    if (msg.includes("execution reverted")) return "Transaction failed — contract rejected.";
    return msg.slice(0, 120);
}

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
    const { writeContractAsync } = useWriteContract();
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

            const hash = await writeContractAsync({
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
        setTxState({ status: "idle" });
    }

    return { withdraw, txState, reset };
}
