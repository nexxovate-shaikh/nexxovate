"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${
            isHome && !scrolled
              ? "bg-transparent"
              : "bg-white/95 backdrop-blur-xl shadow-sm"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Nexxovate"
              width={160}
              height={40}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Staffing", path: "/staffing" },
              { name: "Training", path: "/training" },
              { name: "Insights", path: "/insights" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <NavLink
                key={item.name}
                href={item.path}
                label={item.name}
                pathname={pathname}
                light={isHome && !scrolled}
              />
            ))}
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden text-2xl ${
              isHome && !scrolled ? "text-white" : "text-gray-800"
            }`}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl">

            {/* MOBILE HEADER */}
            <div className="h-16 px-5 flex items-center justify-between border-b">
              <Image
                src="/logo.png"
                alt="Nexxovate"
                width={140}
                height={36}
                className="h-6 w-auto"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            {/* MOBILE LINKS */}
            <nav className="flex flex-col px-6 py-8 gap-6 text-base font-medium">
              {[
                "Home",
                "Services",
                "Staffing",
                "Training",
                "Insights",
                "About",
                "Contact",
              ].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-800 hover:text-purple-600 transition"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* SPACER (prevents content hide under fixed header) */}
      <div className="h-16" />
    </>
  );
}

/* ---------------- NAV LINK ---------------- */

function NavLink({
  href,
  label,
  pathname,
  light,
}: {
  href: string;
  label: string;
  pathname: string;
  light: boolean;
}) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`relative transition-colors duration-200
        ${
          light
            ? active
              ? "text-pink-300"
              : "text-white hover:text-pink-300"
            : active
            ? "text-purple-600"
            : "text-gray-700 hover:text-purple-600"
        }
      `}
    >
      {label}

      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300
          ${active ? "w-full" : "w-0 hover:w-full"}
        `}
      />
    </Link>
  );
}
