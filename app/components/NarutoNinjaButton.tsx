"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NarutoButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  padding?: string;
  transparent?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export const NarutoNinjaButton: React.FC<NarutoButtonProps> = ({
  text,
  onClick,
  href,
  className = "",
  padding,
  transparent = false,
  type = "button",
  ariaLabel,
}) => {
  const content = (
    <>
      <span className="font-bebas tracking-wider uppercase text-lg md:text-xl leading-none pt-0.5">
        {text}
      </span>
      <svg
        width="26"
        height="7"
        viewBox="0 0 26 7"
        aria-hidden="true"
        className="icon shrink-0 self-center ml-2 group-hover:animate-kunai group-hover:fill-white fill-black transition-colors duration-200"
      >
        <path d="M16.172,7,26,3.412,16.213,0l-4,2.66H5.692A2.913,2.913,0,0,0,2.912.527,2.942,2.942,0,0,0,0,3.5,2.942,2.942,0,0,0,2.912,6.473,2.913,2.913,0,0,0,5.692,4.34h6.431ZM2.912,4.792a1.293,1.293,0,0,1,0-2.584,1.293,1.293,0,0,1,0,2.584" />
      </svg>
    </>
  );

  const baseClasses = cn(
    "group relative inline-flex items-center justify-between gap-3 font-semibold",
    "border-2 border-black min-h-10 duration-200 transition-all cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
    padding || "px-4 py-2.5",
    transparent
      ? "bg-transparent text-black hover:bg-black hover:text-white"
      : "bg-white text-black hover:bg-black hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
  );

  if (href) {
    return (
      <div className={className}>
        <Link href={href} aria-label={ariaLabel || text} className={baseClasses}>
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        type={type}
        onClick={onClick}
        aria-label={ariaLabel || text}
        className={baseClasses}
      >
        {content}
      </button>
    </div>
  );
};

export default NarutoNinjaButton;
