"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {

    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/nexxovate-login-bg.png')",
      }}
    >

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl w-96">

        <h1 className="text-xl font-bold mb-6 text-center">
          Nexxovate CRM Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border w-full p-2 mb-2 rounded"
        />

        <div className="text-right mb-4">
          <button
            onClick={()=>router.push("/admin/forgot")}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          onClick={login}
          disabled={loading}
          className="bg-black text-white w-full p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>
  );
}