"use client";

import { useQuery } from "@tanstack/react-query";

interface Prices {
    DOT: number;
    USDT: number;
    [key: string]: number;
}

// Last-resort fallback (updated March 2026)
const FALLBACK: Prices = { DOT: 1.50, USDT: 1.00 };

// ── Source 1: CoinGecko ─────────────────────────────────────────────────────
async function fetchFromCoinGecko(): Promise<Prices> {
    const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=polkadot,tether&vs_currencies=usd"
    );
    if (!res.ok) throw new Error("CoinGecko: non-OK");
    const json = await res.json();
    const dot = json?.polkadot?.usd;
    if (typeof dot !== "number") throw new Error("CoinGecko: missing DOT");
    return { DOT: dot, USDT: json?.tether?.usd ?? 1.00 };
}

// ── Source 2: CoinCap ───────────────────────────────────────────────────────
async function fetchFromCoinCap(): Promise<Prices> {
    const res = await fetch("https://api.coincap.io/v2/assets?ids=polkadot");
    if (!res.ok) throw new Error("CoinCap: non-OK");
    const json = await res.json();
    const dot = parseFloat(json?.data?.[0]?.priceUsd);
    if (isNaN(dot)) throw new Error("CoinCap: missing DOT");
    return { DOT: dot, USDT: 1.00 };
}

// ── Waterfall: try each source, fall back to next ───────────────────────────
async function fetchPrices(): Promise<Prices> {
    try { return await fetchFromCoinGecko(); } catch { /* next */ }
    try { return await fetchFromCoinCap(); } catch { /* next */ }
    return FALLBACK;
}

/**
 * Fetches DOT and USDT prices with multi-source fallback:
 * CoinGecko → CoinCap → hardcoded fallback.
 * Uses TanStack Query so multiple components share a single cache entry.
 */
export function useTokenPrices() {
    const { data, isLoading } = useQuery<Prices>({
        queryKey: ["tokenPrices"],
        queryFn:  fetchPrices,
        staleTime:       60_000,
        refetchInterval: 60_000,
        placeholderData: FALLBACK,
        retry: 1,
    });

    return {
        prices:    data ?? FALLBACK,
        isLoading,
    };
}
