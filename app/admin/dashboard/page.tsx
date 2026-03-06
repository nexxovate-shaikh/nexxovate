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
  const [search, setSearch] = useState("");
  const [aiReply, setAiReply] = useState("");

  useEffect(() => {

    fetch("/api/admin/check", {
      credentials: "include",
    }).then(res => {
      if (!res.ok) router.replace("/admin/login");
    });

  }, [router]);

  useEffect(() => {

    fetch("/api/contact/lead")
      .then(res => res.json())
      .then((data: any[]) => {

        const enhanced: Lead[] = data.map(l => ({
          ...l,
          status: "New",
          score: scoreLead(l),
          notes: ""
        }));

        setLeads(enhanced);
      })
      .catch(err => console.error("Lead fetch error:", err));

  }, []);

  function scoreLead(lead: any) {

    let s = 0;

    if (lead?.Interest?.includes("AI")) s += 40;
    if (lead?.["Business Type"] === "Enterprise") s += 30;
    if (lead?.Interest?.includes("IT")) s += 20;

    return s;
  }

  function updateStatus(i: number, status: Lead["status"]) {

    const copy = [...leads];
    copy[i] = { ...copy[i], status };

    setLeads(copy);
  }

  function setReminder(i: number, date: string) {

    const copy = [...leads];
    copy[i] = { ...copy[i], followUp: date };

    setLeads(copy);
  }

  async function generateReply(lead: Lead) {

    try {

      setAiReply("Generating AI reply...");

      const res = await fetch("/api/ai/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lead: lead
        })
      });

      const data = await res.json();

      setAiReply(data.reply || "AI failed to generate reply.");

    } catch (error) {

      console.error("AI FETCH ERROR:", error);
      setAiReply("Error generating AI reply.");

    }
  }

  function exportExcel() {

    const ws = XLSX.utils.json_to_sheet(leads);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Leads");

    const buf = XLSX.write(wb, {
      type: "array",
      bookType: "xlsx"
    });

    saveAs(new Blob([buf]), "nexxovate_leads.xlsx");
  }

  async function logout() {

    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include"
    });

    router.replace("/admin/login");
  }

  const filtered = leads.filter(l =>
    l.Name?.toLowerCase().includes(search.toLowerCase()) ||
    l.Email?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="space-y-10">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <div className="flex gap-3">

          <button
            onClick={exportExcel}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
          >
            Export Excel
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Hot Leads
          </p>
          <p className="text-3xl font-bold text-orange-500">
            {leads.filter(l => l.score > 50).length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Contacted
          </p>
          <p className="text-3xl font-bold text-blue-500">
            {leads.filter(l => l.status === "Contacted").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Closed
          </p>
          <p className="text-3xl font-bold text-green-500">
            {leads.filter(l => l.status === "Closed").length}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        

        <table className="w-full text-sm">

          <thead className="text-left text-gray-500">
            <tr>
              <th>Name</th>
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

              <tr key={lead.Email || i} className="border-t">

                <td>{lead.Name}</td>
                <td>{lead.Email}</td>
                <td>{lead.Interest}</td>

                <td>
                  <select
                    value={lead.status}
                    onChange={e =>
                      updateStatus(i, e.target.value as Lead["status"])
                    }
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>

                <td className="text-purple-600 font-bold">
                  {lead.score}
                </td>

                <td>
                  <input
                    type="date"
                    value={lead.followUp || ""}
                    onChange={e =>
                      setReminder(i, e.target.value)
                    }
                  />
                </td>

                <td className="flex gap-2">

                  <button
                    onClick={() => generateReply(lead)}
                    className="bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    AI Reply
                  </button>

                  <a
                    href={`mailto:${lead.Email}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Email
                  </a>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {aiReply && (

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-3">
            AI Suggested Reply
          </h2>

          <textarea
            value={aiReply}
            readOnly
            className="w-full border rounded p-4 h-48"
          />

        </div>

      )}

    </div>

  );
}