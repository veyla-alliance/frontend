"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Asset {
    symbol: string;
    balance: number;
    price: number;
    apy: number;
    route: string;
    color: string;
}

export const ASSETS: Record<string, Asset> = {
    DOT: { symbol: "DOT", balance: 250.5, price: 7.85, apy: 14.2, route: "HydraDX", color: "#e841c4" },
    USDT: { symbol: "USDT", balance: 1000, price: 1.00, apy: 9.8, route: "Moonbeam", color: "#26a17b" },
};

interface AssetSelectorProps {
    value: string;
    onChange: (asset: string) => void;
}

export function AssetSelector({ value, onChange }: AssetSelectorProps) {
    const [open, setOpen] = useState(false);
    const selected = ASSETS[value];

    return (
        <div className="relative">
            <label className="block text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)] mb-2">
                Asset
            </label>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.14] transition-colors duration-150"
            >
                {/* Asset badge */}
                <span
                    className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] px-2 py-1 rounded-md border font-medium"
                    style={{
                        color: selected.color,
                        background: `${selected.color}18`,
                        borderColor: `${selected.color}40`,
                    }}
                >
                    {selected.symbol}
                </span>

                <div className="flex-1 text-left">
                    <div className="text-[14px] font-semibold text-[var(--veyla-text-main)]">
                        {selected.symbol}
                    </div>
                    <div className="text-[11px] text-[var(--veyla-text-dim)]">
                        Balance: {selected.balance.toLocaleString()} {selected.symbol}
                    </div>
                </div>

                <ChevronDown
                    size={15}
                    className={cn(
                        "text-[var(--veyla-text-dim)] transition-transform duration-150",
                        open && "rotate-180"
                    )}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-1.5 z-20 bg-[#0d0d16] border border-white/[0.08] rounded-xl p-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                        {Object.values(ASSETS).map((asset) => (
                            <button
                                key={asset.symbol}
                                type="button"
                                onClick={() => { onChange(asset.symbol); setOpen(false); }}
                                className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-white/[0.04] transition-colors duration-100 group"
                            >
                                <span
                                    className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] px-2 py-1 rounded-md border font-medium"
                                    style={{
                                        color: asset.color,
                                        background: `${asset.color}18`,
                                        borderColor: `${asset.color}40`,
                                    }}
                                >
                                    {asset.symbol}
                                </span>
                                <div className="flex-1 text-left">
                                    <div className="text-[13px] font-semibold text-[var(--veyla-text-muted)] group-hover:text-white transition-colors duration-100">
                                        {asset.symbol}
                                    </div>
                                    <div className="text-[11px] text-[var(--veyla-text-dim)]">
                                        {asset.balance.toLocaleString()} available · {asset.apy}% APY
                                    </div>
                                </div>
                                {value === asset.symbol && (
                                    <Check size={13} className="text-[var(--veyla-purple-soft)]" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
