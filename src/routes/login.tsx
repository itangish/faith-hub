import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { readAuthSync } from "@/lib/auth";
import { FaChurch, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — KYB Rajepra" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && readAuthSync().isAuthenticated) {
      throw redirect({ to: readAuthSync().isAdmin ? "/admin" : "/dashboard" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const u = await login(email, password);
      const isAdmin = ["admin", "pastor", "treasurer", "leader"].includes(u.role || "");
      navigate({ to: isAdmin ? "/admin" : "/dashboard" });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="hidden md:flex hero-sacred relative items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <FaChurch className="w-6 h-6 text-gold" />
            <span className="font-display text-xl">KYB Rajepra</span>
          </Link>
          <h2 className="font-display text-4xl leading-tight">Welcome back to the family.</h2>
          <p className="mt-4 text-white/70">Sign in to access your dashboard, events, and community.</p>
          <blockquote className="mt-12 pl-4 border-l-2 border-gold italic text-white/80">
            "The Lord bless you and keep you."
            <footer className="mt-2 text-xs not-italic text-gold tracking-wider">NUMBERS 6:24</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl">Sign in</h1>
          <p className="text-sm text-muted-foreground mt-1">
            New here?{" "}
            <Link to="/register" className="text-gold hover:underline font-medium">Create an account</Link>
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="text-sm rounded-md bg-destructive/10 text-destructive px-3 py-2 border border-destructive/30">
                {error}
              </div>
            )}
            <Field icon={FaEnvelope} type="email" placeholder="Email address" value={email} onChange={setEmail} />
            <Field icon={FaLock} type="password" placeholder="Password" value={password} onChange={setPassword} />
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-gold">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit" disabled={loading}
              className="btn-gold w-full py-2.5 rounded-md font-medium inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <><FaSpinner className="animate-spin" /> Signing in…</> : "Sign in"}
            </button>
            <p className="text-[11px] text-muted-foreground text-center pt-2 border-t border-border/50 mt-4">
              Default admin: <span className="font-mono">itangishakamoses63@gmail.com</span> / <span className="font-mono">Moses@1234</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Field({
  icon: Icon, type, placeholder, value, onChange,
}: { icon: any; type: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <input
        type={type} required placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-3 py-2.5 rounded-md bg-input/40 border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
      />
    </div>
  );
}
