import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { authApi } from "@/lib/api";
import { FaChurch, FaEnvelope, FaSpinner } from "react-icons/fa";
import { Field } from "./login";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — KYB Rajepra" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setDone(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not send reset email");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <FaChurch className="w-6 h-6 text-gold" />
          <span className="font-display text-xl">KYB Rajepra</span>
        </Link>
        <h1 className="font-display text-3xl">Reset password</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email and we'll send you a reset link.
        </p>
        {done ? (
          <div className="mt-8 p-4 rounded-md bg-secondary border border-border text-sm">
            If an account exists for <strong>{email}</strong>, a reset link has been sent.
            <div className="mt-3"><Link to="/login" className="text-gold hover:underline">Back to sign in</Link></div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="text-sm rounded-md bg-destructive/10 text-destructive px-3 py-2 border border-destructive/30">
                {error}
              </div>
            )}
            <Field icon={FaEnvelope} type="email" placeholder="Email address" value={email} onChange={setEmail} />
            <button type="submit" disabled={loading}
              className="btn-gold w-full py-2.5 rounded-md font-medium inline-flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><FaSpinner className="animate-spin" /> Sending…</> : "Send reset link"}
            </button>
            <Link to="/login" className="block text-center text-sm text-muted-foreground hover:text-gold">
              Back to sign in
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
