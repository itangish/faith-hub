import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUserTie, FaMoneyCheckAlt, FaCalendarAlt, FaFileInvoiceDollar } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/staff")({
  head: () => ({ meta: [{ title: "Staff & Payroll — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserTie}
        title="Staff & Payroll"
        subtitle="Employee directory, salaries, and payroll runs"
        endpoint="GET /api/staff"
        stats={[
          { label: "Staff Members", value: 0, icon: FaUserTie },
          { label: "Monthly Payroll", value: "$0", icon: FaMoneyCheckAlt, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Pending Payslips", value: 0, icon: FaFileInvoiceDollar, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Next Payday", value: "—", icon: FaCalendarAlt, tint: "bg-blue-500/10 text-blue-600" },
        ]}
        sections={[
          { title: "Staff Directory", items: [], empty: "No staff records." },
          { title: "Recent Payslips", items: [], empty: "No payslips issued." },
        ]}
      />
    </AppShell>
  ),
});
