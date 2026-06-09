import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUsers, FaGavel, FaClipboardList, FaCalendarCheck } from "react-icons/fa";

const COMMITTEES = [
  { name: "Executive Council", members: 7, chair: "Pastor John Mugisha", meetings: "Monthly", nextMeeting: "Jun 15, 2026" },
  { name: "Finance Committee", members: 5, chair: "Elder David Habimana", meetings: "Bi-weekly", nextMeeting: "Jun 12, 2026" },
  { name: "Building & Grounds", members: 4, chair: "Samuel Niyonsenga", meetings: "Monthly", nextMeeting: "Jun 20, 2026" },
  { name: "Missions Board", members: 6, chair: "Pastor John Mugisha", meetings: "Quarterly", nextMeeting: "Jul 5, 2026" },
  { name: "Outreach & Evangelism", members: 8, chair: "Sarah Uwase", meetings: "Monthly", nextMeeting: "Jun 22, 2026" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/committee")({
  head: () => ({ meta: [{ title: "Committees — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaGavel}
        title="Committees"
        subtitle="Church boards, committees, and decision-making bodies"
        endpoint="GET /api/committees"
        addLabel="New Committee"
        stats={[
          { label: "Committees", value: COMMITTEES.length, icon: FaGavel },
          { label: "Total Members", value: COMMITTEES.reduce((a, c) => a + c.members, 0), icon: FaUsers },
          { label: "Open Motions", value: 3, icon: FaClipboardList, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Next Meeting", value: "Jun 12", icon: FaCalendarCheck, tint: "bg-gold/10 text-gold" },
        ]}
        table={{
          title: "Active Committees",
          columns: [
            { key: "name", label: "Committee" }, { key: "chair", label: "Chairperson" },
            { key: "members", label: "Members" }, { key: "meetings", label: "Cadence" },
            { key: "nextMeeting", label: "Next Meeting" }, { key: "status", label: "Status" },
          ],
          rows: COMMITTEES.map(c => ({ ...c, status: <Badge tone="success">Active</Badge> })),
        }}
      />
    </AppShell>
  ),
});
