"use client";

import { useEffect, useState } from "react";
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

export function useVaultHistory() {
    const { address } = useConnection();
    const publicClient = usePublicClient();
    const [rows, setRows] = useState<HistoryRow[]>([]);
    // Start as true — avoids flashing empty state before first fetch
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!address || !publicClient) {
            setLoading(false);
            return;
        }

        async function fetchHistory() {
            setLoading(true);
            try {
                // Raw getLogs — no ABI arg. getLogs+ABI returns args=undefined on Passet Hub.
                // We decode each log manually with decodeEventLog instead.
                const rawLogs = await publicClient!.getLogs({
                    address: env.vaultAddress,
                    fromBlock: 0n,
                    toBlock: "latest",
                });

                // Decode + filter relevant logs first
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
                        if (args.user.toLowerCase() !== address!.toLowerCase()) continue;
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
                    uniqueBlocks.map(bn => publicClient!.getBlock({ blockNumber: bn }))
                );
                const timestamps = new Map(blockData.map(b => [b.number, Number(b.timestamp) * 1000]));

                const result: HistoryRow[] = entries.map(entry => {
                    const { symbol, decimals, chain } = getAssetInfo(entry.token);
                    return {
                        type: entry.type,
                        asset: symbol,
                        amount: formatAmount(entry.amount, decimals),
                        chain,
                        date: new Date(timestamps.get(entry.blockNumber) ?? Date.now()),
                        txHash: entry.txHash,
                    };
                });

                result.sort((a, b) => b.date.getTime() - a.date.getTime());
                setRows(result);
            } catch (e) {
                console.error("Failed to fetch vault history:", e);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, [address, publicClient]);

    return { rows, loading };
}
