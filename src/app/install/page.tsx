import { AppShell } from "@/components/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GLICLASS_LABELS,
  JEV_FALSIFIER,
  JEV_PRIMARY_CHOICE,
  JEV_SEVERITY_SCORE,
} from "@/lib/risk/taxonomy";

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
            "type": "command",
            "command": "npx tsx hooks/run.ts claude"
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
    "sessionStart": [
      { "command": "npx tsx hooks/run.ts cursor" }
    ],
    "beforeShellExecution": [
      { "command": "npx tsx hooks/run.ts cursor", "failClosed": true }
    ],
    "preToolUse": [
      { "command": "npx tsx hooks/run.ts cursor", "failClosed": true }
    ],
    "postToolUse": [
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
          Keep this app running. Point Claude Code at the HTTP routes for prompt
          steering and at the command wrapper for fail-closed PreToolUse. Point Cursor
          at the stdin CLI. Set TYPESAFE_API_KEY for Jev. Without a key the lexical
          layer still scores, and structural detectors still deny protected evaluation
          assets and `--no-verify`. Claude HTTP hooks are not fail-closed: a timeout is
          a no-op. Cursor `beforeSubmitPrompt` cannot inject context; tool-denial steering
          uses `agent_message`.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claude Code</CardTitle>
            <CardDescription>
              Merge into .claude/settings.json. HTTP hooks POST the event JSON to this
              process. A non-2xx response cannot block. Command hooks can: the wrapper
              emits deny JSON and exits 2 if scoring fails. Prefer the command path on
              PreToolUse.
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
              Save as .cursor/hooks.json. Cloud agents run project hooks from the repo
              root. beforeSubmitPrompt cannot inject context, so a gameable prompt is
              allowed with a user notice. failClosed keeps a broken scorer from failing
              open on shell and tool gates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">{cursorHooks}</pre>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Jev questions</CardTitle>
            <CardDescription>
              One System One request per hook event unless a structural deny already
              fired. Thirteen hazard Nouls, one positive falsifier Noul, one Choice,
              one severity Score. Code owns thresholds and steer copy. The falsifier
              Noul does not enter hazard aggregation. Pin jev-1.13.0. Get a key from
              console.typesafe.ai. Set HACK_RADAR_MODE to shadow, then review, then
              enforce.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <p>
              <span className="font-medium">Choice. </span>
              {JEV_PRIMARY_CHOICE.instructions}
            </p>
            <p>
              <span className="font-medium">Score. </span>
              {JEV_SEVERITY_SCORE.instructions}
            </p>
            <p>
              <span className="font-medium">Falsifier (not a hazard). </span>
              {JEV_FALSIFIER.instructions}
            </p>
            <ul className="flex flex-col gap-2">
              {GLICLASS_LABELS.map((spec) => (
                <li key={spec.kind}>
                  <span className="font-mono text-xs">{spec.kind}</span>
                  <div>{spec.jev.instructions}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Offline GLiClass labels</CardTitle>
            <CardDescription>
              Same RiskKind ids as the Jev Nouls. Pass these strings to
              knowledgator/gliclass-base-v3.0 when you cannot call TypeSafe. Fine-tune
              with 8 traces per label from School of Reward Hacks plus your own denied
              tool calls. Shared ids do not make the probabilities interchangeable with Jev.
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
