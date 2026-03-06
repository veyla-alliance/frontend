"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDownLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "deposits" | "withdrawals" | "routed";

const FILTER_TABS: { label: string; value: FilterTab }[] = [
    { label: "All",          value: "all" },
    { label: "Deposits",     value: "deposits" },
    { label: "Withdrawals",  value: "withdrawals" },
    { label: "Routed",       value: "routed" },
];

const TABLE_COLS = ["Type", "Asset", "Amount", "Chain", "Date", "TX Hash"];

export default function HistoryPage() {
    const [filter, setFilter] = useState<FilterTab>("all");

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
                    <tbody>
                        <tr>
                            <td colSpan={TABLE_COLS.length}>
                                {/* Empty state */}
                                <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
                                    <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                                        <RefreshCw size={20} className="text-[var(--veyla-text-dim)]" />
                                    </div>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
}
