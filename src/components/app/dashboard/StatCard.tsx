"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string;
    sub?: string;
    accent?: "default" | "cyan" | "green";
}

const accentColor = {
    default: "text-[var(--veyla-text-main)]",
    cyan: "text-[var(--veyla-cyan)]",
    green: "text-[#4ade80]",
} as const;

export function StatCard({ label, value, sub, accent = "default" }: StatCardProps) {
    return (
        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-200">
            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] font-medium tracking-[2px] uppercase text-[var(--veyla-text-dim)]">
                {label}
            </span>
            <span className={cn("text-[28px] font-bold tracking-[-0.5px] leading-none", accentColor[accent])}>
                {value}
            </span>
            {sub && (
                <span className="text-[13px] text-[var(--veyla-text-dim)]">
                    {sub}
                </span>
            )}
        </div>
    );
}
