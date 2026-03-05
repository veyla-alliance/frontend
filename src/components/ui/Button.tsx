"use client";

import React, { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'navbar';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    href?: string;
    shimmer?: boolean;
}

const PRIMARY = "inline-flex items-center gap-2 bg-gradient-to-br from-[var(--veyla-purple)] to-[#5b1fd6] py-[14px] px-8 rounded-full font-semibold text-[17px] text-white border border-[rgba(123,57,252,0.4)] cursor-pointer transition-all duration-[350ms] shadow-[0_0_30px_rgba(123,57,252,0.2)] no-underline hover:shadow-[0_0_40px_rgba(123,57,252,0.4)] hover:border-[rgba(123,57,252,0.7)] hover:-translate-y-0.5 max-md:w-full max-md:justify-center";
const SECONDARY = "inline-flex items-center gap-2 bg-white/[0.03] py-[14px] px-8 rounded-full font-medium text-[15px] text-white/80 border border-white/[0.12] cursor-pointer transition-all duration-300 no-underline hover:text-white hover:border-white/20 hover:bg-white/[0.08] max-md:w-full max-md:justify-center";
const NAVBAR = "bg-gradient-to-br from-[var(--veyla-purple)] to-[#5b1fd6] py-[10px] px-6 rounded-full font-medium text-[15px] text-white border border-[rgba(123,57,252,0.4)] cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(123,57,252,0.15)] hover:shadow-[0_0_30px_rgba(123,57,252,0.3)] hover:border-[rgba(123,57,252,0.6)] hover:-translate-y-px";

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    ({ variant = 'primary', href, shimmer = false, className = '', children, ...props }, ref) => {
        const variantClass = variant === 'secondary' ? SECONDARY : variant === 'navbar' ? NAVBAR : PRIMARY;
        const classes = [variantClass, shimmer ? 'btn-shimmer' : '', className].filter(Boolean).join(' ');

        if (href) {
            return (
                <a href={href} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {shimmer ? <span className="flex items-center justify-center gap-2 w-full">{children}</span> : children}
                </a>
            );
        }

        return (
            <button className={classes} ref={ref as React.ForwardedRef<HTMLButtonElement>} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
                {shimmer ? <span className="flex items-center justify-center gap-2 w-full">{children}</span> : children}
            </button>
        );
    }
);

Button.displayName = 'Button';
