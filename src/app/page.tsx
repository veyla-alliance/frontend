import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="layout-wrapper">
      {/* Sticky Navbar */}
      <div className="navbar-wrapper">
        <header className="navbar-new">
          <div className="nav-left">
            <a href="#" className="nav-logo" aria-label="Veyla Home">VEYLA</a>
            <nav className="nav-links" aria-label="Main Navigation">
              <a href="#" className="nav-link active">Home</a>
              <a href="#the-problem" className="nav-link">Protocol</a>
              <a href="#how-it-works" className="nav-link">Routing</a>
              <a href="#" className="nav-link">Docs</a>
            </nav>
          </div>
          <div className="nav-right">
            <button className="btn-signin">Sign In</button>
            <button className="btn-getstarted"><span>Launch App</span></button>
          </div>
        </header>
      </div>

      {/* ===== HERO: Full-screen video ===== */}
      <section className="hero-cinematic" id="hero">
        <div className="hero-video-container">
          <video autoPlay loop muted playsInline className="hero-video" poster="/video-poster-placeholder.jpg">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-center-content">
          <FadeIn>
            <h1 className="hero-wordmark">VEYLA</h1>
          </FadeIn>
          <FadeIn delay={0.2} className="hero-statement">
            <p className="hero-statement-line-1">Deposit once.</p>
            <p className="hero-statement-line-2">Earn everywhere.</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.7} className="scroll-indicator-container">
          <div className="scroll-indicator">
            <span className="scroll-text">Scroll</span>
            <div className="scroll-line" />
          </div>
        </FadeIn>
      </section>

      {/* ===== TEXT MANIFESTO ===== */}
      <div className="manifesto-layer">

        {/* Section 01 — The Problem */}
        <section className="manifesto-section" id="the-problem">
          <FadeIn>
            <span className="section-label">01 — The Problem</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="manifesto-heading">
              Liquidity is <em>scattered</em><br />
              across a thousand chains.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="manifesto-body">
              Every new parachain fragments the ecosystem further. Users are forced to manually hunt for the best yields, bridge assets through risky third-party protocols, and constantly monitor shifting APYs across dozens of platforms.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="manifesto-body muted">
              The result? Billions in idle capital. Missed opportunities. Unnecessary complexity for the people who actually build and use DeFi.
            </p>
          </FadeIn>
        </section>

        {/* Divider */}
        <div className="manifesto-divider" />

        {/* Section 02 — The Answer */}
        <section className="manifesto-section" id="the-answer">
          <FadeIn>
            <span className="section-label">02 — The Answer</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="manifesto-heading-hero">
              One deposit.<br />
              <span className="text-gradient-purple">Every chain.</span><br />
              Maximum yield.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="manifesto-body">
              Veyla is an automated yield optimization protocol built natively on Polkadot Hub. It acts as your personal executive — you deposit once into the Veyla Vault, and our routing engine handles the rest.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="manifesto-body">
              No bridges. No manual rebalancing. No multi-tab spreadsheets tracking yields. Just deposit and earn.
            </p>
          </FadeIn>
        </section>

        {/* Divider */}
        <div className="manifesto-divider" />

        {/* Section 03 — How It Works */}
        <section className="manifesto-section" id="how-it-works">
          <FadeIn>
            <span className="section-label">03 — How It Works</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="manifesto-heading">
              A simple workflow for the user.<br />
              <em>Sophisticated</em> under the hood.
            </h2>
          </FadeIn>

          <div className="steps-grid">
            <FadeIn delay={0.15}>
              <div className="step-item">
                <span className="step-number">01</span>
                <h3 className="step-title">Deposit</h3>
                <p className="step-desc">
                  Users deposit assets — DOT, USDT, USDC — into a single gateway: the Veyla Vault on Polkadot Hub. One transaction. One entry point.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="step-item">
                <span className="step-number">02</span>
                <h3 className="step-title">Discover</h3>
                <p className="step-desc">
                  Veyla&apos;s backend intelligence continuously monitors staking, lending, and liquidity opportunities across every connected parachain — in real-time.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.35}>
              <div className="step-item">
                <span className="step-number">03</span>
                <h3 className="step-title">Route</h3>
                <p className="step-desc">
                  Using XCM cross-chain messaging, Veyla automatically routes your liquidity to the parachain offering the highest risk-adjusted yield. No manual intervention needed.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.45}>
              <div className="step-item">
                <span className="step-number">04</span>
                <h3 className="step-title">Earn</h3>
                <p className="step-desc">
                  Yields are compounded and rebalanced automatically. As market conditions shift, Veyla re-routes to maintain optimal positioning. You earn more by doing less.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Divider */}
        <div className="manifesto-divider" />

        {/* Section 04 — The Stack */}
        <section className="manifesto-section" id="the-stack">
          <FadeIn>
            <span className="section-label">04 — The Stack</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="manifesto-heading">
              Not just a DeFi app.<br />
              A <em>core infrastructure</em> layer.
            </h2>
          </FadeIn>

          <div className="stack-list">
            <FadeIn delay={0.15}>
              <div className="stack-item">
                <div className="stack-header">
                  <span className="stack-tag">PVM</span>
                  <h3 className="stack-title">PolkaVM Optimized</h3>
                </div>
                <p className="stack-desc">
                  The protocol utilizes precompiled contracts on PolkaVM for heavy routing calculations — making every asset transition computationally superior, with minimal gas fees and high-speed finality.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="stack-item">
                <div className="stack-header">
                  <span className="stack-tag">XCM</span>
                  <h3 className="stack-title">Native Interoperability</h3>
                </div>
                <p className="stack-desc">
                  Veyla bypasses third-party bridges entirely. All cross-chain operations rely solely on Polkadot&apos;s native XCM messaging — inheriting the relay chain&apos;s full security guarantees.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.35}>
              <div className="stack-item">
                <div className="stack-header">
                  <span className="stack-tag">OSS</span>
                  <h3 className="stack-title">Open-Source Integrity</h3>
                </div>
                <p className="stack-desc">
                  Fully transparent codebase. Verified on-chain identity. Built in compliance with the Polkadot ecosystem&apos;s open standards and hackathon requirements.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Divider */}
        <div className="manifesto-divider" />

        {/* Section 05 — The Vision */}
        <section className="manifesto-section vision" id="the-vision">
          <FadeIn>
            <span className="section-label">05 — The Vision</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote className="vision-quote">
              Building a future where managing assets across a thousand blockchains is as effortless as managing a single bank account.
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="vision-attribution">— The Veyla Alliance</p>
          </FadeIn>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div className="footer-brand">
                <span className="footer-logo">VEYLA</span>
                <p className="footer-tagline">The Intelligent Yield Router<br />for Polkadot Hub.</p>
              </div>
              <div className="footer-links-grid">
                <div className="footer-col">
                  <h4 className="footer-col-title">Protocol</h4>
                  <a href="#" className="footer-link">Launch App</a>
                  <a href="#" className="footer-link">Documentation</a>
                  <a href="#" className="footer-link">Audit Reports</a>
                </div>
                <div className="footer-col">
                  <h4 className="footer-col-title">Community</h4>
                  <a href="#" className="footer-link">Twitter / X</a>
                  <a href="#" className="footer-link">Discord</a>
                  <a href="#" className="footer-link">Telegram</a>
                </div>
                <div className="footer-col">
                  <h4 className="footer-col-title">Developers</h4>
                  <a href="#" className="footer-link">GitHub</a>
                  <a href="#" className="footer-link">SDK</a>
                  <a href="#" className="footer-link">Bug Bounty</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-copy">© 2026 Veyla Alliance. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#" className="footer-link-sm">Privacy</a>
                <a href="#" className="footer-link-sm">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
