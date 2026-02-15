"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {!isAdmin && <Navbar />}

      <main className="relative z-10 w-full">{children}</main>

      {!isAdmin && <Footer />}

      {!isAdmin && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <Chatbot />
        </div>
      )}
    </div>
  );
}
