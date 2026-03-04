import { FadeIn } from "@/components/FadeIn";

export default function Hero() {
    return (
        <section className="hero-cinematic" id="hero">
            <div className="hero-video-container">
                <video autoPlay loop muted playsInline className="hero-video">
                    {/* <source src="/hero-video.webm" type="video/webm" /> */}
                    <source src="/hero-video.mp4" type="video/mp4" />
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
    );
}
