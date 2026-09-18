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
    "docs/eval-integrity.md",
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
    expect(readme).toMatch(/^# Reward Hack Guard/m);
    expect(readme).toMatch(/RH Guard \(`rh-guard`\)/);
    expect(readme).not.toMatch(/Hack Radar/);
    expect(readme).toMatch(/24601\/Augustus/);
    expect(readme).toMatch(/examples\/claude-settings\.json/);
    expect(readme).toMatch(/examples\/cursor-hooks\.json/);
    expect(readme).toMatch(/docs\/hosts\.md/);
    expect(readme).toMatch(/Codex/);
    expect(readme).toMatch(/DeepSeek Harness/);
    expect(readme).toMatch(/hooks\/run\.ts dsh/);
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
    expect(readme).toMatch(/coldteadotai\/abide/);
    expect(readme).toMatch(/soft project instructions/i);
    expect(readme).toMatch(/banded confidence/);
    expect(readme).toMatch(/Abide does not catch reward hacking/);
    expect(readme).toMatch(/Eval integrity & measurement/);
    expect(readme).toMatch(/harbor-framework\/harbor/);
    expect(readme).toMatch(/dayhaysoos\/jevals/);
    expect(readme).toMatch(/memovai\/openevals/);
    expect(readme).toMatch(/cheap parallel/);
    expect(readme).toMatch(/caiovicentino\/jev-align/);
    expect(readme).toMatch(/AntonioCoppe\/jev-harness/);
    expect(readme).toMatch(/phin-tech\/pi-jev-approver/);
    expect(readme).toMatch(/commandRules/);
    expect(readme).toMatch(/ngallodev-software\/agent-workflow-typesafe-ai/);
    expect(readme).toMatch(/never changes host routing\/executor/);
    expect(readme).toMatch(/alexykn\/jevscan/);
    expect(readme).toMatch(/tree-sitter extract/);
    expect(readme).toMatch(/ufx7\/jev-testbench/);
    expect(readme).toMatch(/llm_autonomous/);
    expect(readme).toMatch(/scripted_plus_jev/);
    expect(readme).toMatch(/llm_plus_jev/);
    expect(readme).toMatch(/do not claim collab helps without arms/);
    expect(readme).toMatch(/CeamKrier\/semantic-firewall/);
    expect(readme).toMatch(/skip-when-absent/);
    expect(readme).toMatch(/hard envelope stays structural/);
    expect(readme).toMatch(/RahulBalakavi\/claude-code-jev/);
    expect(readme).toMatch(/230\.8ms p50/);
    expect(readme).toMatch(/263\.9ms mean/);
    expect(readme).toMatch(/mjyoke1111\/jev-agent-safety-arena/);
    expect(readme).toMatch(/Mandrilsquad1441\/jev-model-router/);
    expect(readme).toMatch(/not a rh-guard peer/);
    expect(readme).toMatch(/suraj-phanindra\/wellposed/);
    expect(readme).toMatch(/never the sole veto/);
    expect(readme).toMatch(/taskset \(score first\)/);
    expect(readme).toMatch(/do not replace a scored taskset/i);
    expect(readme).toMatch(/independent answer keys/i);
    expect(readme).toMatch(/never promote predictions to labels/i);
    expect(readme).toMatch(/correctness ≠ confidence/);
    expect(readme).toMatch(/equivalent case sets/i);
    expect(readme).toMatch(/LLM-as-judge/);
    expect(readme).toMatch(/jevals measures decisions/);
    expect(readme).toMatch(/rh-guard gates agent tool use/);
    expect(readme).toMatch(/Harbor scores product\/agent loops/);
    expect(readme).toMatch(/\*\*practices\*\*, not install dependencies/);
    expect(readme).not.toMatch(/research-prompt/i);
  });

  it("names the product Reward Hack Guard / RH Guard on public surfaces", () => {
    const productPaths = [
      ...PUBLIC_COPY_PATHS,
      "src/app/page.tsx",
      "src/app/layout.tsx",
      "src/components/app-shell.tsx",
      ".claude-plugin/plugin.json",
      ".claude-plugin/marketplace.json",
      "package.json",
    ] as const;
    for (const rel of productPaths) {
      const text = readFileSync(join(root, rel), "utf8");
      expect(text, rel).not.toMatch(/Hack Radar/);
    }
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      name: string;
    };
    expect(pkg.name).toBe("rh-guard");
    const plugin = JSON.parse(
      readFileSync(join(root, ".claude-plugin/plugin.json"), "utf8")
    ) as { displayName: string };
    expect(plugin.displayName).toBe("Reward Hack Guard");
    const shell = readFileSync(join(root, "src/components/app-shell.tsx"), "utf8");
    expect(shell).toMatch(/>\s*RH Guard\s*</);
  });

  it("does not add Abide as a runtime dependency", () => {
    const pkg = readFileSync(join(root, "package.json"), "utf8");
    const lock = readFileSync(join(root, "package-lock.json"), "utf8");
    expect(pkg).not.toMatch(/abide/i);
    expect(lock).not.toMatch(/@coldtea\/abide/);
  });

  it("does not add hourly sibling watches as runtime dependencies", () => {
    const pkg = readFileSync(join(root, "package.json"), "utf8");
    const lock = readFileSync(join(root, "package-lock.json"), "utf8");
    expect(pkg).not.toMatch(/pi-jev-approver/);
    expect(pkg).not.toMatch(/agent-workflow-typesafe/);
    expect(pkg).not.toMatch(/jevscan/);
    expect(pkg).not.toMatch(/jev-testbench/);
    expect(pkg).not.toMatch(/semantic-firewall/);
    expect(pkg).not.toMatch(/claude-code-jev/);
    expect(pkg).not.toMatch(/jev-agent-safety-arena/);
    expect(pkg).not.toMatch(/jev-model-router/);
    expect(lock).not.toMatch(/pi-jev-approver/);
    expect(lock).not.toMatch(/agent-workflow-typesafe/);
    expect(lock).not.toMatch(/jevscan/);
    expect(lock).not.toMatch(/jev-testbench/);
    expect(lock).not.toMatch(/semantic-firewall/);
    expect(lock).not.toMatch(/claude-code-jev/);
    expect(lock).not.toMatch(/jev-agent-safety-arena/);
    expect(lock).not.toMatch(/jev-model-router/);
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
    expect(skill).toMatch(/Reward Hack Guard/);
    expect(skill).toMatch(/RH Guard/);
    expect(skill).not.toMatch(/Hack Radar/);
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
    expect(skill).toMatch(/thevibeworks\/jevgate/);
    expect(skill).toMatch(/allowlist proves what may run/i);
    expect(skill).toMatch(/fastino-ai\/GLiGuard/);
    expect(skill).toMatch(/coldteadotai\/abide/);
    expect(skill).toMatch(/soft\s+project-instruction/);
    expect(skill).toMatch(/banded confidence/);
    expect(skill).toMatch(/Abide does not catch reward hacking/);
    expect(skill).toMatch(/Harbor\/jevals-adjacent measurement discipline/);
    expect(skill).toMatch(/Eval integrity & measurement/);
    expect(skill).toMatch(/harbor-framework\/harbor/);
    expect(skill).toMatch(/dayhaysoos\/jevals/);
    expect(skill).toMatch(/memovai\/openevals/);
    expect(skill).toMatch(/cheap parallel/);
    expect(skill).toMatch(/caiovicentino\/jev-align/);
    expect(skill).toMatch(/AntonioCoppe\/jev-harness/);
    expect(skill).toMatch(/phin-tech\/pi-jev-approver/);
    expect(skill).toMatch(/commandRules/);
    expect(skill).toMatch(/ngallodev-software\/agent-workflow-typesafe-ai/);
    expect(skill).toMatch(/never changes host routing\/executor/);
    expect(skill).toMatch(/alexykn\/jevscan/);
    expect(skill).toMatch(/tree-sitter extract/);
    expect(skill).toMatch(/ufx7\/jev-testbench/);
    expect(skill).toMatch(/llm_autonomous/);
    expect(skill).toMatch(/scripted_plus_jev/);
    expect(skill).toMatch(/llm_plus_jev/);
    expect(skill).toMatch(/do not claim collab helps without arms/);
    expect(skill).toMatch(/CeamKrier\/semantic-firewall/);
    expect(skill).toMatch(/skip-when-absent/);
    expect(skill).toMatch(/hard envelope stays structural/);
    expect(skill).toMatch(/RahulBalakavi\/claude-code-jev/);
    expect(skill).toMatch(/230\.8ms p50/);
    expect(skill).toMatch(/263\.9ms mean/);
    expect(skill).toMatch(/mjyoke1111\/jev-agent-safety-arena/);
    expect(skill).toMatch(/Mandrilsquad1441\/jev-model-router/);
    expect(skill).toMatch(/not a rh-guard peer/);
    expect(skill).toMatch(/suraj-phanindra\/wellposed/);
    expect(skill).toMatch(/never the sole veto/);
    expect(skill).toMatch(/do not replace a scored taskset/i);
    expect(skill).toMatch(/independent answer keys/i);
    expect(skill).toMatch(/practices\*\*, not install dependencies/);
  });

  it("keeps Harbor, jevals, and openevals as practices, not hook install deps", () => {
    const evalDoc = readFileSync(join(root, "docs/eval-integrity.md"), "utf8");
    const install = readFileSync(join(root, "docs/install-plugin.md"), "utf8");
    const shape = readFileSync(join(root, "docs/shape.md"), "utf8");
    expect(evalDoc).toMatch(/Eval integrity & measurement/);
    expect(evalDoc).toMatch(/harbor-framework\/harbor/);
    expect(evalDoc).toMatch(/dayhaysoos\/jevals/);
    expect(evalDoc).toMatch(/memovai\/openevals/);
    expect(evalDoc).toMatch(/cheap parallel/);
    expect(evalDoc).toMatch(/wotai-dev\/typesafe-jev-tools/);
    expect(evalDoc).toMatch(/does this decision need a model\?/);
    expect(evalDoc).toMatch(/caiovicentino\/jev-align/);
    expect(evalDoc).toMatch(/AntonioCoppe\/jev-harness/);
    expect(evalDoc).toMatch(/doeixd\/jev-pref/);
    expect(evalDoc).toMatch(/preference-theater/);
    expect(evalDoc).toMatch(/SargeDev\/jev-gate-student-b/);
    expect(evalDoc).toMatch(/Qwen2\.5-0\.5B/);
    expect(evalDoc).toMatch(/luantak\/is-malicious/);
    expect(evalDoc).toMatch(/distill → gate integrity/);
    expect(evalDoc).toMatch(/phin-tech\/pi-jev-approver/);
    expect(evalDoc).toMatch(/commandRules/);
    expect(evalDoc).toMatch(/ngallodev-software\/agent-workflow-typesafe-ai/);
    expect(evalDoc).toMatch(/never changes host routing\/executor/);
    expect(evalDoc).toMatch(/alexykn\/jevscan/);
    expect(evalDoc).toMatch(/tree-sitter extract/);
    expect(evalDoc).toMatch(/ufx7\/jev-testbench/);
    expect(evalDoc).toMatch(/llm_autonomous/);
    expect(evalDoc).toMatch(/scripted_plus_jev/);
    expect(evalDoc).toMatch(/llm_plus_jev/);
    expect(evalDoc).toMatch(/Do not claim collab helps without arms/);
    expect(evalDoc).toMatch(/CeamKrier\/semantic-firewall/);
    expect(evalDoc).toMatch(/goalAlignment/);
    expect(evalDoc).toMatch(/untrustedInstruction/);
    expect(evalDoc).toMatch(/skip-when-absent/);
    expect(evalDoc).toMatch(/ASK_USER/);
    expect(evalDoc).toMatch(/hard envelope stays structural/);
    expect(evalDoc).toMatch(/RahulBalakavi\/claude-code-jev/);
    expect(evalDoc).toMatch(/typesafe\/jev-1\.13/);
    expect(evalDoc).toMatch(/230\.8ms p50/);
    expect(evalDoc).toMatch(/263\.9ms mean/);
    expect(evalDoc).toMatch(/mjyoke1111\/jev-agent-safety-arena/);
    expect(evalDoc).toMatch(/Mandrilsquad1441\/jev-model-router/);
    expect(evalDoc).toMatch(/not a rh-guard peer/);
    expect(evalDoc).toMatch(/suraj-phanindra\/wellposed/);
    expect(evalDoc).toMatch(/never the sole veto/);
    expect(evalDoc).toMatch(/Confidence gating cannot catch a forced wrong Choice/);
    expect(evalDoc).toMatch(/taskset \(score first\)/i);
    expect(evalDoc).toMatch(/independent validator/);
    expect(evalDoc).toMatch(/HoH evidence loop/);
    expect(evalDoc).toMatch(/do not replace a scored taskset/i);
    expect(evalDoc).toMatch(/never promote predictions to labels/i);
    expect(evalDoc).toMatch(/Correctness ≠ confidence/);
    expect(evalDoc).toMatch(/held-out discipline/i);
    expect(evalDoc).toMatch(/Compare only equivalent case sets/i);
    expect(evalDoc).toMatch(/LLM-as-judge/);
    expect(evalDoc).toMatch(/jevals measures decisions/);
    expect(evalDoc).toMatch(/rh-guard gates agent tool use/);
    expect(evalDoc).toMatch(/Harbor scores product\/agent loops/);
    expect(evalDoc).toMatch(/\*\*practices\*\*, not install dependencies/);
    expect(evalDoc).toMatch(/thevibeworks\/jevgate/);
    expect(evalDoc).toMatch(/huntedman\/JevLint/);
    expect(evalDoc).toMatch(/fastino-ai\/GLiGuard/);
    expect(evalDoc).toMatch(/coldteadotai\/abide/);
    expect(evalDoc).toMatch(/banded confidence/);
    expect(evalDoc).toMatch(/Harbor\/jevals-adjacent/);
    expect(evalDoc).toMatch(/not a claim that Abide measures reward hacking/);
    expect(install).toMatch(/RH Guard is \*\*not\*\*/);
    expect(install).toMatch(/RH_GUARD_URL/);
    expect(install).toMatch(/HACK_RADAR_URL is still accepted/);
    expect(install).toMatch(/practices, not install dependencies/);
    expect(install).toMatch(/coldteadotai\/abide/);
    expect(install).toMatch(/not a reward-hack detector/);
    expect(install).toMatch(/phin-tech\/pi-jev-approver/);
    expect(install).toMatch(/ngallodev-software\/agent-workflow-typesafe-ai/);
    expect(install).toMatch(/alexykn\/jevscan/);
    expect(install).toMatch(/ufx7\/jev-testbench/);
    expect(install).toMatch(/CeamKrier\/semantic-firewall/);
    expect(install).toMatch(/RahulBalakavi\/claude-code-jev/);
    expect(install).toMatch(/mjyoke1111\/jev-agent-safety-arena/);
    expect(install).toMatch(/Mandrilsquad1441\/jev-model-router/);
    expect(install).toMatch(/sibling notes; no runtime deps/);
    expect(install).toMatch(/examples\/pi-extension\.ts/);
    expect(shape).toMatch(/coldteadotai\/abide/);
    expect(shape).toMatch(/banded confidence/);
    expect(install).toMatch(/memovai\/openevals/);
    expect(install).toMatch(/eval-integrity\.md/);
    expect(shape).toMatch(/eval-integrity\.md/);
    expect(shape).toMatch(/LLM-as-judge/);
    expect(shape).toMatch(/memovai\/openevals/);
    expect(shape).toMatch(/suraj-phanindra\/wellposed/);
  });

  it("keeps jevgate as a sibling link on host docs, not a merged product", () => {
    const hosts = readFileSync(join(root, "docs/hosts.md"), "utf8");
    expect(hosts).toMatch(/thevibeworks\/jevgate/);
    expect(hosts).toMatch(/allowlist proves what may run/i);
    expect(hosts).toMatch(/never the sole veto/);
    expect(hosts).toMatch(/Do not merge the products/i);
    expect(hosts).toMatch(/fastino-ai\/GLiGuard/);
    expect(hosts).toMatch(/coldteadotai\/abide/);
    expect(hosts).toMatch(/Abide does not catch\s+reward hacking/);
    expect(hosts).toMatch(/phin-tech\/pi-jev-approver/);
    expect(hosts).toMatch(/commandRules/);
    expect(hosts).toMatch(/RahulBalakavi\/claude-code-jev/);
    expect(hosts).toMatch(/230\.8ms p50/);
    expect(hosts).toMatch(/263\.9ms mean/);
    expect(hosts).toMatch(/hooks\/run\.ts dsh/);
    expect(hosts).toMatch(/command-hook/);
    const gates = readFileSync(
      join(root, ".agents/skills/rh-guard/references/gates.md"),
      "utf8"
    );
    expect(gates).toMatch(/coldteadotai\/abide/);
    expect(gates).toMatch(/never the sole hard veto/);
    expect(gates).toMatch(/phin-tech\/pi-jev-approver/);
    expect(gates).toMatch(/commandRules/);
    expect(gates).toMatch(/alexykn\/jevscan/);
    expect(gates).toMatch(/tree-sitter extract/);
    expect(gates).toMatch(/ngallodev-software\/agent-workflow-typesafe-ai/);
    expect(gates).toMatch(/never changes host routing\/executor/);
    expect(gates).toMatch(/hard envelope stays structural/);
    expect(gates).toMatch(/CeamKrier\/semantic-firewall/);
    expect(gates).toMatch(/skip-when-absent/);
    expect(gates).toMatch(/RahulBalakavi\/claude-code-jev/);
    expect(gates).toMatch(/typesafe\/jev-1\.13/);
    expect(gates).toMatch(/Mandrilsquad1441\/jev-model-router/);
    expect(gates).toMatch(/not a rh-guard peer/);
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
