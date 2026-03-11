"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Asset {
    symbol: string;
    balance: number;
    price: number;
    apy: number;
    route: string;
    color: string;
    icon: string;
    decimals: number;  // on-chain token decimals for parseUnits
}

export const ASSETS: Record<string, Asset> = {
    DOT:  { symbol: "DOT",  balance: 0, price: 7.85, apy: 14.2, route: "Hydration", color: "#e841c4", icon: "/polkadot.jpg", decimals: 18 },
    USDT: { symbol: "USDT", balance: 0, price: 1.00, apy: 9.8,  route: "Moonbeam",  color: "#26a17b", icon: "/usdt.svg",      decimals: 6  },
};

interface AssetSelectorProps {
    value: string;
    onChange: (asset: string) => void;
    /** Real on-chain balances keyed by symbol. Falls back to mock balance if undefined. */
    balances?: Record<string, number>;
    /** Real on-chain APYs keyed by symbol. Falls back to static ASSETS.apy if undefined. */
    apys?: Record<string, number>;
}

export function AssetSelector({ value, onChange, balances, apys }: AssetSelectorProps) {
    const [open, setOpen] = useState(false);
    const selected = ASSETS[value];
    const selectedBalance = balances?.[value] ?? selected.balance;

    return (
        <div className="relative">
            <label className="block text-[13px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)] mb-2">
                Asset
            </label>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.14] transition-colors duration-150"
            >
                {/* Asset badge */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image src={selected.icon} alt={selected.symbol} fill className="object-cover" />
                    </div>
                </div>

                <div className="flex-1 text-left">
                    <div className="text-[16px] font-semibold text-[var(--veyla-text-main)]">
                        {selected.symbol}
                    </div>
                    <div className="text-[13px] text-[var(--veyla-text-dim)]">
                        Balance: {selectedBalance.toLocaleString()} {selected.symbol}
                    </div>
                    {value === "DOT" && (
                        <div className="text-[11px] text-[var(--veyla-text-dim)] mt-0.5">
                            Testnet · MetaMask shows as{" "}
                            <span className="text-[var(--veyla-purple-soft)] font-medium">PAS</span>
                        </div>
                    )}
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
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                        <Image src={asset.icon} alt={asset.symbol} fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-[15px] font-semibold text-[var(--veyla-text-muted)] group-hover:text-white transition-colors duration-100">
                                        {asset.symbol}
                                    </div>
                                    <div className="text-[13px] text-[var(--veyla-text-dim)]">
                                        {(balances?.[asset.symbol] ?? asset.balance).toLocaleString()} available · {(apys?.[asset.symbol] ?? asset.apy).toFixed(1)}% APY
                                    </div>
                                    {asset.symbol === "DOT" && (
                                        <div className="text-[11px] text-[var(--veyla-text-dim)] mt-0.5">
                                            Testnet · shows as{" "}
                                            <span className="text-[var(--veyla-purple-soft)] font-medium">PAS</span>{" "}
                                            in MetaMask
                                        </div>
                                    )}
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
