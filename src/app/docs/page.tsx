"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ExternalLink, Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Nav sections ──────────────────────────────────────────────────────────────
const SECTIONS = [
    { id: "overview",      label: "Overview" },
    { id: "architecture",  label: "Architecture" },
    { id: "xcm",           label: "XCM Integration" },
    { id: "contract",      label: "Smart Contract" },
    { id: "frontend",      label: "Frontend" },
    { id: "quickstart",    label: "Quick Start" },
    { id: "api",           label: "Contract API" },
    { id: "roadmap",       label: "Roadmap" },
    { id: "faq",           label: "FAQ" },
] as const;

// ── Small reusable atoms ──────────────────────────────────────────────────────
function SectionAnchor({ id }: { id: string }) {
    return <div id={id} className="scroll-mt-24" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-[28px] md:text-[34px] font-bold text-[var(--veyla-text-main)] tracking-[-0.5px] mb-4">
            {children}
        </h2>
    );
}

function SectionLead({ children }: { children: React.ReactNode }) {
    return <p className="text-[17px] text-[var(--veyla-text-muted)] leading-[1.75] mb-8">{children}</p>;
}

function Divider() {
    return <hr className="border-0 border-t border-white/[0.06] my-12" />;
}

function InlineCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="[font-family:var(--font-geist-pixel-square),monospace] text-[12px] px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[var(--veyla-cyan)]">
            {children}
        </code>
    );
}

function CodeBlock({ code, lang = "" }: { code: string; lang?: string }) {
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <div className="mt-4 mb-6 rounded-xl overflow-hidden border border-white/[0.08]">
            <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between gap-2">
                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[1px] text-[var(--veyla-text-dim)] uppercase">
                    {lang || "code"}
                </span>
                <button
                    onClick={handleCopy}
                    className={cn(
                        "[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[0.5px] px-2.5 py-1 rounded-md border transition-all duration-200 select-none",
                        copied
                            ? "bg-[rgba(74,222,128,0.1)] border-[rgba(74,222,128,0.3)] text-[#4ade80]"
                            : "bg-white/[0.03] border-white/[0.08] text-[var(--veyla-text-dim)] hover:text-white hover:border-white/[0.18] hover:bg-white/[0.06]"
                    )}
                >
                    {copied ? "✓ Copied!" : "Copy"}
                </button>
            </div>
            <pre className="bg-[#07070e] px-5 py-4 overflow-x-auto text-[13px] leading-[1.8] text-[var(--veyla-text-muted)] [font-family:var(--font-geist-pixel-square),monospace] whitespace-pre">
                {code.trim()}
            </pre>
        </div>
    );
}

function InfoBox({ title, children, color = "purple" }: { title: string; children: React.ReactNode; color?: "purple" | "cyan" | "green" | "yellow" }) {
    const styles = {
        purple: "bg-[rgba(123,57,252,0.06)] border-[rgba(123,57,252,0.2)] text-[var(--veyla-purple-soft)]",
        cyan:   "bg-[rgba(0,212,255,0.05)] border-[rgba(0,212,255,0.2)] text-[var(--veyla-cyan)]",
        green:  "bg-[rgba(74,222,128,0.05)] border-[rgba(74,222,128,0.2)] text-[#4ade80]",
        yellow: "bg-[rgba(250,204,21,0.05)] border-[rgba(250,204,21,0.2)] text-[#facc15]",
    };
    return (
        <div className={`rounded-xl border p-5 mb-6 ${styles[color]}`}>
            <div className="text-[13px] font-semibold tracking-[1px] uppercase mb-2">{title}</div>
            <div className="text-[15px] text-[var(--veyla-text-muted)] leading-[1.7]">{children}</div>
        </div>
    );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-8">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                        {headers.map((h) => (
                            <th key={h} className="px-5 py-3 text-[13px] font-semibold text-[var(--veyla-text-dim)] tracking-[0.5px] uppercase whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                    {rows.map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors duration-100">
                            {row.map((cell, j) => (
                                <td key={j} className="px-5 py-3.5 text-[15px] text-[var(--veyla-text-muted)]">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-[rgba(123,57,252,0.15)] border border-[rgba(123,57,252,0.3)] text-[var(--veyla-purple-soft)] text-[14px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {number}
            </div>
            <div>
                <div className="text-[16px] font-semibold text-[var(--veyla-text-main)] mb-1">{title}</div>
                <div className="text-[15px] text-[var(--veyla-text-muted)] leading-[1.7]">{children}</div>
            </div>
        </div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function DocsPage() {
    const [activeSection, setActiveSection] = useState("overview");
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Highlight active section while scrolling
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                }
            },
            { rootMargin: "-20% 0px -70% 0px" }
        );
        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observerRef.current?.observe(el);
        });
        return () => observerRef.current?.disconnect();
    }, []);

    function scrollTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMobileNavOpen(false);
    }

    return (
        <div className="min-h-screen bg-[var(--veyla-dark)] text-[var(--veyla-text-main)]">

            {/* ── Top navbar ── */}
            <header className="sticky top-0 z-50 h-14 flex items-center justify-between px-5 md:px-8 border-b border-white/[0.06] bg-[var(--veyla-dark)]/80 backdrop-blur-md">
                <div className="flex items-center gap-5">
                    <Link href="/" className="flex items-center gap-2 text-[var(--veyla-text-dim)] hover:text-white transition-colors duration-150 text-[14px]">
                        <ArrowLeft size={14} />
                        Back
                    </Link>
                    <div className="w-px h-4 bg-white/[0.08]" />
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-5 h-5">
                            <Image src="/veyla-icon.svg" alt="Veyla" fill />
                        </div>
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[14px] tracking-[3px] text-white/60">VEYLA</span>
                    </Link>
                    <div className="w-px h-4 bg-white/[0.08] hidden md:block" />
                    <span className="hidden md:block text-[14px] text-[var(--veyla-text-dim)]">Documentation</span>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/veyla-alliance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-1.5 text-[13px] text-[var(--veyla-text-dim)] hover:text-white transition-colors duration-150"
                    >
                        GitHub <ExternalLink size={11} />
                    </a>
                    <Link
                        href="/app"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(123,57,252,0.15)] border border-[rgba(123,57,252,0.25)] text-[13px] font-semibold text-[var(--veyla-purple-soft)] hover:bg-[rgba(123,57,252,0.22)] transition-colors duration-150"
                    >
                        Launch App <ChevronRight size={11} />
                    </Link>
                    {/* Mobile nav toggle */}
                    <button
                        onClick={() => setMobileNavOpen((v) => !v)}
                        className="md:hidden w-8 h-8 flex items-center justify-center text-[var(--veyla-text-dim)] hover:text-white"
                    >
                        {mobileNavOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </header>

            {/* Mobile sidebar overlay */}
            {mobileNavOpen && (
                <div className="fixed inset-0 top-14 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setMobileNavOpen(false)} />
                    <nav className="absolute left-0 top-0 bottom-0 w-64 bg-[#07070d] border-r border-white/[0.06] p-4">
                        <SidebarContent activeSection={activeSection} scrollTo={scrollTo} />
                    </nav>
                </div>
            )}

            <div className="max-w-[1200px] mx-auto flex">

                {/* ── Desktop sidebar ── */}
                <aside className="hidden md:block w-[220px] shrink-0">
                    <div className="sticky top-14 pt-8 pb-8 pr-6 h-[calc(100vh-56px)] overflow-y-auto">
                        <SidebarContent activeSection={activeSection} scrollTo={scrollTo} />
                    </div>
                </aside>

                {/* ── Main content ── */}
                <main className="flex-1 min-w-0 px-5 md:px-10 py-10 pb-32">

                    {/* ══ OVERVIEW ═══════════════════════════════════════════════════ */}
                    <SectionAnchor id="overview" />
                    <div className="mb-3 flex items-center gap-2">
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[2px] text-[var(--veyla-purple)] uppercase">Protocol</span>
                    </div>
                    <h1 className="text-[40px] md:text-[52px] font-bold tracking-[-1.5px] leading-[1.1] text-[var(--veyla-text-main)] mb-5">
                        Veyla Docs
                    </h1>
                    <p className="text-[18px] text-[var(--veyla-text-muted)] leading-[1.75] mb-8 max-w-[640px]">
                        Complete technical documentation for Veyla — the automated yield optimization protocol built natively on Polkadot Hub using PVM smart contracts and XCM cross-chain routing.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-10">
                        {[
                            { label: "Passet Hub Testnet", color: "cyan" },
                            { label: "PVM Smart Contracts", color: "purple" },
                            { label: "XCM Precompile", color: "purple" },
                            { label: "Chain ID: 420420417", color: "dim" },
                        ].map(({ label, color }) => (
                            <span
                                key={label}
                                className={cn(
                                    "[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[0.5px] px-3 py-1.5 rounded-full border",
                                    color === "cyan"   && "bg-[rgba(0,212,255,0.08)] border-[rgba(0,212,255,0.2)] text-[var(--veyla-cyan)]",
                                    color === "purple" && "bg-[rgba(123,57,252,0.1)] border-[rgba(123,57,252,0.2)] text-[var(--veyla-purple-soft)]",
                                    color === "dim"    && "bg-white/[0.03] border-white/[0.08] text-[var(--veyla-text-dim)]"
                                )}
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    <InfoBox title="What is Veyla?" color="purple">
                        Veyla is an automated yield optimization protocol on Polkadot Hub. Users deposit DOT or USDT into a single vault.
                        The protocol detects the highest yields across connected parachains, routes liquidity via native XCM, and auto-compounds
                        assets — all on-chain, no bridges, no manual management.
                    </InfoBox>

                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                        {[
                            { title: "Deposit Once", desc: "Deposit DOT or USDT into the Veyla vault on Polkadot Hub. That's it." },
                            { title: "Auto-Route", desc: "Smart contract scans APYs and routes via XCM precompile to the best parachain." },
                            { title: "Earn & Compound", desc: "Yield accrues automatically. Withdraw anytime, principal + earned." },
                        ].map((c) => (
                            <div key={c.title} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                <div className="text-[15px] font-semibold text-[var(--veyla-text-main)] mb-2">{c.title}</div>
                                <div className="text-[14px] text-[var(--veyla-text-dim)] leading-[1.65]">{c.desc}</div>
                            </div>
                        ))}
                    </div>

                    <Divider />

                    {/* ══ ARCHITECTURE ══════════════════════════════════════════════ */}
                    <SectionAnchor id="architecture" />
                    <SectionTitle>Architecture</SectionTitle>
                    <SectionLead>
                        Veyla is built entirely on Polkadot Hub (Passet Hub Testnet). The frontend talks to a single deployed Solidity contract
                        via standard EVM JSON-RPC, while the contract uses Polkadot-native precompiles for cross-chain operations.
                    </SectionLead>

                    <CodeBlock lang="text" code={`
User Wallet (MetaMask / Rabby)
        │
        │  EVM JSON-RPC  (Chain ID: 420420417)
        ▼
┌─────────────────────────────────────────┐
│         Polkadot Hub (Passet Hub)       │
│                                         │
│   ┌──────────────────────────────────┐  │
│   │         VeylaVault.sol           │  │
│   │  ─────────────────────────────   │  │
│   │  deposit(token, amount)          │  │
│   │  withdraw(token, amount)         │  │
│   │  balanceOf / earned / currentApy │  │
│   │  routeAssets() ─► XCM Precompile │  │
│   │  sendCrossChain() ─► XCM Precomp │  │
│   └────────────────┬─────────────────┘  │
│                    │  XCM Precompile    │
│                    │  0x...000a0000     │
└────────────────────┼────────────────────┘
                     │  XCM Message
          ┌──────────┼──────────┐
          ▼          ▼          ▼
     Hydration   Moonbeam    Astar
    (Omnipool)  (Stellaswap) (ArthSwap)
      14.2% APY   9.8% APY   8.1% APY
    `} />

                    <Table
                        headers={["Layer", "Technology", "Purpose"]}
                        rows={[
                            ["Frontend", "Next.js 16 + React 19", "User interface & blockchain interaction"],
                            ["Blockchain SDK", "wagmi v3 + viem v2", "EVM wallet connection & contract calls"],
                            ["State/Cache", "TanStack Query v5", "Data fetching, caching, invalidation"],
                            ["Smart Contract", "Solidity 0.8.28 (PolkaVM)", "Core vault logic + XCM routing"],
                            ["Network", "Polkadot Hub Passet Hub Testnet", "Chain ID: 420420417"],
                            ["XCM Routing", "XCM Precompile 0x...000a0000", "Cross-chain asset movement"],
                            ["USDT", "pallet-assets ERC-20 Precompile", "ERC-20 interface for Asset ID 1984"],
                        ]}
                    />

                    <Divider />

                    {/* ══ XCM INTEGRATION ══════════════════════════════════════════ */}
                    <SectionAnchor id="xcm" />
                    <SectionTitle>XCM Integration</SectionTitle>
                    <SectionLead>
                        XCM (Cross-Consensus Messaging) is Polkadot's native language for cross-chain communication.
                        Veyla uses two XCM precompile functions to route assets between parachains — without any bridge, relayer, or wrapped token.
                    </SectionLead>

                    <InfoBox title="Why XCM matters for Track 2" color="cyan">
                        Polkadot Solidity Hackathon Track 2 specifically rewards projects that use Polkadot-native functionality via precompiles.
                        Veyla calls both <strong>execute()</strong> (local XCM) and <strong>send()</strong> (cross-chain XCM) from within the smart contract,
                        demonstrating deep integration with Polkadot's core messaging primitives.
                    </InfoBox>

                    <CodeBlock lang="solidity" code={`
// XCM Precompile address on Polkadot Hub
address constant XCM_PRECOMPILE = 0x00000000000000000000000000000000000a0000;

interface IXcm {
    struct Weight { uint64 refTime; uint64 proofSize; }

    // Execute an XCM message locally (same chain context)
    function execute(bytes calldata message, Weight calldata weight) external;

    // Send an XCM message to another parachain or chain
    function send(bytes calldata destination, bytes calldata message) external;

    // Estimate execution weight for a given XCM message
    function weighMessage(bytes calldata message) external view returns (Weight memory);
}
    `} />

                    <Table
                        headers={["Function", "Direction", "Used For"]}
                        rows={[
                            [<InlineCode key="ex">execute(message, weight)</InlineCode>, "Local (same chain)", "Execute XCM within Polkadot Hub context — local asset management"],
                            [<InlineCode key="se">send(dest, message)</InlineCode>, "Cross-chain", "Send XCM to Hydration, Moonbeam, Astar, Bifrost for yield deployment"],
                            [<InlineCode key="we">weighMessage(message)</InlineCode>, "Read-only", "Estimate weight before calling execute — prevents out-of-weight errors"],
                        ]}
                    />

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Route Destinations</h3>
                    <Table
                        headers={["Chain", "Protocol", "Asset", "APY", "Status"]}
                        rows={[
                            ["Hydration", "Omnipool", "DOT", "14.2%", <span key="h" className="text-[#4ade80] text-[12px] font-semibold">ACTIVE</span>],
                            ["Moonbeam", "Stellaswap", "USDT", "9.8%", <span key="m" className="text-[var(--veyla-text-dim)] text-[12px]">STANDBY</span>],
                            ["Astar", "ArthSwap", "DOT/USDT", "8.1%", <span key="a" className="text-[var(--veyla-text-dim)] text-[12px]">STANDBY</span>],
                            ["Bifrost", "Bifrost LP", "DOT", "7.4%", <span key="b" className="text-[var(--veyla-text-dim)] text-[12px]">PAUSED</span>],
                        ]}
                    />

                    <Divider />

                    {/* ══ SMART CONTRACT ════════════════════════════════════════════ */}
                    <SectionAnchor id="contract" />
                    <SectionTitle>Smart Contract</SectionTitle>
                    <SectionLead>
                        <InlineCode>VeylaVault.sol</InlineCode> is deployed on Passet Hub Testnet and verified on Blockscout.
                        It handles deposits, withdrawals, yield accounting, and XCM routing — all in one contract.
                    </SectionLead>

                    <Table
                        headers={["Field", "Value"]}
                        rows={[
                            ["Contract", <InlineCode key="c">VeylaVault.sol</InlineCode>],
                            ["Network", "Passet Hub Testnet (Chain ID: 420420417)"],
                            ["Address", <InlineCode key="a">0x741Ec097b0D3dc7544c58C1B7401cb7540D2829b</InlineCode>],
                            ["Compiler", "Solidity 0.8.28 (PolkaVM)"],
                            ["Optimizer", "200 runs"],
                            ["Blockscout", <a key="b" href="https://blockscout-testnet.polkadot.io/address/0x741ec097b0d3dc7544c58c1b7401cb7540d2829b" target="_blank" rel="noopener noreferrer" className="text-[var(--veyla-purple-soft)] flex items-center gap-1 hover:text-white transition-colors">View on Blockscout <ExternalLink size={11} /></a>],
                        ]}
                    />

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Supported Assets</h3>
                    <Table
                        headers={["Asset", "Type", "Address / Sentinel", "Decimals", "Notes"]}
                        rows={[
                            ["DOT", "Native (PAS on testnet)", <InlineCode key="d">address(0)</InlineCode>, "18 (PolkaVM)", "Deposited via msg.value, no ERC-20 precompile needed"],
                            ["USDT", "pallet-assets ERC-20 precompile", <InlineCode key="u">0x000007c0...01200000</InlineCode>, "6", "Asset ID 1984 on Polkadot Hub"],
                        ]}
                    />

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Yield Accounting</h3>
                    <SectionLead>
                        Veyla uses a snapshot-based yield accumulation pattern to ensure accuracy across multiple deposits.
                    </SectionLead>

                    <CodeBlock lang="solidity" code={`
// Yield formula (per-block accrual):
// pending = principal × apyBps × elapsed / (365 days × 10_000)

function earned(address user, address token) external view returns (uint256) {
    return _accruedYield[user][token] + _pendingYield(user, token);
}

// _accrueYield() is called before every deposit/withdraw to snapshot pending yield
// This prevents dilution when new deposits are made mid-period
function _accrueYield(address user, address token) internal {
    _accruedYield[user][token] += _pendingYield(user, token);
    _depositTimestamps[user][token] = block.timestamp;
}
    `} />

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Test Coverage</h3>
                    <InfoBox title="35/35 Tests Passing" color="green">
                        Full unit test suite including 2 fuzz tests. Coverage includes: deposit (DOT + USDT), withdraw, yield accrual,
                        multi-deposit accuracy, XCM routing calls, access control (onlyOwner), pause mechanism, and custom error handling.
                    </InfoBox>

                    <Divider />

                    {/* ══ FRONTEND ══════════════════════════════════════════════════ */}
                    <SectionAnchor id="frontend" />
                    <SectionTitle>Frontend</SectionTitle>
                    <SectionLead>
                        A full-featured React application built with Next.js 16 App Router, deployed on Vercel.
                        All blockchain interactions use wagmi v3 + viem v2 connected to Passet Hub Testnet.
                    </SectionLead>

                    <Table
                        headers={["Page / Route", "Description"]}
                        rows={[
                            [<InlineCode key="l">/</InlineCode>, "Landing page — Navbar, Hero, ProofBar, HowItWorks, WhyVeyla, CTA, Footer"],
                            [<InlineCode key="d">/app</InlineCode>, "Dashboard — stat cards, positions table, route visualization, activity feed"],
                            [<InlineCode key="v">/app/vault</InlineCode>, "Vault — deposit & withdraw with live APY, balance, USD values"],
                            [<InlineCode key="r">/app/routes</InlineCode>, "Routes — animated hub-and-spoke XCM route map + APY comparison table"],
                            [<InlineCode key="h">/app/history</InlineCode>, "History — full on-chain transaction log with filter tabs & Blockscout links"],
                            [<InlineCode key="doc">/docs</InlineCode>, "This page — comprehensive protocol documentation"],
                        ]}
                    />

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Blockchain Hooks</h3>
                    <Table
                        headers={["Hook", "What it does"]}
                        rows={[
                            [<InlineCode key="1">useDeposit()</InlineCode>, "Full deposit lifecycle — approve (USDT only) → deposit → wait confirmation → invalidate cache"],
                            [<InlineCode key="2">useWithdraw()</InlineCode>, "Withdraw lifecycle — write → wait → invalidate"],
                            [<InlineCode key="3">useUserPositions()</InlineCode>, "Single multicall: all user positions (balance, earned, APY) for DOT + USDT"],
                            [<InlineCode key="4">useVaultHistory()</InlineCode>, "Fetch Deposited/Withdrawn events, decode logs, fetch timestamps, localStorage cache"],
                            [<InlineCode key="5">useTokenPrices()</InlineCode>, "CoinGecko DOT + USDT price feed with 60s refetch interval"],
                            [<InlineCode key="6">useTokenApys()</InlineCode>, "Multicall currentApy(DOT) + currentApy(USDT) from contract"],
                            [<InlineCode key="7">useERC20Balance()</InlineCode>, "Read ERC-20 balanceOf for any token + address"],
                        ]}
                    />

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Transaction State Machine</h3>
                    <CodeBlock lang="text" code={`
DOT deposit:
  idle → awaiting-signature → pending → success
                 ▲ (MetaMask: approve sending PAS/DOT native)

USDT deposit:
  idle → awaiting-approval → approving → awaiting-signature → pending → success
              ▲ (approve TX)                  ▲ (deposit TX)

Withdrawal (DOT or USDT):
  idle → awaiting-signature → pending → success
    `} />

                    <Divider />

                    {/* ══ QUICK START ═══════════════════════════════════════════════ */}
                    <SectionAnchor id="quickstart" />
                    <SectionTitle>Quick Start</SectionTitle>
                    <SectionLead>
                        Get Veyla running locally in under 5 minutes. You need Node.js 18+, a browser wallet (MetaMask or Rabby),
                        and testnet PAS tokens from the Paseo faucet.
                    </SectionLead>

                    <Step number={1} title="Clone the repository">
                        <CodeBlock lang="bash" code={`git clone https://github.com/veyla-alliance/veyla\ncd veyla/frontend`} />
                    </Step>

                    <Step number={2} title="Install dependencies">
                        <CodeBlock lang="bash" code={`npm install`} />
                    </Step>

                    <Step number={3} title="Configure environment variables">
                        Create <InlineCode>.env.local</InlineCode> in the <InlineCode>frontend/</InlineCode> folder:
                        <CodeBlock lang="bash" code={`NEXT_PUBLIC_CHAIN_ID=420420417
NEXT_PUBLIC_RPC_URL=https://eth-rpc-testnet.polkadot.io
NEXT_PUBLIC_BLOCK_EXPLORER_URL=https://blockscout-testnet.polkadot.io
NEXT_PUBLIC_VAULT_ADDRESS=0x741Ec097b0D3dc7544c58C1B7401cb7540D2829b
NEXT_PUBLIC_DOT_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_USDT_TOKEN_ADDRESS=0x000007c000000000000000000000000001200000`} />
                    </Step>

                    <Step number={4} title="Start the development server">
                        <CodeBlock lang="bash" code={`npm run dev\n# → http://localhost:3000`} />
                    </Step>

                    <Step number={5} title="Get testnet PAS tokens">
                        Visit the Paseo faucet to get PAS (testnet DOT equivalent):
                        <div className="mt-3">
                            <a
                                href="https://faucet.polkadot.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[var(--veyla-purple-soft)] hover:text-white transition-colors text-[15px]"
                            >
                                faucet.polkadot.io <ExternalLink size={12} />
                            </a>
                        </div>
                    </Step>

                    <Step number={6} title="Connect wallet & switch network">
                        Open <InlineCode>localhost:3000/app</InlineCode>, connect MetaMask or Rabby, then click{" "}
                        <strong>Switch Network</strong>. Veyla will automatically add Passet Hub with the correct PAS nativeCurrency config.
                    </Step>

                    <InfoBox title="Deploying the contract yourself" color="yellow">
                        If you want to deploy your own instance: install Foundry, copy <InlineCode>contract/</InlineCode>,
                        set your <InlineCode>PRIVATE_KEY</InlineCode> in <InlineCode>contract/.env</InlineCode>,
                        then run <InlineCode>forge script script/Deploy.s.sol --rpc-url passet_hub --broadcast --verify</InlineCode>.
                        Update <InlineCode>NEXT_PUBLIC_VAULT_ADDRESS</InlineCode> with your deployed address.
                    </InfoBox>

                    <Divider />

                    {/* ══ CONTRACT API ══════════════════════════════════════════════ */}
                    <SectionAnchor id="api" />
                    <SectionTitle>Contract API Reference</SectionTitle>
                    <SectionLead>Complete function reference for <InlineCode>VeylaVault.sol</InlineCode>.</SectionLead>

                    <h3 className="text-[18px] font-semibold text-[var(--veyla-cyan)] mb-3">Write Functions</h3>
                    <CodeBlock lang="solidity" code={`
// Deposit DOT (native) or USDT into the vault.
// For DOT:  send msg.value, set token = address(0), amount is ignored.
// For USDT: approve vault first, set token = USDT precompile address, amount = wei.
function deposit(address token, uint256 amount) external payable;

// Withdraw deposited principal from the vault.
// Accrued yield is snapshotted before the withdrawal.
function withdraw(address token, uint256 amount) external;

// [Owner only] Execute an XCM message locally via precompile.
function routeAssets(address token, bytes calldata xcmMessage) external;

// [Owner only] Send XCM cross-chain to target parachain.
function sendCrossChain(address token, bytes calldata destination, bytes calldata xcmMessage) external;

// [Owner only] Update APY for an asset (in basis points, e.g. 1420 = 14.20%).
function setApy(address token, uint256 apyBps) external;

// [Owner only] Pause or unpause deposits and withdrawals.
function setPaused(bool _paused) external;

// [Owner only] Transfer contract ownership.
function transferOwnership(address newOwner) external;
    `} />

                    <h3 className="text-[18px] font-semibold text-[var(--veyla-cyan)] mb-3 mt-8">Read Functions</h3>
                    <CodeBlock lang="solidity" code={`
// User's deposited principal for a given token.
function balanceOf(address user, address token) external view returns (uint256);

// User's total earned yield (snapshotted + pending since last deposit).
function earned(address user, address token) external view returns (uint256);

// Current APY for a token, in basis points (divide by 100 for %).
function currentApy(address token) external view returns (uint256);

// Total combined TVL across all assets (raw units).
function tvl() external view returns (uint256);

// TVL for a specific token.
function tvlOf(address token) external view returns (uint256);

// Public state
address public owner;
bool public paused;
    `} />

                    <h3 className="text-[18px] font-semibold text-[var(--veyla-cyan)] mb-3 mt-8">Events</h3>
                    <CodeBlock lang="solidity" code={`
event Deposited(address indexed user, address indexed token, uint256 amount);
event Withdrawn(address indexed user, address indexed token, uint256 amount);
event Routed(address indexed token, address destination, uint256 amount);
event ApyUpdated(address indexed token, uint256 newApyBps);
event Paused(bool isPaused);
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    `} />

                    <h3 className="text-[18px] font-semibold text-[var(--veyla-cyan)] mb-3 mt-8">Custom Errors</h3>
                    <Table
                        headers={["Error", "Triggered when"]}
                        rows={[
                            [<InlineCode key="z">ZeroAmount()</InlineCode>, "Deposit or withdraw with amount = 0"],
                            [<InlineCode key="i">InsufficientBalance()</InlineCode>, "Withdraw more than deposited"],
                            [<InlineCode key="n">NotOwner()</InlineCode>, "Non-owner calls admin function"],
                            [<InlineCode key="t">TransferFailed()</InlineCode>, "Native DOT transfer or ERC-20 transfer returns false"],
                            [<InlineCode key="u">UnsupportedToken()</InlineCode>, "Token address is neither DOT sentinel nor USDT precompile"],
                            [<InlineCode key="c">ContractPaused()</InlineCode>, "Deposit or withdraw while paused = true"],
                            [<InlineCode key="m">MsgValueMismatch()</InlineCode>, "USDT deposit sent with msg.value > 0"],
                        ]}
                    />

                    <Divider />

                    {/* ══ ROADMAP ═══════════════════════════════════════════════════ */}
                    <SectionAnchor id="roadmap" />
                    <SectionTitle>Roadmap</SectionTitle>
                    <SectionLead>
                        Veyla was built in 10 days for the Polkadot Solidity Hackathon 2026. Below is what's live today and what comes next.
                    </SectionLead>

                    <div className="space-y-4 mb-10">
                        {[
                            {
                                phase: "Hackathon MVP",
                                status: "live",
                                items: [
                                    "VeylaVault.sol deployed & verified on Passet Hub Testnet",
                                    "Full frontend: Dashboard, Vault, Routes, History pages",
                                    "DOT (native) + USDT (pallet-assets precompile) deposits & withdrawals",
                                    "XCM precompile integration (execute + send)",
                                    "Automated yield accounting (snapshot pattern)",
                                    "35/35 unit tests passing + 2 fuzz tests",
                                    "Live deployment on Vercel",
                                ]
                            },
                            {
                                phase: "Phase 2 — Automated Rebalancing (Q2 2026)",
                                status: "planned",
                                items: [
                                    "On-chain APY oracle that reads from Hydration + Moonbeam",
                                    "Keeper bot (off-chain) triggers routeAssets when APY delta > threshold",
                                    "Real routing to Hydration Omnipool via XCM send()",
                                    "Multi-asset positions tracking with real USD price feeds",
                                ]
                            },
                            {
                                phase: "Phase 3 — Protocol Expansion (Q3 2026)",
                                status: "planned",
                                items: [
                                    "Add Astar (ArthSwap) and Bifrost LP as routing destinations",
                                    "Governance token + fee distribution to stakers",
                                    "Strategy marketplace (user selects risk profile)",
                                    "Mainnet deployment (DOT mainnet, real USDT)",
                                    "Audit by reputable security firm",
                                ]
                            },
                            {
                                phase: "Phase 4 — Ecosystem (Q4 2026)",
                                status: "planned",
                                items: [
                                    "Support for additional Polkadot native assets (USDC, HDX, GLMR)",
                                    "Cross-parachain yield aggregation dashboard",
                                    "Mobile app with push notifications for yield events",
                                    "Partnership with Hydration, Moonbeam, Astar liquidity programs",
                                ]
                            },
                        ].map(({ phase, status, items }) => (
                            <div key={phase} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                                <div className={cn(
                                    "px-5 py-3.5 flex items-center justify-between border-b border-white/[0.05]",
                                    status === "live" && "bg-[rgba(74,222,128,0.04)]"
                                )}>
                                    <span className="text-[16px] font-semibold text-[var(--veyla-text-main)]">{phase}</span>
                                    {status === "live" ? (
                                        <span className="flex items-center gap-1.5 [font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[1px] text-[#4ade80]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                                            LIVE
                                        </span>
                                    ) : (
                                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[1px] text-[var(--veyla-text-dim)]">PLANNED</span>
                                    )}
                                </div>
                                <ul className="px-5 py-4 space-y-2">
                                    {items.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5 text-[15px] text-[var(--veyla-text-muted)]">
                                            <span className={cn(
                                                "w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]",
                                                status === "live" ? "bg-[#4ade80]" : "bg-white/[0.15]"
                                            )} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <Divider />

                    {/* ══ FAQ ═══════════════════════════════════════════════════════ */}
                    <SectionAnchor id="faq" />
                    <SectionTitle>FAQ</SectionTitle>
                    <SectionLead>Common questions about Veyla Protocol.</SectionLead>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Why does MetaMask show PAS instead of DOT?",
                                a: "Passet Hub Testnet uses PAS (Paseo) as its native token — the testnet equivalent of DOT. They are functionally identical in this context. When you deposit 'DOT' on Veyla, MetaMask shows PAS because that's the actual testnet currency. On mainnet, this will be DOT."
                            },
                            {
                                q: "Is there a withdrawal fee?",
                                a: "No. Veyla charges zero withdrawal fees. The protocol earns a 0.5% performance fee on yield generated (not on principal). You always get back what you put in, plus earned yield."
                            },
                            {
                                q: "How does yield get generated?",
                                a: "The protocol routes assets to liquidity pools on connected parachains (Hydration Omnipool for DOT, Stellaswap on Moonbeam for USDT) via XCM. These pools generate trading fees and liquidity mining rewards, which accrue as yield tracked by the VeylaVault contract."
                            },
                            {
                                q: "How often does rebalancing happen?",
                                a: "Currently, the APY is set by the owner and routing is triggered manually for the hackathon demo. Phase 2 (Q2 2026) introduces automated rebalancing via keeper bots that monitor on-chain APY oracles."
                            },
                            {
                                q: "Do you use bridges?",
                                a: "No. Veyla uses Polkadot's native XCM (Cross-Consensus Messaging) protocol, which is built into the relay chain. There are no external bridges, wrapped tokens, or third-party relayers. Assets move natively between parachains."
                            },
                            {
                                q: "Is the contract audited?",
                                a: "Not yet — this is a hackathon MVP. The contract is verified on Blockscout and has 35 passing tests including fuzz tests. A professional audit is planned before any mainnet deployment."
                            },
                            {
                                q: "Which wallets are supported?",
                                a: "Any EVM-compatible wallet that supports custom networks: MetaMask, Rabby, Coinbase Wallet, and any injected browser wallet. We detect installed wallets automatically at connection time."
                            },
                            {
                                q: "Can I see the source code?",
                                a: "Yes. Veyla is fully open source. Frontend, smart contract, tests, and deploy scripts are all available on GitHub."
                            },
                        ].map(({ q, a }) => (
                            <details key={q} className="group rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden cursor-pointer">
                                <summary className="flex items-center justify-between px-5 py-4 text-[16px] font-semibold text-[var(--veyla-text-main)] list-none select-none">
                                    {q}
                                    <ChevronRight size={16} className="shrink-0 text-[var(--veyla-text-dim)] group-open:rotate-90 transition-transform duration-200" />
                                </summary>
                                <div className="px-5 pb-4 pt-0 text-[15px] text-[var(--veyla-text-muted)] leading-[1.75] border-t border-white/[0.04]">
                                    <div className="pt-4">{a}</div>
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* ── Footer ── */}
                    <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[13px] tracking-[3px] text-white/40 mb-1">VEYLA</div>
                            <div className="text-[13px] text-[var(--veyla-text-dim)]">
                                Built for Polkadot Solidity Hackathon 2026 · Track 2: PVM Smart Contracts
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/veyla-alliance" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-[14px] text-[var(--veyla-text-dim)] hover:text-white transition-colors">
                                GitHub <ExternalLink size={11} />
                            </a>
                            <a href="https://x.com/veylaprotocol" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-[14px] text-[var(--veyla-text-dim)] hover:text-white transition-colors">
                                Twitter <ExternalLink size={11} />
                            </a>
                            <a href="https://blockscout-testnet.polkadot.io/address/0x741ec097b0d3dc7544c58c1b7401cb7540d2829b" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-[14px] text-[var(--veyla-text-dim)] hover:text-white transition-colors">
                                Contract <ExternalLink size={11} />
                            </a>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

// ── Sidebar content (shared between desktop + mobile drawer) ──────────────────
function SidebarContent({ activeSection, scrollTo }: { activeSection: string; scrollTo: (id: string) => void }) {
    return (
        <div>
            <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[var(--veyla-text-dim)] mb-3 px-3">
                Contents
            </div>
            <nav className="flex flex-col gap-0.5">
                {SECTIONS.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={cn(
                            "text-left px-3 py-2 rounded-lg text-[14px] transition-all duration-150",
                            activeSection === id
                                ? "bg-[rgba(123,57,252,0.12)] text-white font-semibold"
                                : "text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-muted)] hover:bg-white/[0.03]"
                        )}
                    >
                        {activeSection === id && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--veyla-purple-soft)] mr-2 mb-px" />
                        )}
                        {label}
                    </button>
                ))}
            </nav>

            <div className="mt-8 px-3 flex flex-col gap-2">
                <a
                    href="https://blockscout-testnet.polkadot.io/address/0x741ec097b0d3dc7544c58c1b7401cb7540d2829b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[13px] text-[var(--veyla-text-dim)] hover:text-white transition-colors"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    Contract live
                    <ExternalLink size={10} className="ml-auto" />
                </a>
                <a
                    href="https://github.com/veyla-alliance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[13px] text-[var(--veyla-text-dim)] hover:text-white transition-colors"
                >
                    GitHub
                    <ExternalLink size={10} className="ml-auto" />
                </a>
            </div>
        </div>
    );
}
