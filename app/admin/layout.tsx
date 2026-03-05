import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-violet-700 via-purple-700 to-indigo-900 text-white flex flex-col">

        <div className="p-6 border-b border-purple-500 flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="Nexxovate"
            width={70}
            height={70}
            className="drop-shadow-lg"
          />

          <div>
            <h1 className="text-xl font-bold">Nexxovate</h1>
            <p className="text-xs text-purple-200">Enterprise Platform</p>
          </div>

        </div>

        <nav className="flex-1 p-6 space-y-2 text-sm">

          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Dashboard
          </Link>

          <Link href="/admin/pipeline" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Sales Pipeline
          </Link>

          <Link href="/admin/analytics" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Analytics
          </Link>

          <Link href="/admin/settings" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Settings
          </Link>

        </nav>

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
              className="w-full border rounded-lg px-4 py-2 text-sm"
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

            {/* Profile */}
            <div className="flex items-center gap-2">

              <div className="w-9 h-9 bg-purple-600 text-white flex items-center justify-center rounded-full">
                A
              </div>

              <div className="text-sm">
                <p className="font-medium">Admin</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>

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