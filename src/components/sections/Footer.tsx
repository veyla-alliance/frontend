import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    const className = "footer-link text-[16px] text-[var(--veyla-text-dim)] no-underline transition-colors duration-300 relative w-fit hover:text-[var(--veyla-text-muted)]";

    if (href.startsWith('/') || href.startsWith('#')) {
        return <Link href={href} className={className}>{children}</Link>;
    }

    return <a href={href} className={className}>{children}</a>;
}

export default function Footer() {
    return (
        <footer className="site-footer w-full bg-[var(--veyla-dark)]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-20">
                <div className="flex justify-between gap-16 mb-20 max-lg:flex-col max-lg:gap-10 max-lg:mb-12">
                    <div className="shrink-0">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-6 h-6 flex items-center justify-center">
                                <Image src="/veyla-icon.svg" alt="Veyla Logo" fill />
                            </div>
                            <span className="[font-family:var(--font-geist-pixel-square),monospace] text-[16px] font-medium tracking-[3px] text-white block">
                                VEYLA
                            </span>
                        </div>
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
                                    <FooterLink href={link.href} key={i}>
                                        {link.title}
                                    </FooterLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t border-[var(--veyla-border)] max-md:flex-col max-md:gap-4 max-md:text-center">
                    <p className="text-[15px] text-[var(--veyla-text-dim)]">
                        &copy; 2026 Veyla Alliance. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <FooterLink href="#">Privacy</FooterLink>
                        <FooterLink href="#">Terms</FooterLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
