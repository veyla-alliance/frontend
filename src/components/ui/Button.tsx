"use client";

import React, { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'navbar';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    href?: string;
    shimmer?: boolean;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    ({ variant = 'primary', href, shimmer = false, className = '', children, ...props }, ref) => {
        const getVariantClass = () => {
            if (variant === 'secondary') return 'btn-secondary';
            if (variant === 'navbar') return 'btn-getstarted';
            return 'btn-primary';
        };

        const classes = [getVariantClass(), shimmer ? 'btn-shimmer' : '', className].filter(Boolean).join(' ');

        if (href) {
            return (
                <a href={href} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {shimmer ? <span>{children}</span> : children}
                </a>
            );
        }

        return (
            <button className={classes} ref={ref as React.ForwardedRef<HTMLButtonElement>} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
                {shimmer ? <span>{children}</span> : children}
            </button>
        );
    }
);

Button.displayName = 'Button';
