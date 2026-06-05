import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { getAdminCreds, setAdminCreds } from "@/lib/admin-credentials";
import { FaUserShield, FaEnvelope, FaLock, FaKey, FaCheckCircle, FaExclamationTriangle, FaSave } from "react-icons/fa";

export const Route = createFileRoute("/_authenticated/_admin/admin/settings")({
  head: () => ({ meta: [{ title: "Admin Settings — KYB Rajepra" }] }),
  component: () => <AppShell variant="admin"><SettingsInner /></AppShell>,
});

function SettingsInner() {
  const { user, refresh } = useAuth();
  const current = getAdminCreds();
  const [email, setEmail] = useState(current.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMsg(null);
    const stored = getAdminCreds();
    if (currentPassword !== stored.password) {
      setMsg({ kind: "err", text: "Current password is incorrect." });
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setMsg({ kind: "err", text: "New password must be at least 6 characters." });
      return;
    }
    if (newPassword && newPassword !== confirm) {
      setMsg({ kind: "err", text: "New password and confirmation do not match." });
      return;
    }
    setAdminCreds({
      email: email.trim(),
      password: newPassword || stored.password,
    });
    // Sync the in-memory user record so the header reflects the new email
    if (user) {
      const updated = { ...user, email: email.trim() };
      localStorage.setItem("kyb_user", JSON.stringify(updated));
      refresh().catch(() => {});
    }
    setNewPassword(""); setConfirm(""); setCurrentPassword("");
    setMsg({ kind: "ok", text: "Admin credentials updated successfully." });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <header className="flex items-center gap-3">
        <span className="w-12 h-12 rounded-md hero-sacred grid place-items-center text-gold">
          <FaUserShield className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-display text-2xl">Admin Credentials</h2>
          <p className="text-sm text-muted-foreground">Change the administrator email and password for this device.</p>
        </div>
      </header>

      {msg && (
        <div
          className={`flex items-start gap-2 rounded-md px-4 py-3 text-sm border ${
            msg.kind === "ok"
              ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30"
              : "bg-destructive/10 text-destructive border-destructive/30"
          }`}
        >
          {msg.kind === "ok" ? <FaCheckCircle className="mt-0.5" /> : <FaExclamationTriangle className="mt-0.5" />}
          <span>{msg.text}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg p-6 space-y-5">
        <FieldRow icon={FaEnvelope} label="Admin email" type="email" value={email} onChange={setEmail} />
        <FieldRow icon={FaKey} label="Current password" type="password" value={currentPassword} onChange={setCurrentPassword} placeholder="Required to confirm changes" />
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldRow icon={FaLock} label="New password" type="password" value={newPassword} onChange={setNewPassword} placeholder="Leave blank to keep" />
          <FieldRow icon={FaLock} label="Confirm new password" type="password" value={confirm} onChange={setConfirm} />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium">
            <FaSave /> Save changes
          </button>
        </div>
      </form>

      <p className="text-xs text-muted-foreground">
        Credentials are stored in this browser. Sign in again with the new email and password after saving.
      </p>
    </div>
  );
}

function FieldRow({
  icon: Icon, label, type, value, onChange, placeholder,
}: { icon: any; label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative mt-1.5">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2.5 rounded-md bg-input/40 border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        />
      </div>
    </label>
  );
}
