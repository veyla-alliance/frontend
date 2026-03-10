"use client";

import { useState, useEffect, useCallback } from "react";

const COINGECKO_URL =
    "https://api.coingecko.com/api/v3/simple/price?ids=polkadot,tether&vs_currencies=usd";

const STALE_MS = 60_000; // re-fetch every 60 seconds

interface Prices {
    DOT: number;
    USDT: number;
    [key: string]: number;
}

// Fallback to last-known prices if the API is unreachable
const FALLBACK: Prices = { DOT: 7.85, USDT: 1.00 };

export function useTokenPrices() {
    const [prices, setPrices]     = useState<Prices>(FALLBACK);
    const [isLoading, setLoading] = useState(true);

    const fetchPrices = useCallback(async () => {
        try {
            const res = await fetch(COINGECKO_URL);
            if (!res.ok) throw new Error("non-OK response");
            const json = await res.json();
            setPrices({
                DOT:  json?.polkadot?.usd ?? FALLBACK.DOT,
                USDT: json?.tether?.usd   ?? FALLBACK.USDT,
            });
        } catch {
            // silently keep previous/fallback values
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrices();
        const id = setInterval(fetchPrices, STALE_MS);
        return () => clearInterval(id);
    }, [fetchPrices]);

    return { prices, isLoading };
}
