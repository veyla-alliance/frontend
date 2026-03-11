import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy — Veyla",
    description: "Privacy Policy for Veyla Protocol.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--veyla-dark)] text-[var(--veyla-text-main)]">
            {/* Top bar */}
            <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-3 [font-family:var(--font-geist-pixel-square),monospace] text-[14px] tracking-[4px] text-white/60 hover:text-white transition-colors duration-200"
                >
                    <div className="relative w-8 h-8">
                        <Image src="/veyla-icon.svg" alt="Veyla" fill />
                    </div>
                    VEYLA
                </Link>
                <Link
                    href="/"
                    className="text-[14px] text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-main)] transition-colors duration-200"
                >
                    ← Back to home
                </Link>
            </header>

            {/* Content */}
            <main className="w-full max-w-[720px] mx-auto px-6 md:px-12 py-12 pb-24">
                <div className="mb-10">
                    <h1 className="text-[32px] font-bold tracking-[-0.5px] text-white mb-3">
                        Privacy Policy
                    </h1>
                    <p className="text-[15px] text-[var(--veyla-text-dim)]">
                        Last updated: March 2026
                    </p>
                </div>

                <div className="flex flex-col gap-10 text-[16px] leading-[1.75] text-[var(--veyla-text-muted)]">

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">1. Overview</h2>
                        <p>
                            Veyla Alliance (&ldquo;Veyla,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;) operates the Veyla Protocol — an automated yield routing protocol built on Polkadot Hub. This Privacy Policy explains how we handle information in connection with your use of our website and protocol.
                        </p>
                        <p>
                            Veyla is a decentralized protocol. We do not custody your assets, operate centralized servers that process your financial data, or maintain user accounts. Most interactions occur directly on-chain.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">2. Information We Collect</h2>
                        <p>
                            <strong className="text-white font-medium">Website analytics.</strong> We may collect anonymized usage data (page views, referrers, browser type) to understand how visitors interact with our website. No personal identifiers are collected or stored.
                        </p>
                        <p>
                            <strong className="text-white font-medium">Wallet addresses.</strong> When you connect your wallet, your public address is visible to us solely to display your on-chain positions. We do not link wallet addresses to personal identities.
                        </p>
                        <p>
                            <strong className="text-white font-medium">On-chain data.</strong> All transactions you submit through the Veyla interface are recorded on the Polkadot Hub blockchain. This data is public, permanent, and outside our control.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">3. How We Use Information</h2>
                        <p>We use collected information only to:</p>
                        <ul className="list-disc pl-5 flex flex-col gap-1.5">
                            <li>Display your vault positions and transaction history in the app interface</li>
                            <li>Improve the website and protocol user experience</li>
                            <li>Diagnose technical issues and monitor protocol health</li>
                        </ul>
                        <p>
                            We do not sell, rent, or share your information with third parties for marketing purposes.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">4. Third-Party Services</h2>
                        <p>
                            The Veyla interface may interact with third-party infrastructure including RPC providers and block explorers. These services operate under their own privacy policies. We encourage you to review their terms before use.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">5. Cookies</h2>
                        <p>
                            We do not use tracking cookies. Any browser storage we use (e.g., local storage for wallet connection state) is strictly functional and is not used for advertising or cross-site tracking.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">6. Data Retention</h2>
                        <p>
                            We do not maintain databases of personal user data. On-chain data is retained by the blockchain indefinitely as a function of its architecture and is outside our control. Any server-side logs are retained for no longer than 30 days.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">7. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Material changes will be announced via our official channels. Continued use of the protocol after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">8. Contact</h2>
                        <p>
                            For privacy-related questions, reach us on{" "}
                            <a
                                href="https://x.com/veylaprotocol"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--veyla-purple)] hover:text-white transition-colors duration-150 underline underline-offset-2"
                            >
                                X (Twitter)
                            </a>{" "}
                            or open an issue on our{" "}
                            <a
                                href="https://github.com/veyla-alliance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--veyla-purple)] hover:text-white transition-colors duration-150 underline underline-offset-2"
                            >
                                GitHub
                            </a>.
                        </p>
                    </section>

                </div>
            </main>
        </div>
    );
}
