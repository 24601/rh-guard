import { AppShell } from "@/components/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GLICLASS_LABELS } from "@/lib/risk";

const claudeSettings = `{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "http",
            "url": "http://127.0.0.1:43147/api/hooks/claude"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash|Edit|Write|StrReplace",
        "hooks": [
          {
            "type": "http",
            "url": "http://127.0.0.1:43147/api/hooks/claude"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "http",
            "url": "http://127.0.0.1:43147/api/hooks/claude"
          }
        ]
      }
    ]
  }
}`;

const cursorHooks = `{
  "version": 1,
  "hooks": {
    "beforeSubmitPrompt": [
      { "command": "npx tsx hooks/run.ts cursor" }
    ],
    "beforeShellExecution": [
      { "command": "npx tsx hooks/run.ts cursor" }
    ],
    "preToolUse": [
      { "command": "npx tsx hooks/run.ts cursor" }
    ],
    "stop": [
      { "command": "npx tsx hooks/run.ts cursor" }
    ]
  }
}`;

export default function InstallPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="font-heading text-2xl tracking-tight">Install on a coding agent</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Keep this app running. Point Claude Code at the HTTP routes. Point Cursor at the stdin
          CLI. Prompts get extra context. Test-file writes and `--no-verify` get denied.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claude Code</CardTitle>
            <CardDescription>
              Merge into .claude/settings.json. HTTP hooks POST the event JSON to this process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">{claudeSettings}</pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cursor</CardTitle>
            <CardDescription>
              Save as .cursor/hooks.json. Cloud agents run project hooks from the repo root.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">{cursorHooks}</pre>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>GLiClass labels</CardTitle>
            <CardDescription>
              Pass these strings to knowledgator/gliclass-base-v3.0 or gliclass-modern-base-v3.0.
              Fine-tune with 8 traces per label from School of Reward Hacks plus your own traces.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 text-sm">
              {GLICLASS_LABELS.map((spec) => (
                <li key={spec.kind}>
                  <span className="font-mono text-xs">{spec.kind}</span>
                  <div>{spec.gliclass}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
