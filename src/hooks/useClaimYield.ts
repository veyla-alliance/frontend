"use client";

import { useState, useEffect, useCallback } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { writeContract } from "@wagmi/core";
import { wagmiConfig } from "@/lib/wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import { parseError, isUserRejection } from "@/lib/txUtils";
import type { TxState } from "@/types";

/**
 * Handles the claimYield lifecycle:
 * idle → awaiting-signature → pending → confirmed → success
 *
 * Usage:
 *   const { claimYield, txState, reset } = useClaimYield();
 *   await claimYield(tokenAddress);
 */
export function useClaimYield() {
    const [txState, setTxState] = useState<TxState>({ status: "idle" });
    const queryClient = useQueryClient();

    const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: txState.hash,
        query: { enabled: txState.status === "pending" },
    });

    useEffect(() => {
        if (!isConfirmed) return;
        setTxState((s) => ({ ...s, status: "success" }));
        queryClient.invalidateQueries({ refetchType: "active" });
    }, [isConfirmed, queryClient]);

    async function claimYield(tokenAddress: `0x${string}`) {
        try {
            setTxState({ status: "awaiting-signature" });

            const hash = await writeContract(wagmiConfig, {
                address: env.vaultAddress,
                abi: vaultAbi,
                functionName: "claimYield",
                args: [tokenAddress],
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

    return { claimYield, txState, reset };
}
