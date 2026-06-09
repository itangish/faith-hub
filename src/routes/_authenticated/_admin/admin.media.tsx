import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AdminPage, Badge } from "@/components/PageScaffold";
import { FaPhotoVideo, FaImage, FaVideo, FaMusic } from "react-icons/fa";

const MEDIA = [
  { title: "Sermon: Faith over Fear", type: "Audio", album: "June 2026 Sermons", uploaded: "Jun 7, 2026", size: "42 MB" },
  { title: "Youth Conference 2025 Highlights", type: "Video", album: "Conferences", uploaded: "Jun 5, 2026", size: "412 MB" },
  { title: "Worship Night — May Photo Album", type: "Photo", album: "Worship Nights", uploaded: "Jun 1, 2026", size: "128 MB" },
  { title: "Choir Rehearsal Recording", type: "Audio", album: "Choir Practice", uploaded: "May 30, 2026", size: "28 MB" },
  { title: "Baptism Service Livestream", type: "Video", album: "Services", uploaded: "May 25, 2026", size: "1.2 GB" },
];

export const Route = createFileRoute("/_authenticated/_admin/admin/media")({
  head: () => ({ meta: [{ title: "Media Library — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AdminPage
        icon={FaPhotoVideo}
        title="Media Library"
        subtitle="Sermons, photos, videos, and audio recordings"
        endpoint="GET /api/media"
        addLabel="Upload"
        stats={[
          { label: "Total Files", value: MEDIA.length, icon: FaPhotoVideo },
          { label: "Photos", value: 1, icon: FaImage, tint: "bg-blue-500/10 text-blue-600" },
          { label: "Videos", value: 2, icon: FaVideo, tint: "bg-rose-500/10 text-rose-600" },
          { label: "Audio", value: 2, icon: FaMusic, tint: "bg-purple-500/10 text-purple-600" },
        ]}
        table={{
          title: "Recently Uploaded",
          columns: [
            { key: "title", label: "Title" }, { key: "type", label: "Type" },
            { key: "album", label: "Album" }, { key: "uploaded", label: "Uploaded" },
            { key: "size", label: "Size" }, { key: "status", label: "Status" },
          ],
          rows: MEDIA.map(m => ({
            ...m,
            type: <Badge tone="info">{m.type}</Badge>,
            status: <Badge tone="success">Public</Badge>,
          })),
        }}
      />
    </AppShell>
  ),
});
