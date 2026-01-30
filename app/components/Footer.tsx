"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* GRID */}
        <div className="grid gap-12 md:grid-cols-5 text-sm">

          {/* BRAND */}
          <div className="md:col-span-2 space-y-5">
            <Image
              src="/logo.png"
              alt="Nexxovate"
              width={160}
              height={50}
              className="w-auto"
            />

            <p className="text-gray-600 leading-relaxed max-w-md">
              Powering intelligent IT operations, cybersecurity, digital
              transformation, staffing and enterprise innovation through
              execution excellence.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 pt-2">
              <Social href="#"><Linkedin size={18} /></Social>
              <Social href="#"><Facebook size={18} /></Social>
              <Social href="#"><Instagram size={18} /></Social>
              <Social href="#"><Youtube size={18} /></Social>
            </div>
          </div>

          {/* SERVICES */}
          <Column title="Services">
            <span>IT & Managed Services</span>
            <span>AI & Automation</span>
            <span>Cybersecurity</span>
            <span>Digital Transformation</span>
            <span>Consulting</span>
          </Column>

          {/* COMPANY */}
          <Column title="Company">
            <Link href="/about">About</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
          </Column>

          {/* NEWSLETTER */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Stay Connected</h4>

            <p className="text-gray-600 leading-relaxed">
              Get insights on IT, AI, security and enterprise innovation.
            </p>

            <form className="flex bg-gray-50 border rounded-xl overflow-hidden focus-within:ring-2 ring-purple-500">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-4 py-3 outline-none text-sm"
              />
              <button
                type="button"
                className="bg-black text-white px-5 text-sm font-medium hover:bg-gray-900 transition"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t mt-12 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Nexxovate. Crafted for intelligent enterprises.
        </div>

      </div>
    </footer>
  );
}

/* ------------------ HELPERS ------------------ */

function Social({ href, children }: any) {
  return (
    <a
      href={href}
      target="_blank"
      className="w-9 h-9 rounded-full border flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition"
    >
      {children}
    </a>
  );
}

function Column({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="flex flex-col gap-3 text-gray-600">
        {children}
      </div>
    </div>
  );
}
