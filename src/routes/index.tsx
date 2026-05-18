import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { FaPrayingHands, FaUsers, FaBookOpen, FaHandsHelping, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KYB Rajepra — Faith, Community, Hope" },
      { name: "description", content: "Join our community of faith. Worship, fellowship, and service." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PublicLayout>
      <section className="relative hero-sacred overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.72 0.14 75 / 0.3), transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.72 0.14 75 / 0.2), transparent 50%)",
        }} />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36 text-center text-white">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">A Place to Belong</p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight max-w-4xl mx-auto">
            Faith, <em className="text-gold not-italic">Community</em>, and a Life of Purpose
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-2xl mx-auto">
            Walking together in worship, growing in love — discover a church that feels like home.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register" className="btn-gold px-6 py-3 rounded-md font-medium inline-flex items-center gap-2">
              Become a member <FaArrowRight />
            </Link>
            <a href="#about" className="px-6 py-3 rounded-md font-medium border border-white/30 text-white hover:bg-white/10 transition">
              Learn more
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: FaPrayingHands, title: "Worship", body: "Gather every Sunday to lift our hearts in praise and prayer." },
            { icon: FaUsers, title: "Community", body: "Small groups, fellowship, and life shared with one another." },
            { icon: FaHandsHelping, title: "Service", body: "Loving our neighbors through outreach, care, and mission." },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-lg p-7 hover:shadow-elegant transition">
              <div className="w-12 h-12 rounded-md hero-sacred grid place-items-center text-gold mb-5">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Join Us</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">Weekly Services</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Whether it's your first time or you've been with us for years, you are welcome.
            </p>
            <ul className="space-y-4">
              {[
                { day: "Sunday Worship", time: "9:00 AM & 11:00 AM" },
                { day: "Bible Study", time: "Wednesdays · 6:30 PM" },
                { day: "Prayer Meeting", time: "Fridays · 7:00 PM" },
              ].map((s) => (
                <li key={s.day} className="flex items-center gap-4 bg-card border border-border rounded-md p-4">
                  <FaCalendarAlt className="text-gold" />
                  <div className="flex-1">
                    <p className="font-medium">{s.day}</p>
                    <p className="text-sm text-muted-foreground">{s.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-8">
            <FaBookOpen className="text-gold w-8 h-8 mb-4" />
            <blockquote className="font-display text-2xl leading-snug italic text-foreground">
              "For where two or three gather in my name, there am I with them."
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">— Matthew 18:20</p>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-4">Come as you are</h2>
        <p className="text-muted-foreground mb-8">
          Create an account to access services, give online, and connect with the community.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/register" className="btn-gold px-6 py-3 rounded-md font-medium">Create account</Link>
          <Link to="/login" className="px-6 py-3 rounded-md font-medium border border-border hover:bg-accent transition">Sign in</Link>
        </div>
      </section>
    </PublicLayout>
  );
}
