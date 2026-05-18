import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth, readAuthSync } from "@/lib/auth";
import { FaChurch, FaUser, FaEnvelope, FaLock, FaPhone, FaSpinner } from "react-icons/fa";
import { Field } from "./login";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Join us — KYB Rajepra" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && readAuthSync().isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await register(form);
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-6 md:p-12 order-2 md:order-1">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Already a member?{" "}
            <Link to="/login" className="text-gold hover:underline font-medium">Sign in</Link>
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="text-sm rounded-md bg-destructive/10 text-destructive px-3 py-2 border border-destructive/30">
                {error}
              </div>
            )}
            <Field icon={FaUser} type="text" placeholder="Full name" value={form.name} onChange={set("name")} />
            <Field icon={FaEnvelope} type="email" placeholder="Email address" value={form.email} onChange={set("email")} />
            <Field icon={FaPhone} type="tel" placeholder="Phone (optional)" value={form.phone} onChange={set("phone")} />
            <Field icon={FaLock} type="password" placeholder="Password" value={form.password} onChange={set("password")} />
            <p className="text-xs text-muted-foreground">
              Accounts may require admin approval before full access.
            </p>
            <button
              type="submit" disabled={loading}
              className="btn-gold w-full py-2.5 rounded-md font-medium inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <><FaSpinner className="animate-spin" /> Creating…</> : "Create account"}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:flex hero-sacred relative items-center justify-center p-12 text-white order-1 md:order-2">
        <div className="max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <FaChurch className="w-6 h-6 text-gold" />
            <span className="font-display text-xl">KYB Rajepra</span>
          </Link>
          <h2 className="font-display text-4xl leading-tight">Begin your journey with us.</h2>
          <p className="mt-4 text-white/70">A community waiting to welcome you with open arms.</p>
        </div>
      </div>
    </div>
  );
}
