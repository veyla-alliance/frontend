"use client";

export const PixelGrid = () => {
    return (
        <div
            className="fixed inset-0 w-screen h-screen z-[998] pointer-events-none [background-image:radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] max-md:hidden"
            aria-hidden="true"
        />
    );
};
