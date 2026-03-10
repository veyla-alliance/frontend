"use client";

import { useEffect, useState, useCallback } from "react";
import { usePublicClient, useConnection } from "wagmi";
import { formatUnits, decodeEventLog } from "viem";
import { vaultAbi } from "@/lib/abi/vault";
import { env } from "@/lib/env";
import type { ActivityType } from "@/types";

export interface HistoryRow {
    type: ActivityType;
    asset: string;
    amount: string;
    chain: string;
    date: Date;
    txHash: `0x${string}`;
}

// ── localStorage helpers ───────────────────────────────────────────────────

type CachedRow = Omit<HistoryRow, "date"> & { date: string }; // Date → ISO string

function cacheKey(address: string) {
    return `veyla_history_${address.toLowerCase()}`;
}

function loadCache(address: string): HistoryRow[] {
    try {
        const raw = localStorage.getItem(cacheKey(address));
        if (!raw) return [];
        const parsed: CachedRow[] = JSON.parse(raw);
        return parsed.map(r => ({ ...r, date: new Date(r.date) }));
    } catch {
        return [];
    }
}

function saveCache(address: string, rows: HistoryRow[]) {
    try {
        const serialized: CachedRow[] = rows.map(r => ({ ...r, date: r.date.toISOString() }));
        localStorage.setItem(cacheKey(address), JSON.stringify(serialized));
    } catch {
        // Storage quota exceeded — silently skip
    }
}

/**
 * Optimistically prepend a new row to the localStorage cache immediately
 * after a tx succeeds — so the next page that reads history sees it instantly.
 */
export function pushToHistoryCache(address: string, row: HistoryRow) {
    const existing = loadCache(address);
    saveCache(address, [row, ...existing]);
}

// ── Asset lookup ───────────────────────────────────────────────────────────

function getAssetInfo(token: string): { symbol: string; decimals: number; chain: string } {
    if (token.toLowerCase() === env.dotTokenAddress.toLowerCase()) {
        return { symbol: "DOT", decimals: 18, chain: "Hydration" };
    }
    return { symbol: "USDT", decimals: 6, chain: "Moonbeam" };
}

function formatAmount(amount: bigint, decimals: number): string {
    return Number(formatUnits(amount, decimals)).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    });
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useVaultHistory() {
    const { address } = useConnection();
    const publicClient = usePublicClient();

    // Load from cache immediately — no flash, no spinner on repeat visits
    const [rows, setRows] = useState<HistoryRow[]>(() =>
        address ? loadCache(address) : []
    );
    // loading = true only when cache is empty (true first-time visit)
    const [loading, setLoading] = useState(() =>
        address ? loadCache(address).length === 0 : false
    );

    const fetchHistory = useCallback(async () => {
        if (!address || !publicClient) {
            setLoading(false);
            return;
        }

        // Only show spinner if we have nothing to display yet
        if (rows.length === 0) setLoading(true);

        try {
            // Raw getLogs — getLogs+ABI returns args=undefined on Passet Hub (viem bug).
            // Decode each log manually with decodeEventLog instead.
            const rawLogs = await publicClient.getLogs({
                address: env.vaultAddress,
                fromBlock: 0n,
                toBlock: "latest",
            });

            type Entry = {
                type: ActivityType;
                token: string;
                amount: bigint;
                blockNumber: bigint;
                txHash: `0x${string}`;
            };

            const entries: Entry[] = [];
            for (const log of rawLogs) {
                try {
                    const decoded = decodeEventLog({ abi: vaultAbi, data: log.data, topics: log.topics });
                    if (decoded.eventName !== "Deposited" && decoded.eventName !== "Withdrawn") continue;
                    const args = decoded.args as { user: string; token: string; amount: bigint };
                    if (args.user.toLowerCase() !== address.toLowerCase()) continue;
                    if (!log.blockNumber || !log.transactionHash) continue;

                    entries.push({
                        type: decoded.eventName === "Deposited" ? "Deposit" : "Withdraw",
                        token: args.token,
                        amount: args.amount,
                        blockNumber: log.blockNumber,
                        txHash: log.transactionHash,
                    });
                } catch {
                    // Skip non-vault logs
                }
            }

            // Fetch block timestamps for unique blocks
            const uniqueBlocks = [...new Set(entries.map(e => e.blockNumber))];
            const blockData = await Promise.all(
                uniqueBlocks.map(bn => publicClient.getBlock({ blockNumber: bn }))
            );
            const timestamps = new Map(blockData.map(b => [b.number, Number(b.timestamp) * 1000]));

            const result: HistoryRow[] = entries
                .map(entry => {
                    const { symbol, decimals, chain } = getAssetInfo(entry.token);
                    return {
                        type: entry.type,
                        asset: symbol,
                        amount: formatAmount(entry.amount, decimals),
                        chain,
                        date: new Date(timestamps.get(entry.blockNumber) ?? Date.now()),
                        txHash: entry.txHash,
                    };
                })
                .sort((a, b) => b.date.getTime() - a.date.getTime());

            setRows(result);
            saveCache(address, result);
        } catch (e) {
            console.error("Failed to fetch vault history:", e);
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, publicClient]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return { rows, loading, refetch: fetchHistory };
}
