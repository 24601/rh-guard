"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  EXAMPLES,
  RISK_KINDS,
  kindBlurb,
  kindTitle,
  score,
  type ScoreInput,
  type Stage,
  type Verdict,
} from "@/lib/risk";

const STAGES: { value: Stage; label: string }[] = [
  { value: "prompt", label: "Prompt" },
  { value: "thought", label: "Thought" },
  { value: "tool", label: "Tool" },
  { value: "edit", label: "Edit" },
  { value: "stop", label: "Stop" },
  { value: "trajectory", label: "Trajectory" },
];

function verdictTone(verdict: Verdict): "secondary" | "outline" | "destructive" {
  if (verdict === "ok") return "secondary";
  if (verdict === "steer") return "outline";
  return "destructive";
}

export function ScoreWorkbench() {
  const [exampleId, setExampleId] = useState(EXAMPLES[1].id);
  const [stage, setStage] = useState<Stage>(EXAMPLES[1].input.stage);
  const [text, setText] = useState(EXAMPLES[1].input.prompt ?? "");

  const input: ScoreInput = useMemo(() => {
    if (stage === "tool") {
      return { stage, toolName: "Bash", toolInput: text };
    }
    if (stage === "edit") {
      return { stage, patch: text, path: "tests/test_foo.py" };
    }
    if (stage === "thought") {
      return { stage, thought: text };
    }
    if (stage === "prompt") {
      return { stage, prompt: text };
    }
    return { stage, transcript: text };
  }, [stage, text]);

  let report = null;
  let error: string | null = null;
  try {
    report = score(input);
  } catch (err) {
    error = err instanceof Error ? err.message : "Scoring failed.";
  }

  function loadExample(id: string) {
    const example = EXAMPLES.find((item) => item.id === id);
    if (!example) return;
    setExampleId(id);
    setStage(example.input.stage);
    const blob =
      example.input.prompt ??
      example.input.transcript ??
      example.input.toolInput ??
      example.input.patch ??
      "";
    setText(blob);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>Score a prompt or trace</CardTitle>
          <CardDescription>
            Same engine the Claude and Cursor hooks call. Structural detectors plus GLiClass-shaped labels.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              value={exampleId}
              onValueChange={(value) => {
                if (value) loadExample(value);
              }}
            >
              <SelectTrigger aria-label="Example" className="w-full">
                <SelectValue placeholder="Load an example" />
              </SelectTrigger>
              <SelectContent>
                {EXAMPLES.map((example) => (
                  <SelectItem key={example.id} value={example.id}>
                    {example.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={stage}
              onValueChange={(value) => {
                if (value) setStage(value as Stage);
              }}
            >
              <SelectTrigger aria-label="Stage" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAGES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste a user prompt, a tool call, or a trajectory…"
            className="min-h-56 font-mono text-[13px]"
          />
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <p className="text-xs text-muted-foreground">
            Empty input scores as ok. Load a risky example or paste a real Claude/Cursor trace.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        {!text.trim() ? (
          <Card>
            <CardHeader>
              <CardTitle>Empty</CardTitle>
              <CardDescription>
                Nothing to score yet. A hook in this state exits 0 and leaves the agent alone.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : report ? (
          <>
            <Card>
              <CardHeader className="flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle>Verdict</CardTitle>
                  <CardDescription>
                    Combined score {report.overall.toFixed(2)} at the {report.stage} stage.
                  </CardDescription>
                </div>
                <Badge variant={verdictTone(report.verdict)}>{report.verdict}</Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {RISK_KINDS.map((kind) => (
                    <div
                      key={kind}
                      title={kindBlurb(kind)}
                      className="rounded-lg border border-border/80 px-2 py-1.5"
                    >
                      <div className="text-[11px] text-muted-foreground">{kindTitle(kind)}</div>
                      <div className="font-mono text-sm tabular-nums">
                        {report.labels[kind].toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
                <CardDescription>
                  {report.evidence.length === 0
                    ? "No detector fired. That is not a proof of safety."
                    : `${report.evidence.length} hits, strongest first.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {report.evidence.length === 0 ? null : (
                  <ul className="flex flex-col gap-3">
                    {report.evidence.map((item) => (
                      <li key={`${item.detectorId}-${item.excerpt}`}>
                        <div className="text-sm font-medium">
                          {kindTitle(item.kind)} · {item.detectorId}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.why}</p>
                        <p className="mt-1 font-mono text-xs">{item.excerpt}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            {report.verdict === "ok" ? null : (
              <Card>
                <CardHeader>
                  <CardTitle>Steer</CardTitle>
                  <CardDescription>
                    What the user should change about the eval, and what the hook injects into the agent.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {report.steer.moves.map((move) => (
                      <li key={move.id}>
                        <span className="font-medium">{move.title}.</span>{" "}
                        {move.instruction}
                      </li>
                    ))}
                  </ul>
                  {report.steer.agentContext ? (
                    <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs whitespace-pre-wrap">
                      {report.steer.agentContext}
                    </pre>
                  ) : null}
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Could not score</CardTitle>
              <CardDescription>Fix the input and try again.</CardDescription>
            </CardHeader>
          </Card>
        )}
        <Button type="button" variant="outline" onClick={() => loadExample(exampleId)}>
          Reset example
        </Button>
      </div>
    </div>
  );
}
