"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState } from "react";
import { Loader2, LogOut, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

function truncateAddress(address: string) {
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function WalletButton({ className }: { className?: string }) {
    const { address, isConnected } = useAccount();
    const { connect, isPending } = useConnect();
    const { disconnect } = useDisconnect();
    const [showMenu, setShowMenu] = useState(false);

    if (isPending) {
        return (
            <button
                disabled
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(123,57,252,0.15)] border border-[rgba(123,57,252,0.2)] text-[var(--veyla-text-muted)] text-[14px] font-medium cursor-not-allowed",
                    className
                )}
            >
                <Loader2 size={14} className="animate-spin" />
                Connecting…
            </button>
        );
    }

    if (isConnected && address) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowMenu((v) => !v)}
                    className={cn(
                        "flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[var(--veyla-text-main)] text-[14px] font-medium transition-all duration-200 hover:bg-white/[0.07] hover:border-white/[0.14]",
                        className
                    )}
                >
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] shrink-0" />
                    {truncateAddress(address)}
                </button>

                {showMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowMenu(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 z-50 bg-[#0d0d14] border border-white/[0.08] rounded-xl p-1 min-w-[160px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                            <button
                                onClick={() => { disconnect(); setShowMenu(false); }}
                                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] text-[var(--veyla-text-muted)] hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
                            >
                                <LogOut size={13} />
                                Disconnect
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <button
            onClick={() => connect({ connector: injected() })}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] text-white text-[14px] font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(123,57,252,0.3)] hover:-translate-y-px active:translate-y-0",
                className
            )}
        >
            <Wallet size={14} />
            Connect Wallet
        </button>
    );
}
