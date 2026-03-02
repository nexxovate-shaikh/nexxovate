"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-80">

        <h1 className="text-xl font-bold mb-4 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <button
          onClick={login}
          className="bg-black text-white w-full p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}