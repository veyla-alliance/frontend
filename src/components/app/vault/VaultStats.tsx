"use client";

import { useReadContracts, useConnection } from "wagmi";
import { formatUnits } from "viem";
import { vaultAbi } from "@/lib/abi/vault";
import { env } from "@/lib/env";
import { useUserPositions, useVaultConfig } from "@/hooks";

function fmt(value: bigint, decimals: number, maxDecimals = 2): string {
    return Number(formatUnits(value, decimals)).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: maxDecimals,
    });
}

export function VaultStats() {
    const { address } = useConnection();
    const { positions } = useUserPositions();
    const { protocolFeeBps, rebalanceInterval } = useVaultConfig();

    const { data, isLoading } = useReadContracts({
        contracts: [
            { address: env.vaultAddress, abi: vaultAbi, functionName: "tvlOf", args: [env.dotTokenAddress] },
            { address: env.vaultAddress, abi: vaultAbi, functionName: "tvlOf", args: [env.usdtTokenAddress] },
        ],
        query: { staleTime: 60_000, refetchInterval: 60_000 },
    });

    const dotTvl  = data?.[0]?.result as bigint | undefined;
    const usdtTvl = data?.[1]?.result as bigint | undefined;

    // Protocol TVL: "X DOT + Y USDT" (no price feed yet)
    let tvlDisplay = "…";
    if (!isLoading) {
        const parts: string[] = [];
        if (dotTvl  && dotTvl  > 0n) parts.push(`${fmt(dotTvl,  18)} DOT`);
        if (usdtTvl && usdtTvl > 0n) parts.push(`${fmt(usdtTvl, 6)} USDT`);
        tvlDisplay = parts.length > 0 ? parts.join(" + ") : "0";
    }

    // Your Share: per-asset percentage
    let shareDisplay = "—";
    if (!isLoading && address && positions.length > 0) {
        const parts: string[] = [];

        const dotPos  = positions.find(p => p.asset === "DOT");
        const usdtPos = positions.find(p => p.asset === "USDT");

        if (dotPos && dotTvl && dotTvl > 0n) {
            const pct = (Number(dotPos.depositedAmount) / Number(dotTvl)) * 100;
            if (pct > 0) parts.push(`${pct.toFixed(1)}% DOT`);
        }
        if (usdtPos && usdtTvl && usdtTvl > 0n) {
            const pct = (Number(usdtPos.depositedAmount) / Number(usdtTvl)) * 100;
            if (pct > 0) parts.push(`${pct.toFixed(1)}% USDT`);
        }

        shareDisplay = parts.length > 0 ? parts.join(" · ") : "0%";
    }

    const feeDisplay = protocolFeeBps !== undefined
        ? `${(Number(protocolFeeBps) / 100).toFixed(1)}%`
        : "0.5%";

    const rebalanceDisplay = rebalanceInterval !== undefined
        ? `~${Math.round(Number(rebalanceInterval) / 3600)}h`
        : "~4h";

    const stats = [
        { label: "Protocol TVL",  value: tvlDisplay,       sub: "Total deposited in vault"  },
        { label: "Your Share",    value: shareDisplay,      sub: "Of total per-asset TVL"    },
        { label: "Protocol Fee",  value: feeDisplay,        sub: "Of yield earned"           },
        { label: "Avg Rebalance", value: rebalanceDisplay,  sub: "Routing frequency"         },
    ];

    return (
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="flex flex-col gap-1.5 px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                >
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                        {stat.label}
                    </span>
                    <span className="text-[20px] font-bold text-[var(--veyla-text-main)] tracking-[-0.3px] break-all leading-snug">
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
