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

        {/* Global layout wrapper (CRITICAL for mobile) */}
        <div className="relative min-h-screen w-full overflow-x-hidden">

          {/* Navbar */}
          <Navbar />

          {/* Main content */}
          <main className="relative z-10 w-full">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating UI — MOBILE SAFE */}
          <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-auto">
            <Chatbot />
            <NexxovateAI />
          </div>

        </div>
      </body>
    </html>
  );
}
