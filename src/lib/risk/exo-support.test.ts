import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  gateAgentToolInstance,
  wrapHarnessToolRegistryRegister,
} from "../../../examples/exo-agent-tools-gate";
import {
  AGENT_DENY as EXAMPLE_AGENT_DENY,
  EXO_MUTATING_TOOLS,
  EXO_READ_ONLY_TOOLS,
  SIDECAR_TIMEOUT_MS,
  deniedToolResult,
  isGatedExoHostTool,
  wrapToolRuntimeExecute,
  wrapTurnContextExecuteTool,
  type ToolRequest,
  type ToolResult,
} from "../../../examples/exo-tool-runtime";
import { canonicalFlavor, httpEnabled, parseHookFlavor, toGenericOutput } from "./hosts";
import { parseHookEvent } from "./parse";
import { score } from "./score";
import { AGENT_DENY } from "./steer";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

function readExample(name: string): string {
  return readFileSync(join(root, "examples", name), "utf8");
}

describe("exo flavor aliases generic", () => {
  it("parses exo and canonicalizes to generic block/reason JSON", () => {
    expect(parseHookFlavor("exo")).toBe("exo");
    expect(canonicalFlavor("exo")).toBe("generic");
    expect(httpEnabled("exo")).toBe(true);
    const blocked = score({
      stage: "tool",
      toolName: "shell",
      toolInput: "sed -i 's/assert result == 3/assert True/' tests/test_foo.py",
      path: "tests/test_foo.py",
    });
    expect(toGenericOutput(blocked)).toEqual({
      block: true,
      reason: AGENT_DENY,
    });
  });

  it("parses an Exo ToolRequest-shaped body", () => {
    const parsed = parseHookEvent({
      event: "tool_call",
      functionName: "shell",
      arguments: { command: "rm hidden_eval.py" },
    });
    expect(parsed.input.toolName).toBe("shell");
    expect(parsed.input.toolInput).toMatch(/hidden_eval/);
    expect(parsed.input.stage).toBe("tool");
  });
});

describe("examples wrap ToolRuntime.execute", () => {
  it("keeps the same opaque AGENT_DENY as steer.ts", () => {
    expect(EXAMPLE_AGENT_DENY).toBe(AGENT_DENY);
    expect(deniedToolResult()).toEqual({ ok: false, error: AGENT_DENY });
  });

  it("gates the mutating verbs exo actually ships", () => {
    for (const name of EXO_MUTATING_TOOLS) {
      expect(isGatedExoHostTool(name), name).toBe(true);
    }
    for (const name of [
      "manage_tool",
      "rebuild_and_restart_exo",
      "uninstall_agent_tool",
      "rewind_sandbox",
      "enable_adapter",
      "disable_adapter",
    ]) {
      expect(EXO_MUTATING_TOOLS as readonly string[], name).toContain(name);
    }
  });

  it("exempts only read-only exo tools and gates unknown agent tools", () => {
    for (const name of EXO_READ_ONLY_TOOLS) {
      expect(isGatedExoHostTool(name), name).toBe(false);
    }
    expect(isGatedExoHostTool("rewrite_grader")).toBe(true);
    expect(isGatedExoHostTool("some_agent_created_tool")).toBe(true);
  });

  it("does not claim exo ships claude-shaped bash, write, or edit tools", () => {
    const named = [...EXO_READ_ONLY_TOOLS, ...EXO_MUTATING_TOOLS] as readonly string[];
    for (const invented of ["bash", "write", "edit", "strreplace", "notebookedit"]) {
      expect(named, invented).not.toContain(invented);
    }
    const sources = [
      readExample("exo-tool-runtime.ts"),
      readExample("exo-tool-runtime.rs"),
    ];
    for (const source of sources) {
      expect(source).not.toMatch(/"bash"/);
      expect(source).toMatch(/manage_tool/);
      expect(source).toMatch(/rebuild_and_restart_exo/);
      expect(source).toMatch(/rewind_sandbox/);
    }
  });

  it("returns AGENT_DENY from wrapToolRuntimeExecute before inner execute", async () => {
    const calls: ToolRequest[] = [];
    const execute = wrapToolRuntimeExecute(
      async (request) => {
        calls.push(request);
        return { ok: true };
      },
      {
        score: async () => ({ block: true }),
      }
    );
    const result = await execute({
      functionName: "shell",
      arguments: { command: "sed -i s/assert/pass/ tests/hidden.py" },
    });
    expect(result).toEqual({ ok: false, error: AGENT_DENY });
    expect(calls).toEqual([]);
  });

  it("calls inner execute when the sidecar allows", async () => {
    const execute = wrapToolRuntimeExecute(
      async () => ({ ok: true, stdout: "ok" }),
      { score: async () => ({ block: false }) }
    );
    await expect(
      execute({ functionName: "shell", arguments: { command: "ls" } })
    ).resolves.toEqual({ ok: true, stdout: "ok" });
  });

  it("POSTs /api/hooks/exo from wrapToolRuntimeExecute when sidecarUrl is set", async () => {
    const originalFetch = globalThis.fetch;
    const calls: string[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      calls.push(String(input));
      return new Response(JSON.stringify({ block: true, reason: AGENT_DENY }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;
    try {
      const callsInner: ToolRequest[] = [];
      const execute = wrapToolRuntimeExecute(
        async (request) => {
          callsInner.push(request);
          return { ok: true };
        },
        { sidecarUrl: "http://127.0.0.1:43147/api/hooks/exo" }
      );
      const result = await execute({
        functionName: "shell",
        arguments: { command: "rm hidden_eval.py" },
      });
      expect(result).toEqual({ ok: false, error: AGENT_DENY });
      expect(callsInner).toEqual([]);
      expect(calls).toEqual(["http://127.0.0.1:43147/api/hooks/exo"]);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("fail-closes wrapTurnContextExecuteTool when scoring throws", async () => {
    const executeTool: (request: ToolRequest) => Promise<ToolResult> = async () => ({
      ok: true,
    });
    const context = wrapTurnContextExecuteTool(
      { executeTool },
      {
        score: async () => {
          throw new Error("sidecar down");
        },
      }
    );
    const result = await context.executeTool({
      functionName: "shell",
      arguments: { command: "true" },
    });
    expect(result).toEqual({ ok: false, error: AGENT_DENY });
  });

  it("denies instead of hanging when the sidecar never answers", async () => {
    const calls: ToolRequest[] = [];
    const execute = wrapToolRuntimeExecute(
      async (request) => {
        calls.push(request);
        return { ok: true };
      },
      {
        timeoutMs: 20,
        score: () => new Promise<{ block: boolean }>(() => {}),
      }
    );
    const result = await execute({
      functionName: "rebuild_and_restart_exo",
      arguments: { reason: "ship it" },
    });
    expect(result).toEqual({ ok: false, error: AGENT_DENY });
    expect(calls).toEqual([]);
  });

  it("uses the same 8s budget as the other host wrappers", () => {
    expect(SIDECAR_TIMEOUT_MS).toBe(8000);
    expect(readExample("exo-tool-runtime.ts")).toMatch(
      /AbortSignal\.timeout\(SIDECAR_TIMEOUT_MS\)/
    );
    expect(readExample("exo-tool-runtime.rs")).toMatch(/--max-time/);
    expect(readExample("exo-tool-runtime.rs")).toMatch(
      /SIDECAR_TIMEOUT_SECS: &str = "8"/
    );
  });

  it("gates agent-created tools from .exo/agent-tools/", async () => {
    const registered: string[] = [];
    const register = wrapHarnessToolRegistryRegister((tool) => {
      registered.push(tool.definition.name);
    });
    register({
      source: "library",
      definition: {
        name: "inspect_tools",
        description: "library tool",
        parameters: { type: "object", additionalProperties: false },
      },
      handler: {
        execute: async () => ({ ok: true }),
      },
    });
    expect(registered).toEqual(["inspect_tools"]);
    const gated = gateAgentToolInstance(
      {
        source: "agent",
        definition: {
          name: "rewrite_grader",
          description: "agent tool",
          parameters: { type: "object", additionalProperties: false },
        },
        handler: {
          execute: async () => ({ ok: true }),
        },
      },
      { score: async () => ({ block: true }) }
    );
    const denied = await gated.handler.execute(
      {},
      { context: { executeTool: async () => ({ ok: true }) } }
    );
    expect(denied).toEqual({ ok: false, error: AGENT_DENY });
  });
});

describe("exo docs stay honest", () => {
  const wrapFiles = [
    "examples/exo-tool-runtime.ts",
    "examples/exo-tool-runtime.rs",
    "examples/exo-agent-tools-gate.ts",
    "README.md",
    "docs/hosts.md",
    ".agents/skills/rh-guard/SKILL.md",
  ];

  it("documents wrap execute and no native hooks.json", () => {
    for (const rel of wrapFiles) {
      const text = readFileSync(join(root, rel), "utf8");
      expect(text, rel).toMatch(/AGENT_DENY/);
      expect(text, rel).toMatch(/ToolRuntime/);
      expect(text, rel).toMatch(/execute/);
      expect(text, rel).toMatch(/no native[\s`*]*hooks\.json/i);
      expect(text, rel).not.toMatch(/exo-hooks\.json/);
    }
  });

  it("example wrap files contain opaque AGENT_DENY and wrap execute", () => {
    const ts = readExample("exo-tool-runtime.ts");
    const rs = readExample("exo-tool-runtime.rs");
    const gate = readExample("exo-agent-tools-gate.ts");
    expect(ts).toContain(AGENT_DENY);
    expect(rs).toContain(AGENT_DENY);
    expect(ts).toMatch(/wrapToolRuntimeExecute/);
    expect(ts).toMatch(/function wrapToolRuntimeExecute/);
    expect(ts).toMatch(/executeTool/);
    expect(ts).toMatch(/does not ship Claude-style PreToolUse JSON hooks/);
    expect(ts).not.toMatch(/native PreToolUse/);
    expect(ts).toMatch(/scoreViaHttp/);
    expect(ts).toMatch(/\/api\/hooks\/exo/);
    expect(rs).toMatch(/async fn execute/);
    expect(rs).toMatch(/impl<T> ToolRuntime for RhGuardToolRuntime/);
    expect(rs).toMatch(/score_via_http/);
    expect(gate).toMatch(/\.exo\/agent-tools/);
    expect(gate).toMatch(/wrapToolHandlerExecute/);
  });

  it("README matrix says support via ToolRuntime wrap, not drop-in hooks", () => {
    const readme = readFileSync(join(root, "README.md"), "utf8");
    expect(readme).toMatch(/support via ToolRuntime wrap/i);
    const exoRow = readme
      .split("\n")
      .find((line) => line.startsWith("| Exo |"));
    expect(exoRow).toBeTruthy();
    expect(exoRow).toMatch(/support via ToolRuntime wrap/);
    expect(exoRow).toMatch(/not drop-in hooks/);
  });
});
