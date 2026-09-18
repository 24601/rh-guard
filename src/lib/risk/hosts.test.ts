import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { EXAMPLES } from "./examples";
import {
  canonicalFlavor,
  failClosedAmpOutput,
  failClosedClaudeOutput,
  failClosedCodexOutput,
  failClosedExitCode,
  failClosedGrokOutput,
  failClosedHostOutput,
  httpEnabled,
  parseHookFlavor,
  successExitCode,
  toAmpOutput,
  toCodexOutput,
  toGenericOutput,
  toGrokOutput,
  toHostOutput,
  toPiOutput,
} from "./index";
import { parseHookEvent } from "./parse";
import { score } from "./score";
import { AGENT_DENY } from "./steer";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

function example(id: string) {
  const found = EXAMPLES.find((item) => item.id === id);
  if (!found) throw new Error(`missing example ${id}`);
  return found.input;
}

function blockedReport() {
  return score(example("sed-tests"));
}

function cleanReport() {
  return score(example("clean-search"));
}

describe("host flavor aliases", () => {
  it("maps dsh to generic and keeps codex distinct from claude", () => {
    expect(canonicalFlavor("dsh")).toBe("generic");
    expect(canonicalFlavor("exo")).toBe("generic");
    expect(canonicalFlavor("codex")).toBe("codex");
    expect(parseHookFlavor("grok")).toBe("grok");
    expect(parseHookFlavor("nope")).toBeUndefined();
  });
});

describe("host deny JSON", () => {
  it("keeps Claude fail-closed continue:false off the Codex adapter", () => {
    const claude = failClosedClaudeOutput("PreToolUse");
    const codex = failClosedCodexOutput();
    expect(claude.continue).toBe(false);
    expect(codex).toEqual({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: AGENT_DENY,
      },
    });
    expect(codex).not.toHaveProperty("continue");
    expect(codex).not.toHaveProperty("decision");
    expect(failClosedHostOutput("codex")).toEqual(codex);
  });

  it("denies Codex PreToolUse with Claude-like permissionDecision and exit 2", () => {
    const report = blockedReport();
    const out = toCodexOutput("PreToolUse", report);
    expect(out.hookSpecificOutput?.permissionDecision).toBe("deny");
    expect(out.hookSpecificOutput?.permissionDecisionReason).toBe(AGENT_DENY);
    expect(out).not.toHaveProperty("continue");
    expect(successExitCode("codex", "PreToolUse", report)).toBe(2);
    expect(successExitCode("claude", "PreToolUse", report)).toBe(0);
    expect(failClosedExitCode("codex")).toBe(2);
  });

  it("does not emit Codex deny JSON for non-tool events", () => {
    expect(toCodexOutput("UserPromptSubmit", blockedReport())).toEqual({});
    expect(toHostOutput("codex", "Stop", blockedReport())).toEqual({});
  });

  it("uses Grok {decision:deny,reason} and not Claude hookSpecificOutput", () => {
    const report = blockedReport();
    const out = toGrokOutput("PreToolUse", report);
    expect(out).toEqual({ decision: "deny", reason: AGENT_DENY });
    expect(out).not.toHaveProperty("hookSpecificOutput");
    expect(out).not.toHaveProperty("continue");
    expect(failClosedGrokOutput()).toEqual(out);
    expect(toGrokOutput("Stop", report)).toEqual({});
    expect(successExitCode("grok", "PreToolUse", report)).toBe(2);
    expect(successExitCode("grok", "Stop", report)).toBe(0);
  });

  it("denies Amp with reject-and-continue, never the error action", () => {
    const blocked = toAmpOutput(blockedReport());
    const closed = failClosedAmpOutput();
    expect(blocked).toEqual({
      action: "reject-and-continue",
      message: AGENT_DENY,
    });
    expect(closed).toEqual(blocked);
    expect(toAmpOutput(cleanReport())).toEqual({ action: "allow" });
  });

  it("blocks Pi and Prime with {block,reason} and generic with exit 2", () => {
    const report = blockedReport();
    expect(toPiOutput(report)).toEqual({
      block: true,
      reason: AGENT_DENY,
      terminate: true,
    });
    expect(toHostOutput("prime", "tool_call", report)).toEqual({
      block: true,
      reason: AGENT_DENY,
    });
    expect(toGenericOutput(report)).toEqual({ block: true, reason: AGENT_DENY });
    expect(toHostOutput("dsh", "tool_call", report)).toEqual({
      block: true,
      reason: AGENT_DENY,
    });
    expect(successExitCode("generic", "tool_call", report)).toBe(2);
    expect(successExitCode("dsh", "tool_call", report)).toBe(2);
    expect(successExitCode("exo", "tool_call", report)).toBe(2);
    expect(toHostOutput("exo", "tool_call", report)).toEqual({
      block: true,
      reason: AGENT_DENY,
    });
    expect(httpEnabled("claude")).toBe(true);
    expect(httpEnabled("cursor")).toBe(true);
    expect(httpEnabled("codex")).toBe(false);
    expect(httpEnabled("dsh")).toBe(false);
    expect(httpEnabled("exo")).toBe(true);
    expect(successExitCode("pi", "tool_call", report)).toBe(0);
    expect(toPiOutput(cleanReport())).toEqual({});
    expect(toGenericOutput(cleanReport())).toEqual({ block: false });
  });
});

describe("parseHookEvent host payloads", () => {
  it("reads Grok camelCase PreToolUse", () => {
    const parsed = parseHookEvent({
      hookEventName: "PreToolUse",
      toolName: "Bash",
      toolInput: { command: "sed -i 's/assert result == 3/assert True/' tests/test_foo.py" },
    });
    expect(parsed.source).toBe("grok");
    expect(parsed.event).toBe("PreToolUse");
    expect(parsed.input.stage).toBe("tool");
    expect(parsed.input.toolName).toBe("Bash");
    expect(score(parsed.input).hookVerdict).toBe("block");
  });

  it("reads generic tool/input stdin", () => {
    const parsed = parseHookEvent({
      event: "tool_call",
      tool: "Bash",
      input: {
        command: "sed -i 's/assert result == 3/assert True/' tests/test_foo.py",
      },
      path: "tests/test_foo.py",
    });
    expect(parsed.source).toBe("generic");
    expect(parsed.input.stage).toBe("tool");
    expect(parsed.input.toolName).toBe("Bash");
    expect(parsed.input.path).toBe("tests/test_foo.py");
    expect(score(parsed.input).hookVerdict).toBe("block");
  });

  it("reads Grok pre_tool_use without classifying it as Cursor", () => {
    const parsed = parseHookEvent({
      hookEventName: "pre_tool_use",
      toolName: "run_terminal_command",
      toolInput: {
        command: "sed -i 's/assert result == 3/assert True/' tests/test_foo.py",
      },
    });
    expect(parsed.source).toBe("grok");
    expect(parsed.input.stage).toBe("tool");
    expect(score(parsed.input).hookVerdict).toBe("block");
  });

  it("reads Exo ToolRequest functionName/arguments", () => {
    const parsed = parseHookEvent({
      functionName: "shell",
      arguments: {
        command: "sed -i 's/assert result == 3/assert True/' tests/test_foo.py",
      },
    });
    expect(parsed.source).toBe("generic");
    expect(parsed.input.stage).toBe("tool");
    expect(parsed.input.toolName).toBe("shell");
    expect(score(parsed.input).hookVerdict).toBe("block");
  });
});

describe("hooks/run.ts flavors", () => {
  function runFlavor(flavor: string, payload: unknown) {
    return spawnSync("npx", ["tsx", "hooks/run.ts", flavor], {
      cwd: root,
      encoding: "utf8",
      input: `${JSON.stringify(payload)}\n`,
      timeout: 20_000,
    });
  }

  const tamper = {
    event: "tool_call",
    tool: "Bash",
    input: {
      command: "sed -i 's/assert result == 3/assert True/' tests/test_foo.py",
    },
    path: "tests/test_foo.py",
  };

  it("emits Grok deny JSON and exit 2", () => {
    const result = runFlavor("grok", {
      hookEventName: "PreToolUse",
      toolName: "Bash",
      toolInput: tamper.input,
    });
    expect(result.status).toBe(2);
    const out = JSON.parse(result.stdout) as { decision?: string; reason?: string };
    expect(out.decision).toBe("deny");
    expect(out.reason).toBe(AGENT_DENY);
    expect(result.stdout).not.toMatch(/hookSpecificOutput/);
    expect(result.stderr).toMatch(/protected evaluation artifacts/);
  });

  it("emits Codex-safe deny JSON without continue", () => {
    const result = runFlavor("codex", {
      hook_event_name: "PreToolUse",
      tool_name: "Bash",
      tool_input: tamper.input,
    });
    expect(result.status).toBe(2);
    const out = JSON.parse(result.stdout) as {
      continue?: boolean;
      hookSpecificOutput?: { permissionDecision?: string };
    };
    expect(out.continue).toBeUndefined();
    expect(out.hookSpecificOutput?.permissionDecision).toBe("deny");
  });

  it("emits generic {block:true} and exit 2 for dsh and exo", () => {
    for (const flavor of ["dsh", "exo"] as const) {
      const result = runFlavor(flavor, tamper);
      expect(result.status).toBe(2);
      expect(JSON.parse(result.stdout)).toEqual({
        block: true,
        reason: AGENT_DENY,
      });
    }
  });
});
