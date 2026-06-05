import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUsers, FaLayerGroup, FaUserFriends, FaPrayingHands } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/groups")({
  head: () => ({ meta: [{ title: "Groups — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaLayerGroup}
        title="Groups & Ministries"
        subtitle="Cell groups, ministries, and small group leaders"
        endpoint="GET /api/groups"
        stats={[
          { label: "Total Groups", value: 0, icon: FaLayerGroup },
          { label: "Cell Groups", value: 0, icon: FaUserFriends },
          { label: "Ministries", value: 0, icon: FaPrayingHands },
          { label: "Members in Groups", value: 0, icon: FaUsers },
        ]}
        sections={[
          { title: "Active Groups", items: [], empty: "No groups yet." },
          { title: "Group Leaders", items: [], empty: "Assign leaders to your groups." },
        ]}
      />
    </AppShell>
  ),
});
