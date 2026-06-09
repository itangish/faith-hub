import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaBook, FaBookOpen, FaBookmark, FaUsers } from "react-icons/fa";

const BOOKS = [
  { title: "The Holy Bible — NIV", author: "—", category: "Bible", copies: 24, loaned: 3, status: "Available" },
  { title: "Mere Christianity", author: "C. S. Lewis", category: "Apologetics", copies: 6, loaned: 4, status: "Available" },
  { title: "The Purpose Driven Life", author: "Rick Warren", category: "Discipleship", copies: 8, loaned: 7, status: "Low Stock" },
  { title: "Knowing God", author: "J. I. Packer", category: "Theology", copies: 4, loaned: 4, status: "Loaned Out" },
  { title: "Crazy Love", author: "Francis Chan", category: "Devotional", copies: 5, loaned: 2, status: "Available" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/books")({
  head: () => ({ meta: [{ title: "Library — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaBook}
        title="Library"
        subtitle="Bibles, devotionals, study guides, and lending records"
        endpoint="GET /api/books"
        addLabel="Add Book"
        stats={[
          { label: "Titles", value: BOOKS.length, icon: FaBook },
          { label: "Copies", value: BOOKS.reduce((a, b) => a + b.copies, 0), icon: FaBookOpen, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Loaned Out", value: BOOKS.reduce((a, b) => a + b.loaned, 0), icon: FaBookmark, tint: "bg-amber-500/10 text-amber-600" },
          { label: "Borrowers", value: 18, icon: FaUsers, tint: "bg-emerald-500/10 text-emerald-600" },
        ]}
        table={{
          title: "Catalog",
          columns: [
            { key: "title", label: "Title" }, { key: "author", label: "Author" },
            { key: "category", label: "Category" }, { key: "copies", label: "Copies" },
            { key: "loaned", label: "Loaned" }, { key: "status", label: "Status" },
          ],
          rows: BOOKS.map(b => ({
            ...b,
            status: <Badge tone={b.status === "Available" ? "success" : b.status === "Low Stock" ? "warning" : "danger"}>{b.status}</Badge>,
          })),
        }}
      />
    </AppShell>
  ),
});
