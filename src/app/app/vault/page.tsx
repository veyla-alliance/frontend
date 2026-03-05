"use client";

import { useAccount } from "wagmi";
import { ConnectPrompt } from "@/components/app/ConnectPrompt";

export default function VaultPage() {
    const { isConnected } = useAccount();

    if (!isConnected) {
        return <ConnectPrompt />;
    }

    return (
        <div className="p-6 md:p-8">
            {/* Phase 1C: Vault deposit/withdraw goes here */}
            <p className="text-[var(--veyla-text-muted)]">Vault loading…</p>
        </div>
    );
}
