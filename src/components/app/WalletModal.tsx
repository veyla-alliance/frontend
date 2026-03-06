"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useConnect } from "wagmi";
import { injected, coinbaseWallet } from "wagmi/connectors";
import { X, ChevronRight, Loader2, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

type WalletId = "metamask" | "rabby" | "coinbase";

interface WalletDef {
    id: WalletId;
    name: string;
    description: string;
    icon: React.ReactNode;
    installUrl: string;
    getConnector: () => ReturnType<typeof injected> | ReturnType<typeof coinbaseWallet>;
    detect: () => boolean;
}

// ── Wallet definitions ────────────────────────────────────────────────────────

const WALLETS: WalletDef[] = [
    {
        id: "metamask",
        name: "MetaMask",
        description: "Most popular browser extension",
        icon: (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/[0.08]">
                <Image src="/metamask.jpg" alt="MetaMask" fill className="object-cover" />
            </div>
        ),
        installUrl: "https://metamask.io/download",
        getConnector: () => injected(),
        detect: () => {
            if (typeof window === "undefined") return false;
            const eth = (window as any).ethereum;
            const providers: any[] = eth?.providers ?? (eth ? [eth] : []);
            return providers.some((p) => p.isMetaMask && !p.isRabby);
        },
    },
    {
        id: "rabby",
        name: "Rabby",
        description: "Built-in contract risk scanner",
        icon: (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/[0.08]">
                <Image src="/rabby.jpg" alt="Rabby" fill className="object-cover" />
            </div>
        ),
        installUrl: "https://rabby.io",
        getConnector: () => injected(),
        detect: () => {
            if (typeof window === "undefined") return false;
            const eth = (window as any).ethereum;
            const providers: any[] = eth?.providers ?? (eth ? [eth] : []);
            return providers.some((p) => p.isRabby);
        },
    },
    {
        id: "coinbase",
        name: "Coinbase Wallet",
        description: "Standalone wallet by Coinbase",
        icon: (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/[0.08] bg-white">
                <Image src="/coinbase.png" alt="Coinbase Wallet" fill className="object-contain p-[2px]" />
            </div>
        ),
        installUrl: "https://www.coinbase.com/wallet",
        getConnector: () => coinbaseWallet({ appName: "Veyla" }),
        detect: () => {
            if (typeof window === "undefined") return false;
            const eth = (window as any).ethereum;
            const providers: any[] = eth?.providers ?? (eth ? [eth] : []);
            return (
                providers.some((p) => p.isCoinbaseWallet) ||
                !!(window as any).coinbaseWalletExtension
            );
        },
    },
];

// ── Modal ─────────────────────────────────────────────────────────────────────

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
    const { connect, isPending } = useConnect();
    const [connectingId, setConnectingId] = useState<WalletId | null>(null);
    const [detected, setDetected] = useState<WalletDef[]>([]);

    // Detect installed wallets (client-side only)
    useEffect(() => {
        if (!isOpen) return;
        setDetected(WALLETS.filter((w) => w.detect()));
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    function handleConnect(wallet: WalletDef) {
        setConnectingId(wallet.id);
        connect(
            { connector: wallet.getConnector() },
            {
                onSuccess: () => {
                    toast.success(`${wallet.name} connected`);
                    setConnectingId(null);
                    onClose();
                },
                onError: (err) => {
                    toast.error(err.message ?? "Connection failed");
                    setConnectingId(null);
                },
            }
        );
    }

    const noneDetected = detected.length === 0;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            className="pointer-events-auto w-full max-w-[400px] rounded-2xl bg-[#0a0a12] border border-white/[0.08] shadow-[0_0_80px_rgba(123,57,252,0.1),0_32px_64px_rgba(0,0,0,0.6)] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top accent line */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(123,57,252,0.6)] to-transparent" />

                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-[17px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.2px]">
                                            Connect Wallet
                                        </h2>
                                        <p className="text-[12px] text-[var(--veyla-text-dim)] mt-0.5">
                                            {noneDetected
                                                ? "No wallet detected in this browser"
                                                : "Detected wallets in your browser"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--veyla-text-dim)] hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                                    >
                                        <X size={15} />
                                    </button>
                                </div>

                                {/* Wallet list — detected */}
                                {!noneDetected && (
                                    <div className="flex flex-col gap-2">
                                        {detected.map((wallet) => {
                                            const isConnecting =
                                                connectingId === wallet.id && isPending;
                                            return (
                                                <button
                                                    key={wallet.id}
                                                    onClick={() => handleConnect(wallet)}
                                                    disabled={isPending}
                                                    className={cn(
                                                        "flex items-center gap-4 w-full px-4 py-3.5 rounded-xl border text-left transition-all duration-150 group",
                                                        "bg-white/[0.02] border-white/[0.06]",
                                                        "hover:bg-[rgba(123,57,252,0.06)] hover:border-[rgba(123,57,252,0.2)] hover:-translate-y-px",
                                                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                                                    )}
                                                >
                                                    {wallet.icon}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[14px] font-semibold text-[var(--veyla-text-main)] group-hover:text-white transition-colors duration-150">
                                                            {wallet.name}
                                                        </div>
                                                        <div className="text-[12px] text-[var(--veyla-text-dim)] mt-0.5">
                                                            {wallet.description}
                                                        </div>
                                                    </div>
                                                    {isConnecting ? (
                                                        <Loader2
                                                            size={15}
                                                            className="shrink-0 text-[var(--veyla-purple-soft)] animate-spin"
                                                        />
                                                    ) : (
                                                        <ChevronRight
                                                            size={15}
                                                            className="shrink-0 text-[var(--veyla-text-dim)] group-hover:text-[var(--veyla-purple-soft)] transition-colors duration-150"
                                                        />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* No wallet state */}
                                {noneDetected && (
                                    <div className="flex flex-col items-center gap-4 py-6 text-center">
                                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] text-[var(--veyla-text-dim)]">
                                                EVM
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-[var(--veyla-text-muted)] max-w-[240px] leading-[1.6]">
                                            Install a browser wallet extension to connect to Veyla.
                                        </p>
                                        <div className="flex flex-col gap-2 w-full">
                                            {WALLETS.slice(0, 2).map((w) => (
                                                <a
                                                    key={w.id}
                                                    href={w.installUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-150 group"
                                                >
                                                    {w.icon}
                                                    <span className="flex-1 text-[13px] font-medium text-[var(--veyla-text-muted)] group-hover:text-white transition-colors duration-150">
                                                        Install {w.name}
                                                    </span>
                                                    <ExternalLink size={12} className="text-[var(--veyla-text-dim)]" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                                    <p className="text-[11px] text-[var(--veyla-text-dim)]">
                                        New to Web3?
                                    </p>
                                    <a
                                        href="https://ethereum.org/en/wallets/find-wallet"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-[11px] text-[var(--veyla-text-muted)] hover:text-[var(--veyla-purple-soft)] transition-colors duration-150"
                                    >
                                        Learn about wallets
                                        <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
