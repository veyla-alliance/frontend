"use client";

import { useReadContracts, useConnection } from "wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import { TOKEN_ADDRESSES } from "@/lib/constants";
import type { VaultPosition } from "@/types";

/**
 * Returns the connected user's active vault positions via a single multicall.
 * Returns an empty array when the contract is not yet deployed or wallet is disconnected.
 */
export function useUserPositions(): {
    positions: VaultPosition[];
    isLoading: boolean;
} {
    const { address } = useConnection();

    const dotAddress  = TOKEN_ADDRESSES.DOT;
    const usdtAddress = TOKEN_ADDRESSES.USDT;

    const enabled = !!address;

    const { data, isLoading } = useReadContracts({
        contracts: [
            { address: env.vaultAddress, abi: vaultAbi, functionName: "balanceOf", args: [address!, dotAddress] },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "balanceOf", args: [address!, usdtAddress] },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "earned",    args: [address!, dotAddress] },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "earned",    args: [address!, usdtAddress] },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "currentApy", args: [dotAddress] },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "currentApy", args: [usdtAddress] },
        ],
        query: {
            enabled,
            staleTime: 30_000,
            refetchInterval: 60_000,
        },
    });

    if (!enabled || !data) {
        return { positions: [], isLoading: false };
    }

    const [dotBalRes, usdtBalRes, dotEarnedRes, usdtEarnedRes, dotApyRes, usdtApyRes] = data;

    const dotBal   = dotBalRes?.result   as bigint | undefined;
    const usdtBal  = usdtBalRes?.result  as bigint | undefined;
    const dotEarn  = dotEarnedRes?.result  as bigint | undefined;
    const usdtEarn = usdtEarnedRes?.result as bigint | undefined;
    const dotApy   = dotApyRes?.result   as bigint | undefined;
    const usdtApy  = usdtApyRes?.result  as bigint | undefined;

    const positions: VaultPosition[] = [];

    if (dotBal && dotBal > 0n) {
        positions.push({
            asset: "DOT",
            depositedAmount: dotBal,
            depositedUsd: 0,
            currentApy: dotApy ? Number(dotApy) / 100 : 0,
            earnedAmount: dotEarn ?? 0n,
            earnedUsd: 0,
            deployedTo: "Hydration",
            depositedAt: 0,
        });
    }

    if (usdtBal && usdtBal > 0n) {
        positions.push({
            asset: "USDT",
            depositedAmount: usdtBal,
            depositedUsd: 0,
            currentApy: usdtApy ? Number(usdtApy) / 100 : 0,
            earnedAmount: usdtEarn ?? 0n,
            earnedUsd: 0,
            deployedTo: "Moonbeam",
            depositedAt: 0,
        });
    }

    return { positions, isLoading };
}
