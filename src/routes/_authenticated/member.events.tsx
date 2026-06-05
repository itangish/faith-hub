import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, StatGrid, ListCard, InfoBanner } from "@/components/PageScaffold";
import { FaCalendarAlt, FaCalendarCheck, FaCalendarPlus, FaMapMarkerAlt } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/member/events")({
  head: () => ({ meta: [{ title: "Events — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <div className="space-y-6">
        <PageHeader icon={FaCalendarAlt} title="Events" subtitle="Upcoming services, fellowships, and gatherings" />
        <InfoBanner>Connects to <code className="font-mono text-gold">GET /api/events</code>.</InfoBanner>
        <StatGrid
          stats={[
            { label: "Upcoming", value: 0, icon: FaCalendarPlus, tint: "bg-gold/10 text-gold" },
            { label: "I'm Attending", value: 0, icon: FaCalendarCheck, tint: "bg-emerald-500/10 text-emerald-600" },
            { label: "This Month", value: 0, icon: FaCalendarAlt, tint: "bg-blue-500/10 text-blue-600" },
            { label: "Venues", value: 0, icon: FaMapMarkerAlt, tint: "bg-purple-500/10 text-purple-600" },
          ]}
        />
        <div className="grid lg:grid-cols-2 gap-4">
          <ListCard title="Upcoming Events" items={[]} empty="No upcoming events." />
          <ListCard title="My RSVPs" items={[]} empty="You haven't RSVPed to anything." />
        </div>
      </div>
    </AppShell>
  ),
});
