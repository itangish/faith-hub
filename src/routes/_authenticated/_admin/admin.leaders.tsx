import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUserShield, FaCrown, FaPrayingHands, FaUsers } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/leaders")({
  head: () => ({ meta: [{ title: "Leaders — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserShield}
        title="Leaders"
        subtitle="Pastors, elders, deacons, and ministry leaders"
        endpoint="GET /api/leaders"
        stats={[
          { label: "Total Leaders", value: 0, icon: FaUserShield },
          { label: "Pastors", value: 0, icon: FaCrown, tint: "bg-gold/10 text-gold" },
          { label: "Elders", value: 0, icon: FaPrayingHands },
          { label: "Ministry Leads", value: 0, icon: FaUsers },
        ]}
        sections={[
          { title: "Leadership Team", items: [], empty: "No leaders registered." },
          { title: "Recent Assignments", items: [], empty: "No recent changes." },
        ]}
      />
    </AppShell>
  ),
});
