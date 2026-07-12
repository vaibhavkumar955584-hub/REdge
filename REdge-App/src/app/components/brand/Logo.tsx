"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | number;
  variant?: "light" | "dark" | "icon" | "monochrome";
  showText?: boolean;
  className?: string;
  href?: string;
}

export const Logo = ({
  size = "md",
  variant = "light",
  showText = true,
  className = "",
  href = "/",
}: LogoProps) => {
  const getSize = () => {
    if (typeof size === "number") return size;
    switch (size) {
      case "sm": return 24;
      case "md": return 32;
      case "lg": return 48;
      default: return 32;
    }
  };

  const s = getSize();
  const textVisible = variant !== "icon" && showText;

  // Colors based on variant
  const textColor = variant === "dark" ? "text-white" : "text-slate-900";
  const iconOnly = variant === "icon";

  const LogoIcon = () => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <rect width="40" height="40" rx="10" fill={variant === "monochrome" ? "currentColor" : "url(#logo_grad_comp)"} />
      <path d="M14 11V29" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M14 11H22C25.3137 11 28 13.6863 28 17C28 20.3137 25.3137 23 22 23H14" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 23L29 32" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M26 29H32V23" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="logo_grad_comp" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8B5CF6"/>
          <stop offset="1" stop-color="#6D28D9"/>
        </linearGradient>
      </defs>
    </svg>
  );

  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoIcon />
      {textVisible && (
        <span
          className={`font-black tracking-tighter ${textColor}`}
          style={{ fontSize: `${s * 0.7}px` }}
        >
          REdge
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};
