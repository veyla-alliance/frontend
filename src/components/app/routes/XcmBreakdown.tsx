"use client";

import { env } from "@/lib/env";
import { ExternalLink, ChevronRight } from "lucide-react";

const XCM_PRECOMPILE = "0x00000000000000000000000000000000000a0000";
const USDT_PRECOMPILE = "0x000007c000000000000000000000000001200000";

const STEPS = [
    {
        num: "01",
        label: "SOLIDITY",
        title: "VeylaVault.sol",
        subtitle: "PolkaVM Smart Contract",
        detail: "routeAssets(token, xcmMessage)",
        color: "#7b39fc",
    },
    {
        num: "02",
        label: "PRECOMPILE",
        title: "IXcm",
        subtitle: "0x...000a0000",
        detail: "execute(message, weight)",
        color: "#a06dfa",
    },
    {
        num: "03",
        label: "RUNTIME",
        title: "XCM Executor",
        subtitle: "Polkadot Native",
        detail: "WithdrawAsset → BuyExecution → DepositAsset",
        color: "#00d4ff",
    },
    {
        num: "04",
        label: "PARACHAIN",
        title: "Hydration",
        subtitle: "Destination Chain",
        detail: "Assets deposited into Omnipool",
        color: "#4ade80",
    },
] as const;

const codeSnippet = `// VeylaVault.sol — XCM routing via native precompile
function routeAssets(
    address token,
    bytes calldata xcmMessage
) external onlyOwner {
    // Estimate weight for XCM execution
    IXcm.Weight memory weight =
        IXcm(XCM_PRECOMPILE).weighMessage(xcmMessage);

    // Execute via Polkadot Hub's native XCM precompile
    IXcm(XCM_PRECOMPILE).execute(xcmMessage, weight);

    lastRoutedAt = block.timestamp;
    emit RoutedLocally(token, _tvl[token]);
}

function sendCrossChain(
    address token,
    bytes calldata destination,
    bytes calldata xcmMessage
) external onlyOwner {
    // Verify destination is whitelisted
    if (!trustedDestinations[keccak256(destination)])
        revert UntrustedDestination();

    // Send XCM to target parachain
    IXcm(XCM_PRECOMPILE).send(destination, xcmMessage);

    lastRoutedAt = block.timestamp;
    emit RoutedCrossChain(token, destination, _tvl[token]);
}`;

export function XcmBreakdown() {
    const contractUrl = `${env.blockExplorerUrl}/address/${env.vaultAddress}`;

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
                <div>
                    <h2 className="text-[16px] font-semibold text-[var(--veyla-text-main)]">
                        XCM Integration Architecture
                    </h2>
                    <p className="text-[13px] text-[var(--veyla-text-dim)] mt-0.5">
                        How Solidity interacts with Polkadot&apos;s native XCM runtime
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)]">
                    <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] text-[var(--veyla-cyan)] tracking-[1px]">
                        POLKAVM
                    </span>
                </div>
            </div>

            <div className="p-5 space-y-6">
                {/* Flow diagram */}
                <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
                    {STEPS.map((step, i) => (
                        <div key={step.num} className="flex items-stretch flex-1 min-w-0">
                            <div
                                className="flex-1 p-3 rounded-xl border"
                                style={{
                                    background: `${step.color}08`,
                                    borderColor: `${step.color}20`,
                                }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] tracking-[2px] font-bold"
                                        style={{ color: `${step.color}90` }}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                                <div className="text-[14px] font-semibold text-[var(--veyla-text-main)]">
                                    {step.title}
                                </div>
                                <div className="text-[11px] text-[var(--veyla-text-dim)] mt-0.5">
                                    {step.subtitle}
                                </div>
                                <div
                                    className="mt-2 text-[11px] font-mono leading-relaxed break-all"
                                    style={{ color: `${step.color}cc` }}
                                >
                                    {step.detail}
                                </div>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className="hidden sm:flex items-center px-1.5">
                                    <ChevronRight size={14} className="text-white/20" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Key precompile addresses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                            XCM Precompile
                        </span>
                        <div className="mt-1.5 text-[12px] font-mono text-[var(--veyla-purple-soft)] break-all">
                            {XCM_PRECOMPILE}
                        </div>
                        <div className="mt-1 text-[11px] text-[var(--veyla-text-dim)]">
                            Polkadot Hub native — execute() &amp; send()
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)]">
                            USDT Precompile
                        </span>
                        <div className="mt-1.5 text-[12px] font-mono text-[var(--veyla-purple-soft)] break-all">
                            {USDT_PRECOMPILE}
                        </div>
                        <div className="mt-1 text-[11px] text-[var(--veyla-text-dim)]">
                            pallet-assets ERC-20 — Asset ID 1984
                        </div>
                    </div>
                </div>

                {/* Actual contract code */}
                <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.05]">
                        <span className="text-[12px] font-semibold text-[var(--veyla-text-muted)]">
                            VeylaVault.sol — XCM Routing Functions
                        </span>
                        <a
                            href={contractUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[11px] text-[var(--veyla-purple-soft)] hover:underline"
                        >
                            View on Blockscout
                            <ExternalLink size={10} />
                        </a>
                    </div>
                    <pre className="p-4 text-[12px] leading-[1.6] font-mono text-[var(--veyla-text-muted)] overflow-x-auto whitespace-pre">
                        <code>{codeSnippet}</code>
                    </pre>
                </div>

                {/* Why this matters */}
                <div className="p-4 rounded-xl bg-[rgba(123,57,252,0.04)] border border-[rgba(123,57,252,0.12)]">
                    <h3 className="text-[13px] font-semibold text-[var(--veyla-purple-soft)] mb-2">
                        Why this only works on Polkadot
                    </h3>
                    <ul className="space-y-1.5 text-[13px] leading-[1.6] text-[var(--veyla-text-muted)]">
                        <li className="flex gap-2">
                            <span className="text-[var(--veyla-purple-soft)] shrink-0">1.</span>
                            <span><strong className="text-[var(--veyla-text-main)]">XCM is Polkadot-native</strong> — no third-party bridges, relayers, or wrapped tokens. Assets move natively between parachains.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-[var(--veyla-purple-soft)] shrink-0">2.</span>
                            <span><strong className="text-[var(--veyla-text-main)]">Precompile access from Solidity</strong> — PolkaVM exposes Substrate runtime functions as EVM precompiles. Solidity calls Rust XCM natively.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-[var(--veyla-purple-soft)] shrink-0">3.</span>
                            <span><strong className="text-[var(--veyla-text-main)]">Shared security</strong> — all parachains share Polkadot relay chain&apos;s validator set. No independent security assumptions per chain.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-[var(--veyla-purple-soft)] shrink-0">4.</span>
                            <span><strong className="text-[var(--veyla-text-main)]">Native assets</strong> — DOT and USDT exist as pallet-assets on Asset Hub. ERC-20 precompiles give Solidity direct access — no wrapping needed.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
