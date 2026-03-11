"use client";

import { useReadContract, useReadContracts } from "wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";

/**
 * Returns the raw deposited balance (bigint, wei-scale) for a given user + token.
 * Disabled automatically when the vault contract is not yet deployed.
 */
export function useVaultBalance(
    userAddress?: `0x${string}`,
    tokenAddress?: `0x${string}`,
) {
    return useReadContract({
        address: env.vaultAddress,
        abi: vaultAbi,
        functionName: "balanceOf",
        args: userAddress && tokenAddress ? [userAddress, tokenAddress] : undefined,
        query: {
            enabled: !!userAddress && !!tokenAddress,
            staleTime: 30_000,
            refetchInterval: 60_000,
        },
    });
}

/**
 * Returns the raw earned yield (bigint, wei-scale) for a given user + token.
 */
export function useVaultEarned(
    userAddress?: `0x${string}`,
    tokenAddress?: `0x${string}`,
) {
    return useReadContract({
        address: env.vaultAddress,
        abi: vaultAbi,
        functionName: "earned",
        args: userAddress && tokenAddress ? [userAddress, tokenAddress] : undefined,
        query: {
            enabled: !!userAddress && !!tokenAddress,
            staleTime: 30_000,
            refetchInterval: 60_000,
        },
    });
}

/**
 * Returns the current APY in basis points (e.g. 1420 = 14.20%).
 */
export function useCurrentApy(tokenAddress?: `0x${string}`) {
    return useReadContract({
        address: env.vaultAddress,
        abi: vaultAbi,
        functionName: "currentApy",
        args: tokenAddress ? [tokenAddress] : undefined,
        query: {
            enabled: !!tokenAddress,
            staleTime: 120_000,
            refetchInterval: 120_000,
        },
    });
}

/**
 * Returns current APY for both DOT and USDT in percentage (e.g. 14.2).
 * Contract stores basis points (1420 = 14.20%), so we divide by 100.
 */
export function useTokenApys() {
    const { data, isLoading } = useReadContracts({
        contracts: [
            { address: env.vaultAddress, abi: vaultAbi, functionName: "currentApy", args: [env.dotTokenAddress]  },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "currentApy", args: [env.usdtTokenAddress] },
        ],
        query: { staleTime: 120_000, refetchInterval: 120_000 },
    });

    const dotBps  = data?.[0]?.result as bigint | undefined;
    const usdtBps = data?.[1]?.result as bigint | undefined;

    return {
        dotApy:  dotBps  !== undefined ? Number(dotBps)  / 100 : null,
        usdtApy: usdtBps !== undefined ? Number(usdtBps) / 100 : null,
        isLoading,
    };
}

/**
 * Returns TVL per-asset via tvlOf().
 * The combined tvl() function mixes DOT (18 dec) + USDT (6 dec) — meaningless as a sum.
 * Always use tvlOf(token) for each asset separately.
 */
export function useVaultTvl() {
    const { data, isLoading } = useReadContracts({
        contracts: [
            { address: env.vaultAddress, abi: vaultAbi, functionName: "tvlOf", args: [env.dotTokenAddress]  },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "tvlOf", args: [env.usdtTokenAddress] },
        ],
        query: { staleTime: 60_000, refetchInterval: 60_000 },
    });

    return {
        dotTvl:  data?.[0]?.result as bigint | undefined,
        usdtTvl: data?.[1]?.result as bigint | undefined,
        isLoading,
    };
}
