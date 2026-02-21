"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  // If already logged in → redirect
  useEffect(() => {
    const ok = sessionStorage.getItem("admin");
    if (ok) router.push("/admin");
  }, [router]);

  async function login() {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password, // ✅ MUST MATCH backend
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      sessionStorage.setItem("admin", "true");
      router.push("/admin");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
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