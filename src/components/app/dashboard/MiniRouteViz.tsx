"use client";

import Image from "next/image";
import { CHAINS } from "@/components/app/routes/ChainNode";
import { useVaultConfig } from "@/hooks";

function formatRelativeTime(ts: bigint | undefined): string {
    if (!ts || ts === 0n) return "never";
    const elapsed = Math.max(0, Math.floor(Date.now() / 1000) - Number(ts));
    if (elapsed === 0)   return "just now";
    if (elapsed < 60)    return `${elapsed}s ago`;
    if (elapsed < 3600)  return `${Math.floor(elapsed / 60)}m ago`;
    if (elapsed < 86400) return `${Math.floor(elapsed / 3600)}h ago`;
    return `${Math.floor(elapsed / 86400)}d ago`;
}

export function MiniRouteViz() {
    const { lastRoutedAt } = useVaultConfig();
    return (
        <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">Active Route</h2>
                <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[1px] text-[#4ade80]">LIVE</span>
                </span>
            </div>

            {/* Viz */}
            <div className="flex flex-col gap-3 p-5">
                {/* HUB node */}
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-[rgba(123,57,252,0.1)] border border-[rgba(123,57,252,0.3)] flex items-center justify-center shrink-0">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                            <Image src="/veyla-purple-icon.svg" alt="Veyla Logo" fill />
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[15px] font-semibold text-[var(--veyla-text-main)]">Polkadot Hub</span>
                        <span className="text-[13px] text-[var(--veyla-text-dim)]">Entry point</span>
                    </div>
                </div>

                {/* Connector */}
                <div className="ml-5 flex flex-col gap-2.5">
                    {CHAINS.filter((c) => c.status !== "paused").map((chain) => (
                        <div key={chain.id} className="flex items-center gap-3">
                            {/* Line + arrow */}
                            <div className="flex items-center gap-1 shrink-0 w-[28px]">
                                <div className={`w-full h-px ${chain.active ? "bg-[var(--veyla-cyan)]" : "bg-white/[0.08]"}`} />
                                <div
                                    className={`w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-t-transparent border-b-transparent shrink-0
                                    ${chain.active ? "border-l-[var(--veyla-cyan)]" : "border-l-white/[0.1]"}`}
                                />
                            </div>

                            {/* Chain pill */}
                            <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-xl border transition-all duration-200
                                ${chain.active
                                    ? "bg-[rgba(0,212,255,0.06)] border-[rgba(0,212,255,0.2)]"
                                    : "bg-white/[0.02] border-white/[0.05]"
                                }`}
                            >
                                <div className="flex items-center gap-2 flex-1">
                                    {chain.iconUrl && (
                                        <div className={`relative w-4 h-4 rounded-sm overflow-hidden shrink-0 ${chain.id === "astar" ? "bg-white border border-white/20" : ""}`}>
                                            <Image src={chain.iconUrl} alt={chain.label} fill className={chain.id === "astar" ? "object-contain p-1" : "object-cover"} />
                                        </div>
                                    )}
                                    <span className={`[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[0.5px] flex-1
                                        ${chain.active ? "text-[var(--veyla-cyan)]" : "text-[var(--veyla-text-dim)]"}`}
                                    >
                                        {chain.label}
                                    </span>
                                </div>
                                <span className={`text-[14px] font-semibold
                                    ${chain.active ? "text-[var(--veyla-cyan)]" : "text-[var(--veyla-text-dim)]"}`}
                                >
                                    {chain.apy}%
                                </span>
                                {chain.active && (
                                    <span className="text-[12px] text-[#4ade80] font-semibold">✓</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Last routed */}
                <div className="mt-1 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="text-[13px] text-[var(--veyla-text-dim)]">Last routed</span>
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] text-[var(--veyla-text-dim)] tracking-[0.5px]">
                        {formatRelativeTime(lastRoutedAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}
