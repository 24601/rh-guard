import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { failClosedClaudeOutput } from "./hooks";
import { AGENT_DENY } from "./steer";
import claudeCommandSettings from "../../../examples/claude-command-settings.json";
import claudeSettings from "../../../examples/claude-settings.json";
import cursorHooks from "../../../examples/cursor-hooks.json";
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
  it("does not call the GitHub copy private", () => {
    const readme = readFileSync(join(root, "README.md"), "utf8");
    expect(readme).not.toMatch(/Both copies are private/i);
    expect(readme).toMatch(/public on GitHub/i);
    expect(readme).toMatch(/24601\/Augustus/);
    expect(readme).toMatch(/examples\/claude-settings\.json/);
    expect(readme).toMatch(/examples\/cursor-hooks\.json/);
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
