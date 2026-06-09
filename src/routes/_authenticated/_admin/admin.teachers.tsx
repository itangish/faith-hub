import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

const TEACHERS = [
  { name: "Grace Iradukunda", class: "Sunday School (Ages 4-7)", curriculum: "Bible Stories Vol. 1", students: 22, day: "Sunday 9:00 AM" },
  { name: "Daniel Mugabo", class: "Sunday School (Ages 8-12)", curriculum: "Hero Faith Series", students: 28, day: "Sunday 9:00 AM" },
  { name: "Pastor John Mugisha", class: "Adult Bible Study", curriculum: "Romans Verse-by-Verse", students: 45, day: "Wednesday 6:00 PM" },
  { name: "Esther Mukamana", class: "Women's Discipleship", curriculum: "Proverbs 31 Study", students: 18, day: "Saturday 3:00 PM" },
  { name: "Elder David Habimana", class: "Men's Discipleship", curriculum: "Spiritual Disciplines", students: 14, day: "Saturday 7:00 AM" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/teachers")({
  head: () => ({ meta: [{ title: "Teachers — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaUserGraduate}
        title="Teachers"
        subtitle="Sunday school, Bible study, and discipleship teachers"
        endpoint="GET /api/teachers"
        addLabel="Add Teacher"
        stats={[
          { label: "Teachers", value: TEACHERS.length, icon: FaUserGraduate },
          { label: "Classes", value: TEACHERS.length, icon: FaChalkboardTeacher },
          { label: "Curriculums", value: 5, icon: FaBook },
          { label: "Students", value: TEACHERS.reduce((a, t) => a + t.students, 0), icon: FaUsers },
        ]}
        table={{
          title: "Teaching Team",
          columns: [
            { key: "name", label: "Teacher" }, { key: "class", label: "Class" },
            { key: "curriculum", label: "Curriculum" }, { key: "students", label: "Students" },
            { key: "day", label: "Schedule" }, { key: "status", label: "Status" },
          ],
          rows: TEACHERS.map(t => ({ ...t, status: <Badge tone="success">Active</Badge> })),
        }}
      />
    </AppShell>
  ),
});
