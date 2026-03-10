"use client";

import { useReadContracts, useConnection } from "wagmi";
import { formatUnits } from "viem";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";
import { TOKEN_ADDRESSES } from "@/lib/constants";
import { ASSETS } from "@/components/app/vault/AssetSelector";
import type { VaultPosition, AssetSymbol } from "@/types";

/**
 * Returns the connected user's active vault positions via a single multicall.
 * Pass `prices` to populate depositedUsd and earnedUsd fields.
 * Returns an empty array when the contract is not yet deployed or wallet is disconnected.
 */
export function useUserPositions(prices?: Record<string, number>): {
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

    function toUsd(amount: bigint | undefined, asset: AssetSymbol): number {
        if (!amount || !prices?.[asset]) return 0;
        const decimals = ASSETS[asset]?.decimals ?? 18;
        return Number(formatUnits(amount, decimals)) * (prices[asset] ?? 0);
    }

    if (dotBal && dotBal > 0n) {
        positions.push({
            asset: "DOT",
            depositedAmount: dotBal,
            depositedUsd: toUsd(dotBal, "DOT"),
            currentApy: dotApy ? Number(dotApy) / 100 : 0,
            earnedAmount: dotEarn ?? 0n,
            earnedUsd: toUsd(dotEarn, "DOT"),
            deployedTo: "Hydration",
            depositedAt: 0,
        });
    }

    if (usdtBal && usdtBal > 0n) {
        positions.push({
            asset: "USDT",
            depositedAmount: usdtBal,
            depositedUsd: toUsd(usdtBal, "USDT"),
            currentApy: usdtApy ? Number(usdtApy) / 100 : 0,
            earnedAmount: usdtEarn ?? 0n,
            earnedUsd: toUsd(usdtEarn, "USDT"),
            deployedTo: "Moonbeam",
            depositedAt: 0,
        });
    }

    return { positions, isLoading };
}
