"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [pass, setPass] = useState("");
  const router = useRouter();

  // if already logged in → go to dashboard
  useEffect(() => {
    const ok = sessionStorage.getItem("admin");
    if (ok) router.push("/admin");
  }, [router]);

  async function login() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pass }),
    });

    if (res.ok) {
      sessionStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("Wrong password");
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
          value={pass}
          onChange={(e) => setPass(e.target.value)}
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
