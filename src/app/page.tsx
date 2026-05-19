import { BadgeCheck, AlertTriangle, Mail, Smartphone, User, ShieldCheck, BarChart2, RefreshCw, Cpu, Users, Clock, ArrowRight, CheckCircle, XCircle, Circle, Info, AlertCircle } from "lucide-react";

const stats = [
  { label: "Open tickets", value: 18 },
  { label: "Auto-assigned", value: "92%" },
  { label: "Assets tracked", value: 1240 },
  { label: "SLA risk", value: 3 },
];

const tickets = [
  {
    id: "SD-1048",
    school: "Riverside Primary",
    summary: "Chromebook cart will not charge overnight",
    category: "Device fleet",
    priority: "Critical",
    aiConfidence: 94,
    technician: "A. Morgan",
    sla: "2h 14m",
    triageSignal: "Multiple device failures detected in same cart",
  },
  {
    id: "SD-1049",
    school: "Northview High",
    summary: "Grade 10 lab cannot reach assessment portal",
    category: "Network",
    priority: "High",
    aiConfidence: 87,
    technician: "J. Patel",
    sla: "3h 41m",
    triageSignal: "Network outage detected in lab subnet",
  },
  {
    id: "SD-1050",
    school: "Oak Hill Middle",
    summary: "Teacher account locked before first period",
    category: "Identity",
    priority: "Medium",
    aiConfidence: 72,
    technician: "Unassigned",
    sla: "5h 00m",
    triageSignal: "Account lockout pattern matches previous incidents",
  },
];

const notifications = [
  {
    event: "ticket.assigned",
    channel: ["SMS", "Email"],
    recipient: "Technician",
    status: "Delivered",
    summary: "Critical network issue routed to A. Morgan",
  },
  {
    event: "ticket.status_changed",
    channel: ["Email"],
    recipient: "Requester",
    status: "Delivered",
    summary: "Chromebook cart repair moved to in progress",
  },
  {
    event: "ticket.escalated",
    channel: ["SMS"],
    recipient: "School admin",
    status: "Queued",
    summary: "Assessment portal outage escalated",
  },
];

const guardrails = [
  { label: "Sensitive data", status: "Review required", icon: <ShieldCheck className="w-4 h-4 text-sky-400" aria-hidden="true" /> },
  { label: "Low confidence", status: "2 in queue", icon: <AlertTriangle className="w-4 h-4 text-amber-400" aria-hidden="true" /> },
  { label: "Escalation policy", status: "Active", icon: <Cpu className="w-4 h-4 text-emerald-400" aria-hidden="true" /> },
];

const assetSummary = [
  { label: "District health score", value: "87", icon: <BarChart2 className="w-4 h-4 text-emerald-400" aria-hidden="true" /> },
  { label: "Assets at risk", value: 12, icon: <AlertCircle className="w-4 h-4 text-red-500" aria-hidden="true" /> },
  { label: "Mean repair time", value: "1.8d", icon: <Clock className="w-4 h-4 text-sky-400" aria-hidden="true" /> },
  { label: "Repeat issue rate", value: "4.2%", icon: <RefreshCw className="w-4 h-4 text-amber-400" aria-hidden="true" /> },
  { label: "Refresh eligible", value: 38, icon: <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" /> },
];

const assetHealth = [
  {
    school: "Riverside Primary",
    score: 92,
    openTickets: 2,
    refresh: "2026",
    categories: ["Chromebooks", "Repairs"],
  },
  {
    school: "Northview High",
    score: 81,
    openTickets: 5,
    refresh: "2025",
    categories: ["Chromebooks", "Network", "Repairs"],
  },
  {
    school: "Oak Hill Middle",
    score: 74,
    openTickets: 3,
    refresh: "2024",
    categories: ["Tablets", "Repairs"],
  },
  {
    school: "Lakeside Elementary",
    score: 89,
    openTickets: 1,
    refresh: "2027",
    categories: ["Chromebooks", "Network"],
  },
];

function priorityClass(priority: string) {
  switch (priority) {
    case "Critical":
      return "bg-red-500 text-white";
    case "High":
      return "bg-amber-500 text-white";
    case "Medium":
      return "bg-sky-500 text-white";
    default:
      return "bg-zinc-700 text-zinc-100";
  }
}

function scoreClass(score: number) {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 80) return "bg-sky-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-red-500";
}

import React, { useState } from "react";

export default function Home() {
  // Ticket state for interactivity
  const [ticketList, setTicketList] = useState(tickets);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // Action handlers
  function handleAssign(id: string) {
    setTicketList((prev) =>
      prev.map((t) =>
        t.id === id && t.technician === "Unassigned"
          ? { ...t, technician: "A. Morgan" }
          : t
      )
    );
    setActionMsg(`Ticket ${id} assigned to A. Morgan`);
    setTimeout(() => setActionMsg(null), 2000);
  }

  function handleEscalate(id: string) {
    setTicketList((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              priority: "Critical",
              triageSignal: "Escalated by operator",
            }
          : t
      )
    );
    setActionMsg(`Ticket ${id} escalated to Critical`);
    setTimeout(() => setActionMsg(null), 2000);
  }

  function handleResolve(id: string) {
    setTicketList((prev) => prev.filter((t) => t.id !== id));
    setActionMsg(`Ticket ${id} marked as resolved`);
    setTimeout(() => setActionMsg(null), 2000);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/95 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-white">Schooldesk Ops</span>
            <span className="ml-2 px-2 py-0.5 rounded bg-sky-900 text-sky-300 text-xs font-mono uppercase tracking-wider">District Operations</span>
          </div>
          <div className="flex gap-4 flex-wrap text-xs">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800">
                <span className="font-mono text-zinc-300">{stat.label}</span>
                <span className="font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Dashboard grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Triage Queue */}
        <section className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-base font-semibold tracking-tight text-white">AI triage queue</h2>
            <span className="ml-2 px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 text-xs font-mono uppercase tracking-wider">Auto-assignment on</span>
            <span className="ml-2 px-2 py-0.5 rounded bg-amber-900 text-amber-300 text-xs font-mono uppercase tracking-wider">Human review below 80%</span>
          </div>
          <p className="text-xs text-zinc-400 mb-2">Incoming IT support requests</p>
          <div className="flex flex-col gap-3">
            {actionMsg && (
              <div className="mb-2 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-emerald-300 text-xs font-mono w-fit animate-fade-in">
                {actionMsg}
              </div>
            )}
            {ticketList.length === 0 && (
              <div className="text-center text-zinc-400 py-8">All tickets triaged! 🎉</div>
            )}
            {ticketList.map((ticket) => (
              <article key={ticket.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col md:flex-row gap-4 md:items-center">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-zinc-400">{ticket.id}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${priorityClass(ticket.priority)}`}>{ticket.priority}</span>
                    <span className="px-2 py-0.5 rounded bg-sky-900 text-sky-300 text-xs font-semibold">{ticket.category}</span>
                  </div>
                  <div className="font-medium text-sm text-white truncate">{ticket.summary}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                    <Users className="w-4 h-4 text-sky-400" aria-hidden="true" />
                    <span>{ticket.school}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                    <Info className="w-4 h-4 text-sky-400" aria-hidden="true" />
                    <span>{ticket.triageSignal}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[180px]">
                  <div className="bg-zinc-800 rounded px-3 py-2 flex flex-col items-center">
                    <span className="text-xs text-zinc-400">AI confidence</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-bold text-white">{ticket.aiConfidence}%</span>
                      <div className="w-20 h-2 bg-zinc-700 rounded">
                        <div
                          className={`h-2 rounded ${ticket.aiConfidence >= 90 ? "bg-emerald-500" : ticket.aiConfidence >= 80 ? "bg-sky-500" : "bg-amber-500"}`}
                          style={{ width: `${ticket.aiConfidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-800 rounded px-3 py-2 flex flex-col items-center">
                    <span className="text-xs text-zinc-400">Assigned</span>
                    <span className="font-mono text-sm text-white">{ticket.technician}</span>
                    <span className="text-xs text-zinc-400">SLA: {ticket.sla}</span>
                  </div>
                  <div className="flex gap-2 mt-2 justify-center">
                    <button
                      className={`px-2 py-1 rounded text-xs font-semibold bg-sky-800 hover:bg-sky-700 transition disabled:opacity-50`}
                      disabled={ticket.technician !== "Unassigned"}
                      onClick={() => handleAssign(ticket.id)}
                    >
                      Assign
                    </button>
                    <button
                      className={`px-2 py-1 rounded text-xs font-semibold bg-amber-800 hover:bg-amber-700 transition`}
                      onClick={() => handleEscalate(ticket.id)}
                    >
                      Escalate
                    </button>
                    <button
                      className={`px-2 py-1 rounded text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 transition`}
                      onClick={() => handleResolve(ticket.id)}
                    >
                      Mark as Resolved
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Right column */}
        <aside className="flex flex-col gap-6">
          {/* Notification Command Center */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-white">Notification command center</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-2">SMS and email events</p>
            <div className="flex flex-col gap-2">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-800 rounded px-2 py-2">
                  <span className="font-mono text-xs text-zinc-400 min-w-[120px]">{n.event}</span>
                  <span className="flex gap-1">
                    {n.channel.includes("SMS") && <Smartphone className="w-4 h-4 text-sky-400" aria-hidden="true" />}
                    {n.channel.includes("Email") && <Mail className="w-4 h-4 text-emerald-400" aria-hidden="true" />}
                  </span>
                  <span className="text-xs text-zinc-300 min-w-[80px]">{n.recipient}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${n.status === "Delivered" ? "bg-emerald-900 text-emerald-300" : "bg-amber-900 text-amber-300"}`}>{n.status}</span>
                  <span className="text-xs text-zinc-100 truncate">{n.summary}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Automation Guardrails */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-white">Automation guardrails</h3>
            </div>
            <div className="flex flex-col gap-2">
              {guardrails.map((g, i) => (
                <div key={i} className="flex items-center gap-2">
                  {g.icon}
                  <span className="text-xs text-zinc-300 min-w-[110px]">{g.label}</span>
                  <span className="font-mono text-xs text-zinc-400">{g.status}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Asset Lifecycle Analytics */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-semibold tracking-tight text-white">Asset lifecycle analytics</h2>
        </div>
        <p className="text-xs text-zinc-400 mb-2">Device health across schools</p>
        <div className="flex gap-4 flex-wrap mb-4">
          {assetSummary.map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded bg-zinc-900 border border-zinc-800 min-w-[160px]">
              {s.icon}
              <span className="font-mono text-zinc-300">{s.label}</span>
              <span className="font-bold text-white">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-left text-zinc-400 font-semibold">School</th>
                <th className="text-left text-zinc-400 font-semibold">Health</th>
                <th className="text-left text-zinc-400 font-semibold">Open tickets</th>
                <th className="text-left text-zinc-400 font-semibold">Refresh</th>
                <th className="text-left text-zinc-400 font-semibold">Categories</th>
              </tr>
            </thead>
            <tbody>
              {assetHealth.map((row, i) => (
                <tr key={i} className="bg-zinc-900 rounded">
                  <td className="py-2 pr-4 font-medium text-white whitespace-nowrap">{row.school}</td>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-16 h-2 rounded ${scoreClass(row.score)}`}></div>
                      <span className="font-mono text-xs text-zinc-300">{row.score}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs text-zinc-300">{row.openTickets}</td>
                  <td className="py-2 pr-4 flex items-center gap-1">
                    {parseInt(row.refresh) <= 2024 ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    )}
                    <span className="font-mono text-xs text-zinc-300">{row.refresh}</span>
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-1 flex-wrap">
                      {row.categories.map((cat: string) => (
                        <span key={cat} className="px-2 py-0.5 rounded bg-zinc-800 text-sky-300 text-xs font-semibold">{cat}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
