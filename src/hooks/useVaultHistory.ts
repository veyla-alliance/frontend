"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

type CachedRow = Omit<HistoryRow, "date"> & { date: string };

interface HistoryCache {
    rows: CachedRow[];
    lastBlock: string; // bigint serialized as decimal string
    savedAt:   string; // ISO timestamp for TTL check
}

// Cache expires after 7 days — forces a full re-sync on stale clients.
const CACHE_TTL_MS  = 7 * 24 * 60 * 60 * 1000;
// Cap at 200 rows to bound localStorage usage (~50–100 KB typical).
const CACHE_MAX_ROWS = 200;

function cacheKey(address: string) {
    return `veyla_history_${address.toLowerCase()}`;
}

/** Runtime schema guard — rejects rows with missing or wrong-typed fields. */
function isValidCachedRow(r: unknown): r is CachedRow {
    if (typeof r !== "object" || r === null) return false;
    const row = r as Record<string, unknown>;
    return (
        typeof row.type   === "string" &&
        typeof row.asset  === "string" &&
        typeof row.amount === "string" &&
        typeof row.chain  === "string" &&
        typeof row.date   === "string" &&
        typeof row.txHash === "string" &&
        (row.txHash as string).startsWith("0x")
    );
}

function loadCache(address: string): { rows: HistoryRow[]; lastBlock: bigint } {
    try {
        const raw = localStorage.getItem(cacheKey(address));
        if (!raw) return { rows: [], lastBlock: 0n };
        const parsed = JSON.parse(raw) as Partial<HistoryCache>;

        // TTL check — discard stale cache to force a fresh chain scan
        if (parsed.savedAt) {
            const age = Date.now() - new Date(parsed.savedAt).getTime();
            if (age > CACHE_TTL_MS) return { rows: [], lastBlock: 0n };
        }

        // Schema validation — silently drop malformed rows
        const validRows: HistoryRow[] = (Array.isArray(parsed.rows) ? parsed.rows : [])
            .filter(isValidCachedRow)
            .map(r => ({ ...r, date: new Date(r.date) }));

        return {
            rows:      validRows,
            lastBlock: BigInt(parsed.lastBlock ?? "0"),
        };
    } catch {
        return { rows: [], lastBlock: 0n };
    }
}

function saveCache(address: string, rows: HistoryRow[], lastBlock: bigint) {
    try {
        const cache: HistoryCache = {
            rows:      rows.slice(0, CACHE_MAX_ROWS).map(r => ({ ...r, date: r.date.toISOString() })),
            lastBlock: lastBlock.toString(),
            savedAt:   new Date().toISOString(),
        };
        localStorage.setItem(cacheKey(address), JSON.stringify(cache));
    } catch {
        // Storage quota exceeded — silently skip
    }
}

/**
 * Optimistically prepend a new row to the localStorage cache immediately
 * after a tx succeeds — so the next page that reads history sees it instantly.
 * Does not update lastBlock (that stays accurate from the last fetchHistory run).
 */
export function pushToHistoryCache(address: string, row: HistoryRow) {
    const { rows, lastBlock } = loadCache(address);
    const deduped = [row, ...rows].filter(
        (r, idx, arr) => arr.findIndex(x => x.txHash === r.txHash) === idx
    );
    saveCache(address, deduped, lastBlock);
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
        address ? loadCache(address).rows : []
    );
    // loading = true only when cache is empty (true first-time visit)
    const [loading, setLoading] = useState(() =>
        address ? loadCache(address).rows.length === 0 : false
    );

    // Guard against state updates after unmount (race condition with async RPC calls)
    const isMountedRef = useRef(true);
    useEffect(() => {
        return () => { isMountedRef.current = false; };
    }, []);

    const fetchHistory = useCallback(async () => {
        if (!address || !publicClient) {
            setLoading(false);
            return;
        }

        const { rows: cachedRows, lastBlock } = loadCache(address);

        // Only show spinner on first visit (empty cache)
        if (cachedRows.length === 0) setLoading(true);

        try {
            // ── Incremental fetch: only query blocks we haven't seen yet ──
            // Prevents re-scanning the entire chain on every call.
            const fromBlock = lastBlock > 0n ? lastBlock + 1n : 0n;
            const latestBlock = await publicClient.getBlockNumber();

            // Nothing new to fetch — serve from cache immediately
            if (fromBlock > latestBlock && cachedRows.length > 0) {
                setRows(cachedRows);
                setLoading(false);
                return;
            }

            // Raw getLogs — getLogs+ABI returns args=undefined on Passet Hub (viem bug).
            // Decode each log manually with decodeEventLog instead.
            const rawLogs = await publicClient.getLogs({
                address: env.vaultAddress,
                fromBlock,
                toBlock: "latest",
            });

            type Entry = {
                type: ActivityType;
                token: string;
                amount: bigint;
                blockNumber: bigint;
                txHash: `0x${string}`;
            };

            const newEntries: Entry[] = [];
            for (const log of rawLogs) {
                try {
                    const decoded = decodeEventLog({ abi: vaultAbi, data: log.data, topics: log.topics });
                    if (
                        decoded.eventName !== "Deposited" &&
                        decoded.eventName !== "Withdrawn" &&
                        decoded.eventName !== "YieldClaimed"
                    ) continue;
                    const args = decoded.args as { user: string; token: string; amount: bigint };
                    if (args.user.toLowerCase() !== address.toLowerCase()) continue;
                    if (!log.blockNumber || !log.transactionHash) continue;

                    const typeMap = {
                        Deposited:    "Deposit",
                        Withdrawn:    "Withdraw",
                        YieldClaimed: "Earn",
                    } as const;

                    newEntries.push({
                        type:  typeMap[decoded.eventName],
                        token: args.token,
                        amount: args.amount,
                        blockNumber: log.blockNumber,
                        txHash: log.transactionHash,
                    });
                } catch {
                    // Skip non-vault logs
                }
            }

            // ── Fetch timestamps only for NEW blocks (not already in cache) ──
            const uniqueNewBlocks = [...new Set(newEntries.map(e => e.blockNumber))];
            const blockData = await Promise.all(
                uniqueNewBlocks.map(bn => publicClient.getBlock({ blockNumber: bn }))
            );
            const timestamps = new Map(blockData.map(b => [b.number, Number(b.timestamp) * 1000]));

            const newRows: HistoryRow[] = newEntries.map(entry => {
                const { symbol, decimals, chain } = getAssetInfo(entry.token);
                return {
                    type:   entry.type,
                    asset:  symbol,
                    amount: formatAmount(entry.amount, decimals),
                    chain,
                    date:   new Date(timestamps.get(entry.blockNumber) ?? Date.now()),
                    txHash: entry.txHash,
                };
            });

            // Merge new rows with cached rows, dedup by txHash, sort newest-first
            const merged = [...newRows, ...cachedRows]
                .filter((row, idx, arr) =>
                    arr.findIndex(r => r.txHash === row.txHash) === idx
                )
                .sort((a, b) => b.date.getTime() - a.date.getTime());

            if (!isMountedRef.current) return;
            setRows(merged);
            saveCache(address, merged, latestBlock);
        } catch (e) {
            if (process.env.NODE_ENV === "development") console.error("Failed to fetch vault history:", e);
            // On error, still show cached data rather than blank screen
            if (isMountedRef.current && cachedRows.length > 0) setRows(cachedRows);
        } finally {
            if (isMountedRef.current) setLoading(false);
        }
    }, [address, publicClient]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return { rows, loading, refetch: fetchHistory };
}
