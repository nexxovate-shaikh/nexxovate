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
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          isHome
            ? scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-lg"
              : "bg-transparent"
            : "bg-white/95 backdrop-blur-xl shadow-md"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Nexxovate"
            width={220}
            height={100}
            priority
            className={`transition-all duration-500 ${
              scrolled || !isHome ? "h-8" : "h-9"
            } w-auto`}
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-10 text-sm font-medium items-center tracking-wide">
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

        {/* MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden text-2xl transition ${
            isHome && !scrolled ? "text-white" : "text-gray-800"
          }`}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-xl border-t">
          <nav className="flex flex-col px-6 py-6 space-y-4 text-sm font-medium">
            {["Home","Services","Staffing","Training","Insights","About","Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

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
      className={`relative transition-colors duration-300 ${
        light
          ? active
            ? "text-indigo-300"
            : "text-white hover:text-indigo-300"
          : active
          ? "text-indigo-600"
          : "text-gray-700 hover:text-indigo-600"
      }`}
    >
      {label}

      <span
        className={`absolute left-0 -bottom-2 h-[2px] bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500 ${
          active ? "w-full" : "w-0 hover:w-full"
        }`}
      />
    </Link>
  );
}
