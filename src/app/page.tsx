import Image from "next/image";
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
              <a href="#" className="nav-link" aria-haspopup="true" aria-expanded="false">
                Ecosystem
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginTop: '2px' }}>
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" className="nav-link">Routing</a>
              <a href="#" className="nav-link">Docs</a>
            </nav>
          </div>
          <div className="nav-right">
            <button className="btn-signin">Sign In</button>
            <button className="btn-getstarted"><span>Get Started</span></button>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-bg-container">
          <video autoPlay loop muted playsInline className="background-video" poster="/video-poster-placeholder.jpg">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4" type="video/mp4" />
          </video>
          {/* Blurred Background Element to enhance text legibility */}
          <div className="blur-pill" aria-hidden="true"></div>
        </div>

        <div className="hero-content">
          <FadeIn>
            <div className="eyebrow-badge">
              <span className="dot"></span> PVM Routing Live on Polkadot
            </div>
          </FadeIn>

          <FadeIn className="heading-block" delay={0.1}>
            <h1 className="heading-line-1 text-gradient">Intelligent router.</h1>
            <h1 className="heading-line-2">Yield focused.</h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="hero-subtitle">
              An automated yield optimization protocol built natively on Polkadot Hub.
              By leveraging the high-performance PolkaVM and XCM, Veyla serves as a smart solution to the problem of liquidity fragmentation.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="cta-container">
            <button className="btn-cta-primary">
              Launch App
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="btn-cta-secondary">Read Documentation</button>
          </FadeIn>
        </div>
      </section>

      <div className="content-layer">
        {/* Dashboard Image / Phase 2 Mockup Area */}
        <section className="dashboard-section" aria-label="Platform Preview">
          <FadeIn delay={0.5} className="dashboard-outer">
            <div className="dashboard-inner relative w-full aspect-[2070/1380]">
              <Image
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop"
                alt="Preview of the Veyla Dashboard Interface"
                width={2070}
                height={1380}
                priority
                className="dashboard-img"
              />
            </div>
          </FadeIn>
        </section>

        {/* Features / Solusi Veyla */}
        <section className="features-section-new">
          <FadeIn className="section-header">
            <h2 className="section-title text-gradient">Your Crypto Personal Executive</h2>
            <p className="section-subtitle">A simple workflow for the user, yet sophisticated under the hood.</p>
          </FadeIn>
          <div className="features-grid-new">
            <FadeIn delay={0.1}>
              <div className="feature-card-new">
                <h3 className="feature-title-new">Single Deposit</h3>
                <p className="feature-desc-new">Users deposit assets (such as DOT or USDT) into a single gateway—the Veyla Vault on Polkadot Hub.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="feature-card-new">
                <h3 className="feature-title-new">Cross-Chain Discovery</h3>
                <p className="feature-desc-new">Veyla's backend intelligence monitors staking and lending opportunities across multiple parachains in real-time.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="feature-card-new">
                <h3 className="feature-title-new">Automatic Routing</h3>
                <p className="feature-desc-new">Utilizing XCM technology, Veyla automatically routes liquidity to the parachain with the highest yield without requiring manual user intervention.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="feature-card-new">
                <h3 className="feature-title-new">Efficiency & Performance</h3>
                <p className="feature-desc-new">Executed on PVM, every asset transition is performed with minimal gas fees and high-speed finality.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Technical Edge / Backend Power */}
        <section className="technical-section">
          <FadeIn className="technical-container">
            <div className="technical-content">
              <h2 className="section-title text-gradient">Technical Excellence</h2>
              <p className="section-subtitle">Developed by the Veyla Alliance, the infrastructure acts as a core layer, not just a DeFi application.</p>
              <ul className="tech-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '32px' }}>
                <li style={{ position: 'relative', paddingLeft: '24px', color: 'var(--veyla-text-muted)' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--veyla-purple)' }}>→</span>
                  <strong style={{ color: '#fff' }}>Native Interoperability:</strong> Veyla bypasses third-party bridges, relying solely on Polkadot's native security for all cross-chain operations.
                </li>
                <li style={{ position: 'relative', paddingLeft: '24px', color: 'var(--veyla-text-muted)' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--veyla-purple)' }}>→</span>
                  <strong style={{ color: '#fff' }}>PVM-Optimized:</strong> The protocol utilizes precompiled contracts for heavy routing calculations, making it computationally superior and cost-effective.
                </li>
                <li style={{ position: 'relative', paddingLeft: '24px', color: 'var(--veyla-text-muted)' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--veyla-purple)' }}>→</span>
                  <strong style={{ color: '#fff' }}>Open-Source Integrity:</strong> Fully compliant with hackathon requirements, Veyla maintains a transparent codebase and a verified on-chain identity.
                </li>
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* Vision Section */}
        <section className="vision-section">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <FadeIn className="vision-content">
              <h2 className="vision-title">Vision of the Veyla Alliance</h2>
              <p className="vision-text">Building a future where managing assets across a thousand blockchains is as effortless as managing a single bank account.</p>
            </FadeIn>
          </div>
        </section>
      </div>
    </main>
  );
}
