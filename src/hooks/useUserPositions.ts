"use client";

import { useConnection } from "wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import { useVaultBalance, useVaultEarned, useCurrentApy } from "./useVaultBalance";
import type { VaultPosition, AssetSymbol } from "@/types";

// Token addresses on Passet Hub — fill in once deployed
const TOKEN_ADDRESSES: Record<AssetSymbol, `0x${string}` | undefined> = {
    DOT:  env.dotTokenAddress,
    USDT: env.usdtTokenAddress,
};

/**
 * Returns the connected user's active vault positions.
 * Returns an empty array when the contract is not yet deployed or wallet is disconnected.
 *
 * Phase 3: replace mock derivation with a single multicall or contract view function.
 */
export function useUserPositions(): {
    positions: VaultPosition[];
    isLoading: boolean;
} {
    const { address } = useConnection();

    const dotAddress  = TOKEN_ADDRESSES.DOT;
    const usdtAddress = TOKEN_ADDRESSES.USDT;

    const dotBalance  = useVaultBalance(address, dotAddress);
    const usdtBalance = useVaultBalance(address, usdtAddress);
    const dotEarned   = useVaultEarned(address, dotAddress);
    const usdtEarned  = useVaultEarned(address, usdtAddress);
    const dotApy      = useCurrentApy(dotAddress);
    const usdtApy     = useCurrentApy(usdtAddress);

    const isLoading =
        dotBalance.isLoading  ||
        usdtBalance.isLoading ||
        dotEarned.isLoading   ||
        usdtEarned.isLoading  ||
        dotApy.isLoading      ||
        usdtApy.isLoading;

    // Return empty if contract not deployed yet
    if (!env.vaultAddress || !address) {
        return { positions: [], isLoading: false };
    }

    const positions: VaultPosition[] = [];

    if (dotBalance.data && dotBalance.data > 0n) {
        positions.push({
            asset: "DOT",
            depositedAmount: dotBalance.data,
            depositedUsd: 0,      // Phase 3: multiply by price feed
            currentApy: dotApy.data ? Number(dotApy.data) / 100 : 0,
            earnedAmount: dotEarned.data ?? 0n,
            earnedUsd: 0,         // Phase 3: multiply by price feed
            deployedTo: "Hydration",
            depositedAt: 0,       // Phase 3: read from Deposited event
        });
    }

    if (usdtBalance.data && usdtBalance.data > 0n) {
        positions.push({
            asset: "USDT",
            depositedAmount: usdtBalance.data,
            depositedUsd: 0,
            currentApy: usdtApy.data ? Number(usdtApy.data) / 100 : 0,
            earnedAmount: usdtEarned.data ?? 0n,
            earnedUsd: 0,
            deployedTo: "Moonbeam",
            depositedAt: 0,
        });
    }

    return { positions, isLoading };
}
