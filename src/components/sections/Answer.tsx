import { FadeIn } from "@/components/FadeIn";

export default function Answer() {
    return (
        <>
            <section className="manifesto-section relative overflow-hidden" id="the-answer">
                {/* Ambient Glow */}
                <div className="glow-blob glow-purple" style={{ top: '20%', right: '-15%' }} />

                <FadeIn>
                    <span className="section-label">02 — The Answer</span>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <h2 className="manifesto-heading-hero relative z-10">
                        One deposit.<br />
                        <span className="text-gradient-purple">Every chain.</span><br />
                        Maximum yield.
                    </h2>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <p className="manifesto-body relative z-10">
                        Veyla is an automated yield optimization protocol built natively on Polkadot Hub. It acts as your personal executive — you deposit once into the Veyla Vault, and our routing engine handles the rest.
                    </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                    <p className="manifesto-body relative z-10">
                        No bridges. No manual rebalancing. No multi-tab spreadsheets tracking yields. Just deposit and earn.
                    </p>
                </FadeIn>
            </section>
            <div className="manifesto-divider" />
        </>
    );
}
