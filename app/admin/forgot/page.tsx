"use client";

import { useState } from "react";

export default function ForgotPage(){

  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");

  async function send(){

    const res=await fetch("/api/admin/forgot",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({email})
    })

    const data=await res.json()

    setMessage(data.message)

  }

  return(
    <div className="h-screen flex items-center justify-center">

      <div className="bg-white p-6 shadow rounded w-96">

        <h2 className="text-lg font-bold mb-4">
          Reset Password
        </h2>

        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Enter email"
          className="border w-full p-2 mb-3"
        />

        <button
          onClick={send}
          className="bg-black text-white w-full p-2"
        >
          Send reset link
        </button>

        <p className="mt-3 text-sm">
          {message}
        </p>

      </div>

    </div>
  )

}