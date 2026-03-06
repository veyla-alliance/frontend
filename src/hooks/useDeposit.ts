"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import type { TxState } from "@/types";

function parseError(err: unknown): string {
    if (!(err instanceof Error)) return "Unknown error.";
    const msg = err.message;
    if (msg.includes("User rejected")) return "Transaction cancelled.";
    if (msg.includes("insufficient funds")) return "Insufficient balance for gas.";
    if (msg.includes("execution reverted")) return "Transaction failed — contract rejected.";
    return msg.slice(0, 120); // cap length for display
}

/**
 * Handles the full deposit lifecycle:
 * idle → awaiting-signature → pending → confirmed → success
 *
 * Usage:
 *   const { deposit, txState, reset } = useDeposit();
 *   await deposit(tokenAddress, amountInWei);
 */
export function useDeposit() {
    const [txState, setTxState] = useState<TxState>({ status: "idle" });
    const { writeContractAsync } = useWriteContract();

    // Watch mempool → confirmed transition
    const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: txState.hash,
        query: { enabled: txState.status === "pending" },
    });

    useEffect(() => {
        if (isConfirmed) setTxState((s) => ({ ...s, status: "success" }));
    }, [isConfirmed]);

    async function deposit(tokenAddress: `0x${string}`, amount: bigint) {
        if (!env.vaultAddress) {
            setTxState({ status: "error", error: "Contract not deployed yet." });
            return;
        }

        try {
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
        setTxState({ status: "idle" });
    }

    return { deposit, txState, reset };
}
