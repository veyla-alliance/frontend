import { siteConfig } from "@/config/site";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <span className="footer-logo">VEYLA</span>
                        <p className="footer-tagline">The Intelligent Yield Router<br />for Polkadot Hub.</p>
                    </div>
                    <div className="footer-links-grid">
                        {siteConfig.footer.map((col, index) => (
                            <div className="footer-col" key={index}>
                                <h4 className="footer-col-title">{col.title}</h4>
                                {col.links.map((link, i) => (
                                    <a href={link.href} className="footer-link" key={i}>{link.title}</a>
                                ))}
                            </div>
                        ))}
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
    );
}
