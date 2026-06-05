import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaMusic, FaMicrophone, FaGuitar, FaCalendarAlt } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/worship-team")({
  head: () => ({ meta: [{ title: "Worship Teams — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaMusic}
        title="Worship Teams"
        subtitle="Choirs, praise teams, musicians, and Sunday rotations"
        endpoint="GET /api/worship-teams"
        stats={[
          { label: "Teams", value: 0, icon: FaMusic },
          { label: "Vocalists", value: 0, icon: FaMicrophone },
          { label: "Musicians", value: 0, icon: FaGuitar },
          { label: "Upcoming Sets", value: 0, icon: FaCalendarAlt },
        ]}
        sections={[
          { title: "Active Teams", items: [], empty: "No worship teams." },
          { title: "Upcoming Rotation", items: [], empty: "No rotation scheduled." },
        ]}
      />
    </AppShell>
  ),
});
