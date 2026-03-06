"use client";

import { ArrowRight } from "lucide-react";

interface DepositPreviewProps {
    asset: string;
    amount: number;
    usdValue: number;
    apy: number;
    route: string;
}

function PreviewRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
            <span className="text-[13px] text-[var(--veyla-text-dim)]">{label}</span>
            <span className={`text-[14px] font-semibold ${accent ? "text-[var(--veyla-cyan)]" : "text-[var(--veyla-text-main)]"}`}>
                {value}
            </span>
        </div>
    );
}

export function DepositPreview({ asset, amount, usdValue, apy, route }: DepositPreviewProps) {
    const monthlyEarnings = (amount * apy) / 100 / 12;
    const yearlyEarnings = (amount * apy) / 100;
    const hasAmount = amount > 0;

    return (
        <div className="flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.05]">
                <h2 className="text-[14px] font-semibold text-[var(--veyla-text-main)]">Summary</h2>
                <p className="text-[12px] text-[var(--veyla-text-dim)] mt-0.5">Estimated returns</p>
            </div>

            <div className="flex flex-col flex-1 px-5 py-4">
                {/* Amount being deposited */}
                {hasAmount ? (
                    <div className="mb-4 pb-4 border-b border-white/[0.05]">
                        <div className="text-[12px] text-[var(--veyla-text-dim)] mb-1">You&apos;re depositing</div>
                        <div className="text-[24px] font-bold text-[var(--veyla-text-main)] tracking-[-0.5px]">
                            {amount.toLocaleString()} {asset}
                        </div>
                        {usdValue > 0 && (
                            <div className="text-[13px] text-[var(--veyla-text-dim)] mt-0.5">
                                ≈ ${usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mb-4 pb-4 border-b border-white/[0.05]">
                        <div className="text-[12px] text-[var(--veyla-text-dim)] mb-2">You&apos;re depositing</div>
                        <div className="text-[24px] font-bold text-[var(--veyla-text-dim)] tracking-[-0.5px]">
                            — {asset}
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="flex flex-col">
                    <PreviewRow label="Expected APY" value={`${apy}%`} accent />
                    <PreviewRow
                        label="Monthly estimate"
                        value={hasAmount ? `+${monthlyEarnings.toFixed(2)} ${asset}` : "—"}
                    />
                    <PreviewRow
                        label="Yearly estimate"
                        value={hasAmount ? `+${yearlyEarnings.toFixed(2)} ${asset}` : "—"}
                    />
                </div>

                {/* Route */}
                <div className="mt-auto pt-4 border-t border-white/[0.05]">
                    <div className="text-[11px] text-[var(--veyla-text-dim)] mb-2 tracking-[0.5px] uppercase font-semibold">
                        XCM Route
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] px-2 py-1.5 rounded-lg bg-[rgba(123,57,252,0.1)] border border-[rgba(123,57,252,0.2)] text-[var(--veyla-purple-soft)]">
                            HUB
                        </span>
                        <ArrowRight size={12} className="text-[var(--veyla-text-dim)]" />
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] px-2 py-1.5 rounded-lg bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] text-[var(--veyla-cyan)]">
                            {route}
                        </span>
                    </div>
                    <p className="text-[11px] text-[var(--veyla-text-dim)] mt-2">
                        Via Polkadot native XCM · No bridge risk
                    </p>
                </div>
            </div>
        </div>
    );
}
