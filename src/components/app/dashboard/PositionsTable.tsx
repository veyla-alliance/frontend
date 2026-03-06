"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatUnits } from "viem";
import type { VaultPosition } from "@/types";

const ASSET_DECIMALS: Record<string, number> = { DOT: 10, USDT: 6 };

function formatAmount(amount: bigint, asset: string): string {
    const units = formatUnits(amount, ASSET_DECIMALS[asset] ?? 18);
    return parseFloat(units).toLocaleString("en-US", { maximumFractionDigits: 4 });
}

const ASSET_ICONS: Record<string, { url: string; whiteBg?: boolean }> = {
    DOT:  { url: "/polkadot.jpg" },
    USDT: { url: "/usdt.svg" },
};

const CHAIN_ICONS: Record<string, { url: string; whiteBg?: boolean }> = {
    Hydration: { url: "/hydration.jpg" },
    Moonbeam:  { url: "/moonbeam.jpg" },
    Astar:     { url: "/astar.jpg", whiteBg: true },
};

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
    return (
        <span className={`[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[0.5px] px-2 py-1 rounded-md border ${colorClass}`}>
            {label}
        </span>
    );
}

interface PositionsTableProps {
    positions: VaultPosition[];
    isLoading: boolean;
}

export function PositionsTable({ positions, isLoading }: PositionsTableProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.05]">
                    <div className="h-4 w-36 rounded bg-white/[0.06] animate-pulse" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                    {[0, 1].map((i) => (
                        <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (positions.length === 0) {
        return (
            <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.05]">
                    <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">Active Positions</h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
                    <p className="text-[16px] text-[var(--veyla-text-muted)]">No active positions yet.</p>
                    <Link href="/app/vault" className="text-[15px] text-[var(--veyla-purple-soft)] hover:text-white transition-colors duration-150 underline underline-offset-2">
                        Deposit to get started →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">Active Positions</h2>
                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[1px] text-[var(--veyla-text-dim)]">
                    {positions.length} ACTIVE
                </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/[0.04]">
                            {["Asset", "Deployed to", "Deposited", "APY", "Earned", ""].map((col) => (
                                <th
                                    key={col}
                                    className="px-5 py-3 text-[13px] font-semibold text-[var(--veyla-text-dim)] tracking-[0.5px] uppercase whitespace-nowrap"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((pos, i) => (
                            <tr
                                key={i}
                                className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors duration-100 group"
                            >
                                {/* Asset */}
                                <td className="px-5 py-4">
                                    {ASSET_ICONS[pos.asset] ? (
                                        <div className="flex items-center gap-2">
                                            <div className={`relative w-5 h-5 rounded-full overflow-hidden shrink-0 ${ASSET_ICONS[pos.asset].whiteBg ? 'bg-white' : ''}`}>
                                                <Image
                                                    src={ASSET_ICONS[pos.asset].url}
                                                    alt={pos.asset}
                                                    fill
                                                    className={ASSET_ICONS[pos.asset].whiteBg ? 'object-contain p-[2px]' : 'object-cover'}
                                                />
                                            </div>
                                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[0.5px] text-[var(--veyla-text-main)]">
                                                {pos.asset}
                                            </span>
                                        </div>
                                    ) : (
                                        <Badge label={pos.asset} colorClass="bg-white/[0.05] text-white border-white/[0.1]" />
                                    )}
                                </td>

                                {/* Chain */}
                                <td className="px-5 py-4">
                                    {CHAIN_ICONS[pos.deployedTo] ? (
                                        <div className="flex items-center gap-2">
                                            <div className={`relative w-5 h-5 rounded-md overflow-hidden shrink-0 ${CHAIN_ICONS[pos.deployedTo].whiteBg ? 'bg-white border border-white/20' : ''}`}>
                                                <Image
                                                    src={CHAIN_ICONS[pos.deployedTo].url}
                                                    alt={pos.deployedTo}
                                                    fill
                                                    className={CHAIN_ICONS[pos.deployedTo].whiteBg ? 'object-contain p-1' : 'object-cover'}
                                                />
                                            </div>
                                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[0.5px] text-[var(--veyla-text-main)]">
                                                {pos.deployedTo}
                                            </span>
                                        </div>
                                    ) : (
                                        <Badge label={pos.deployedTo} colorClass="bg-white/[0.05] text-white border-white/[0.1]" />
                                    )}
                                </td>

                                {/* Deposited */}
                                <td className="px-5 py-4 text-[16px] font-medium text-[var(--veyla-text-main)] whitespace-nowrap">
                                    {formatAmount(pos.depositedAmount, pos.asset)}{" "}
                                    <span className="text-[13px] text-[var(--veyla-text-dim)]">{pos.asset}</span>
                                </td>

                                {/* APY */}
                                <td className="px-5 py-4">
                                    <span className="text-[16px] font-semibold text-[var(--veyla-cyan)]">
                                        {pos.currentApy.toFixed(1)}%
                                    </span>
                                </td>

                                {/* Earned */}
                                <td className="px-5 py-4">
                                    <span className="text-[16px] font-semibold text-[#4ade80]">
                                        +{formatAmount(pos.earnedAmount, pos.asset)}{" "}
                                        <span className="text-[13px] font-medium text-[var(--veyla-text-dim)]">{pos.asset}</span>
                                    </span>
                                </td>

                                {/* Withdraw link */}
                                <td className="px-5 py-4">
                                    <Link
                                        href="/app/vault"
                                        className="flex items-center gap-1 text-[14px] text-[var(--veyla-text-dim)] hover:text-white transition-colors duration-150 opacity-0 group-hover:opacity-100"
                                    >
                                        Withdraw
                                        <ArrowUpRight size={11} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
