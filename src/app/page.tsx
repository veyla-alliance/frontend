import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="layout-wrapper">
      {/* Background Video Container */}
      <div className="hero-bg-container">
        <video autoPlay loop muted playsInline className="background-video" poster="/video-poster-placeholder.jpg">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4" type="video/mp4" />
        </video>
        {/* Blurred Background Element */}
        <div className="blur-pill" aria-hidden="true"></div>
      </div>

      <div className="content-layer">
        {/* Header / Navbar */}
        <header className="navbar-new">
          <div className="nav-left">
            {/* Logo */}
            <div className="nav-logo" aria-label="Veyla Home">VEYLA</div>
            {/* Links */}
            <nav className="nav-links" aria-label="Main Navigation">
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link" aria-haspopup="true" aria-expanded="false">
                Ecosystem
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" className="nav-link">Routing</a>
              <a href="#" className="nav-link">Docs</a>
            </nav>
          </div>
          <div className="nav-right">
            <button className="btn-signin">Sign In</button>
            <button className="btn-getstarted">Get Started</button>
          </div>
        </header>

        {/* Hero Content */}
        <section className="hero-content">
          <FadeIn className="heading-block">
            <h1 className="heading-line-1">Intelligent router.</h1>
            <h1 className="heading-line-2">Fokus pada yield.</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="hero-subtitle">
              Yield Aggregator otomatis yang dibangun secara native di atas Polkadot Hub.
              Memecahkan fragmentasi likuiditas dengan kekuatan PolkaVM & XCM agar aset Anda selalu bekerja dengan optimal.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} className="cta-container">
            <button className="btn-cta-primary">Launch App</button>
            <button className="btn-cta-secondary">Baca Dokumentasi</button>
          </FadeIn>
        </section>

        {/* Dashboard Image */}
        <section className="dashboard-section" aria-label="Platform Preview">
          <FadeIn delay={0.6} className="dashboard-outer">
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
            <h2 className="section-title">Asisten Pribadi Kripto Anda</h2>
            <p className="section-subtitle">Alur yang sangat sederhana bagi pengguna, namun sangat canggih di balik layar.</p>
          </FadeIn>
          <div className="features-grid-new">
            <FadeIn delay={0.1} className="feature-card-new">
              <h3 className="feature-title-new">Single Deposit</h3>
              <p className="feature-desc-new">Cukup titipkan aset (seperti DOT atau USDT) di satu pintu melalui Vault Veyla di Polkadot Hub.</p>
            </FadeIn>
            <FadeIn delay={0.2} className="feature-card-new">
              <h3 className="feature-title-new">Cross-Chain Discovery</h3>
              <p className="feature-desc-new">Backend cerdas kami memantau berbagai peluang imbal hasil di puluhan parachain secara real-time.</p>
            </FadeIn>
            <FadeIn delay={0.3} className="feature-card-new">
              <h3 className="feature-title-new">Automatic Routing</h3>
              <p className="feature-desc-new">Memindahkan likuiditas secara otomatis ke parachain dengan bunga tertinggi menggunakan jaringan XCM.</p>
            </FadeIn>
            <FadeIn delay={0.4} className="feature-card-new">
              <h3 className="feature-title-new">PVM Efficiency</h3>
              <p className="feature-desc-new">Eksekusi kontrak di PVM memastikan perpindahan aset berjalan sangat cepat dengan biaya komputasi rendah.</p>
            </FadeIn>
          </div>
        </section>

        {/* Technical Edge / Backend Power */}
        <section className="technical-section">
          <FadeIn className="technical-container">
            <div className="technical-content">
              <h2 className="section-title">The Backend Power</h2>
              <p className="section-subtitle">Infrastruktur infrastruktur yang dirancang oleh veteran Web3. Bukan sekadar aplikasi DeFi biasa.</p>
              <ul className="tech-list">
                <li className="tech-item">
                  <strong>Native Interoperability:</strong> Tanpa bridge pihak ketiga. Veyla memanfaatkan keamanan asli tingkat tinggi dari jaringan Polkadot langsung.
                </li>
                <li className="tech-item">
                  <strong>PVM-Optimized:</strong> Menggunakan precompiled contracts untuk kalkulasi routing berat, menjadikannya protokol yang efisien secara komputasi.
                </li>
                <li className="tech-item">
                  <strong>Transparent Identity:</strong> Dilengkapi On-chain Identity (Veyla Alliance) yang terverifikasi untuk menjamin kepercayaan penuh pengguna dan juri.
                </li>
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* Vision Section */}
        <section className="vision-section">
          <FadeIn className="vision-content">
            <h2 className="vision-title">Visi Veyla Alliance</h2>
            <p className="vision-text">Membangun masa depan di mana mengelola aset kripto di ribuan blockchain semudah mengatur satu rekening bank.</p>
          </FadeIn>
        </section>
      </div>
    </main>
  );
}
