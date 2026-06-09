import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaChartBar, FaChartLine, FaChartPie, FaFileAlt } from "react-icons/fa";

const REPORTS = [
  { name: "Monthly Financial Statement — May 2026", category: "Financial", generated: "Jun 1, 2026", by: "Elder David", format: "PDF" },
  { name: "Attendance Trend — Q2 2026", category: "Attendance", generated: "May 30, 2026", by: "Pastor John", format: "XLSX" },
  { name: "Member Growth Demographics", category: "Demographics", generated: "May 28, 2026", by: "System", format: "PDF" },
  { name: "Tithe & Offering Summary YTD", category: "Financial", generated: "May 25, 2026", by: "Elder David", format: "PDF" },
  { name: "Ministry Activity Roundup", category: "Ministry", generated: "May 20, 2026", by: "Pastor John", format: "PDF" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaChartBar}
        title="Reports"
        subtitle="Financial, attendance, growth, and ministry reports"
        endpoint="GET /api/reports"
        addLabel="Generate Report"
        stats={[
          { label: "Reports", value: REPORTS.length, icon: FaFileAlt },
          { label: "Financial", value: 2, icon: FaChartLine, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Attendance", value: 1, icon: FaChartBar, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Demographics", value: 1, icon: FaChartPie, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        table={{
          title: "Recent Reports",
          columns: [
            { key: "name", label: "Report" }, { key: "category", label: "Category" },
            { key: "generated", label: "Generated" }, { key: "by", label: "By" },
            { key: "format", label: "Format" }, { key: "actions", label: "" },
          ],
          rows: REPORTS.map(r => ({
            ...r,
            format: <Badge tone="info">{r.format}</Badge>,
            actions: <button className="text-xs text-gold hover:underline">Download</button>,
          })),
        }}
      />
    </AppShell>
  ),
});
