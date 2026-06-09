import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUserShield, FaCrown, FaPrayingHands, FaUsers } from "react-icons/fa";

const LEADERS = [
  { name: "Pastor John Mugisha", title: "Senior Pastor", ministry: "Pastoral", since: "2018", contact: "+250 788 111 222" },
  { name: "Elder David Habimana", title: "Elder", ministry: "Finance", since: "2020", contact: "+250 788 333 444" },
  { name: "Deacon Paul Nkurunziza", title: "Deacon", ministry: "Hospitality", since: "2021", contact: "+250 788 555 666" },
  { name: "Esther Mukamana", title: "Worship Leader", ministry: "Worship", since: "2019", contact: "+250 788 777 888" },
  { name: "Sarah Uwase", title: "Youth Leader", ministry: "Youth", since: "2022", contact: "+250 788 999 000" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/leaders")({
  head: () => ({ meta: [{ title: "Leaders — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserShield}
        title="Leadership Team"
        subtitle="Pastors, elders, deacons, and ministry leaders"
        endpoint="GET /api/leaders"
        addLabel="Add Leader"
        stats={[
          { label: "Total Leaders", value: LEADERS.length, icon: FaUserShield },
          { label: "Pastors", value: 1, icon: FaCrown, tint: "bg-gold/10 text-gold" },
          { label: "Elders & Deacons", value: 2, icon: FaPrayingHands },
          { label: "Ministry Leads", value: 2, icon: FaUsers },
        ]}
        table={{
          title: "Leadership Directory",
          columns: [
            { key: "name", label: "Name" }, { key: "title", label: "Title" },
            { key: "ministry", label: "Ministry" }, { key: "since", label: "Serving Since" },
            { key: "contact", label: "Contact" }, { key: "status", label: "Status" },
          ],
          rows: LEADERS.map(l => ({ ...l, status: <Badge tone="success">Active</Badge> })),
        }}
      />
    </AppShell>
  ),
});
