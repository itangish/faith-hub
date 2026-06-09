import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUsers, FaLayerGroup, FaUserFriends, FaPrayingHands } from "react-icons/fa";

const ROWS = [
  { name: "Bethel Cell Group", type: "Cell Group", leader: "Pastor John Mugisha", members: 24, location: "Kigali, Kicukiro", status: "Active" },
  { name: "Youth Ministry", type: "Ministry", leader: "Sarah Uwase", members: 56, location: "Main Sanctuary", status: "Active" },
  { name: "Women's Fellowship", type: "Fellowship", leader: "Esther Mukamana", members: 38, location: "Hall B", status: "Active" },
  { name: "Men's Prayer Group", type: "Prayer", leader: "Elder David Habimana", members: 19, location: "Hall C", status: "Active" },
  { name: "Children's Ministry", type: "Ministry", leader: "Teacher Grace Iradukunda", members: 72, location: "Sunday School", status: "Active" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/groups")({
  head: () => ({ meta: [{ title: "Groups — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaLayerGroup}
        title="Groups & Ministries"
        subtitle="Cell groups, ministries, fellowships, and small group leaders"
        endpoint="GET /api/groups"
        addLabel="New Group"
        stats={[
          { label: "Total Groups", value: ROWS.length, icon: FaLayerGroup },
          { label: "Cell Groups", value: ROWS.filter(r => r.type === "Cell Group").length, icon: FaUserFriends, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Ministries", value: ROWS.filter(r => r.type === "Ministry").length, icon: FaPrayingHands, tint: "bg-purple-500/10 text-purple-600" },
          { label: "Members in Groups", value: ROWS.reduce((a, r) => a + r.members, 0), icon: FaUsers, tint: "bg-emerald-500/10 text-emerald-600" },
        ]}
        table={{
          title: "Active Groups",
          columns: [
            { key: "name", label: "Group" }, { key: "type", label: "Type" },
            { key: "leader", label: "Leader" }, { key: "members", label: "Members" },
            { key: "location", label: "Location" }, { key: "status", label: "Status" },
          ],
          rows: ROWS.map(r => ({ ...r, status: <Badge tone="success">{r.status}</Badge> })),
        }}
      />
    </AppShell>
  ),
});
