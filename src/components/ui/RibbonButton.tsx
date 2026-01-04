"use client";
import React from "react";

interface RibbonButtonProps {
  label?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  size?: "large" | "medium" | "small";
  disabled?: boolean;
}

export function RibbonButton({ label, icon, onClick, size = "large", disabled }: RibbonButtonProps) {
  const baseStyles = "flex items-center justify-center hover:bg-[#edebe9] rounded-sm transition-colors disabled:opacity-30";

  if (size === "large") {
    return (
      <button onClick={onClick} disabled={disabled} className={`${baseStyles} flex-col px-3 w-14 h-full`}>
        <div className="text-[#0078d4] mb-1">{icon}</div>
        <span className="text-[10px] leading-tight text-[#323130] text-center max-w-15 line-clamp-2">
          {label}
        </span>
      </button>
    );
  }

  if (size === "medium") {
    return (
      <button onClick={onClick} disabled={disabled} className={`${baseStyles} gap-2 px-2 h-7 w-full justify-start`}>
        <div className="text-[#323130] scale-75">{icon}</div>
        <span className="text-[11px] text-[#323130] whitespace-nowrap">{label}</span>
      </button>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} p-1`} title={label}>
      <div className="text-[#323130] scale-75">{icon}</div>
    </button>
  );
}

export function RibbonSeparator() {
  return <div className="w-px h-12 bg-[#e1dfdd] mx-1 align-self-center" />;
}