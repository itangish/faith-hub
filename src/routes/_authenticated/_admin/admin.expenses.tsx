import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaReceipt, FaFileInvoice, FaClock, FaCheckCircle } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/expenses")({
  head: () => ({ meta: [{ title: "Expenses — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaReceipt}
        title="Expenses"
        subtitle="Submitted expenses, approvals, and reimbursements"
        endpoint="GET /api/expenses"
        stats={[
          { label: "Pending", value: 0, icon: FaClock, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Approved (MTD)", value: "$0", icon: FaCheckCircle, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Invoices", value: 0, icon: FaFileInvoice, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Total YTD", value: "$0", icon: FaReceipt, tint: "bg-rose-500/10 text-rose-600" },
        ]}
        sections={[
          { title: "Pending Approvals", items: [], empty: "Nothing to approve." },
          { title: "Recent Expenses", items: [], empty: "No expenses recorded." },
        ]}
      />
    </AppShell>
  ),
});
