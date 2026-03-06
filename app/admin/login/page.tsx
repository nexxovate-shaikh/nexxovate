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
      className="h-screen w-full bg-cover bg-top relative"
      style={{
        backgroundImage: "url('/images/nexxovate-login-bg.png')"
      }}
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login container positioned bottom right */}
      <div className="absolute bottom-16 right-16">

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-2xl w-96 text-white">

          <h1 className="text-2xl font-bold mb-6 text-center">
            Nexxovate CRM Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-3 mb-3 rounded bg-white/20 border border-white/30 placeholder-white/70 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 mb-2 rounded bg-white/20 border border-white/30 placeholder-white/70 text-white"
          />

          <div className="text-right mb-4">

            <button
              onClick={()=>router.push("/admin/forgot")}
              className="text-sm text-blue-300 hover:underline"
            >
              Forgot password?
            </button>

          </div>

          <button
            onClick={login}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full p-3 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

      </div>

    </div>

  );

}