import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader, InfoBanner } from "@/components/PageScaffold";
import { FaRobot, FaPaperPlane, FaLightbulb, FaBookOpen, FaChartLine } from "react-icons/fa";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/_admin/admin/ai-assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — KYB Rajepra" }] }),
  component: () => (
    <AppShell variant="admin">
      <AIInner />
    </AppShell>
  ),
});

function AIInner() {
  const [input, setInput] = useState("");
  const suggestions = [
    { icon: FaBookOpen, text: "Suggest a sermon outline on grace" },
    { icon: FaChartLine, text: "Summarize this month's giving" },
    { icon: FaLightbulb, text: "Draft an announcement for next Sunday" },
  ];
  return (
    <div className="space-y-6">
      <PageHeader icon={FaRobot} title="AI Assistant" subtitle="Ask for sermon outlines, summaries, drafts, and insights" />
      <InfoBanner>Connects to <code className="font-mono text-gold">POST /api/ai/chat</code> on your backend.</InfoBanner>
      <div className="bg-card border border-border rounded-lg p-6 min-h-[300px] flex flex-col">
        <div className="flex-1 grid place-items-center text-center text-sm text-muted-foreground">
          <div>
            <FaRobot className="mx-auto w-10 h-10 text-gold/60 mb-2" />
            Start a conversation with your assistant.
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-2 mb-3">
          {suggestions.map((s) => (
            <button key={s.text} className="flex items-center gap-2 text-left p-3 rounded-md border border-border hover:bg-accent text-xs">
              <s.icon className="text-gold w-3.5 h-3.5 shrink-0" />
              <span>{s.text}</span>
            </button>
          ))}
        </div>
        <form className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the assistant..."
            className="flex-1 px-4 py-2.5 rounded-md bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="submit" className="btn-gold inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium">
            <FaPaperPlane className="w-3.5 h-3.5" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
