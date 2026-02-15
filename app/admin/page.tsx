"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type Lead = {
  Name: string;
  Email: string;
  Interest: string;
  "Business Type": string;
  status: "New" | "Contacted" | "Closed";
  score: number;
  notes: string;
  followUp?: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [aiReply, setAiReply] = useState("");

  /* ---------- Auth ---------- */
  useEffect(() => {
    const ok = sessionStorage.getItem("admin");
    if (!ok) router.push("/admin/login");
  }, [router]);

  /* ---------- Load leads ---------- */
  useEffect(() => {
    fetch("/api/contact/lead")
      .then(res => res.json())
      .then((data: any[]) => {
        const enhanced = data.map(l => ({
          ...l,
          status: "New",
          score: scoreLead(l),
          notes: "",
        }));
        setLeads(enhanced);
      });
  }, []);

  function scoreLead(lead: any) {
    let s = 0;
    if (lead.Interest?.includes("AI")) s += 40;
    if (lead["Business Type"] === "Enterprise") s += 30;
    if (lead.Interest?.includes("IT")) s += 20;
    return s;
  }

  /* ---------- Actions ---------- */

  function updateStatus(i: number, status: Lead["status"]) {
    const copy = [...leads];
    copy[i].status = status;
    setLeads(copy);
    addLog(`Lead ${copy[i].Name} → ${status}`);
  }

  function setReminder(i: number, date: string) {
    const copy = [...leads];
    copy[i].followUp = date;
    setLeads(copy);
    addLog(`Follow-up set for ${copy[i].Name}`);
  }

  function addLog(entry: string) {
    setLog(prev => [new Date().toLocaleString() + " — " + entry, ...prev]);
  }

  /* ---------- Export ---------- */

  function exportExcel() {
    const ws = XLSX.utils.json_to_sheet(leads);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    const buf = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([buf]), "nexxovate_leads.xlsx");
  }

  function logout() {
    sessionStorage.removeItem("admin");
    router.push("/admin/login");
  }

  const filtered = leads.filter(
    l =>
      l.Name?.toLowerCase().includes(search.toLowerCase()) ||
      l.Email?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="flex justify-between items-center bg-black text-white px-6 py-3">
        <h1 className="font-semibold text-lg">Nexxovate CRM</h1>

        <div className="flex gap-3">
          <button onClick={exportExcel} className="bg-green-600 px-3 py-1 rounded">
            Export Excel
          </button>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </div>

      <div className="p-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded">
            <h3>Hot Leads</h3>
            <p className="text-2xl font-bold">
              {leads.filter(l => l.score > 50).length}
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3>Contacted</h3>
            <p className="text-2xl font-bold">
              {leads.filter(l => l.status === "Contacted").length}
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3>Closed</h3>
            <p className="text-2xl font-bold">
              {leads.filter(l => l.status === "Closed").length}
            </p>
          </div>
        </div>

        {/* Search */}
        <input
          placeholder="Search leads…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 w-full rounded"
        />

        {/* Leads table */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Name</th>
                <th>Email</th>
                <th>Interest</th>
                <th>Status</th>
                <th>Score</th>
                <th>Follow-up</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((lead, i) => (
                <tr key={i} className="border-t">

                  <td className="p-2">{lead.Name}</td>
                  <td>{lead.Email}</td>
                  <td>{lead.Interest}</td>

                  <td>
                    <select
                      value={lead.status}
                      onChange={e => updateStatus(i, e.target.value as any)}
                      className="border p-1"
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Closed</option>
                    </select>
                  </td>

                  <td className="font-bold text-purple-600">{lead.score}</td>

                  <td>
                    <input
                      type="date"
                      onChange={e => setReminder(i, e.target.value)}
                      className="border p-1"
                    />
                  </td>

                  <td className="flex gap-2">

                    <button
                      onClick={async () => {
                        const res = await fetch("/api/ai/reply", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ lead }),
                        });

                        const data = await res.json();
                        setAiReply(data.reply);
                      }}
                      className="bg-purple-600 text-white px-2 rounded"
                    >
                      AI Reply
                    </button>

                    <button
                      onClick={() =>
                        (window.location.href = `mailto:${lead.Email}`)
                      }
                      className="bg-blue-500 text-white px-2 rounded"
                    >
                      Email
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Reply Panel */}
        {aiReply && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">AI Suggested Reply</h3>
            <textarea
              value={aiReply}
              readOnly
              className="w-full h-40 border p-2 rounded"
            />
          </div>
        )}

        {/* Activity log */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Activity Log</h3>
          <div className="text-sm max-h-40 overflow-y-auto">
            {log.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
