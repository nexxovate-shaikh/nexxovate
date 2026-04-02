"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
// Adding these for the "Posh" look - standard in high-end dashboards
import { FiDownload, FiLogOut, FiCpu, FiMail, FiSearch, FiActivity } from "react-icons/fi";

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

  // YOUR EXISTING LOGIC - UNTOUCHED
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
    // NEW UI: Deep Zinc palette for that "LTM" premium feel
    <div className="min-h-screen bg-[#0b0b0d] text-zinc-400 p-6 lg:p-12 font-sans">
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-light text-white tracking-tighter">
              Executive <span className="text-zinc-500 italic">Overview</span>
            </h1>
            <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest">Nexxovate Intelligence Hub</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={exportExcel}
              className="flex items-center gap-2 bg-zinc-900 border border-white/5 hover:border-emerald-500/50 text-zinc-300 px-5 py-2.5 rounded-full transition-all text-sm"
            >
              <FiDownload /> Export Data
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-zinc-900 border border-white/5 hover:border-red-500/50 text-red-400 px-5 py-2.5 rounded-full transition-all text-sm"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* STATS: Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "High Intent", val: leads.filter(l => l.score > 50).length, color: "text-orange-400" },
            { label: "Active Pipeline", val: leads.filter(l => l.status === "Contacted").length, color: "text-blue-400" },
            { label: "Conversion Rate", val: leads.filter(l => l.status === "Closed").length, color: "text-emerald-400" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] backdrop-blur-md">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <FiActivity size={12}/> {stat.label}
              </p>
              <p className={`text-5xl font-extralight tracking-tighter ${stat.color}`}>
                {stat.val}
              </p>
            </div>
          ))}
        </div>

        {/* MAIN SEARCH & LIST SECTION */}
        <div className="bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
          <div className="relative group max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name or email..."
              className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                <tr>
                  <th className="pb-4 pl-4">Lead Profile</th>
                  <th className="pb-4">Interest</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-center">Engagement Score</th>
                  <th className="pb-4">Next Follow-up</th>
                  <th className="pb-4 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead.Email || i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="bg-zinc-900/50 rounded-l-2xl py-5 pl-6">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{lead.Name}</span>
                        <span className="text-xs text-zinc-500">{lead.Email}</span>
                      </div>
                    </td>
                    <td className="bg-zinc-900/50 italic text-zinc-400 text-sm">
                      {lead.Interest}
                    </td>
                    <td className="bg-zinc-900/50">
                      <select
                        value={lead.status}
                        className="bg-zinc-950 text-xs border border-white/10 rounded-lg px-2 py-1 text-zinc-300 focus:outline-none cursor-pointer"
                        onChange={e => updateStatus(i, e.target.value as Lead["status"])}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="bg-zinc-900/50 text-center font-mono">
                      <span className={`px-3 py-1 rounded-full text-xs border ${lead.score > 50 ? 'border-purple-500/30 bg-purple-500/10 text-purple-400' : 'border-zinc-700 bg-zinc-800 text-zinc-500'}`}>
                        {lead.score}
                      </span>
                    </td>
                    <td className="bg-zinc-900/50">
                      <input
                        type="date"
                        className="bg-transparent text-xs text-zinc-500 border-none focus:ring-0 invert opacity-50 hover:opacity-100 transition-opacity"
                        value={lead.followUp || ""}
                        onChange={e => setReminder(i, e.target.value)}
                      />
                    </td>
                    <td className="bg-zinc-900/50 rounded-r-2xl pr-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => generateReply(lead)}
                          className="p-2 bg-purple-600/10 text-purple-400 hover:bg-purple-600 hover:text-white rounded-xl transition-all"
                          title="Generate AI Reply"
                        >
                          <FiCpu size={16} />
                        </button>
                        <a
                          href={`mailto:${lead.Email}`}
                          className="p-2 bg-zinc-800 text-zinc-400 hover:bg-zinc-200 hover:text-black rounded-xl transition-all"
                        >
                          <FiMail size={16} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI PANEL: Subtle slide-up interaction */}
        {aiReply && (
          <div className="bg-zinc-900 border border-purple-500/20 p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <h2 className="text-sm font-bold text-white tracking-widest uppercase">
                AI Outreach Intelligence
              </h2>
            </div>
            <textarea
              value={aiReply}
              readOnly
              className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl p-6 h-48 text-zinc-300 leading-relaxed focus:outline-none resize-none"
            />
            <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => navigator.clipboard.writeText(aiReply)}
                  className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-4"
                >
                  Copy to Clipboard
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}