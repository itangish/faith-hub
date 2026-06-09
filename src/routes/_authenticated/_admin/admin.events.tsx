import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaCalendarAlt, FaCalendarPlus, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const EVENTS = [
  { title: "Sunday Worship Service", date: "Jun 14, 2026", time: "9:00 AM", venue: "Main Sanctuary", rsvps: 280, type: "Service" },
  { title: "Youth Conference 2026", date: "Jul 4-6, 2026", time: "All Day", venue: "Conference Hall", rsvps: 156, type: "Conference" },
  { title: "Wedding: J. & M.", date: "Jun 28, 2026", time: "2:00 PM", venue: "Main Sanctuary", rsvps: 220, type: "Wedding" },
  { title: "Baptism Service", date: "Jul 12, 2026", time: "10:00 AM", venue: "Lake Kivu", rsvps: 95, type: "Baptism" },
  { title: "Crusade Night", date: "Aug 15, 2026", time: "6:00 PM", venue: "Amahoro Stadium", rsvps: 1240, type: "Crusade" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/events")({
  head: () => ({ meta: [{ title: "Events — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaCalendarAlt}
        title="Events"
        subtitle="Services, conferences, weddings, baptisms, and crusades"
        endpoint="GET /api/events"
        addLabel="Create Event"
        stats={[
          { label: "Upcoming", value: EVENTS.length, icon: FaCalendarPlus, tint: "bg-gold/10 text-gold" },
          { label: "This Month", value: 3, icon: FaCalendarAlt, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Total RSVPs", value: EVENTS.reduce((a, e) => a + e.rsvps, 0), icon: FaUsers, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Venues", value: 4, icon: FaMapMarkerAlt, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        table={{
          title: "Upcoming Events",
          columns: [
            { key: "title", label: "Event" }, { key: "date", label: "Date" },
            { key: "time", label: "Time" }, { key: "venue", label: "Venue" },
            { key: "rsvps", label: "RSVPs" }, { key: "type", label: "Type" },
          ],
          rows: EVENTS.map(e => ({ ...e, type: <Badge tone="info">{e.type}</Badge> })),
        }}
      />
    </AppShell>
  ),
});
