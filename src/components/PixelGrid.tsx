"use client";

// SVG-based dot grid — much cheaper than CSS radial-gradient on full viewport.
// Browser rasterises the 32×32 SVG once and tiles it as a texture (no per-pixel
// gradient computation on scroll/resize).
const DOT_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255%2C255%2C255%2C0.04)'/%3E%3C/svg%3E")`;

export const PixelGrid = () => {
    return (
        <div
            className="fixed inset-0 z-[998] pointer-events-none max-md:hidden"
            aria-hidden="true"
            style={{ backgroundImage: DOT_SVG, backgroundRepeat: "repeat" }}
        />
    );
};
