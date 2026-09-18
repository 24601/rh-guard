import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { failClosedClaudeOutput } from "./hooks";
import { AGENT_DENY } from "./steer";
import claudeCommandSettings from "../../../examples/claude-command-settings.json";
import claudeSettings from "../../../examples/claude-settings.json";
import cursorHooks from "../../../examples/cursor-hooks.json";
import codexHooks from "../../../examples/codex-hooks.json";
import grokHooks from "../../../examples/grok-hooks.json";
import piHooksSettings from "../../../examples/pi-hooks-settings.json";
import pluginHooks from "../../../hooks/hooks.json";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

function httpUrl(entry: {
  hooks?: { type?: string; url?: string; command?: string }[];
}): string | undefined {
  return entry.hooks?.find((hook) => hook.type === "http")?.url;
}

function commandOf(entry: {
  hooks?: { type?: string; url?: string; command?: string }[];
}): string | undefined {
  return entry.hooks?.find((hook) => hook.type === "command")?.command;
}

describe("hook pack stays aligned with examples/", () => {
  it("uses the same Claude HTTP sidecar URL as examples/claude-settings.json", () => {
    const examplePrompt = claudeSettings.hooks.UserPromptSubmit[0];
    const exampleStop = claudeSettings.hooks.Stop[0];
    const pluginPrompt = pluginHooks.hooks.UserPromptSubmit[0];
    const pluginStop = pluginHooks.hooks.Stop[0];
    expect(httpUrl(pluginPrompt)).toBe(httpUrl(examplePrompt));
    expect(httpUrl(pluginStop)).toBe(httpUrl(exampleStop));
    expect(httpUrl(pluginPrompt)).toBe(
      "http://127.0.0.1:43147/api/hooks/claude"
    );
  });

  it("keeps the same PreToolUse matcher as examples/claude-command-settings.json", () => {
    const example = claudeCommandSettings.hooks.PreToolUse[0];
    const plugin = pluginHooks.hooks.PreToolUse[0];
    expect(plugin.matcher).toBe(example.matcher);
    expect(example.matcher).toBe("Bash|Edit|Write|StrReplace");
    expect(commandOf(example)).toBe("npx tsx hooks/run.ts claude");
    expect(commandOf(plugin)).toContain("hooks/claude-hook.sh");
  });

  it("documents Cursor failClosed on mutating gates in examples/cursor-hooks.json", () => {
    const shell = cursorHooks.hooks.beforeShellExecution[0];
    const tool = cursorHooks.hooks.preToolUse[0];
    expect(shell.failClosed).toBe(true);
    expect(tool.failClosed).toBe(true);
    expect(shell.command).toBe("npx tsx hooks/run.ts cursor");
  });
});

describe("discoverability copy", () => {
  const PUBLIC_COPY_PATHS = [
    "README.md",
    "docs/hosts.md",
    "docs/install-plugin.md",
    "docs/shape.md",
    "src/app/install/page.tsx",
    "src/app/literature/page.tsx",
    ".agents/skills/rh-guard/SKILL.md",
    ".agents/skills/rh-guard/references/gates.md",
  ] as const;

  const RESEARCH_OPS_CLUTTER =
    /research-prompt|Deep Research|ChatGPT Pro|Gemini Deep Research|Both copies are private|Suggested description|GitHub topics/i;

  it("keeps the public product README, not research-ops housekeeping", () => {
    const readme = readFileSync(join(root, "README.md"), "utf8");
    expect(readme).not.toMatch(/Both copies are private/i);
    expect(readme).not.toMatch(RESEARCH_OPS_CLUTTER);
    expect(readme).toMatch(/public on GitHub/i);
    expect(readme).toMatch(/24601\/Augustus/);
    expect(readme).toMatch(/examples\/claude-settings\.json/);
    expect(readme).toMatch(/examples\/cursor-hooks\.json/);
    expect(readme).toMatch(/docs\/hosts\.md/);
    expect(readme).toMatch(/Codex/);
    expect(readme).toMatch(/DeepSeek Harness/);
    expect(readme).toMatch(/command-hook/);
    expect(readme).toMatch(/DSH \(generic\/adapter\)/);
    expect(readme).toMatch(/support via ToolRuntime wrap/i);
    expect(readme).toMatch(/no public Jev reward-hack ROC/i);
    expect(readme).toMatch(/Lexical \/ GLiClass fallback is \*\*degraded\*\*/);
    expect(readme).toMatch(/huntedman\/JevLint/);
    expect(readme).toMatch(/thevibeworks\/jevgate/);
    expect(readme).toMatch(/allowlist that proves what may run/i);
    expect(readme).toMatch(/write → check → fix/);
    expect(readme).toMatch(/fastino-ai\/GLiGuard/);
    expect(readme).toMatch(/encoder-based LLM prompt\/response safety guard/i);
    expect(readme).toMatch(/reward-hack \/ eval integrity gate/i);
  });

  it("does not advertise Deep Research paste workflows on public surfaces", () => {
    for (const rel of PUBLIC_COPY_PATHS) {
      const text = readFileSync(join(root, rel), "utf8");
      expect(text, rel).not.toMatch(RESEARCH_OPS_CLUTTER);
    }
  });

  it("does not call the GitHub copy private", () => {
    const readme = readFileSync(join(root, "README.md"), "utf8");
    expect(readme).not.toMatch(/Both copies are private/i);
    expect(readme).toMatch(/public on GitHub/i);
    expect(readme).toMatch(/24601\/Augustus/);
    expect(readme).toMatch(/examples\/claude-settings\.json/);
    expect(readme).toMatch(/examples\/cursor-hooks\.json/);
    expect(readme).toMatch(/docs\/hosts\.md/);
    expect(readme).toMatch(/Codex/);
    expect(readme).toMatch(/DeepSeek Harness/);
    expect(readme).toMatch(/support via ToolRuntime wrap/i);
  });

  it("ships a thin rh-guard skill that refuses to be a Next runbook", () => {
    const skill = readFileSync(
      join(root, ".agents/skills/rh-guard/SKILL.md"),
      "utf8"
    );
    expect(skill).toMatch(/^name: rh-guard/m);
    expect(skill).toMatch(/Do not use to run or debug the Next\.js/i);
    expect(skill).toMatch(/npx skills add 24601\/rh-guard --skill rh-guard/);
    expect(skill).toMatch(/opaque denials for agents/i);
    expect(skill).toMatch(/Never train RL/i);
    expect(skill).toMatch(/high means the hack is present/i);
    expect(skill).toMatch(/control_falsifier_named/);
    expect(skill).toMatch(/multi-host/);
    expect(skill).toMatch(/Codex/);
    expect(skill).toMatch(/docs\/hosts\.md/);
    expect(skill).toMatch(/ToolRuntime/);
  });
});

describe("multi-host examples/", () => {
  it("keeps Codex command-only and Codex-safe", () => {
    const pre = codexHooks.hooks.PreToolUse[0];
    expect(commandOf(pre)).toBe("npx tsx hooks/run.ts codex");
    expect(pre.hooks.every((hook) => hook.type === "command")).toBe(true);
    expect(JSON.stringify(codexHooks)).not.toMatch(/"type": "http"/);
    expect(JSON.stringify(codexHooks)).not.toMatch(/continue/);
  });

  it("points Grok at run.ts grok and ships a Grok deny wrapper", () => {
    expect(commandOf(grokHooks.hooks.PreToolUse[0])).toBe(
      "npx tsx hooks/run.ts grok"
    );
    const script = readFileSync(join(root, "hooks/grok-hook.sh"), "utf8");
    expect(script).toContain(AGENT_DENY);
    expect(script).toContain('"decision":"deny"');
    expect(script).not.toContain("hookSpecificOutput");
    expect(script).toContain("/api/hooks/grok");
  });

  it("keeps Pi command settings command-only for @hsingjui/pi-hooks", () => {
    const pre = piHooksSettings.hooks.PreToolUse[0];
    expect(commandOf(pre)).toBe("npx tsx hooks/run.ts claude");
    expect(pre.matcher).toBe("bash|edit|write");
    expect(pre.hooks.every((hook) => hook.type === "command")).toBe(true);
    expect(JSON.stringify(piHooksSettings)).not.toMatch(/"type": "http"/);
  });

  it("ships self-contained Pi/Amp/Prime copies with opaque AGENT_DENY", () => {
    const pi = readFileSync(join(root, "examples/pi-extension.ts"), "utf8");
    const amp = readFileSync(join(root, "examples/amp-plugin.ts"), "utf8");
    const prime = readFileSync(join(root, "examples/prime-extension.ts"), "utf8");
    for (const src of [pi, amp, prime]) {
      expect(src).toContain(AGENT_DENY);
      expect(src).toMatch(/fetch\(/);
      expect(src).not.toMatch(/@ampcode\/plugin/);
      expect(src).not.toMatch(/@earendil-works\/pi-coding-agent/);
    }
    expect(pi).toMatch(/terminate:\s*true/);
    expect(pi).toContain("/api/hooks/pi");
    expect(prime).not.toMatch(/terminate\s*:/);
    expect(prime).toContain("/api/hooks/prime");
    expect(amp).toMatch(/reject-and-continue/);
    expect(amp).not.toMatch(/action:\s*"error"/);
    expect(amp).toContain("/api/hooks/amp");
  });

  it("documents Exo as ToolRuntime wrap, not drop-in hooks", () => {
    const ts = readFileSync(join(root, "examples/exo-tool-runtime.ts"), "utf8");
    const rs = readFileSync(join(root, "examples/exo-tool-runtime.rs"), "utf8");
    const hosts = readFileSync(join(root, "docs/hosts.md"), "utf8");
    for (const src of [ts, rs, hosts]) {
      expect(src).toContain(AGENT_DENY);
      expect(src).toMatch(/ToolRuntime/);
    }
    expect(ts).toMatch(/executeTool/);
    expect(hosts).toMatch(/not drop-in hooks/i);
    expect(hosts).toMatch(/DeepSeek Harness/);
  });

  it("uses a Next 16 Promise params dynamic hook route", () => {
    const route = readFileSync(
      join(root, "src/app/api/hooks/[flavor]/route.ts"),
      "utf8"
    );
    expect(route).toMatch(/params: Promise<\{ flavor: string \}>/);
    expect(route).toMatch(/toHostOutput/);
    expect(route).toMatch(/httpEnabled/);
    expect(route).toMatch(/has no HTTP hook type/);
  });
});

describe("fail-closed Claude adapter", () => {
  it("embeds the same opaque deny as failClosedClaudeOutput()", () => {
    const script = readFileSync(join(root, "hooks/claude-hook.sh"), "utf8");
    const out = failClosedClaudeOutput("PreToolUse");
    expect(script).toContain(AGENT_DENY);
    expect(script).toContain(out.reason);
    expect(script).toContain('"permissionDecision":"deny"');
    expect(out.hookSpecificOutput?.permissionDecisionReason).toBe(AGENT_DENY);
  });
});
