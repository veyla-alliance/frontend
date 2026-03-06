import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service — Veyla",
    description: "Terms of Service for Veyla Protocol.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[var(--veyla-dark)] text-[var(--veyla-text-main)]">
            {/* Top bar */}
            <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-3 [font-family:var(--font-geist-pixel-square),monospace] text-[14px] tracking-[4px] text-white/60 hover:text-white transition-colors duration-200"
                >
                    <div className="relative w-5 h-5">
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
                        Terms of Service
                    </h1>
                    <p className="text-[15px] text-[var(--veyla-text-dim)]">
                        Last updated: March 2026
                    </p>
                </div>

                <div className="flex flex-col gap-10 text-[16px] leading-[1.75] text-[var(--veyla-text-muted)]">

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Veyla interface at veyla.finance (the &ldquo;Interface&rdquo;) or interacting with the Veyla Protocol smart contracts, you agree to be bound by these Terms of Service. If you do not agree, do not use the Interface or the Protocol.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">2. Description of the Protocol</h2>
                        <p>
                            Veyla is a decentralized, non-custodial yield routing protocol deployed on Polkadot Hub. The Protocol automatically routes deposited assets across Polkadot parachains via XCM to seek optimized yield opportunities. Smart contracts execute all logic autonomously; Veyla Alliance does not intervene in individual transactions.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">3. Testnet Disclaimer</h2>
                        <p>
                            The Veyla Protocol is currently deployed on <strong className="text-white font-medium">Passet Hub Testnet</strong>. Testnet tokens have no monetary value. All activity on testnet is for testing and evaluation purposes only. Do not use real assets or assume that testnet behavior reflects mainnet outcomes.
                        </p>
                        <p>
                            Veyla Alliance makes no representations about the availability, accuracy, or continuity of the testnet interface.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">4. Risk Disclosure</h2>
                        <p>
                            Interacting with DeFi protocols involves significant risks, including but not limited to:
                        </p>
                        <ul className="list-disc pl-5 flex flex-col gap-1.5">
                            <li>Smart contract vulnerabilities or bugs</li>
                            <li>Bridge and cross-chain transfer failures</li>
                            <li>Liquidity risk and slippage on destination chains</li>
                            <li>Regulatory uncertainty and jurisdictional restrictions</li>
                            <li>Loss of funds due to user error (incorrect addresses, gas failures)</li>
                            <li>Market volatility and impermanent loss</li>
                        </ul>
                        <p>
                            You acknowledge that you understand these risks and accept full responsibility for any losses incurred through your use of the Protocol.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">5. No Financial Advice</h2>
                        <p>
                            Nothing on this website or within the Protocol constitutes financial, investment, legal, or tax advice. Yield figures shown are estimates based on current on-chain data and are not guarantees of future returns. Always conduct your own research and consult a qualified professional before making financial decisions.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">6. Eligibility and Prohibited Use</h2>
                        <p>
                            You represent that you are of legal age in your jurisdiction to enter into this agreement. You agree not to use the Interface if doing so would violate applicable laws in your jurisdiction, including sanctions regulations.
                        </p>
                        <p>
                            You agree not to use the Protocol for money laundering, terrorism financing, or any other illegal activity.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">7. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by applicable law, Veyla Alliance and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of funds, arising from your use of or inability to use the Protocol or Interface.
                        </p>
                        <p>
                            The Protocol is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">8. Intellectual Property</h2>
                        <p>
                            The Veyla interface, branding, and non-smart-contract code are the property of Veyla Alliance. Smart contract code is open source under the applicable license in our{" "}
                            <a
                                href="https://github.com/veyla-alliance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--veyla-purple)] hover:text-white transition-colors duration-150 underline underline-offset-2"
                            >
                                GitHub repository
                            </a>.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">9. Changes to These Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Continued use of the Interface or Protocol after changes are posted constitutes acceptance of the updated Terms. We will announce material changes via our official channels.
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-[19px] font-semibold text-white tracking-[-0.2px]">10. Contact</h2>
                        <p>
                            For questions about these Terms, reach us on{" "}
                            <a
                                href="https://x.com/veylaprotocol"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--veyla-purple)] hover:text-white transition-colors duration-150 underline underline-offset-2"
                            >
                                X (Twitter)
                            </a>{" "}
                            or open an issue on{" "}
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
