"use client";

import dynamic from "next/dynamic";

const RouteMap = dynamic(
    () => import("@/components/app/routes/RouteMap").then(({ RouteMap }) => ({ default: RouteMap })),
    { loading: () => <div className="h-[260px] rounded-2xl bg-white/[0.02] border border-white/[0.04] animate-pulse" /> }
);

const OnChainConfig = dynamic(
    () => import("@/components/app/routes/OnChainConfig").then(({ OnChainConfig }) => ({ default: OnChainConfig })),
    { loading: () => <div className="h-[200px] rounded-2xl bg-white/[0.02] border border-white/[0.04] animate-pulse" /> }
);

const XcmBreakdown = dynamic(
    () => import("@/components/app/routes/XcmBreakdown").then(({ XcmBreakdown }) => ({ default: XcmBreakdown })),
    { loading: () => <div className="h-[300px] rounded-2xl bg-white/[0.02] border border-white/[0.04] animate-pulse" /> }
);

const ApyTable = dynamic(
    () => import("@/components/app/routes/ApyTable").then(({ ApyTable }) => ({ default: ApyTable })),
    { loading: () => <div className="h-[200px] rounded-2xl bg-white/[0.02] border border-white/[0.04] animate-pulse" /> }
);

export default function RoutesPage() {
    return (
        <div className="flex flex-col gap-5 p-6 md:p-8 pb-24 lg:pb-8">
            <div>
                <h1 className="text-[22px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.3px]">
                    Routes
                </h1>
                <p className="text-[15px] text-[var(--veyla-text-dim)] mt-0.5">
                    Live XCM routing across Polkadot parachains — all data read directly from on-chain contract
                </p>
            </div>

            <RouteMap />
            <OnChainConfig />
            <ApyTable />
            <XcmBreakdown />
        </div>
    );
}
