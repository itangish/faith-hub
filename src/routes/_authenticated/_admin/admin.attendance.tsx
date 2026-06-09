import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUserCheck, FaUserTimes, FaChartLine, FaCalendarDay } from "react-icons/fa";

const SESSIONS = [
  { date: "Jun 1, 2026", service: "Sunday Main Service", present: 312, absent: 48, percent: "87%" },
  { date: "May 25, 2026", service: "Sunday Main Service", present: 298, absent: 62, percent: "83%" },
  { date: "May 22, 2026", service: "Wednesday Bible Study", present: 124, absent: 38, percent: "77%" },
  { date: "May 18, 2026", service: "Sunday Main Service", present: 305, absent: 55, percent: "85%" },
  { date: "May 15, 2026", service: "Friday Prayer Night", present: 88, absent: 22, percent: "80%" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/attendance")({
  head: () => ({ meta: [{ title: "Attendance — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserCheck}
        title="Attendance"
        subtitle="Track Sunday service, midweek, and event attendance"
        endpoint="GET /api/attendance"
        addLabel="Record Session"
        stats={[
          { label: "Last Sunday", value: 312, icon: FaUserCheck, tint: "bg-emerald-500/10 text-emerald-600" },
          { label: "Absentees", value: 48, icon: FaUserTimes, tint: "bg-rose-500/10 text-rose-600" },
          { label: "Avg (4 weeks)", value: "303", icon: FaChartLine, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Sessions Recorded", value: SESSIONS.length, icon: FaCalendarDay, tint: "bg-gold/10 text-gold" },
        ]}
        table={{
          title: "Recent Sessions",
          columns: [
            { key: "date", label: "Date" }, { key: "service", label: "Service" },
            { key: "present", label: "Present" }, { key: "absent", label: "Absent" },
            { key: "percent", label: "Attendance %" }, { key: "status", label: "Status" },
          ],
          rows: SESSIONS.map(s => ({ ...s, status: <Badge tone="success">Recorded</Badge> })),
        }}
      />
    </AppShell>
  ),
});
