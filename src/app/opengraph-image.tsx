import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Veyla | The Intelligent Yield Router for Polkadot Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#050508",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Purple glow blob */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 700,
                        height: 700,
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, rgba(123,57,252,0.25) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />

                {/* Logo */}
                <div
                    style={{
                        fontFamily: "monospace",
                        fontSize: 96,
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        color: "#ffffff",
                        textShadow: "0 0 80px rgba(123,57,252,0.6)",
                        marginBottom: 24,
                    }}
                >
                    VEYLA
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: 28,
                        color: "#8a8a9a",
                        letterSpacing: "0.02em",
                        marginBottom: 48,
                    }}
                >
                    The Intelligent Yield Router for Polkadot Hub
                </div>

                {/* Stats row */}
                <div
                    style={{
                        display: "flex",
                        gap: 48,
                        padding: "20px 48px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                    }}
                >
                    {[
                        { value: "$2.4M", label: "TVL" },
                        { value: "12.4%", label: "AVG APY" },
                        { value: "6", label: "CHAINS" },
                    ].map(({ value, label }) => (
                        <div
                            key={label}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <span style={{ fontSize: 32, fontWeight: 700, color: "#00d4ff" }}>{value}</span>
                            <span style={{ fontSize: 12, color: "#44445a", letterSpacing: "0.15em" }}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom label */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 32,
                        fontSize: 14,
                        color: "#44445a",
                        letterSpacing: "0.1em",
                    }}
                >
                    Built on Polkadot · Powered by XCM
                </div>
            </div>
        ),
        { ...size }
    );
}
