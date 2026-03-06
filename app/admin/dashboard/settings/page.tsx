"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [company, setCompany] = useState("Nexxovate");
  const [email, setEmail] = useState("admin@nexxovate.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Settings updated successfully");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        CRM Settings
      </h1>

      {/* Company Information */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Company Information
        </h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Company Name
          </label>

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Admin Account */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Admin Account
        </h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Admin Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Change Password
        </h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            New Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter new password"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveSettings}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}