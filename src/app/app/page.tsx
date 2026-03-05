"use client";

import { useAccount } from "wagmi";
import { ConnectPrompt } from "@/components/app/ConnectPrompt";

export default function DashboardPage() {
    const { isConnected } = useAccount();

    if (!isConnected) {
        return <ConnectPrompt />;
    }

    return (
        <div className="p-6 md:p-8">
            {/* Phase 1B: Dashboard content goes here */}
            <p className="text-[var(--veyla-text-muted)]">Dashboard loading…</p>
        </div>
    );
}
