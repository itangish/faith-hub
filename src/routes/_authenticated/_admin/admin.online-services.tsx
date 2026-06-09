import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaPrayingHands, FaVideo, FaSatelliteDish, FaUsers } from "react-icons/fa";

const STREAMS = [
  { title: "Sunday Main Service — Live", platform: "YouTube + Facebook", date: "Jun 14, 9:00 AM", viewers: "—", status: "Scheduled" },
  { title: "Wednesday Bible Study", platform: "YouTube", date: "Jun 11, 6:00 PM", viewers: "—", status: "Scheduled" },
  { title: "Friday Prayer Night", platform: "Facebook", date: "Jun 13, 7:00 PM", viewers: "—", status: "Scheduled" },
  { title: "May 31 Sunday Service", platform: "YouTube", date: "May 31, 2026", viewers: "1,240", status: "Archived" },
  { title: "Youth Conference Day 1", platform: "YouTube", date: "May 24, 2026", viewers: "2,180", status: "Archived" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/online-services")({
  head: () => ({ meta: [{ title: "Online Services — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaSatelliteDish}
        title="Online Services"
        subtitle="Livestream services, online giving, and virtual prayer rooms"
        endpoint="GET /api/online-services"
        addLabel="Schedule Stream"
        stats={[
          { label: "Live Now", value: 0, icon: FaSatelliteDish, tint: "bg-rose-500/10 text-rose-600" },
          { label: "Past Streams", value: 24, icon: FaVideo, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Online Givers", value: 86, icon: FaUsers, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Prayer Requests", value: 42, icon: FaPrayingHands, tint: "bg-gold/10 text-gold" },
        ]}
        table={{
          title: "Stream Schedule",
          columns: [
            { key: "title", label: "Stream" }, { key: "platform", label: "Platform" },
            { key: "date", label: "Date/Time" }, { key: "viewers", label: "Viewers" },
            { key: "status", label: "Status" },
          ],
          rows: STREAMS.map(s => ({
            ...s,
            status: <Badge tone={s.status === "Scheduled" ? "warning" : "success"}>{s.status}</Badge>,
          })),
        }}
      />
    </AppShell>
  ),
});
