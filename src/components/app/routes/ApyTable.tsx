"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { CHAINS } from "./ChainNode";
import { cn } from "@/lib/utils";
import { useTokenApys } from "@/hooks";

function StatusBadge({ status, active }: { status: string; active: boolean }) {
    if (active) {
        return (
            <span className="inline-flex items-center gap-1.5 [font-family:var(--font-geist-pixel-square),monospace] text-[10px] px-2 py-1 rounded-full bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] text-[var(--veyla-cyan)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veyla-cyan)] animate-pulse" />
                ACTIVE
            </span>
        );
    }
    if (status === "paused") {
        return (
            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] px-2 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-[var(--veyla-text-dim)]">
                PAUSED
            </span>
        );
    }
    return (
        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] px-2 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-[var(--veyla-text-dim)]">
            STANDBY
        </span>
    );
}

export function ApyTable() {
    const { dotApy, usdtApy } = useTokenApys();

    // Override APYs for active chains with real contract values
    const chainApyOverrides: Record<string, number | null> = {
        hydration: dotApy,   // DOT → Hydration
        moonbeam:  usdtApy,  // USDT → Moonbeam
    };

    const chains = CHAINS.map(c => ({
        ...c,
        apy: chainApyOverrides[c.id] ?? c.apy,
    }));
    const sorted = [...chains].sort((a, b) => b.apy - a.apy);

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.05]">
                <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">
                    APY Comparison
                </h2>
                <p className="text-[14px] text-[var(--veyla-text-dim)] mt-0.5">
                    All available yield routes, sorted by APY
                </p>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-5 px-5 py-3 border-b border-white/[0.04]">
                {[
                    { label: "Chain", icon: null },
                    { label: "Protocol", icon: null },
                    { label: "APY", icon: <ArrowDown size={10} className="inline ml-0.5" /> },
                    { label: "TVL", icon: null },
                    { label: "Status", icon: null },
                ].map(({ label, icon }) => (
                    <span
                        key={label}
                        className="text-[13px] font-semibold text-[var(--veyla-text-dim)] tracking-[0.5px] uppercase"
                    >
                        {label}
                        {icon}
                    </span>
                ))}
            </div>

            {/* Rows */}
            <div>
                {sorted.map((chain) => (
                    <div
                        key={chain.id}
                        className={`grid grid-cols-5 px-5 py-4 border-b border-white/[0.03] last:border-0 transition-colors duration-150 ${chain.active
                            ? "bg-[rgba(0,212,255,0.02)]"
                            : "hover:bg-white/[0.02]"
                            }`}
                    >
                        {/* Chain */}
                        <div className="flex items-center gap-3">
                            {chain.iconUrl ? (
                                <div
                                    className={cn(
                                        "relative shrink-0 overflow-hidden w-6 h-6 rounded-md",
                                        chain.id === "astar" && "bg-white border border-white/20"
                                    )}
                                >
                                    <Image
                                        src={chain.iconUrl}
                                        alt={chain.label}
                                        fill
                                        className={cn(
                                            chain.id === "astar" ? "object-contain p-[2px]" : "object-cover"
                                        )}
                                    />
                                </div>
                            ) : (
                                <span
                                    className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] px-2 py-1 flex items-center justify-center rounded-md border shrink-0 min-w-[32px]"
                                    style={{
                                        color: chain.color,
                                        background: `${chain.color}15`,
                                        borderColor: `${chain.color}40`,
                                    }}
                                >
                                    {chain.label.slice(0, 3).toUpperCase()}
                                </span>
                            )}
                            <span className="text-[15px] font-semibold text-[var(--veyla-text-main)] truncate">
                                {chain.label}
                            </span>
                        </div>

                        {/* Protocol */}
                        <div className="flex items-center">
                            <span className="text-[15px] text-[var(--veyla-text-muted)]">
                                {chain.protocol}
                            </span>
                        </div>

                        {/* APY */}
                        <div className="flex items-center">
                            <span
                                className={`text-[17px] font-bold tabular-nums ${chain.active
                                    ? "text-[var(--veyla-cyan)]"
                                    : "text-[var(--veyla-text-main)]"
                                    }`}
                            >
                                {chain.apy}%
                            </span>
                        </div>

                        {/* TVL */}
                        <div className="flex items-center">
                            <span className="text-[15px] text-[var(--veyla-text-muted)]">
                                {chain.tvl}
                            </span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center">
                            <StatusBadge status={chain.status} active={chain.active} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
