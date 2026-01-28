"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-14 text-sm">

        {/* Brand */}
        <div className="md:col-span-2 space-y-6">
          <Image
            src="/logo.png"
            alt="Nexxovate"
            width={180}
            height={60}
            className="w-auto"
          />

          <p className="text-gray-600 max-w-md leading-relaxed text-[15px]">
            Powering intelligent IT operations, cybersecurity, digital transformation,
            staffing and enterprise innovation through execution excellence.
          </p>

          {/* Socials */}
          <div className="flex gap-5 pt-4">
            <Social href="#"><Linkedin size={18} /></Social>
            <Social href="#"><Facebook size={18} /></Social>
            <Social href="#"><Instagram size={18} /></Social>
            <Social href="#"><Youtube size={18} /></Social>
          </div>
        </div>

        {/* Services */}
        <Column title="Services">
          <Link href="#">IT & Managed Services</Link>
          <Link href="#">AI & Automation</Link>
          <Link href="#">Cybersecurity</Link>
          <Link href="#">Digital Transformation</Link>
          <Link href="#">Consulting</Link>
        </Column>

        {/* Company */}
        <Column title="Company">
          <Link href="/about">About</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
        </Column>

        {/* Newsletter */}
        <div>
          <h4 className="font-medium text-gray-900">Stay Connected</h4>

          <p className="mt-5 text-gray-600 leading-relaxed">
            Join our newsletter for insights on IT, AI, security and innovation.
          </p>

          <form className="mt-6 flex bg-gray-50 border rounded-2xl overflow-hidden focus-within:ring-2 ring-purple-500">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent px-5 py-3 outline-none text-sm"
            />
            <button className="bg-black text-white px-6 text-sm font-medium hover:bg-gray-900 transition">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 pb-10">
        © {new Date().getFullYear()} Nexxovate. Crafted for intelligent enterprises.
      </div>
    </footer>
  );
}

function Social({ href, children }: any) {
  return (
    <a
      href={href}
      target="_blank"
      className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition"
    >
      {children}
    </a>
  );
}

function Column({ title, children }: any) {
  return (
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="mt-6 flex flex-col gap-3 text-gray-600">
        {children}
      </div>
    </div>
  );
}
