"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/contact/lead");
        const data = await res.json();

        // ✅ safety check
        if (Array.isArray(data)) {
          setLeads(data);
        } else {
          console.error("Invalid data:", data);
          setLeads([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div className="p-6">Loading leads...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Live Leads Dashboard</h1>

      {leads.length === 0 ? (
        <p>No leads yet.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Interest</th>
              <th className="p-2 border">Business</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr key={i}>
                <td className="p-2 border">{lead.Name}</td>
                <td className="p-2 border">{lead.Email}</td>
                <td className="p-2 border">{lead.Interest}</td>
                <td className="p-2 border">{lead["Business Type"]}</td>
                <td className="p-2 border">{lead.Timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
