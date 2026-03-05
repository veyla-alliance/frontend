import { siteConfig } from "@/config/site";

export default function Footer() {
    return (
        <footer className="site-footer w-full bg-[var(--veyla-dark)]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-20">
                <div className="flex justify-between gap-16 mb-20 max-lg:flex-col max-lg:gap-10 max-lg:mb-12">
                    <div className="shrink-0">
                        <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[16px] font-medium tracking-[3px] text-white block mb-4">
                            VEYLA
                        </span>
                        <p className="text-[16px] leading-[1.6] text-[var(--veyla-text-dim)]">
                            The Intelligent Yield Router<br />for Polkadot Hub.
                        </p>
                    </div>
                    <div className="flex gap-16 max-lg:gap-10 max-lg:flex-wrap">
                        {siteConfig.footer.map((col, index) => (
                            <div className="flex flex-col gap-3" key={index}>
                                <h4 className="text-[15px] font-semibold text-[var(--veyla-text-main)] tracking-[0.5px] mb-1">
                                    {col.title}
                                </h4>
                                {col.links.map((link, i) => (
                                    <a href={link.href} className="footer-link text-[16px] text-[var(--veyla-text-dim)] no-underline transition-colors duration-300 relative w-fit hover:text-[var(--veyla-text-muted)]" key={i}>
                                        {link.title}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t border-[var(--veyla-border)] max-md:flex-col max-md:gap-4 max-md:text-center">
                    <p className="text-[15px] text-[var(--veyla-text-dim)]">
                        © 2026 Veyla Alliance. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-[15px] text-[var(--veyla-text-dim)] no-underline transition-colors duration-300 hover:text-[var(--veyla-text-muted)]">Privacy</a>
                        <a href="#" className="text-[15px] text-[var(--veyla-text-dim)] no-underline transition-colors duration-300 hover:text-[var(--veyla-text-muted)]">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
