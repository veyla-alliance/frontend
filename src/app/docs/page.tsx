"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ExternalLink, Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Nav sections ──────────────────────────────────────────────────────────────
const SECTIONS = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
    { id: "xcm", label: "XCM Integration" },
    { id: "contract", label: "Smart Contract" },
    { id: "deep-dive", label: "Technical Deep Dive" },
    { id: "frontend", label: "Frontend" },
    { id: "quickstart", label: "Quick Start" },
    { id: "api", label: "Contract API" },
    { id: "roadmap", label: "Roadmap" },
    { id: "faq", label: "FAQ" },
    { id: "team", label: "Team" },
] as const;

// ── Small reusable atoms ──────────────────────────────────────────────────────
function SectionAnchor({ id }: { id: string }) {
    return <div id={id} className="scroll-mt-24" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-[24px] md:text-[34px] font-bold text-[var(--veyla-text-main)] tracking-[-0.5px] mb-4">
            {children}
        </h2>
    );
}

function SectionLead({ children }: { children: React.ReactNode }) {
    return <p className="text-[15px] md:text-[17px] text-[var(--veyla-text-muted)] leading-[1.75] mb-8">{children}</p>;
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
        cyan: "bg-[rgba(0,212,255,0.05)] border-[rgba(0,212,255,0.2)] text-[var(--veyla-cyan)]",
        green: "bg-[rgba(74,222,128,0.05)] border-[rgba(74,222,128,0.2)] text-[#4ade80]",
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

function ArchitectureDiagram() {
    function ArrowDown({ label }: { label?: string }) {
        return (
            <div className="flex flex-col items-center py-1">
                <div className="w-px h-5 bg-[rgba(123,57,252,0.35)]" />
                {label && (
                    <div className="my-1 px-3 py-1 rounded-md [font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[0.5px] bg-[rgba(123,57,252,0.08)] border border-[rgba(123,57,252,0.15)] text-[rgba(160,109,250,0.8)] whitespace-nowrap">
                        {label}
                    </div>
                )}
                <div className="w-px h-5 bg-[rgba(123,57,252,0.35)]" />
                <svg width="10" height="6" viewBox="0 0 10 6" className="shrink-0">
                    <path d="M1 1 L5 5 L9 1" fill="none" stroke="rgba(123,57,252,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        );
    }

    return (
        <div className="mt-4 mb-8 rounded-2xl border border-white/[0.06] bg-[#06060d] p-6 md:p-8 overflow-x-auto">
            <div className="min-w-[520px]">

                {/* ── Wallet ── */}
                <div className="flex justify-center">
                    <div className="px-6 py-3 rounded-xl border border-white/[0.12] bg-white/[0.03] text-center">
                        <div className="text-[15px] font-semibold text-[var(--veyla-text-main)]">User Wallet</div>
                        <div className="text-[12px] text-[var(--veyla-text-dim)] mt-0.5">MetaMask · Rabby · Coinbase Wallet</div>
                    </div>
                </div>

                <ArrowDown label="EVM JSON-RPC · Chain 420420417" />

                {/* ── Polkadot Hub ── */}
                <div className="relative rounded-2xl border border-dashed border-[rgba(123,57,252,0.22)] bg-[rgba(123,57,252,0.02)] p-5">
                    <div className="absolute -top-3.5 left-4 bg-[#06060d] px-2">
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[2px] text-[rgba(160,109,250,0.6)] font-bold">POLKADOT HUB</span>
                    </div>

                    <div className="flex gap-3 items-stretch">
                        {/* VeylaVault */}
                        <div className="flex-1 rounded-xl border border-[rgba(123,57,252,0.28)] bg-[rgba(123,57,252,0.07)] p-4">
                            <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] text-[var(--veyla-purple-soft)] font-bold mb-3 pb-2.5 border-b border-[rgba(123,57,252,0.2)] text-center tracking-[0.5px]">
                                VeylaVault.sol
                            </div>
                            <div className="space-y-2">
                                {[
                                    { fn: "deposit(token, amount)", tag: "payable", xcm: false },
                                    { fn: "withdraw(token, amount)", tag: "nonpayable", xcm: false },
                                    { fn: "balanceOf / earned / currentApy", tag: "view", xcm: false },
                                ].map(({ fn, tag }) => (
                                    <div key={fn} className="flex items-center justify-between gap-4">
                                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] text-[var(--veyla-text-dim)] whitespace-nowrap">{fn}</span>
                                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] text-[rgba(107,107,133,0.6)] italic shrink-0">{tag}</span>
                                    </div>
                                ))}
                                <div className="border-t border-dashed border-[rgba(123,57,252,0.15)] pt-2 mt-1 space-y-2">
                                    {[
                                        { fn: "routeAssets(token, xcmMsg)", tag: "→ XCM" },
                                        { fn: "sendCrossChain(dest, msg)", tag: "→ XCM" },
                                    ].map(({ fn, tag }) => (
                                        <div key={fn} className="flex items-center justify-between gap-4">
                                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] text-[var(--veyla-purple-soft)] whitespace-nowrap">{fn}</span>
                                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] text-[rgba(0,212,255,0.7)] italic shrink-0">{tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Arrow: Vault → XCM */}
                        <div className="flex items-center shrink-0">
                            <div className="w-4 h-px bg-[rgba(0,212,255,0.3)]" />
                            <svg width="6" height="10" viewBox="0 0 6 10">
                                <path d="M1 1 L5 5 L1 9" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* XCM Precompile */}
                        <div className="w-44 shrink-0 rounded-xl border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.04)] p-4">
                            <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] text-[var(--veyla-cyan)] font-bold mb-3 pb-2.5 border-b border-[rgba(0,212,255,0.12)] text-center tracking-[0.5px]">
                                XCM Precompile
                            </div>
                            <div className="space-y-1.5">
                                <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] text-[rgba(68,68,90,0.9)] text-center whitespace-nowrap">0x...000a0000</div>
                                <div className="border-t border-[rgba(0,212,255,0.08)] my-2" />
                                <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] text-[rgba(0,212,255,0.5)] whitespace-nowrap">execute(msg, weight)</div>
                                <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] text-[rgba(0,212,255,0.5)] whitespace-nowrap">send(dest, msg)</div>
                                <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] text-[rgba(0,212,255,0.3)] whitespace-nowrap">weighMessage(msg)</div>
                                <div className="border-t border-[rgba(0,212,255,0.08)] mt-2 pt-2 text-[9px] text-[var(--veyla-text-dim)] text-center">
                                    Polkadot Hub native
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ArrowDown label="XCM Message" />

                {/* ── Chain destinations ── */}
                <div className="grid grid-cols-3 gap-3">
                    {/* Hydration — ACTIVE */}
                    <div className="rounded-xl border border-[rgba(74,222,128,0.28)] bg-[rgba(74,222,128,0.05)] p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#4ade80] shrink-0" />
                            <span className="text-[13px] font-semibold text-[#4ade80]">Hydration</span>
                        </div>
                        <div className="text-[11px] text-[var(--veyla-text-dim)] mb-2">Omnipool · DOT</div>
                        <div className="text-[30px] font-bold text-[#4ade80] leading-none">14.2%</div>
                        <div className="text-[10px] text-[rgba(74,222,128,0.5)] mt-0.5 mb-2">APY</div>
                        <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] tracking-[1px] text-[rgba(74,222,128,0.6)]">ACTIVE</div>
                    </div>

                    {/* Moonbeam — STANDBY */}
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-white/[0.2] shrink-0" />
                            <span className="text-[13px] font-semibold text-[var(--veyla-text-dim)]">Moonbeam</span>
                        </div>
                        <div className="text-[11px] text-[var(--veyla-text-dim)] mb-2">Stellaswap · USDT</div>
                        <div className="text-[30px] font-bold text-[var(--veyla-text-muted)] leading-none">9.8%</div>
                        <div className="text-[10px] text-[var(--veyla-text-dim)] mt-0.5 mb-2">APY</div>
                        <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] tracking-[1px] text-[var(--veyla-text-dim)]">STANDBY</div>
                    </div>

                    {/* Astar — STANDBY */}
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-white/[0.2] shrink-0" />
                            <span className="text-[13px] font-semibold text-[var(--veyla-text-dim)]">Astar</span>
                        </div>
                        <div className="text-[11px] text-[var(--veyla-text-dim)] mb-2">ArthSwap · DOT</div>
                        <div className="text-[30px] font-bold text-[var(--veyla-text-muted)] leading-none">8.1%</div>
                        <div className="text-[10px] text-[var(--veyla-text-dim)] mt-0.5 mb-2">APY</div>
                        <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[9px] tracking-[1px] text-[var(--veyla-text-dim)]">STANDBY</div>
                    </div>
                </div>

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
            <header className="sticky top-0 z-[100] h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 md:px-8 border-b border-white/[0.06] bg-[#07070d]/50 backdrop-blur-md">
                <div className="flex items-center gap-3 sm:gap-5">
                    {/* Mobile nav toggle (left side like AppTopbar) */}
                    <button
                        onClick={() => setMobileNavOpen((v) => !v)}
                        className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--veyla-text-muted)] hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                        aria-label="Toggle Menu"
                    >
                        {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                    <Link href="/" className="hidden min-[400px]:flex items-center gap-1 sm:gap-2 text-[var(--veyla-text-dim)] hover:text-white transition-colors duration-150 text-[13px] sm:text-[14px]">
                        <ArrowLeft size={14} className="shrink-0" />
                        <span className="hidden sm:block">Back</span>
                    </Link>
                    <div className="hidden min-[400px]:block w-px h-4 bg-white/[0.08]" />
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-5 h-5">
                            <Image src="/veyla-icon.svg" alt="Veyla" fill />
                        </div>
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[13px] sm:text-[14px] tracking-[2px] sm:tracking-[3px] text-white/60">VEYLA</span>
                    </Link>
                    <div className="w-px h-4 bg-white/[0.08] hidden md:block" />
                    <span className="hidden md:block text-[14px] text-[var(--veyla-text-dim)] font-semibold tracking-[-0.2px]">Documentation</span>
                    <span className="md:hidden text-[16px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.2px] ml-1">Docs</span>
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
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(123,57,252,0.15)] border border-[rgba(123,57,252,0.25)] text-[12px] sm:text-[13px] font-semibold text-[var(--veyla-purple-soft)] hover:bg-[rgba(123,57,252,0.22)] transition-colors duration-150"
                    >
                        Launch <span className="hidden sm:inline">App</span> <ChevronRight size={11} className="shrink-0" />
                    </Link>
                </div>
            </header>

            {/* Mobile sidebar overlay matching AppMobileNav */}
            {mobileNavOpen && (
                <div className="md:hidden">
                    <div
                        className="fixed inset-0 top-16 z-[9998] bg-black/80 backdrop-blur-md"
                        onClick={() => setMobileNavOpen(false)}
                        style={{ height: 'calc(100vh - 64px)' }}
                    />
                    <nav
                        className="fixed top-16 left-0 right-0 z-[9999] bg-[var(--veyla-dark)] border-t border-white/[0.06] p-4 flex flex-col gap-1 shadow-2xl overflow-y-auto"
                        style={{ height: 'calc(100vh - 64px)' }}
                    >
                        <SidebarContent activeSection={activeSection} scrollTo={scrollTo} isMobile />
                    </nav>
                </div>
            )}

            <div className="max-w-[1200px] mx-auto flex">

                {/* ── Desktop sidebar ── */}
                <aside className="hidden md:block w-[220px] shrink-0">
                    <div className="sticky top-16 pt-8 pb-8 pr-6 h-[calc(100vh-64px)] overflow-y-auto">
                        <SidebarContent activeSection={activeSection} scrollTo={scrollTo} />
                    </div>
                </aside>

                {/* ── Main content ── */}
                <main className="flex-1 min-w-0 px-4 md:px-10 py-6 md:py-10 pb-32 overflow-hidden">

                    {/* ══ OVERVIEW ═══════════════════════════════════════════════════ */}
                    <SectionAnchor id="overview" />
                    <div className="mb-3 flex items-center gap-2">
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[2px] text-[var(--veyla-purple)] uppercase">Protocol</span>
                    </div>
                    <h1 className="text-[32px] md:text-[52px] font-bold tracking-[-1.5px] leading-[1.1] text-[var(--veyla-text-main)] mb-5 break-words">
                        Veyla Protocol Docs
                    </h1>
                    <p className="text-[16px] md:text-[18px] text-[var(--veyla-text-muted)] leading-[1.75] mb-8 max-w-[640px]">
                        Complete technical documentation for Veyla Protocol — automated yield accounting and XCM routing infrastructure built natively on Polkadot Hub using PVM smart contracts and Polkadot-native cross-chain messaging.
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
                                    color === "cyan" && "bg-[rgba(0,212,255,0.08)] border-[rgba(0,212,255,0.2)] text-[var(--veyla-cyan)]",
                                    color === "purple" && "bg-[rgba(123,57,252,0.1)] border-[rgba(123,57,252,0.2)] text-[var(--veyla-purple-soft)]",
                                    color === "dim" && "bg-white/[0.03] border-white/[0.08] text-[var(--veyla-text-dim)]"
                                )}
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    <InfoBox title="What is Veyla Protocol?" color="purple">
                        Veyla Protocol is an on-chain yield accounting and XCM routing protocol on Polkadot Hub. Users deposit DOT or USDT into a single vault.
                        The contract tracks principal + accrued yield per user, and routes liquidity to the highest-APY parachain via Polkadot-native XCM precompiles —
                        no bridges, no wrapped tokens. In the current MVP, APY rates and routing execution are owner-configured; keeper-based automation is planned for Phase 2.
                    </InfoBox>

                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                        {[
                            { title: "Deposit Once", desc: "Deposit DOT or USDT into the Veyla Protocol vault on Polkadot Hub. That's it." },
                            { title: "Auto-Route", desc: "Vault routes via XCM precompile to the highest-APY parachain. Routing is owner-triggered in the MVP — keeper automation in Phase 2." },
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
                        Veyla Protocol is built entirely on Polkadot Hub (Passet Hub Testnet). The frontend talks to a single deployed Solidity contract
                        via standard EVM JSON-RPC, while the contract uses Polkadot-native precompiles for cross-chain operations.
                    </SectionLead>

                    <ArchitectureDiagram />

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

                    <InfoBox title="Why XCM matters" color="cyan">
                        Veyla Protocol utilizes Polkadot-native functionality via precompiles to securely route assets and instruction payloads natively.
                        Veyla Protocol calls both <strong>execute()</strong> (local XCM) and <strong>send()</strong> (cross-chain XCM) from within the smart contract,
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

                    <InfoBox title="MVP vs Phase 2" color="yellow">
                        In the current MVP, XCM routing execution is triggered by the contract owner (demonstrable via the deployed contract on Passet Hub).
                        APY rates are set on-chain via <InlineCode>setApy()</InlineCode> and currently reflect real parachain yields manually curated.
                        Phase 2 will introduce keeper-based automation: off-chain agents monitor live APY feeds and call <InlineCode>routeAssets()</InlineCode> permissionlessly when better routes are detected.
                    </InfoBox>

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
                            ["Address", <InlineCode key="a">0xc66ee6f7CA593fbbccEd23d8c50417C058F1EF77</InlineCode>],
                            ["Compiler", "Solidity 0.8.28 (PolkaVM)"],
                            ["Optimizer", "200 runs"],
                            ["Blockscout", <a key="b" href="https://blockscout-testnet.polkadot.io/address/0xc66ee6f7CA593fbbccEd23d8c50417C058F1EF77" target="_blank" rel="noopener noreferrer" className="text-[var(--veyla-purple-soft)] flex items-center gap-1 hover:text-white transition-colors">View on Blockscout <ExternalLink size={11} /></a>],
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
                    <InfoBox title="82/82 Tests Passing" color="green">
                        Full unit + fuzz test suite (4 fuzz tests, 256 runs each). Coverage includes: deposit (DOT + USDT), withdraw,
                        yield accrual, multi-deposit accuracy, XCM routing calls, XCM destination whitelist, 2-step treasury transfer,
                        access control (onlyOwner), pause mechanism, 2-step ownership transfer, principal protection when yield pool is empty,
                        and all custom error paths.
                    </InfoBox>

                    <Divider />

                    {/* ══ TECHNICAL DEEP DIVE ═════════════════════════════════════════ */}
                    <SectionAnchor id="deep-dive" />
                    <SectionTitle>Technical Deep Dive</SectionTitle>
                    <SectionLead>
                        Architecture decisions, security patterns, and what makes this project uniquely possible on Polkadot.
                    </SectionLead>

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4">Precompile Architecture</h3>
                    <p className="text-[15px] text-[var(--veyla-text-muted)] leading-[1.75] mb-6">
                        PolkaVM is Polkadot&apos;s smart contract VM that compiles Solidity to PolkaVM bytecode (not EVM bytecode).
                        This gives Solidity contracts native access to Substrate runtime functions via <strong className="text-[var(--veyla-text-main)]">precompiles</strong> —
                        special addresses that map directly to Rust runtime logic. No bridges, no oracles, no middleware.
                    </p>

                    <CodeBlock lang="solidity" code={`
// XCM Precompile — Polkadot Hub native (0x...000a0000)
interface IXcm {
    struct Weight { uint64 refTime; uint64 proofSize; }

    // Execute XCM locally with caller's origin
    function execute(bytes calldata message, Weight calldata weight) external;

    // Send XCM to another parachain
    function send(bytes calldata destination, bytes calldata message) external;

    // Estimate weight for execution
    function weighMessage(bytes calldata message) external view returns (Weight memory);
}

// pallet-assets ERC-20 Precompile — native USDT (Asset ID 1984)
interface IERC20Precompile {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}
                    `} />

                    <InfoBox title="Solidity → Rust — Zero Overhead" color="purple">
                        When VeylaVault calls <InlineCode>IXcm(0x...000a0000).execute()</InlineCode>, PolkaVM routes the call
                        directly to Polkadot&apos;s Rust XCM pallet. There is no EVM compatibility layer, no translation overhead.
                        The precompile IS the runtime function. This is fundamentally different from bridges or cross-chain messaging on other ecosystems.
                    </InfoBox>

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Security Architecture</h3>
                    <p className="text-[15px] text-[var(--veyla-text-muted)] leading-[1.75] mb-4">
                        VeylaVault implements multiple layers of safety by design:
                    </p>

                    <Table
                        headers={["Pattern", "Implementation", "Purpose"]}
                        rows={[
                            ["2-Step Ownership", <InlineCode key="o">transferOwnership() → acceptOwnership()</InlineCode>, "Prevents accidental lockout from address typos"],
                            ["2-Step Treasury", <InlineCode key="t">proposeTreasury() → acceptTreasury()</InlineCode>, "Prevents fees routing to wrong address"],
                            ["APY Cap", <InlineCode key="a">MAX_APY_BPS = 10,000 (100%)</InlineCode>, "Prevents catastrophic drain attack"],
                            ["Fee Cap", <InlineCode key="f">MAX_PROTOCOL_FEE_BPS = 500 (5%)</InlineCode>, "Limits owner fee extraction"],
                            ["XCM Size Cap", <InlineCode key="x">MAX_XCM_MESSAGE_SIZE = 1024</InlineCode>, "Prevents calldata griefing"],
                            ["Destination Whitelist", <InlineCode key="d">trustedDestinations[keccak256(dest)]</InlineCode>, "XCM only routes to approved parachains"],
                            ["CEI Pattern", "State updates before external calls", "Prevents reentrancy on withdrawals"],
                            ["Principal Protection", "Yield capped at available pool", "Users always withdraw at least their principal"],
                            ["Pause Mechanism", <InlineCode key="p">notPaused modifier</InlineCode>, "Emergency stop for all deposits/withdrawals"],
                        ]}
                    />

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Yield Accounting Deep Dive</h3>
                    <p className="text-[15px] text-[var(--veyla-text-muted)] leading-[1.75] mb-4">
                        The yield formula uses a <strong className="text-[var(--veyla-text-main)]">snapshot-based accumulation pattern</strong>.
                        Before every balance-changing operation (deposit, withdraw), <InlineCode>_accrueYield()</InlineCode> snapshots all pending yield into storage.
                        This ensures multi-deposit accuracy — depositing twice doesn&apos;t dilute the yield from the first deposit.
                    </p>

                    <CodeBlock lang="text" code={`
Yield Formula:
  pending = principal × APY_bps × elapsed_seconds / (365 days × 10,000)

Example (DOT @ 14.20% APY):
  1 DOT deposited → after 30 days:
  pending = 1e18 × 1420 × 2,592,000 / (31,536,000 × 10,000)
  pending = 0.01167 DOT ≈ 0.0117 DOT

Withdrawal Payout:
  totalPayout = principal + earnedYield - protocolFee
  protocolFee = earnedYield × protocolFeeBps / 10,000  (default 0.5%)

Safety Cap:
  actualYield = min(earnedYield, yieldPoolBalance)
  → Principal is NEVER locked, even if yield pool is empty
  → Unclaimed yield persists in _accruedYield for future claimYield() calls
                    `} />

                    <h3 className="text-[20px] font-semibold text-[var(--veyla-text-main)] mb-4 mt-8">Why Only on Polkadot</h3>
                    <p className="text-[15px] text-[var(--veyla-text-muted)] leading-[1.75] mb-4">
                        Veyla&apos;s architecture is fundamentally dependent on four Polkadot-specific primitives that do not exist in any other ecosystem:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-[rgba(123,57,252,0.04)] border border-[rgba(123,57,252,0.12)]">
                            <div className="text-[13px] font-bold text-[var(--veyla-purple-soft)] mb-2">1. XCM Native Messaging</div>
                            <p className="text-[13px] text-[var(--veyla-text-muted)] leading-[1.6]">
                                Cross-chain messages are processed by the relay chain validators — no external bridges, relayers, or trust assumptions.
                                Assets move natively between parachains with finality guaranteed by Polkadot&apos;s shared security.
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-[rgba(123,57,252,0.04)] border border-[rgba(123,57,252,0.12)]">
                            <div className="text-[13px] font-bold text-[var(--veyla-purple-soft)] mb-2">2. PolkaVM Precompiles</div>
                            <p className="text-[13px] text-[var(--veyla-text-muted)] leading-[1.6]">
                                Solidity contracts on PolkaVM can call Substrate runtime functions directly. <InlineCode>IXcm.execute()</InlineCode> is not a wrapper —
                                it&apos;s the actual XCM executor. No other VM gives Solidity this level of runtime access.
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-[rgba(123,57,252,0.04)] border border-[rgba(123,57,252,0.12)]">
                            <div className="text-[13px] font-bold text-[var(--veyla-purple-soft)] mb-2">3. Shared Security</div>
                            <p className="text-[13px] text-[var(--veyla-text-muted)] leading-[1.6]">
                                Every parachain (Hydration, Moonbeam, Astar) is secured by the same Polkadot relay chain validators.
                                When Veyla routes assets cross-chain, the security guarantee is identical to a local transaction.
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-[rgba(123,57,252,0.04)] border border-[rgba(123,57,252,0.12)]">
                            <div className="text-[13px] font-bold text-[var(--veyla-purple-soft)] mb-2">4. Native Asset Precompiles</div>
                            <p className="text-[13px] text-[var(--veyla-text-muted)] leading-[1.6]">
                                USDT on Polkadot Hub is a pallet-assets native asset (ID 1984), exposed to Solidity via an auto-generated ERC-20 precompile.
                                No wrapped tokens, no canonical bridge — it&apos;s the real asset from Polkadot&apos;s runtime.
                            </p>
                        </div>
                    </div>

                    <InfoBox title="Not a Fork — A New Category" color="cyan">
                        Veyla is not a port of an Ethereum yield aggregator. It&apos;s a new category of protocol that can only exist where:
                        (a) smart contracts can call cross-chain messaging natively, (b) assets exist as runtime primitives accessible from Solidity,
                        and (c) all destination chains share the same security model. Today, that&apos;s only Polkadot.
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
                            [<InlineCode key="l">/</InlineCode>, "Landing page — Navbar, Hero, ProofBar, ProblemTeaser, HowItWorks, UnderTheHood, CTA, Footer"],
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
NEXT_PUBLIC_VAULT_ADDRESS=0xc66ee6f7CA593fbbccEd23d8c50417C058F1EF77
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

// Withdraw deposited principal + available yield back to caller.
// Principal is always returnable even if yield pool is empty.
function withdraw(address token, uint256 amount) external;

// Harvest accrued yield without closing the position.
function claimYield(address token) external;

// [Owner only] Execute an XCM message locally via precompile.
function routeAssets(address token, bytes calldata xcmMessage) external;

// [Owner only] Send XCM cross-chain to target parachain.
function sendCrossChain(address token, bytes calldata destination, bytes calldata xcmMessage) external;

// [Owner only] Update APY for an asset (basis points, capped at 10_000 = 100%).
function setApy(address token, uint256 apyBps) external;

// [Owner only] Pause or unpause deposits and withdrawals.
function setPaused(bool _paused) external;

// [Owner only] Seed the yield pool (called by owner or via XCM receive()).
function fundYieldPool() external payable;

// [Owner only] Step 1 of 2-step ownership transfer — nominate new owner.
function transferOwnership(address newOwner) external;

// [Pending owner only] Step 2 — accept and finalise ownership transfer.
function acceptOwnership() external;

// [Owner only] Step 1 of 2-step treasury (fee recipient) transfer.
function proposeTreasury(address newTreasury) external;

// [Pending treasury only] Step 2 — accept and activate new treasury address.
function acceptTreasury() external;

// [Owner only] Whitelist a cross-chain XCM destination (raw bytes encoding).
function addTrustedDestination(bytes calldata destination) external;

// [Owner only] Remove a previously whitelisted XCM destination.
function removeTrustedDestination(bytes calldata destination) external;

// [Owner only] Update protocol fee (basis points, capped at MAX_FEE_BPS).
function setProtocolFee(uint256 feeBps) external;

// [Owner only] Update the minimum rebalance interval in seconds.
function setRebalanceInterval(uint256 interval) external;

// [Owner only] Update the human-readable route label for a token.
function setTokenRoute(address token, string calldata route) external;
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

// Timestamp of the user's last deposit for a given token.
function depositTimestampOf(address user, address token) external view returns (uint256);

// Human-readable route label for a token (e.g. "Hydration").
function tokenRoute(address token) external view returns (string memory);

// Public state
address public owner;
address public pendingOwner;
address public treasury;
address public pendingTreasury;
bool public paused;
    `} />

                    <h3 className="text-[18px] font-semibold text-[var(--veyla-cyan)] mb-3 mt-8">Events</h3>
                    <CodeBlock lang="solidity" code={`
event Deposited(address indexed user, address indexed token, uint256 amount);
event Withdrawn(address indexed user, address indexed token, uint256 amount);
event YieldClaimed(address indexed user, address indexed token, uint256 amount);
event RoutedLocally(address indexed token, uint256 amount);
event RoutedCrossChain(address indexed token, bytes destination, uint256 amount);
event YieldPoolFunded(address indexed from, uint256 amount);
event ApyUpdated(address indexed token, uint256 newApyBps);
event Paused(bool isPaused);
event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner);
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
event TreasuryProposed(address indexed newTreasury);
event TreasuryUpdated(address indexed newTreasury);
event TrustedDestinationAdded(bytes destination);
event TrustedDestinationRemoved(bytes destination);
event ProtocolFeeUpdated(uint256 newFeeBps);
event RebalanceIntervalUpdated(uint256 newInterval);
event TokenRouteUpdated(address indexed token, string route);
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
                            [<InlineCode key="a">ApyExceedsCap()</InlineCode>, "setApy() called with value above MAX_APY_BPS (10,000 = 100%)"],
                            [<InlineCode key="za">ZeroAddress()</InlineCode>, "transferOwnership() called with address(0)"],
                            [<InlineCode key="np">NoPendingOwner()</InlineCode>, "acceptOwnership() called when no transfer is pending"],
                            [<InlineCode key="ud">UntrustedDestination()</InlineCode>, "sendCrossChain() called with a non-whitelisted destination"],
                            [<InlineCode key="xl">XcmMessageTooLarge()</InlineCode>, "XCM message exceeds MAX_XCM_MESSAGE_SIZE (1024 bytes)"],
                            [<InlineCode key="pt">NotPendingTreasury()</InlineCode>, "acceptTreasury() called by non-pending treasury address"],
                            [<InlineCode key="fe">FeeExceedsCap()</InlineCode>, "setProtocolFee() called with value above the fee cap"],
                            [<InlineCode key="ii">InvalidInterval()</InlineCode>, "setRebalanceInterval() called with zero interval"],
                            [<InlineCode key="rt">RouteTooLong()</InlineCode>, "setTokenRoute() called with a route string exceeding max length"],
                            [<InlineCode key="ye">YieldPoolEmpty()</InlineCode>, "claimYield() called but yield pool has insufficient funds"],
                        ]}
                    />

                    <Divider />

                    {/* ══ ROADMAP ═══════════════════════════════════════════════════ */}
                    <SectionAnchor id="roadmap" />
                    <SectionTitle>Roadmap</SectionTitle>
                    <SectionLead>
                        Below is what is currently live today for Veyla Protocol and our plans for the future.
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
                                    "82/82 tests passing (4 fuzz tests, 256 runs each)",
                                    "Security audit completed — Critical, High, Medium, Low all fixed",
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
                                    "px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 border-b border-white/[0.05]",
                                    status === "live" && "bg-[rgba(74,222,128,0.04)]"
                                )}>
                                    <span className="text-[15px] sm:text-[16px] font-semibold text-[var(--veyla-text-main)] leading-snug">{phase}</span>
                                    {status === "live" ? (
                                        <span className="flex items-center gap-1.5 [font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[1px] text-[#4ade80]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                                            LIVE
                                        </span>
                                    ) : (
                                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[10px] tracking-[1px] text-[var(--veyla-text-dim)]">PLANNED</span>
                                    )}
                                </div>
                                <ul className="px-4 sm:px-5 py-4 space-y-2">
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
                                q: "What are the risks of using Veyla?",
                                a: "Several risk factors to be aware of: (1) Smart contract risk — the contract has 82 passing tests and an internal security audit, but has not yet been audited by a professional third-party firm. A formal audit is planned before mainnet. (2) Testnet only — Veyla currently runs on Passet Hub Testnet (PAS tokens, not real DOT). No real funds are at risk. (3) APY is owner-set — yield rates are configured by the contract owner, not sourced from a live oracle. Rates reflect real parachain yields but are manually curated. (4) Routing is owner-triggered in the MVP — assets are not automatically moved between chains without an owner action. (5) Yield pool dependency — yield is paid from a funded pool; if the pool is empty, withdrawals still return full principal but yield reverts to zero. Never deposit more than you're comfortable with on a testnet protocol."
                            },
                            {
                                q: "Why does MetaMask show PAS instead of DOT?",
                                a: "Passet Hub Testnet uses PAS (Paseo) as its native token — the testnet equivalent of DOT. They are functionally identical in this context. When you deposit 'DOT' on Veyla Protocol, MetaMask shows PAS because that's the actual testnet currency. On mainnet, this will be DOT."
                            },
                            {
                                q: "Is there a withdrawal fee?",
                                a: "No. Veyla Protocol charges zero withdrawal fees. The protocol earns a 0.5% performance fee on yield generated (not on principal). You always get back what you put in, plus earned yield."
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
                                q: "How are APY rates determined?",
                                a: "APY rates are set by the protocol owner based on observed yields from destination chains (e.g., Hydration Omnipool for DOT at 14.2%, Stellaswap for USDT at 9.8%). In the current MVP, APY is set via setApy(token, bps) — owner-only, capped at 100% (10,000 bps) by smart contract. Rates reflect real DeFi yields on destination parachains. Yield accrues on-chain using the formula: principal \u00d7 APY \u00d7 elapsed / (365 days \u00d7 10,000). Production roadmap includes oracle integration (Acurast/DIA) for real-time APY feeds from destination chains, keeper automation for periodic rate updates, and governance-controlled rate bounds."
                            },
                            {
                                q: "Do you use bridges?",
                                a: "No. Veyla Protocol uses Polkadot's native XCM (Cross-Consensus Messaging) protocol, which is built into the relay chain. There are no external bridges, wrapped tokens, or third-party relayers. Assets move natively between parachains."
                            },
                            {
                                q: "Is the contract audited?",
                                a: "Yes — a full internal security audit was completed (Critical through Low severity), covering APY drain prevention, 2-step ownership transfer, principal protection, and event traceability. The contract has 82 passing tests including 4 fuzz tests (256 runs each), covering XCM destination whitelist, 2-step treasury transfer, and all new security paths. It is verified on Blockscout. A professional third-party audit is planned before mainnet deployment."
                            },
                            {
                                q: "Which wallets are supported?",
                                a: "Any EVM-compatible wallet that supports custom networks: MetaMask, Rabby, SubWallet, Talisman, Coinbase Wallet, and any injected browser wallet. We detect installed wallets automatically at connection time. SubWallet and Talisman are especially recommended for Polkadot users."
                            },
                            {
                                q: "Can I see the source code?",
                                a: "Yes. Veyla Protocol is fully open source. Frontend, smart contract, tests, and deploy scripts are all available on GitHub."
                            },
                        ].map(({ q, a }) => (
                            <details key={q} className="group rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden cursor-pointer">
                                <summary className="flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 text-[15px] sm:text-[16px] font-semibold text-[var(--veyla-text-main)] list-none select-none gap-4">
                                    <span className="leading-snug">{q}</span>
                                    <ChevronRight size={16} className="shrink-0 text-[var(--veyla-text-dim)] group-open:rotate-90 transition-transform duration-200" />
                                </summary>
                                <div className="px-4 pb-4 sm:px-5 sm:pb-4 pt-0 text-[14px] sm:text-[15px] text-[var(--veyla-text-muted)] leading-[1.75] border-t border-white/[0.04]">
                                    <div className="pt-4">{a}</div>
                                </div>
                            </details>
                        ))}
                    </div>

                    <Divider />

                    {/* ══ TEAM ═══════════════════════════════════════════════════════ */}
                    <SectionAnchor id="team" />
                    <SectionTitle>Team</SectionTitle>
                    <SectionLead>Veyla Protocol is built by Veyla Alliance for the Polkadot Solidity Hackathon 2026.</SectionLead>

                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                        {/* On-chain identity header */}
                        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[var(--veyla-purple)]" />
                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] tracking-[2px] text-[var(--veyla-purple)] uppercase">
                                On-Chain Identity
                            </span>
                        </div>

                        <div className="px-5 py-5 flex flex-col sm:flex-row sm:items-start gap-5">
                            {/* Avatar placeholder */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[rgba(123,57,252,0.3)] to-[rgba(0,212,255,0.15)] border border-white/[0.08] flex items-center justify-center shrink-0">
                                <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[16px] text-[var(--veyla-purple)]">F</span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-[18px] font-semibold text-[var(--veyla-text-main)]">fdaniall</span>
                                    {/* Verified badge */}
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(123,57,252,0.15)] border border-[rgba(123,57,252,0.3)] text-[11px] font-medium text-[var(--veyla-purple-soft)]">
                                        ✓ Verified · Reasonable
                                    </span>
                                </div>

                                <p className="text-[14px] text-[var(--veyla-text-muted)] mb-4 leading-[1.65]">
                                    Full-stack developer &amp; protocol designer. Builder of Veyla Protocol — on-chain yield accounting &amp; XCM routing on Polkadot Hub.
                                </p>

                                {/* SS58 address */}
                                <div className="mb-3">
                                    <div className="text-[12px] text-[var(--veyla-text-dim)] mb-1.5 uppercase tracking-wider">Polkadot SS58 Address</div>
                                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] overflow-x-auto">
                                        <code className="[font-family:var(--font-geist-pixel-square),monospace] text-[11px] text-[var(--veyla-cyan)] whitespace-nowrap">
                                            5HBz4tNpNnbpwnYjERnEjebTiDeEgeRjMytapvFr7V8sKchY
                                        </code>
                                    </div>
                                </div>

                                {/* Identity details */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                                    {[
                                        { label: "Network", value: "Polkadot People Chain" },
                                        { label: "Judgment", value: "Reasonable" },
                                        { label: "Registrar", value: "W3F" },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                                            <div className="text-[11px] text-[var(--veyla-text-dim)] mb-0.5 uppercase tracking-wider">{label}</div>
                                            <div className="text-[13px] font-medium text-[var(--veyla-text-main)]">{value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href="https://polkadot.polkassembly.io/user/5HBz4t...KchY"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(123,57,252,0.1)] border border-[rgba(123,57,252,0.2)] text-[13px] text-[var(--veyla-purple-soft)] hover:bg-[rgba(123,57,252,0.18)] transition-colors duration-150"
                                    >
                                        View on Polkadot Identity <ExternalLink size={11} />
                                    </a>
                                    <a
                                        href="https://x.com/veylaprotocol"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-[var(--veyla-text-muted)] hover:text-white hover:border-white/[0.15] transition-colors duration-150"
                                    >
                                        @veylaprotocol <ExternalLink size={11} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Footer ── */}
                    <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="[font-family:var(--font-geist-pixel-square),monospace] text-[13px] tracking-[3px] text-[var(--veyla-purple)] mb-1">VEYLA PROTOCOL</div>
                            <div className="text-[13px] text-[var(--veyla-text-dim)]">
                                Built by Veyla Alliance for Polkadot Solidity Hackathon 2026
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
                            <a href="https://blockscout-testnet.polkadot.io/address/0xc66ee6f7CA593fbbccEd23d8c50417C058F1EF77" target="_blank" rel="noopener noreferrer"
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
function SidebarContent({ activeSection, scrollTo, isMobile = false }: { activeSection: string; scrollTo: (id: string) => void, isMobile?: boolean }) {
    if (isMobile) {
        return (
            <>
                {SECTIONS.map(({ id, label }) => {
                    const isActive = activeSection === id;
                    return (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] font-medium transition-all duration-150 text-left",
                                isActive
                                    ? "bg-[rgba(123,57,252,0.1)] text-white border border-[rgba(123,57,252,0.15)]"
                                    : "text-[var(--veyla-text-muted)] hover:text-white hover:bg-white/[0.04] border border-transparent"
                            )}
                        >
                            <span className={cn(
                                "w-2 h-2 rounded-full shrink-0",
                                isActive ? "bg-[var(--veyla-purple-soft)]" : "bg-white/[0.15]"
                            )} />
                            {label}
                        </button>
                    );
                })}

                <div className="mt-2 pt-4 border-t border-white/[0.05] flex flex-col gap-2">
                    <a
                        href="https://blockscout-testnet.polkadot.io/address/0xc66ee6f7CA593fbbccEd23d8c50417C058F1EF77"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] font-medium transition-all duration-150 no-underline text-[var(--veyla-text-muted)] hover:text-white hover:bg-white/[0.04] border border-transparent"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#4ade80] shrink-0" />
                        Contract live
                        <ExternalLink size={14} className="ml-auto opacity-50" />
                    </a>
                </div>
            </>
        );
    }

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
                    href="https://blockscout-testnet.polkadot.io/address/0xc66ee6f7CA593fbbccEd23d8c50417C058F1EF77"
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
