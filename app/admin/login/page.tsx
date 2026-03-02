"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const ok = sessionStorage.getItem("admin");
    if (ok) router.replace("/admin");
  }, [router]);

  async function login() {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ allow cookie
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // mark logged in locally
      sessionStorage.setItem("admin", "true");

      // redirect
      router.replace("/admin");

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-xl rounded-xl w-[320px]">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={login}
          className="bg-black text-white px-4 py-2 w-full rounded hover:opacity-90"
        >
          Login
        </button>
      </div>
    </div>
  );
}