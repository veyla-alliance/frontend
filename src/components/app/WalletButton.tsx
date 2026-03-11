"use client";

import { useConnection, useChainId } from "wagmi";
import { disconnect, switchChain } from "@wagmi/core";
import { useState } from "react";
import { LogOut, Wallet, AlertTriangle, HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WalletModal } from "./WalletModal";
import { wagmiConfig } from "@/lib/wagmi";
import { env } from "@/lib/env";

// Chain params for wallet_addEthereumChain.
// Calling this explicitly ensures new users ALWAYS get the correct
// nativeCurrency (PAS symbol, 18 decimals) instead of MetaMask's "ETH" default.
const PASSET_HUB_CHAIN_PARAMS = {
    chainId: `0x${env.chainId.toString(16)}` as `0x${string}`,
    chainName: "Passet Hub Testnet",
    nativeCurrency: { name: "Paseo", symbol: "PAS", decimals: 18 },
    rpcUrls: [env.rpcUrl],
    blockExplorerUrls: [env.blockExplorerUrl],
};

function truncateAddress(address: string) {
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function WalletButton({ className }: { className?: string }) {
    const { address, isConnected } = useConnection();
    const chainId = useChainId();
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const [showNetworkHelp, setShowNetworkHelp] = useState(false);

    async function handleSwitchChain() {
        setIsSwitching(true);
        try {
            // Step 1: Explicitly push chain params via wallet_addEthereumChain.
            //
            // • New users (never added the network): This registers it with the correct
            //   nativeCurrency { symbol: "PAS", decimals: 18 } from the start.
            //   MetaMask will show "PAS" (not "ETH") in all transaction prompts.
            //
            // • Existing users (chain already in MetaMask): MetaMask will update
            //   updatable fields (RPC URL, block explorer). Note: nativeCurrency cannot
            //   be changed by MetaMask's security policy once a chain is saved — those
            //   users need to remove & re-add the network manually.
            if (typeof window !== "undefined" && (window as any).ethereum) {
                try {
                    await (window as any).ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [PASSET_HUB_CHAIN_PARAMS],
                    });
                } catch {
                    // User dismissed the prompt, or wallet doesn't support addEthereumChain.
                    // Fall through — switchChain below will still attempt to activate it.
                }
            }

            // Step 2: Activate the chain (no-op if Step 1 already switched to it).
            await switchChain(wagmiConfig, { chainId: env.chainId });
        } finally {
            setIsSwitching(false);
        }
    }

    // ── Wrong network ─────────────────────────────────────────────────────────
    if (isConnected && chainId !== env.chainId) {
        return (
            <div className="relative flex flex-col items-end gap-1.5">
                <button
                    onClick={handleSwitchChain}
                    disabled={isSwitching}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-[#f87171] text-[16px] font-semibold transition-all duration-200 hover:bg-[rgba(239,68,68,0.15)] disabled:opacity-60",
                        className
                    )}
                >
                    <AlertTriangle size={14} />
                    {isSwitching ? "Switching…" : "Switch Network"}
                </button>

                {/* Help link for users whose MetaMask shows "ETH" instead of "PAS" */}
                <button
                    onClick={() => setShowNetworkHelp((v) => !v)}
                    className="flex items-center gap-1 text-[12px] text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-muted)] transition-colors duration-150"
                >
                    <HelpCircle size={11} />
                    MetaMask shows ETH instead of PAS?
                </button>

                {showNetworkHelp && (
                    <div className="absolute top-full mt-2 right-0 z-[200] w-[300px] rounded-xl bg-[#0d0d16] border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-4">
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-[14px] font-semibold text-[var(--veyla-text-main)]">
                                Fix Network Currency
                            </span>
                            <button
                                onClick={() => setShowNetworkHelp(false)}
                                className="text-[var(--veyla-text-dim)] hover:text-white transition-colors mt-0.5"
                            >
                                <X size={13} />
                            </button>
                        </div>
                        <p className="text-[13px] text-[var(--veyla-text-dim)] leading-[1.65] mb-3">
                            MetaMask can&apos;t update the currency symbol of a network
                            already saved with a different symbol. To fix, remove the
                            current Passet Hub entry, then click{" "}
                            <strong className="text-[var(--veyla-text-muted)]">Switch Network</strong>{" "}
                            to re-add it with the correct{" "}
                            <strong className="text-[var(--veyla-purple-soft)]">PAS</strong> symbol.
                        </p>
                        <ol className="text-[12px] text-[var(--veyla-text-dim)] leading-[1.9] list-decimal list-inside">
                            <li>MetaMask → Settings → Networks</li>
                            <li>Find & delete <span className="text-[var(--veyla-text-muted)]">Passet Hub</span></li>
                            <li>Click <span className="text-[var(--veyla-text-muted)]">Switch Network</span> above</li>
                        </ol>
                    </div>
                )}
            </div>
        );
    }

    // ── Connected ─────────────────────────────────────────────────────────────
    if (isConnected && address) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowMenu((v) => !v)}
                    className={cn(
                        "flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[var(--veyla-text-main)] text-[16px] font-medium transition-all duration-200 hover:bg-white/[0.07] hover:border-white/[0.14]",
                        className
                    )}
                >
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] shrink-0" />
                    {truncateAddress(address)}
                </button>

                {showMenu && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                        <div className="absolute right-0 top-full mt-2 z-50 bg-[#0d0d14] border border-white/[0.08] rounded-xl p-1 min-w-[160px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                            <button
                                onClick={() => { void disconnect(wagmiConfig); setShowMenu(false); }}
                                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[15px] text-[var(--veyla-text-muted)] hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
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

    // ── Not connected ─────────────────────────────────────────────────────────
    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--veyla-purple)] to-[#5b1fd6] text-white text-[16px] font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(123,57,252,0.3)] hover:-translate-y-px active:translate-y-0",
                    className
                )}
            >
                <Wallet size={14} />
                Connect Wallet
            </button>

            <WalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}
