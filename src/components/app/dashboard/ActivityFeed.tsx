"use client";

import { ArrowDownLeft, ArrowLeftRight, TrendingUp, ArrowUpRight, Activity } from "lucide-react";
import { env } from "@/lib/env";
import type { ActivityType } from "@/types";

interface ActivityItem {
    type: ActivityType;
    description: string;
    amount: string;
    timestamp: Date;
    txHash: string;
}

const ACTIVITY_CONFIG: Record<ActivityType, {
    icon: React.ReactNode;
    iconBg: string;
    amountColor: string;
}> = {
    Deposit: {
        icon: <ArrowDownLeft size={13} />,
        iconBg: "bg-[rgba(123,57,252,0.12)] text-[var(--veyla-purple-soft)] border-[rgba(123,57,252,0.2)]",
        amountColor: "text-[var(--veyla-text-main)]",
    },
    Route: {
        icon: <ArrowLeftRight size={13} />,
        iconBg: "bg-[rgba(0,212,255,0.08)] text-[var(--veyla-cyan)] border-[rgba(0,212,255,0.15)]",
        amountColor: "text-[var(--veyla-text-muted)]",
    },
    Earn: {
        icon: <TrendingUp size={13} />,
        iconBg: "bg-[rgba(74,222,128,0.08)] text-[#4ade80] border-[rgba(74,222,128,0.15)]",
        amountColor: "text-[#4ade80]",
    },
    Withdraw: {
        icon: <ArrowUpRight size={13} />,
        iconBg: "bg-[rgba(251,191,36,0.08)] text-[#fbbf24] border-[rgba(251,191,36,0.15)]",
        amountColor: "text-[#fbbf24]",
    },
};

function formatRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
}

interface ActivityFeedProps {
    items?: ActivityItem[];
    loading?: boolean;
}

export function ActivityFeed({ items = [], loading = false }: ActivityFeedProps) {
    return (
        <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">Recent Activity</h2>
                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[1px] text-[var(--veyla-text-dim)]">
                    {loading ? "—" : `${items.length} EVENTS`}
                </span>
            </div>

            {loading ? (
                /* Skeleton */
                <div className="divide-y divide-white/[0.03]">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                            <div className="w-8 h-8 rounded-xl bg-white/[0.04] animate-pulse shrink-0" />
                            <div className="flex-1 flex flex-col gap-1.5">
                                <div className="h-3.5 w-32 rounded-md bg-white/[0.04] animate-pulse" />
                                <div className="h-2.5 w-20 rounded-md bg-white/[0.03] animate-pulse" />
                            </div>
                            <div className="h-3.5 w-16 rounded-md bg-white/[0.04] animate-pulse" />
                        </div>
                    ))}
                </div>
            ) : items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center gap-3 py-14 px-6 text-center">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.06] text-[var(--veyla-text-dim)]">
                        <Activity size={18} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[15px] font-semibold text-[var(--veyla-text-muted)]">No activity yet</p>
                        <p className="text-[13px] text-[var(--veyla-text-dim)] max-w-[220px] leading-[1.6]">
                            Deposits, withdrawals, and yield events will appear here.
                        </p>
                    </div>
                </div>
            ) : (
                /* Activity list */
                <div className="divide-y divide-white/[0.03]">
                    {items.map((item, i) => {
                        const config = ACTIVITY_CONFIG[item.type];
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors duration-100"
                            >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${config.iconBg}`}>
                                    {config.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[15px] font-medium text-[var(--veyla-text-main)]">
                                            {item.description}
                                        </span>
                                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[var(--veyla-text-dim)] border border-white/[0.06]">
                                            {item.type.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[13px] text-[var(--veyla-text-dim)]">
                                            {formatRelativeTime(item.timestamp)}
                                        </span>
                                        <span className="text-[var(--veyla-text-dim)]">·</span>
                                        <a
                                            href={`${env.blockExplorerUrl}/tx/${item.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] text-[var(--veyla-text-dim)] hover:text-[var(--veyla-purple-soft)] transition-colors duration-150"
                                        >
                                            {item.txHash}
                                        </a>
                                    </div>
                                </div>

                                <span className={`text-[15px] font-semibold shrink-0 ${config.amountColor}`}>
                                    {item.amount}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
