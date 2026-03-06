"use client";

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'navbar';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    href?: string;
    shimmer?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: "inline-flex items-center gap-2 bg-gradient-to-br from-[var(--veyla-purple)] to-[#5b1fd6] py-[10px] px-7 rounded-full font-semibold text-[16px] text-white border border-[rgba(123,57,252,0.4)] cursor-pointer transition-all duration-[350ms] shadow-[0_0_30px_rgba(123,57,252,0.2)] no-underline hover:shadow-[0_0_40px_rgba(123,57,252,0.4)] hover:border-[rgba(123,57,252,0.7)] hover:-translate-y-0.5 max-md:w-full max-md:justify-center",
    secondary: "inline-flex items-center gap-2 bg-white/[0.03] py-[10px] px-7 rounded-full font-medium text-[15px] text-white/80 border border-white/[0.12] cursor-pointer transition-all duration-300 no-underline hover:text-white hover:border-white/20 hover:bg-white/[0.08] max-md:w-full max-md:justify-center",
    navbar: "bg-gradient-to-br from-[var(--veyla-purple)] to-[#5b1fd6] py-2 px-5 rounded-full font-medium text-[14px] text-white border border-[rgba(123,57,252,0.4)] cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(123,57,252,0.15)] hover:shadow-[0_0_30px_rgba(123,57,252,0.3)] hover:border-[rgba(123,57,252,0.6)] hover:-translate-y-px",
};

function isInternal(href: string) {
    return href.startsWith('/') || href.startsWith('#');
}

export const Button = forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ variant = 'primary', href, shimmer = false, className, children, ...props }, ref) => {
    const classes = cn(variantStyles[variant], shimmer && 'btn-shimmer', className);
    const content = shimmer
        ? <span className="flex items-center justify-center gap-2 w-full">{children}</span>
        : children;

    if (href) {
        if (isInternal(href)) {
            return (
                <Link
                    href={href}
                    className={classes}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {content}
                </Link>
            );
        }

        return (
            <a
                href={href}
                className={classes}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            className={classes}
            ref={ref as React.Ref<HTMLButtonElement>}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {content}
        </button>
    );
});

Button.displayName = 'Button';
