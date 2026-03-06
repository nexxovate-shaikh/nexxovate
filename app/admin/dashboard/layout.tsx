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

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="flex min-h-screen bg-gray-100 relative">

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
            width={60}
            height={60}
            className="drop-shadow-lg"
          />

          <div>
            <h1 className="text-xl font-bold">Nexxovate</h1>
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

        {/* Footer */}
        <div className="p-6 border-t border-purple-500 text-xs text-purple-200">
          © 2026 Nexxovate Technologies
        </div>

      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">

          {/* Search */}
          <div className="w-96">
            <input
              placeholder="Search leads, companies..."
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">

            {/* Notifications */}
            <button className="relative text-gray-600 hover:text-gray-900">

              🔔

              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded">
                3
              </span>

            </button>

            {/* Profile Dropdown */}
            <div className="relative">

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2"
              >

                <div className="w-9 h-9 bg-purple-600 text-white flex items-center justify-center rounded-full">
                  A
                </div>

                <div className="text-sm text-left">
                  <p className="font-medium text-gray-800">Admin</p>
                  <p className="text-xs text-gray-500">Owner</p>
                </div>

              </button>

              {menuOpen && (

                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border z-50">

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

        {/* Page Content */}
        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}