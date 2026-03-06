"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Position {
    asset: string;
    chain: string;
    deposited: number;
    apy: number;
    earned: number;
}

const MOCK_POSITIONS: Position[] = [
    { asset: "DOT", chain: "Hydration", deposited: 1000, apy: 14.2, earned: 12.4 },
    { asset: "USDT", chain: "Moonbeam", deposited: 500, apy: 9.8, earned: 3.1 },
];

const ASSET_COLORS: Record<string, string> = {
    DOT: "bg-[rgba(232,65,196,0.12)] text-[#e841c4] border-[rgba(232,65,196,0.2)]",
    USDT: "bg-[rgba(38,161,123,0.12)] text-[#26a17b] border-[rgba(38,161,123,0.2)]",
};

const CHAIN_ICONS: Record<string, { url: string; whiteBg?: boolean }> = {
    Hydration: { url: "/hydration.jpg" },
    Moonbeam: { url: "/moonbeam.jpg" },
    Astar: { url: "/astar.jpg", whiteBg: true },
};

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
    return (
        <span className={`[font-family:var(--font-geist-pixel-square),monospace] text-[9px] tracking-[0.5px] px-2 py-1 rounded-md border ${colorClass}`}>
            {label}
        </span>
    );
}

export function PositionsTable() {
    if (MOCK_POSITIONS.length === 0) {
        return (
            <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.05]">
                    <h2 className="text-[14px] font-semibold text-[var(--veyla-text-main)]">Active Positions</h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
                    <p className="text-[14px] text-[var(--veyla-text-muted)]">No active positions yet.</p>
                    <Link href="/app/vault" className="text-[13px] text-[var(--veyla-purple-soft)] hover:text-white transition-colors duration-150 underline underline-offset-2">
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
                <h2 className="text-[14px] font-semibold text-[var(--veyla-text-main)]">Active Positions</h2>
                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] tracking-[1px] text-[var(--veyla-text-dim)]">
                    {MOCK_POSITIONS.length} ACTIVE
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
                                    className="px-5 py-3 text-[11px] font-semibold text-[var(--veyla-text-dim)] tracking-[0.5px] uppercase whitespace-nowrap"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_POSITIONS.map((pos, i) => (
                            <tr
                                key={i}
                                className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors duration-100 group"
                            >
                                <td className="px-5 py-4">
                                    <Badge
                                        label={pos.asset}
                                        colorClass={ASSET_COLORS[pos.asset] ?? "bg-white/[0.05] text-white border-white/[0.1]"}
                                    />
                                </td>
                                <td className="px-5 py-4">
                                    {CHAIN_ICONS[pos.chain] ? (
                                        <div className="flex items-center gap-2">
                                            <div className={`relative w-5 h-5 rounded-md overflow-hidden shrink-0 ${CHAIN_ICONS[pos.chain].whiteBg ? 'bg-white' : ''}`}>
                                                <Image
                                                    src={CHAIN_ICONS[pos.chain].url}
                                                    alt={pos.chain}
                                                    fill
                                                    className={CHAIN_ICONS[pos.chain].whiteBg ? 'object-contain p-0.5' : 'object-cover'}
                                                />
                                            </div>
                                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] tracking-[0.5px] text-[var(--veyla-text-main)]">
                                                {pos.chain}
                                            </span>
                                        </div>
                                    ) : (
                                        <Badge
                                            label={pos.chain}
                                            colorClass="bg-white/[0.05] text-white border-white/[0.1]"
                                        />
                                    )}
                                </td>
                                <td className="px-5 py-4 text-[14px] font-medium text-[var(--veyla-text-main)] whitespace-nowrap">
                                    {pos.deposited.toLocaleString()} {pos.asset}
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-[14px] font-semibold text-[var(--veyla-cyan)]">
                                        {pos.apy}%
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-[14px] font-semibold text-[#4ade80]">
                                        +{pos.earned} {pos.asset}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <Link
                                        href="/app/vault"
                                        className="flex items-center gap-1 text-[12px] text-[var(--veyla-text-dim)] hover:text-white transition-colors duration-150 opacity-0 group-hover:opacity-100"
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
