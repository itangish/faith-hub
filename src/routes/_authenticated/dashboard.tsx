import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { FaCalendarAlt, FaBullhorn, FaGift, FaPrayingHands, FaBookOpen } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — KYB Rajepra" }] }),
  component: () => <AppShell variant="member"><DashboardInner /></AppShell>,
});

function DashboardInner() { return <Inner />; }

function Inner() {
  const stats = [
    { label: "Upcoming Events", value: "3", icon: FaCalendarAlt },
    { label: "New Announcements", value: "5", icon: FaBullhorn },
    { label: "Giving This Year", value: "$0", icon: FaGift },
    { label: "Prayer Requests", value: "2", icon: FaPrayingHands },
  ];
  return (
    <div className="space-y-6">
      <section className="hero-sacred text-white rounded-xl p-8 relative overflow-hidden">
        <FaBookOpen className="absolute right-8 top-8 w-24 h-24 text-gold/20" />
        <p className="text-gold text-xs tracking-[0.3em] uppercase">Verse of the day</p>
        <blockquote className="font-display text-2xl md:text-3xl mt-3 max-w-2xl leading-snug">
          "I can do all things through Christ who strengthens me."
        </blockquote>
        <p className="mt-3 text-sm text-white/60">— Philippians 4:13</p>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-5 hover:shadow-elegant transition">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <s.icon className="text-gold w-4 h-4" />
            </div>
            <p className="mt-3 text-3xl font-display">{s.value}</p>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Upcoming Events</h3>
          <p className="text-sm text-muted-foreground">No events to display yet. Check back soon.</p>
        </section>
        <section className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Latest Announcements</h3>
          <p className="text-sm text-muted-foreground">All caught up.</p>
        </section>
      </div>
    </div>
  );
}
