import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage } from "@/components/PageScaffold";
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/teachers")({
  head: () => ({ meta: [{ title: "Teachers — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserGraduate}
        title="Teachers"
        subtitle="Sunday school, Bible study, and discipleship teachers"
        endpoint="GET /api/teachers"
        stats={[
          { label: "Teachers", value: 0, icon: FaUserGraduate },
          { label: "Classes", value: 0, icon: FaChalkboardTeacher },
          { label: "Curriculums", value: 0, icon: FaBook },
          { label: "Students", value: 0, icon: FaUsers },
        ]}
        sections={[
          { title: "Teaching Team", items: [], empty: "No teachers assigned." },
          { title: "Active Classes", items: [], empty: "No classes scheduled." },
        ]}
      />
    </AppShell>
  ),
});
