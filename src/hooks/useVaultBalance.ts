"use client";

import { useReadContracts } from "wagmi";
import { env } from "@/lib/env";
import { vaultAbi } from "@/lib/abi/vault";

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

/**
 * Reads global protocol config from contract:
 * protocolFeeBps, rebalanceInterval, lastRoutedAt, and token→route mappings.
 * Refreshes every 60s.
 */
export function useVaultConfig() {
    const { data, isLoading } = useReadContracts({
        contracts: [
            { address: env.vaultAddress, abi: vaultAbi, functionName: "protocolFeeBps"   },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "rebalanceInterval" },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "lastRoutedAt"      },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "tokenRoute", args: [env.dotTokenAddress]  },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "tokenRoute", args: [env.usdtTokenAddress] },
        ],
        query: { staleTime: 60_000, refetchInterval: 60_000 },
    });

    return {
        protocolFeeBps:    data?.[0]?.result as bigint | undefined,
        rebalanceInterval: data?.[1]?.result as bigint | undefined,
        lastRoutedAt:      data?.[2]?.result as bigint | undefined,
        dotRoute:          data?.[3]?.result as string | undefined,
        usdtRoute:         data?.[4]?.result as string | undefined,
        isLoading,
    };
}
