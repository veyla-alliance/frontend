"use client";

import { useAccount } from "wagmi";
import { ConnectPrompt } from "@/components/app/ConnectPrompt";
import { StatCard } from "@/components/app/dashboard/StatCard";
import { PositionsTable } from "@/components/app/dashboard/PositionsTable";
import { MiniRouteViz } from "@/components/app/dashboard/MiniRouteViz";
import { ActivityFeed } from "@/components/app/dashboard/ActivityFeed";

export default function DashboardPage() {
    const { isConnected, address } = useAccount();

    if (!isConnected) return <ConnectPrompt />;

    return (
        <div className="flex flex-col gap-5 p-6 md:p-8 pb-24 lg:pb-8">
            {/* Greeting */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[22px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.3px]">
                        Dashboard
                    </h1>
                    <p className="text-[15px] text-[var(--veyla-text-dim)] mt-0.5 [font-family:var(--font-geist-pixel-square),monospace] tracking-[0.5px]">
                        {address?.slice(0, 6)}&hellip;{address?.slice(-4)}
                    </p>
                </div>
                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[1.5px] text-[var(--veyla-text-dim)] uppercase">
                    Passet Hub Testnet
                </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                <StatCard label="Total Deposited" value="$1,500.00" sub="1,000 DOT + 500 USDT" />
                <StatCard label="Current APY" value="12.4%" sub="Best route: Hydration" accent="cyan" />
                <StatCard label="Total Earned" value="+$15.50" sub="Since deposit" accent="green" />
            </div>

            {/* Positions + Route viz */}
            <div className="grid grid-cols-[1fr_300px] gap-4 max-lg:grid-cols-1">
                <PositionsTable />
                <MiniRouteViz />
            </div>

            {/* Activity */}
            <ActivityFeed />
        </div>
    );
}
