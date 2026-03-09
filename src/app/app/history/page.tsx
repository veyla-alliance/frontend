"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDownLeft, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import type { ActivityType } from "@/types";

type FilterTab = "all" | "deposits" | "withdrawals" | "routed";

const FILTER_TABS: { label: string; value: FilterTab }[] = [
    { label: "All",         value: "all" },
    { label: "Deposits",    value: "deposits" },
    { label: "Withdrawals", value: "withdrawals" },
    { label: "Routed",      value: "routed" },
];

const TABLE_COLS = ["Type", "Asset", "Amount", "Chain", "Date", "TX Hash"];

interface HistoryRow {
    type: ActivityType;
    asset: string;
    amount: string;
    chain: string;
    date: Date;
    txHash: string;
}

const MOCK_ROWS: HistoryRow[] = [
    { type: "Earn",     asset: "DOT",  amount: "+12.4",   chain: "Hydration", date: new Date(Date.now() - 1000 * 60 * 1),      txHash: "0x9abc...ef12" },
    { type: "Route",    asset: "DOT",  amount: "1,000",   chain: "Hydration", date: new Date(Date.now() - 1000 * 60 * 3),      txHash: "0x5678...cd90" },
    { type: "Deposit",  asset: "USDT", amount: "500",     chain: "Moonbeam",  date: new Date(Date.now() - 1000 * 60 * 12),     txHash: "0x3456...ab78" },
    { type: "Deposit",  asset: "DOT",  amount: "1,000",   chain: "Hydration", date: new Date(Date.now() - 1000 * 60 * 60 * 2), txHash: "0x1234...5678" },
];

const TYPE_STYLE: Record<ActivityType, string> = {
    Deposit:  "bg-[rgba(123,57,252,0.1)] text-[var(--veyla-purple-soft)] border-[rgba(123,57,252,0.2)]",
    Withdraw: "bg-[rgba(251,191,36,0.08)] text-[#fbbf24] border-[rgba(251,191,36,0.2)]",
    Route:    "bg-[rgba(0,212,255,0.08)] text-[var(--veyla-cyan)] border-[rgba(0,212,255,0.2)]",
    Earn:     "bg-[rgba(74,222,128,0.08)] text-[#4ade80] border-[rgba(74,222,128,0.2)]",
};

function formatDate(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function filterRows(rows: HistoryRow[], filter: FilterTab): HistoryRow[] {
    if (filter === "all") return rows;
    if (filter === "deposits") return rows.filter((r) => r.type === "Deposit");
    if (filter === "withdrawals") return rows.filter((r) => r.type === "Withdraw");
    if (filter === "routed") return rows.filter((r) => r.type === "Route");
    return rows;
}

export default function HistoryPage() {
    const [filter, setFilter] = useState<FilterTab>("all");

    const rows = filterRows(MOCK_ROWS, filter);

    return (
        <div className="flex flex-col gap-5 p-6 md:p-8 pb-24 lg:pb-8">
            {/* Header */}
            <div>
                <h1 className="text-[22px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.3px]">
                    History
                </h1>
                <p className="text-[15px] text-[var(--veyla-text-dim)] mt-0.5">
                    All vault deposits, withdrawals, and routing events
                </p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05] w-fit">
                {FILTER_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-[14px] font-semibold transition-all duration-150",
                            filter === tab.value
                                ? "bg-[rgba(123,57,252,0.15)] text-white border border-[rgba(123,57,252,0.2)]"
                                : "text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-muted)]"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/[0.04]">
                            {TABLE_COLS.map((col) => (
                                <th
                                    key={col}
                                    className="px-5 py-3.5 text-[13px] font-semibold text-[var(--veyla-text-dim)] tracking-[0.5px] uppercase whitespace-nowrap"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {rows.length > 0 ? rows.map((row, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] transition-colors duration-100">
                                <td className="px-5 py-3.5">
                                    <span className={cn(
                                        "[font-family:var(--font-geist-pixel-square),monospace] text-[11px] px-2 py-1 rounded-md border",
                                        TYPE_STYLE[row.type]
                                    )}>
                                        {row.type.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-[15px] font-semibold text-[var(--veyla-text-main)]">
                                    {row.asset}
                                </td>
                                <td className="px-5 py-3.5 text-[15px] text-[var(--veyla-text-main)]">
                                    {row.amount}
                                </td>
                                <td className="px-5 py-3.5 text-[15px] text-[var(--veyla-text-dim)]">
                                    {row.chain}
                                </td>
                                <td className="px-5 py-3.5 text-[14px] text-[var(--veyla-text-dim)]">
                                    {formatDate(row.date)}
                                </td>
                                <td className="px-5 py-3.5">
                                    <a
                                        href={`${env.blockExplorerUrl}/tx/${row.txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 [font-family:var(--font-geist-pixel-square),monospace] text-[11px] text-[var(--veyla-text-dim)] hover:text-[var(--veyla-purple-soft)] transition-colors duration-150"
                                    >
                                        {row.txHash}
                                        <ExternalLink size={10} />
                                    </a>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={TABLE_COLS.length}>
                                    <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[17px] font-semibold text-[var(--veyla-text-muted)]">
                                                No transactions yet
                                            </p>
                                            <p className="text-[14px] text-[var(--veyla-text-dim)] max-w-[300px] leading-[1.65]">
                                                Your vault activity will appear here after your first deposit.
                                            </p>
                                        </div>
                                        <Link
                                            href="/app/vault"
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[rgba(123,57,252,0.12)] border border-[rgba(123,57,252,0.2)] text-[14px] font-semibold text-[var(--veyla-purple-soft)] hover:bg-[rgba(123,57,252,0.18)] transition-colors duration-150"
                                        >
                                            <ArrowDownLeft size={13} />
                                            Make your first deposit
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
