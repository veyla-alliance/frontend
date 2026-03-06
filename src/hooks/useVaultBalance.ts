"use client";

import { useReadContract } from "wagmi";
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
            enabled: !!env.vaultAddress && !!userAddress && !!tokenAddress,
            staleTime: 30_000,   // treat on-chain balance as fresh for 30s
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
            enabled: !!env.vaultAddress && !!userAddress && !!tokenAddress,
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
            enabled: !!env.vaultAddress && !!tokenAddress,
            staleTime: 120_000,  // APY changes slowly — 2min is fine
            refetchInterval: 120_000,
        },
    });
}

/**
 * Returns total value locked in the vault (bigint, wei-scale).
 */
export function useVaultTvl() {
    return useReadContract({
        address: env.vaultAddress,
        abi: vaultAbi,
        functionName: "tvl",
        query: {
            enabled: !!env.vaultAddress,
            staleTime: 60_000,
            refetchInterval: 60_000,
        },
    });
}
