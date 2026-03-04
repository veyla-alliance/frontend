export default function Navbar() {
    return (
        <div className="navbar-wrapper">
            <header className="navbar-new">
                <a href="#" className="nav-logo" aria-label="Veyla Home">VEYLA</a>
                <div className="nav-right">
                    <a href="#" className="nav-link">Docs</a>
                    <button className="btn-getstarted btn-shimmer"><span>Launch App</span></button>
                </div>
            </header>
        </div>
    );
}
