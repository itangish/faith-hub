import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaChartBar, FaChartLine, FaChartPie, FaFileAlt } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaChartBar}
        title="Reports"
        subtitle="Financial, attendance, growth, and ministry reports"
        endpoint="GET /api/reports"
        stats={[
          { label: "Reports", value: 0, icon: FaFileAlt },
          { label: "Financial", value: 0, icon: FaChartLine, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Attendance", value: 0, icon: FaChartBar, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Demographics", value: 0, icon: FaChartPie, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        sections={[
          { title: "Recent Reports", items: [], empty: "No reports generated." },
          { title: "Scheduled Reports", items: [], empty: "No scheduled reports." },
        ]}
      />
    </AppShell>
  ),
});
