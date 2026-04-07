"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface ShinyButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "secondary";
}

export default function ShinyButton({
    children,
    href,
    onClick,
    className = "",
    variant = "primary",
}: ShinyButtonProps) {
    const baseClasses =
        variant === "primary"
            ? "bg-white text-teal-600 hover:bg-teal-50 shadow-md"
            : "bg-white/15 hover:bg-white/25 border border-white/30 text-white";

    const inner = (
        <span
            className={`relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition overflow-hidden group ${baseClasses} ${className}`}
        >
            <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                aria-hidden
            >
                <span
                    className="absolute top-0 -left-[75%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-15deg]"
                    style={{
                        animation: "none",
                    }}
                />
            </span>
            <style>{`
                .group:hover .shine-ray {
                    animation: shine-sweep 0.6s ease-in-out;
                }
            `}</style>
            <span
                className="shine-ray absolute top-0 -left-[75%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-15deg] opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                    animation: "none",
                }}
                aria-hidden
            />
            {children}
        </span>
    );

    if (href) {
        return <Link href={href}>{inner}</Link>;
    }

    return (
        <button onClick={onClick} type="button">
            {inner}
        </button>
    );
}
