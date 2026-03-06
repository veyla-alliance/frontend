import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const socialLinks = [
    {
        name: "Twitter / X",
        href: siteConfig.links.twitter,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        href: siteConfig.links.github,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="site-footer w-full bg-[var(--veyla-dark)]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-10 md:py-12">
                {/* Main row: logo + tagline | social icons */}
                <div className="flex items-center justify-between gap-8 mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-5">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative w-5 h-5 flex items-center justify-center">
                                <Image src="/veyla-icon.svg" alt="Veyla Logo" fill />
                            </div>
                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[14px] font-medium tracking-[3px] text-white">
                                VEYLA
                            </span>
                        </div>
                        <p className="text-[14px] leading-[1.6] text-[var(--veyla-text-dim)]">
                            The Intelligent Yield Router for Polkadot Hub.
                        </p>
                    </div>

                    <div className="flex items-center gap-5">
                        {socialLinks.map((s) => (
                            <a
                                key={s.name}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.name}
                                className="text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-main)] transition-colors duration-200"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom bar: copyright | privacy + terms */}
                <div className="flex justify-between items-center pt-6 border-t border-[var(--veyla-border)] max-sm:flex-col max-sm:gap-3">
                    <p className="text-[13px] text-[var(--veyla-text-dim)]">
                        &copy; 2026 Veyla Alliance. All rights reserved.
                    </p>
                    <div className="flex gap-5">
                        <Link href="#" className="text-[13px] text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-muted)] transition-colors duration-200">
                            Privacy
                        </Link>
                        <Link href="#" className="text-[13px] text-[var(--veyla-text-dim)] hover:text-[var(--veyla-text-muted)] transition-colors duration-200">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
