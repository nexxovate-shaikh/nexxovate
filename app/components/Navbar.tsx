"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Staffing", href: "/staffing" },
    { name: "Training", href: "/training" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Nexxovate"
                width={130}
                height={36}
                priority
                className="h-8 w-auto"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-purple-600 transition"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/contact"
                className="ml-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm hover:scale-105 transition"
              >
                Talk to an Expert
              </Link>
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm">
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">

            {/* MOBILE HEADER */}
            <div className="h-16 px-4 flex items-center justify-between border-b">
              <Image
                src="/images/logo.png"
                alt="Nexxovate"
                width={120}
                height={32}
                className="h-7 w-auto"
              />

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            {/* MOBILE LINKS */}
            <nav className="flex-1 px-6 py-8 flex flex-col gap-6 text-base font-medium">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-800 hover:text-purple-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* MOBILE CTA */}
            <div className="px-6 pb-8">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-full font-medium"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SPACER FOR FIXED HEADER */}
      <div className="h-16" />
    </>
  );
}
