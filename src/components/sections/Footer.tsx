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
    );
}
