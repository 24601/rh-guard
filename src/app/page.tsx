import { AppShell } from "@/components/app-shell";
import { ScoreWorkbench } from "@/components/score-workbench";

export default function HomePage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="font-heading text-2xl tracking-tight">Reward-hack radar for coding agents</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Score a prompt or a trajectory for the ways coding agents game tests, then
          steer toward hidden tests, properties, and independent verifiers. Live
          semantic scoring is TypeSafe Jev, a System One model. Structural detectors
          still deny test-file writes in code. The same function runs in Claude Code
          and Cursor hooks.
        </p>
      </div>
      <ScoreWorkbench />
    </AppShell>
  );
}
