"use client";

import { X, Zap, Star, Clock } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: Zap, label: "Generator", href: "/", active: true },
  { icon: Star, label: "Starred Names", href: "/starred", active: false },
  { icon: Clock, label: "Recent History", href: "/history", active: false },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-52 bg-nomina-panel border-r border-white/5 z-40 px-3 py-6">
        <SidebarContent onClose={onClose} isOpen={isOpen} />
      </aside>

      {/* Mobile Sidebar bg-nomina-panel*/}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-black border-r border-white/5 z-40 px-3 py-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-nomina-muted hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}

function SidebarContent({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen?: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-3 mb-8">
        <span className="text-lg font-black tracking-tight text-white">
          Nomina<span className="text-nomina-accent">AI</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ icon: Icon, label, href, active }) => (
          <Link
            key={label}
            href={href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-nomina-accent/20 text-nomina-accent border border-nomina-accent/30"
                : "text-nomina-muted hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      {/* <div className={`mt-auto px-3 mb-5 ${isOpen ? "mb-5" : "mb-0"}`}>
        <button className="w-full py-2.5 rounded-xl bg-linear-to-r from-nomina-accent to-violet-500 text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-nomina-accent/20">
          Upgrade to Pro
        </button>
      </div> */}
    </div>
  );
}
