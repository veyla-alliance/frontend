"use client";

import { useQuery } from "@tanstack/react-query";

const COINGECKO_URL =
    "https://api.coingecko.com/api/v3/simple/price?ids=polkadot,tether&vs_currencies=usd";

interface Prices {
    DOT: number;
    USDT: number;
    [key: string]: number;
}

// Fallback to last-known prices if the API is unreachable
const FALLBACK: Prices = { DOT: 7.85, USDT: 1.00 };

async function fetchPrices(): Promise<Prices> {
    const res = await fetch(COINGECKO_URL);
    if (!res.ok) throw new Error("non-OK response");
    const json = await res.json();
    return {
        DOT:  json?.polkadot?.usd ?? FALLBACK.DOT,
        USDT: json?.tether?.usd   ?? FALLBACK.USDT,
    };
}

/**
 * Fetches DOT and USDT prices from CoinGecko.
 * Uses TanStack Query so multiple components share a single cache entry —
 * no duplicate API calls regardless of how many times the hook is mounted.
 * Falls back to { DOT: 7.85, USDT: 1.00 } on error.
 */
export function useTokenPrices() {
    const { data, isLoading } = useQuery<Prices>({
        queryKey: ["tokenPrices"],
        queryFn:  fetchPrices,
        staleTime:       60_000,  // re-fetch at most every 60s
        refetchInterval: 60_000,
        placeholderData: FALLBACK, // never shows undefined — fallback until first fetch
        retry: false,              // don't hammer CoinGecko on error
    });

    return {
        prices:    data ?? FALLBACK,
        isLoading,
    };
}
