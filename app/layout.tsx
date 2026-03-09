import { ensureAdminExists } from "@/lib/users";
import "./globals.css";
import type { Metadata } from "next";
import LayoutClient from "./LayoutClient";
import AIScrollAnalyzer from "./components/AIScrollAnalyzer";
export const metadata: Metadata = {
  title: "Nexxovate – Powering Intelligent IT Operations",
  description:
    "Enterprise IT, AI, Cybersecurity, Staffing and Digital Transformation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure admin exists
  await ensureAdminExists();

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased overflow-x-hidden">
        <AIScrollAnalyzer />
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}