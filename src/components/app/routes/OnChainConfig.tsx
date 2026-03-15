"use client";

import { useVaultConfig, useTokenApys, useVaultTvl } from "@/hooks";
import { env } from "@/lib/env";
import { formatUnits } from "viem";
import { ExternalLink, Database, Clock, ArrowRight } from "lucide-react";

export function OnChainConfig() {
    const { protocolFeeBps, rebalanceInterval, lastRoutedAt, dotRoute, usdtRoute, isLoading } = useVaultConfig();
    const { dotApy, usdtApy } = useTokenApys();
    const { dotTvl, usdtTvl } = useVaultTvl();

    const feePercent = protocolFeeBps !== undefined ? (Number(protocolFeeBps) / 100).toFixed(1) : "—";
    const rebalanceHours = rebalanceInterval !== undefined ? (Number(rebalanceInterval) / 3600).toFixed(0) : "—";
    const lastRouted = lastRoutedAt !== undefined && lastRoutedAt > 0n
        ? new Date(Number(lastRoutedAt) * 1000).toLocaleString()
        : "Not yet routed";

    const dotTvlFormatted = dotTvl !== undefined ? parseFloat(formatUnits(dotTvl, 18)).toFixed(4) : "0";
    const usdtTvlFormatted = usdtTvl !== undefined ? parseFloat(formatUnits(usdtTvl, 6)).toFixed(2) : "0";

    const explorerUrl = `${env.blockExplorerUrl}/address/${env.vaultAddress}`;

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[rgba(123,57,252,0.1)] border border-[rgba(123,57,252,0.2)] flex items-center justify-center">
                        <Database size={14} className="text-[var(--veyla-purple-soft)]" />
                    </div>
                    <div>
                        <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">
                            On-Chain State
                        </h2>
                        <p className="text-[13px] text-[var(--veyla-text-dim)] mt-0.5">
                            Live reads from VeylaVault contract
                        </p>
                    </div>
                </div>
                <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(123,57,252,0.08)] border border-[rgba(123,57,252,0.2)] hover:bg-[rgba(123,57,252,0.12)] transition-colors"
                >
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] text-[var(--veyla-purple-soft)] tracking-[0.5px]">
                        BLOCKSCOUT
                    </span>
                    <ExternalLink size={10} className="text-[var(--veyla-purple-soft)]" />
                </a>
            </div>

            <div className="p-5">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-pulse text-[14px] text-[var(--veyla-text-dim)]">
                            Reading contract state...
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Route destinations — highlighted */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(0,212,255,0.04)] border border-[rgba(0,212,255,0.12)]">
                                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[1px] text-[var(--veyla-text-dim)] shrink-0 w-10">DOT</span>
                                <ArrowRight size={12} className="text-[var(--veyla-cyan)] shrink-0" />
                                <span className="text-[15px] font-semibold text-[var(--veyla-cyan)]">
                                    {dotRoute || "—"}
                                </span>
                                {dotApy !== null && (
                                    <span className="ml-auto text-[13px] font-bold text-[var(--veyla-cyan)]">{dotApy}%</span>
                                )}
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(0,212,255,0.04)] border border-[rgba(0,212,255,0.12)]">
                                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[1px] text-[var(--veyla-text-dim)] shrink-0 w-10">USDT</span>
                                <ArrowRight size={12} className="text-[var(--veyla-cyan)] shrink-0" />
                                <span className="text-[15px] font-semibold text-[var(--veyla-cyan)]">
                                    {usdtRoute || "—"}
                                </span>
                                {usdtApy !== null && (
                                    <span className="ml-auto text-[13px] font-bold text-[var(--veyla-cyan)]">{usdtApy}%</span>
                                )}
                            </div>
                        </div>

                        {/* Config grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                                    DOT TVL
                                </span>
                                <span className="text-[15px] font-semibold text-[var(--veyla-text-main)] tabular-nums">
                                    {dotTvlFormatted} DOT
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                                    USDT TVL
                                </span>
                                <span className="text-[15px] font-semibold text-[var(--veyla-text-main)] tabular-nums">
                                    {usdtTvlFormatted} USDT
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                                    Protocol Fee
                                </span>
                                <span className="text-[15px] font-semibold text-[var(--veyla-text-main)]">
                                    {feePercent}%
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                                    Rebalance
                                </span>
                                <span className="text-[15px] font-semibold text-[var(--veyla-text-main)]">
                                    {rebalanceHours}h target
                                </span>
                            </div>
                        </div>

                        {/* Last routed + contract address */}
                        <div className="mt-4 pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <Clock size={12} className="text-[var(--veyla-text-dim)]" />
                                <span className="text-[12px] text-[var(--veyla-text-dim)]">Last routed:</span>
                                <span className="text-[12px] font-semibold text-[var(--veyla-text-muted)]">{lastRouted}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[12px] text-[var(--veyla-text-dim)]">Contract:</span>
                                <a
                                    href={explorerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[12px] font-mono text-[var(--veyla-purple-soft)] hover:underline break-all"
                                >
                                    {env.vaultAddress}
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
