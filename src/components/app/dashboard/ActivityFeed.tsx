"use client";

import { ArrowDownLeft, ArrowLeftRight, TrendingUp, ArrowUpRight } from "lucide-react";

type ActivityType = "Deposit" | "Route" | "Earn" | "Withdraw";

interface Activity {
    type: ActivityType;
    description: string;
    amount: string;
    timestamp: Date;
    txHash: string;
}

const MOCK_ACTIVITY: Activity[] = [
    {
        type: "Earn",
        description: "Yield compounded",
        amount: "+12.4 DOT",
        timestamp: new Date(Date.now() - 1000 * 60 * 1),
        txHash: "0x9abc...ef12",
    },
    {
        type: "Route",
        description: "Routed to HydraDX",
        amount: "1,000 DOT",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        txHash: "0x5678...cd90",
    },
    {
        type: "Deposit",
        description: "Deposited to vault",
        amount: "500 USDT",
        timestamp: new Date(Date.now() - 1000 * 60 * 12),
        txHash: "0x3456...ab78",
    },
    {
        type: "Deposit",
        description: "Deposited to vault",
        amount: "1,000 DOT",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        txHash: "0x1234...5678",
    },
];

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

export function ActivityFeed() {
    return (
        <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[var(--veyla-text-main)]">Recent Activity</h2>
                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] tracking-[1px] text-[var(--veyla-text-dim)]">
                    {MOCK_ACTIVITY.length} EVENTS
                </span>
            </div>

            {/* List */}
            <div className="divide-y divide-white/[0.03]">
                {MOCK_ACTIVITY.map((item, i) => {
                    const config = ACTIVITY_CONFIG[item.type];
                    return (
                        <div
                            key={i}
                            className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors duration-100"
                        >
                            {/* Icon */}
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${config.iconBg}`}>
                                {config.icon}
                            </div>

                            {/* Description */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] font-medium text-[var(--veyla-text-main)]">
                                        {item.description}
                                    </span>
                                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[var(--veyla-text-dim)] border border-white/[0.06]">
                                        {item.type.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[11px] text-[var(--veyla-text-dim)]">
                                        {formatRelativeTime(item.timestamp)}
                                    </span>
                                    <span className="text-[var(--veyla-text-dim)]">·</span>
                                    <a
                                        href={`https://blockscout-passet-hub.parity-testnet.parity.io/tx/${item.txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] text-[var(--veyla-text-dim)] hover:text-[var(--veyla-purple-soft)] transition-colors duration-150"
                                    >
                                        {item.txHash}
                                    </a>
                                </div>
                            </div>

                            {/* Amount */}
                            <span className={`text-[13px] font-semibold shrink-0 ${config.amountColor}`}>
                                {item.amount}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
