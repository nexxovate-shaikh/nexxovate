"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");

  async function handleReset() {
    await fetch("/api/admin/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    alert("Password updated");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />

        <button
          onClick={handleReset}
          className="bg-black text-white w-full p-2 rounded"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}