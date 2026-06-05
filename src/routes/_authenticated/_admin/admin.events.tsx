import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaCalendarAlt, FaCalendarPlus, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/events")({
  head: () => ({ meta: [{ title: "Events — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaCalendarAlt}
        title="Events"
        subtitle="Services, conferences, weddings, baptisms, and crusades"
        endpoint="GET /api/events"
        stats={[
          { label: "Upcoming", value: 0, icon: FaCalendarPlus, tint: "bg-gold/10 text-gold" },
          { label: "This Month", value: 0, icon: FaCalendarAlt, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Total RSVPs", value: 0, icon: FaUsers, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Venues", value: 0, icon: FaMapMarkerAlt, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        sections={[
          { title: "Upcoming Events", items: [], empty: "No upcoming events." },
          { title: "Past Events", items: [], empty: "No past events recorded." },
        ]}
      />
    </AppShell>
  ),
});
