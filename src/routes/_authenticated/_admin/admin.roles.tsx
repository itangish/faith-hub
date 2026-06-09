import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUserShield, FaKey, FaUsers, FaLock } from "react-icons/fa";

const ROLES = [
  { name: "Admin", scope: "System-wide", permissions: 42, users: 1, description: "Full system access" },
  { name: "Pastor", scope: "Pastoral", permissions: 28, users: 1, description: "Spiritual oversight, members, sermons" },
  { name: "Treasurer", scope: "Finance", permissions: 18, users: 1, description: "Contributions, expenses, payroll" },
  { name: "Leader", scope: "Ministry", permissions: 12, users: 5, description: "Group & ministry leadership" },
  { name: "Teacher", scope: "Education", permissions: 8, users: 5, description: "Sunday school and discipleship" },
  { name: "Member", scope: "Self-service", permissions: 6, users: 412, description: "Profile, giving, RSVP" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/roles")({
  head: () => ({ meta: [{ title: "Roles & Permissions — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserShield}
        title="Roles & Permissions"
        subtitle="Define and manage roles such as Admin, Pastor, Treasurer, Leader, Member"
        endpoint="GET /api/roles"
        addLabel="New Role"
        stats={[
          { label: "Roles", value: ROLES.length, icon: FaUserShield },
          { label: "Permissions", value: 42, icon: FaKey, tint: "bg-gold/10 text-gold" },
          { label: "Users Assigned", value: ROLES.reduce((a, r) => a + r.users, 0), icon: FaUsers, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Restricted Routes", value: 18, icon: FaLock, tint: "bg-rose-500/10 text-rose-600" },
        ]}
        table={{
          title: "Role Matrix",
          columns: [
            { key: "name", label: "Role" }, { key: "scope", label: "Scope" },
            { key: "description", label: "Description" }, { key: "permissions", label: "Permissions" },
            { key: "users", label: "Users" }, { key: "status", label: "Status" },
          ],
          rows: ROLES.map(r => ({
            ...r,
            name: <Badge tone={r.name === "Admin" ? "gold" : r.name === "Pastor" ? "info" : "default"}>{r.name}</Badge>,
            status: <Badge tone="success">Active</Badge>,
          })),
        }}
      />
    </AppShell>
  ),
});
