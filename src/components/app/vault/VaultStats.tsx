"use client";

const STATS = [
    { label: "Protocol TVL", value: "$2.4M", sub: "Across all vaults" },
    { label: "Your Share", value: "0.06%", sub: "Of total TVL" },
    { label: "Protocol Fee", value: "0.5%", sub: "Of yield earned" },
    { label: "Avg Rebalance", value: "~4h", sub: "Routing frequency" },
];

export function VaultStats() {
    return (
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {STATS.map((stat) => (
                <div
                    key={stat.label}
                    className="flex flex-col gap-1.5 px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                >
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                        {stat.label}
                    </span>
                    <span className="text-[22px] font-bold text-[var(--veyla-text-main)] tracking-[-0.3px]">
                        {stat.value}
                    </span>
                    <span className="text-[13px] text-[var(--veyla-text-dim)]">
                        {stat.sub}
                    </span>
                </div>
            ))}
        </div>
    );
}
