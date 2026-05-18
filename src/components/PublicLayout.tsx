import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FaChurch, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useAuth } from "@/lib/auth";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded-md hero-sacred text-gold">
              <FaChurch className="w-5 h-5" />
            </span>
            <span className="font-display text-xl tracking-tight">
              KYB <span className="text-gold">Rajepra</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition">Home</Link>
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#services" className="hover:text-foreground transition">Services</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-gold px-4 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-gold transition">
                  Sign in
                </Link>
                <Link to="/register" className="btn-gold px-4 py-2 rounded-md text-sm font-medium">
                  Join us
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <FaChurch className="w-5 h-5 text-gold" />
              <span className="font-display text-lg">KYB Rajepra</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              A community of faith, hope and love — serving God and one another.
            </p>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold mb-3">Visit</h4>
            <p className="text-muted-foreground">Sundays · 9:00 AM & 11:00 AM</p>
            <p className="text-muted-foreground">Wednesdays · 6:30 PM Bible Study</p>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold mb-3">Follow</h4>
            <div className="flex gap-3 text-muted-foreground">
              <a href="#" className="hover:text-gold"><FaFacebookF /></a>
              <a href="#" className="hover:text-gold"><FaInstagram /></a>
              <a href="#" className="hover:text-gold"><FaYoutube /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} KYB Rajepra. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
