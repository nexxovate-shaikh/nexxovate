"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { useEffect, useState } from "react";

type Lead = {
  status?: "New" | "Contacted" | "Closed";
};

export default function AnalyticsPage() {

  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {

    fetch("/api/contact/lead")
      .then(res => res.json())
      .then(data => setLeads(data));

  }, []);

  const stats = {

    new: leads.filter(l => l.status === "New").length,

    contacted: leads.filter(l => l.status === "Contacted").length,

    closed: leads.filter(l => l.status === "Closed").length,
  };

  const data = [

    { name: "New", value: stats.new },

    { name: "Contacted", value: stats.contacted },

    { name: "Closed", value: stats.closed }

  ];

  const COLORS = ["#6366f1", "#06b6d4", "#22c55e"];

  return (

    <div className="space-y-8">

      <h1 className="text-2xl font-semibold">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={data}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#6366f1"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <ResponsiveContainer width="100%" height={250}>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                outerRadius={90}
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}