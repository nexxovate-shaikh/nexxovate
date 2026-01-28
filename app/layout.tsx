import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import NexxovateAI from "./components/NexxovateAI";

export const metadata: Metadata = {
  title: "Nexxovate – Powering Intelligent IT Operations",
  description:
    "Enterprise IT, AI, Cybersecurity, Staffing and Digital Transformation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased overflow-x-hidden">

        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating UI (always above everything) */}
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <div className="pointer-events-auto">
            <Chatbot />
            <NexxovateAI />
          </div>
        </div>

      </body>
    </html>
  );
}
