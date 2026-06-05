import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageScaffold";
import { useAuth } from "@/lib/auth";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaPrayingHands, FaSave } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "My Profile — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="member">
      <ProfileInner />
    </AppShell>
  ),
});

function ProfileInner() {
  const { user } = useAuth();
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader icon={FaUserCircle} title="My Profile" subtitle="Update your personal information" />
      <section className="bg-card border border-border rounded-lg p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full hero-sacred grid place-items-center text-gold text-2xl font-display">
          {(user?.name || user?.email || "?").charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-display text-xl">{user?.name || "Friend"}</h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <p className="text-xs text-gold capitalize mt-1">{user?.role || "member"} · {user?.status || "approved"}</p>
        </div>
      </section>
      <form className="bg-card border border-border rounded-lg p-6 grid sm:grid-cols-2 gap-4">
        <Field icon={FaUserCircle} label="Full name" value={user?.name || ""} />
        <Field icon={FaEnvelope} label="Email" value={user?.email || ""} />
        <Field icon={FaPhone} label="Phone" placeholder="+250 ..." />
        <Field icon={FaBirthdayCake} label="Date of birth" type="date" />
        <Field icon={FaMapMarkerAlt} label="Address" placeholder="City, district" />
        <Field icon={FaPrayingHands} label="Ministry / Group" placeholder="e.g. Youth Choir" />
        <div className="sm:col-span-2 flex justify-end">
          <button className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium">
            <FaSave /> Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ icon: Icon, label, value, type = "text", placeholder }: any) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative mt-1.5">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2.5 rounded-md bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </label>
  );
}
