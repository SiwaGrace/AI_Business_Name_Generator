"use client";

import { X, Zap, Star, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 z-40 hidden h-full w-52 flex-col border-r border-border bg-surface px-3 py-6 lg:flex">
        <SidebarContent onClose={onClose} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 border-r border-border bg-surface px-3 py-6 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-card hover:text-heading"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  const navItems = [
    { icon: Zap, label: "Generator", href: "/", active: pathname === "/" },
    {
      icon: Star,
      label: "Starred Names",
      href: "/starred",
      active: pathname === "/starred",
    },
    {
      icon: Clock,
      label: "Recent History",
      href: "/history",
      active: pathname === "/history",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-3 mb-8">
        <span className="font-heading text-lg font-black tracking-tight text-heading">
          Namelify<span className="text-accent">AI</span>
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
                ? "border border-accent/30 bg-accent-dim text-accent"
                : "text-muted hover:bg-card hover:text-heading"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      {/* <div className={`mt-auto px-3 mb-5 ${isOpen ? "mb-5" : "mb-0"}`}>
        <button className="w-full py-2.5 rounded-xl bg-linear-to-r from-namelify-accent to-violet-500 text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-namelify-accent/20">
          Upgrade to Pro
        </button>
      </div> */}
    </div>
  );
}
