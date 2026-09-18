import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { POST as hookFlavorPost } from "../../app/api/hooks/[flavor]/route";
import { EXAMPLES } from "./examples";
import {
  HOOK_FLAVORS,
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

  // The documented DSH install runs the unmodified Claude and Codex command
  // hooks at tools/pre-execute. Both used to answer {} with exit 0 there.
  const preExecuteCases = [
    {
      name: "sed of asserts",
      command: "sed -i 's/assert result == 3/assert True/' tests/test_foo.py",
    },
    { name: "rm of a protected eval", command: "rm -rf eval/hidden/test_secret.py" },
  ];

  for (const flavor of ["claude", "codex"] as const) {
    for (const { name, command } of preExecuteCases) {
      it(`denies ${name} on the DSH ${flavor} bridge at tools/pre-execute`, () => {
        const result = runFlavor(flavor, {
          hook_event_name: "tools/pre-execute",
          tool_name: "Bash",
          tool_input: { command },
        });
        const out = JSON.parse(result.stdout) as {
          continue?: boolean;
          hookSpecificOutput?: {
            hookEventName?: string;
            permissionDecision?: string;
            permissionDecisionReason?: string;
            additionalContext?: string;
          };
        };
        expect(out).not.toEqual({});
        expect(out.hookSpecificOutput).toEqual({
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: AGENT_DENY,
        });
        expect(out.hookSpecificOutput?.additionalContext).toBeUndefined();
        expect(out.continue).toBeUndefined();
        expect(result.status).toBe(2);
        expect(result.stderr).toMatch(/protected evaluation artifacts/);
      });
    }
  }

  it("still allows a clean tools/pre-execute call", () => {
    const result = runFlavor("claude", {
      hook_event_name: "tools/pre-execute",
      tool_name: "Bash",
      tool_input: { command: "pytest -q" },
    });
    expect(result.status).toBe(0);
    expect(result.stdout).not.toMatch(/permissionDecision/);
  });
});

describe("dynamic /api/hooks/[flavor]", () => {
  const tamper = {
    hook_event_name: "PreToolUse",
    tool_name: "Bash",
    tool_input: {
      command: "sed -i 's/assert result == 3/assert True/' tests/test_foo.py",
    },
  };

  async function postFlavor(flavor: string) {
    const request = new Request(`http://127.0.0.1:43147/api/hooks/${flavor}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(tamper),
    });
    return hookFlavorPost(request, { params: Promise.resolve({ flavor }) });
  }

  it("keeps /api/hooks/claude working and 404s unknown plus non-HTTP hosts", async () => {
    const claude = await postFlavor("claude");
    expect(claude.status).toBe(200);
    const json = (await claude.json()) as {
      hookSpecificOutput?: { permissionDecision?: string };
    };
    expect(json.hookSpecificOutput?.permissionDecision).toBe("deny");
    expect((await postFlavor("cursor")).status).toBe(200);
    expect((await postFlavor("exo")).status).toBe(200);
    expect((await postFlavor("nope")).status).toBe(404);
    expect((await postFlavor("codex")).status).toBe(404);
    expect((await postFlavor("dsh")).status).toBe(404);
  });

  it("returns host-shaped deny JSON for Pi, Amp, and Grok HTTP flavors", async () => {
    const pi = (await (await postFlavor("pi")).json()) as {
      block?: boolean;
      reason?: string;
      terminate?: boolean;
    };
    expect(pi).toEqual({
      block: true,
      reason: AGENT_DENY,
      terminate: true,
    });
    const amp = (await (await postFlavor("amp")).json()) as {
      action?: string;
      message?: string;
    };
    expect(amp).toEqual({
      action: "reject-and-continue",
      message: AGENT_DENY,
    });
    const grokReq = new Request("http://127.0.0.1:43147/api/hooks/grok", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        hookEventName: "PreToolUse",
        toolName: "Bash",
        toolInput: tamper.tool_input,
      }),
    });
    const grokRes = await hookFlavorPost(grokReq, {
      params: Promise.resolve({ flavor: "grok" }),
    });
    expect(grokRes.status).toBe(200);
    expect(await grokRes.json()).toEqual({
      decision: "deny",
      reason: AGENT_DENY,
    });
  });
});

describe("host flavor coverage and scrub", () => {
  const CLAUDE_DENY = {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: AGENT_DENY,
    },
  };
  const GENERIC_DENY = { block: true, reason: AGENT_DENY };

  /**
   * The gate event and the exact deny body each host must see. An empty `{}`
   * is an allow on every one of these hosts, so a truthy check would pass
   * while the tool ran.
   */
  const DENY_BY_FLAVOR: Record<
    (typeof HOOK_FLAVORS)[number],
    { event: string; deny: (report: ReturnType<typeof blockedReport>) => unknown; exitCode: number }
  > = {
    claude: { event: "PreToolUse", deny: () => CLAUDE_DENY, exitCode: 0 },
    codex: { event: "PreToolUse", deny: () => CLAUDE_DENY, exitCode: 2 },
    cursor: {
      event: "preToolUse",
      deny: (report) => ({
        permission: "deny",
        user_message: report.evidence[0]?.why,
        agent_message: AGENT_DENY,
      }),
      exitCode: 0,
    },
    grok: {
      event: "PreToolUse",
      deny: () => ({ decision: "deny", reason: AGENT_DENY }),
      exitCode: 2,
    },
    generic: { event: "tool_call", deny: () => GENERIC_DENY, exitCode: 2 },
    dsh: { event: "tool_call", deny: () => GENERIC_DENY, exitCode: 2 },
    exo: { event: "tool_call", deny: () => GENERIC_DENY, exitCode: 2 },
    pi: {
      event: "tool_call",
      deny: () => ({ block: true, reason: AGENT_DENY, terminate: true }),
      exitCode: 0,
    },
    prime: { event: "tool_call", deny: () => GENERIC_DENY, exitCode: 0 },
    amp: {
      event: "tool_call",
      deny: () => ({ action: "reject-and-continue", message: AGENT_DENY }),
      exitCode: 0,
    },
  };

  it("expects a concrete deny body for every flavor, never an empty object", () => {
    expect(Object.keys(DENY_BY_FLAVOR).sort()).toEqual([...HOOK_FLAVORS].sort());
    const report = blockedReport();
    for (const flavor of HOOK_FLAVORS) {
      const { event, deny, exitCode } = DENY_BY_FLAVOR[flavor];
      const out = toHostOutput(flavor, event, report);
      expect(out, flavor).toEqual(deny(report));
      expect(out, flavor).not.toEqual({});
      expect(JSON.stringify(out), flavor).toContain(AGENT_DENY);
      expect(successExitCode(flavor, event, report), flavor).toBe(exitCode);
    }
  });

  it("fails closed with the same deny body when scoring is unavailable", () => {
    for (const flavor of HOOK_FLAVORS) {
      const closed = failClosedHostOutput(flavor);
      expect(closed, flavor).not.toEqual({});
      expect(JSON.stringify(closed), flavor).toContain(AGENT_DENY);
      expect(failClosedExitCode(flavor), flavor).toBeGreaterThan(0);
      expect(canonicalFlavor(flavor), flavor).toBeTruthy();
      expect(typeof httpEnabled(flavor), flavor).toBe("boolean");
    }
  });

  it("allows a clean tool call on every flavor", () => {
    const report = cleanReport();
    for (const flavor of HOOK_FLAVORS) {
      const { event } = DENY_BY_FLAVOR[flavor];
      const out = toHostOutput(flavor, event, report);
      expect(JSON.stringify(out), flavor).not.toContain(AGENT_DENY);
      expect(successExitCode(flavor, event, report), flavor).toBe(0);
    }
  });

  it("does not ship static Claude/Cursor routes or research-prompt", () => {
    expect(existsSync(join(root, "src/app/api/hooks/claude/route.ts"))).toBe(
      false
    );
    expect(existsSync(join(root, "src/app/api/hooks/cursor/route.ts"))).toBe(
      false
    );
    expect(existsSync(join(root, "docs/research-prompt.md"))).toBe(false);
  });
});
