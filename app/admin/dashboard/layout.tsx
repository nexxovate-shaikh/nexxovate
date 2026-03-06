"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className={`
        fixed md:static z-40 top-0 left-0 h-full w-64
        bg-gradient-to-b from-violet-700 via-purple-700 to-indigo-900 text-white flex flex-col
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300
      `}>

        {/* Logo */}
        <div className="p-6 border-b border-purple-500 flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="Nexxovate"
            width={50}
            height={50}
          />

          <div>
            <h1 className="text-lg font-bold">Nexxovate</h1>
            <p className="text-xs text-purple-200">Enterprise Platform</p>
          </div>

        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 text-sm">

          <Link href="/admin/dashboard" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Dashboard
          </Link>

          <Link href="/admin/dashboard/pipeline" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Sales Pipeline
          </Link>

          <Link href="/admin/dashboard/analytics" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Analytics
          </Link>

          <Link href="/admin/dashboard/settings" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Settings
          </Link>

        </nav>

        <div className="p-6 border-t border-purple-500 text-xs text-purple-200">
          © 2026 Nexxovate
        </div>

      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8">

          {/* Mobile Menu */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          {/* Search */}
          <div className="hidden md:block w-96">
            <input
              placeholder="Search leads..."
              className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            <button className="text-gray-600">🔔</button>

            <div className="relative">

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2"
              >

                <div className="w-9 h-9 bg-purple-600 text-white flex items-center justify-center rounded-full">
                  A
                </div>

                <span className="hidden md:block text-sm">Admin</span>

              </button>

              {menuOpen && (

                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border">

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          </div>

        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-10 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}