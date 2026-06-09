import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaMusic, FaMicrophone, FaGuitar, FaCalendarAlt } from "react-icons/fa";

const TEAMS = [
  { name: "Sunday Main Worship", leader: "Esther Mukamana", role: "Vocals & Keys", members: 8, nextSet: "Jun 14, 9:00 AM" },
  { name: "Youth Praise Team", leader: "Sarah Uwase", role: "Vocals & Drums", members: 6, nextSet: "Jun 14, 11:00 AM" },
  { name: "Choir Ensemble", leader: "Robert Kayitare", role: "SATB Choir", members: 24, nextSet: "Jun 21, 9:00 AM" },
  { name: "Instrumentalists", leader: "Eric Nshimiyimana", role: "Band", members: 7, nextSet: "Jun 14, 9:00 AM" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/worship-team")({
  head: () => ({ meta: [{ title: "Worship Teams — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaMusic}
        title="Worship Teams"
        subtitle="Choirs, praise teams, musicians, and Sunday rotations"
        endpoint="GET /api/worship-teams"
        addLabel="New Team"
        stats={[
          { label: "Teams", value: TEAMS.length, icon: FaMusic },
          { label: "Vocalists", value: 18, icon: FaMicrophone, tint: "bg-purple-500/10 text-purple-600" },
          { label: "Musicians", value: 12, icon: FaGuitar, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Upcoming Sets", value: 4, icon: FaCalendarAlt, tint: "bg-gold/10 text-gold" },
        ]}
        table={{
          title: "Active Worship Teams",
          columns: [
            { key: "name", label: "Team" }, { key: "leader", label: "Leader" },
            { key: "role", label: "Discipline" }, { key: "members", label: "Members" },
            { key: "nextSet", label: "Next Set" }, { key: "status", label: "Status" },
          ],
          rows: TEAMS.map(t => ({ ...t, status: <Badge tone="success">Active</Badge> })),
        }}
      />
    </AppShell>
  ),
});
