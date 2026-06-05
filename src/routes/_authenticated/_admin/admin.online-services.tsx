import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaPrayingHands, FaVideo, FaSatelliteDish, FaUsers } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/online-services")({
  head: () => ({ meta: [{ title: "Online Services — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaSatelliteDish}
        title="Online Services"
        subtitle="Livestream services, online giving, and virtual prayer rooms"
        endpoint="GET /api/online-services"
        stats={[
          { label: "Live Now", value: 0, icon: FaSatelliteDish, tint: "bg-rose-500/10 text-rose-600" },
          { label: "Past Streams", value: 0, icon: FaVideo, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Online Givers", value: 0, icon: FaUsers, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Prayer Requests", value: 0, icon: FaPrayingHands, tint: "bg-gold/10 text-gold" },
        ]}
        sections={[
          { title: "Scheduled Streams", items: [], empty: "No streams scheduled." },
          { title: "Recent Prayer Requests", items: [], empty: "No prayer requests." },
        ]}
      />
    </AppShell>
  ),
});
