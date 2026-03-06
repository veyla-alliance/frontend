"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface Chain {
    id: string;
    label: string;
    apy: number;
    protocol: string;
    tvl: string;
    active: boolean;
    color: string;
    iconUrl?: string;
    status: "active" | "standby" | "paused";
}

export const CHAINS: Chain[] = [
    {
        id: "hydration",
        label: "Hydration",
        apy: 14.2,
        protocol: "Omnipool",
        tvl: "$45.2M",
        active: true,
        color: "#00d4ff",
        iconUrl: "/hydration.jpg",
        status: "active",
    },
    {
        id: "moonbeam",
        label: "Moonbeam",
        apy: 9.8,
        protocol: "Stellaswap",
        tvl: "$23.1M",
        active: false,
        color: "#a061ff",
        iconUrl: "/moonbeam.jpg",
        status: "standby",
    },
    {
        id: "astar",
        label: "Astar",
        apy: 8.1,
        protocol: "ArthSwap",
        tvl: "$11.8M",
        active: false,
        color: "#6080ff",
        iconUrl: "/astar.jpg",
        status: "standby",
    },
    {
        id: "bifrost",
        label: "Bifrost",
        apy: 7.4,
        protocol: "Bifrost LP",
        tvl: "$7.9M",
        active: false,
        color: "#4ade80",
        iconUrl: "/bifrost.png",
        status: "paused",
    },
];

interface ChainNodeProps {
    chain: Chain;
    compact?: boolean;
}

export function ChainNode({ chain, compact }: ChainNodeProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-xl border transition-all duration-300",
                compact ? "px-3 py-2" : "px-4 py-3",
                chain.active
                    ? "bg-[rgba(0,212,255,0.05)] border-[rgba(0,212,255,0.2)]"
                    : "bg-white/[0.04] border-white/[0.1] hover:bg-white/[0.06] hover:border-white/[0.15]"
            )}
        >
            {/* Chain badge / icon */}
            {chain.iconUrl ? (
                <div
                    className={cn(
                        "relative shrink-0 overflow-hidden",
                        compact ? "w-6 h-6 rounded-md" : "w-8 h-8 rounded-lg",
                        chain.id === "astar" && "bg-white border border-white/20"
                    )}
                >
                    <Image
                        src={chain.iconUrl}
                        alt={chain.label}
                        fill
                        className={cn(
                            chain.id === "astar" ? "object-contain p-1.5" : "object-cover"
                        )}
                    />
                </div>
            ) : (
                <span
                    className={cn(
                        "[font-family:var(--font-geist-pixel-square),monospace] rounded-md border shrink-0 text-center flex items-center justify-center",
                        compact ? "text-[10px] w-6 h-6" : "text-[12px] w-8 h-8"
                    )}
                    style={{
                        color: chain.color,
                        background: `${chain.color}15`,
                        borderColor: `${chain.color}40`,
                    }}
                >
                    {chain.label.slice(0, 3).toUpperCase()}
                </span>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            "font-semibold text-[var(--veyla-text-main)] truncate",
                            compact ? "text-[14px]" : "text-[15px]"
                        )}
                    >
                        {chain.label}
                    </span>
                    {chain.active && (
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[7px] px-1.5 py-0.5 rounded bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] text-[var(--veyla-cyan)] shrink-0">
                            ACTIVE
                        </span>
                    )}
                </div>
                {!compact && (
                    <div className="text-[13px] text-[var(--veyla-text-dim)] mt-0.5">
                        {chain.protocol} · {chain.tvl} TVL
                    </div>
                )}
            </div>

            {/* APY */}
            <span
                className={cn(
                    "font-bold tabular-nums shrink-0",
                    compact ? "text-[16px]" : "text-[18px]",
                    chain.active ? "text-[var(--veyla-cyan)]" : "text-[var(--veyla-text-muted)]"
                )}
            >
                {chain.apy}%
            </span>
        </div>
    );
}
