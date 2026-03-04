"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
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
