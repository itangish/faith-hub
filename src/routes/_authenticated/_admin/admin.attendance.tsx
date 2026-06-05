import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUserCheck, FaUserTimes, FaChartLine, FaCalendarDay } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/attendance")({
  head: () => ({ meta: [{ title: "Attendance — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserCheck}
        title="Attendance"
        subtitle="Track Sunday service and event attendance"
        endpoint="GET /api/attendance"
        stats={[
          { label: "Last Sunday", value: 0, icon: FaUserCheck, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Absentees", value: 0, icon: FaUserTimes, tint: "bg-rose-500/10 text-rose-600" },
          { label: "Avg (4 weeks)", value: 0, icon: FaChartLine, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Sessions Recorded", value: 0, icon: FaCalendarDay, tint: "bg-gold/10 text-gold" },
        ]}
        sections={[
          { title: "Recent Sessions", items: [], empty: "No attendance recorded yet." },
          { title: "Top Attendees", items: [], empty: "No data." },
        ]}
      />
    </AppShell>
  ),
});
