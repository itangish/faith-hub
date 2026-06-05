import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUsers, FaGavel, FaClipboardList, FaCalendarCheck } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/committee")({
  head: () => ({ meta: [{ title: "Committees — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaGavel}
        title="Committees"
        subtitle="Church boards, committees, and decision-making bodies"
        endpoint="GET /api/committees"
        stats={[
          { label: "Committees", value: 0, icon: FaGavel },
          { label: "Members", value: 0, icon: FaUsers },
          { label: "Open Motions", value: 0, icon: FaClipboardList },
          { label: "Next Meeting", value: "—", icon: FaCalendarCheck },
        ]}
        sections={[
          { title: "Active Committees", items: [], empty: "No committees defined." },
          { title: "Recent Meeting Minutes", items: [], empty: "No minutes recorded." },
        ]}
      />
    </AppShell>
  ),
});
