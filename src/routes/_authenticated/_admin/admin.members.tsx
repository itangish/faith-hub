import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUsers, FaUserCheck, FaUserSlash, FaUserPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { localMembers, type LocalMember } from "@/lib/local-members";

export const Route = createFileRoute("/_authenticated/_admin/admin/members")({
  head: () => ({ meta: [{ title: "Members — KYB Rajepra" }] }),
  component: MembersPage,
});

function MembersPage() {
  const [list, setList] = useState<LocalMember[]>([]);
  useEffect(() => { setList(localMembers.list()); }, []);

  const rows = list.map((m) => ({
    name: (
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-full hero-sacred grid place-items-center text-gold text-xs font-semibold">
          {m.name.charAt(0).toUpperCase()}
        </span>
        <span className="font-medium">{m.name}</span>
      </div>
    ),
    email: m.email,
    phone: m.phone || "—",
    role: <Badge tone="info">{m.role}</Badge>,
    status: <Badge tone={m.status === "approved" ? "success" : "warning"}>{m.status}</Badge>,
    joined: new Date(m.createdAt).toLocaleDateString(),
  }));

  return (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUsers}
        title="Members"
        subtitle="All registered church members from MongoDB and local registrations"
        endpoint="GET /api/members"
        addLabel="Add Member"
        stats={[
          { label: "Total Members", value: list.length, icon: FaUsers, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Active", value: list.filter((m) => m.status === "approved").length, icon: FaUserCheck, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Inactive", value: 0, icon: FaUserSlash, tint: "bg-slate-500/10 text-slate-600" },
          { label: "New This Month", value: list.filter((m) => new Date(m.createdAt).getMonth() === new Date().getMonth()).length, icon: FaUserPlus, tint: "bg-gold/10 text-gold" },
        ]}
        table={{
          title: "Member Directory",
          columns: [
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status" },
            { key: "joined", label: "Joined" },
          ],
          rows,
          empty: "No members registered yet. New sign-ups will appear here.",
        }}
      />
    </AppShell>
  );
}
