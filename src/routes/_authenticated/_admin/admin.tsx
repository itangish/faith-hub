import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api";
import {
  FaUsers, FaHandHoldingUsd, FaUserCheck, FaCalendarAlt, FaReceipt,
  FaArrowUp, FaArrowDown, FaUserPlus, FaBullhorn,
} from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — KYB Rajepra" }] }),
  component: () => <AppShell variant="admin"><AdminInner /></AppShell>,
});

function AdminInner() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => dashboardApi.get().catch(() => null),
    retry: false,
  });

  const d = (data as any) || {};
  const stats = [
    { label: "Total Members", value: d.totalMembers ?? "—", delta: "+12%", up: true, icon: FaUsers, tint: "bg-blue-500/10 text-blue-600" },
    { label: "Contributions (MTD)", value: d.contributionsMTD ? `$${d.contributionsMTD}` : "—", delta: "+8%", up: true, icon: FaHandHoldingUsd, tint: "bg-emerald-500/10 text-emerald-600" },
    { label: "Attendance Avg", value: d.attendanceAvg ?? "—", delta: "-3%", up: false, icon: FaUserCheck, tint: "bg-amber-500/10 text-amber-600" },
    { label: "Upcoming Events", value: d.upcomingEvents ?? "—", delta: "+2", up: true, icon: FaCalendarAlt, tint: "bg-purple-500/10 text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-amber-500/10 text-amber-700 border border-amber-500/30 px-4 py-3 text-sm">
          Could not reach API at <code className="font-mono">{(import.meta as any).env?.VITE_API_URL || "http://localhost:5000/api"}</code>.
          Set <code className="font-mono">VITE_API_URL</code> in your env to point to your MongoDB backend.
        </div>
      )}

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-md grid place-items-center ${s.tint}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <span className={`text-xs inline-flex items-center gap-1 ${s.up ? "text-emerald-600" : "text-destructive"}`}>
                {s.up ? <FaArrowUp /> : <FaArrowDown />} {s.delta}
              </span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{s.label}</p>
            <p className="text-3xl font-display mt-1">{isLoading ? "…" : s.value}</p>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl">Quick Actions</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Add Member", icon: FaUserPlus, tint: "bg-blue-500/10 text-blue-600" },
              { label: "Mark Attendance", icon: FaUserCheck, tint: "bg-emerald-500/10 text-emerald-600" },
              { label: "Record Contribution", icon: FaHandHoldingUsd, tint: "bg-amber-500/10 text-amber-600" },
              { label: "Post Announcement", icon: FaBullhorn, tint: "bg-purple-500/10 text-purple-600" },
            ].map((q) => (
              <button key={q.label} className="flex items-center gap-3 p-4 rounded-md border border-border hover:bg-accent text-left transition">
                <span className={`w-10 h-10 rounded-md grid place-items-center ${q.tint}`}>
                  <q.icon />
                </span>
                <span className="font-medium text-sm">{q.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Pending Approvals</h3>
          <div className="text-center py-8 text-sm text-muted-foreground">
            <FaUserCheck className="mx-auto w-8 h-8 text-gold/60 mb-2" />
            No pending registrations.
          </div>
        </section>
      </div>

      <section className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-display text-xl mb-2">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Activity feed will populate from <code className="font-mono">/api/dashboard</code>.</p>
        <ul className="mt-4 divide-y divide-border">
          {[
            { icon: FaUserPlus, text: "New member registration awaiting approval", time: "—" },
            { icon: FaHandHoldingUsd, text: "Contribution recorded", time: "—" },
            { icon: FaReceipt, text: "Expense submitted for review", time: "—" },
          ].map((a, i) => (
            <li key={i} className="flex items-center gap-3 py-3 text-sm">
              <span className="w-8 h-8 rounded-md bg-accent grid place-items-center text-gold"><a.icon /></span>
              <span className="flex-1">{a.text}</span>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
