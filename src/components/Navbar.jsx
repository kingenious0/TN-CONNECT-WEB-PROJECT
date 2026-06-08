"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Registration", href: "/registration" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md border-b border-surface-border" : "bg-white/90 backdrop-blur-md border-b border-surface-border"
      }`}
      role="banner"
    >
      <nav
        className="px-margin-mobile md:px-margin-desktop max-w-max-width-content mx-auto flex items-center justify-between h-20"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          className="h-12 w-auto flex items-center hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="TN CONNECT — go to homepage"
        >
          <img
            src="/logo.jpg"
            alt="TN Universities Connect Logo"
            className="h-full w-auto object-contain"
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors py-1 text-navy/70 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="bg-navy text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-all shadow-md"
          >
            Login
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: "var(--color-navy)" }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid var(--color-surface-border)",
        }}
      >
        <div className="px-margin-mobile py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-3 rounded-lg text-sm font-semibold transition-colors text-navy/70 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex gap-3 border-t" style={{ borderColor: "var(--color-surface-border)" }}>
            <Link
              href="/login"
              className="bg-navy text-white flex-1 text-center py-2.5 text-sm rounded-lg font-bold hover:bg-primary transition-all shadow-md"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
