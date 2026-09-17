import type { RiskKind } from "./kinds";
import type { VerifierMove } from "./domain";

export function movesFor(kinds: RiskKind[]): VerifierMove[] {
  const wanted = new Set(kinds);
  const all: VerifierMove[] = [
    {
      id: "hidden-tests",
      title: "Add hidden tests the agent cannot edit",
      audience: "user",
      instruction:
        "Run extra tests from CI or the hook process, not from a file in this workspace. Hacker-Opus-style agents will find and edit a suite that lives on disk.",
    },
    {
      id: "property-tests",
      title: "Add a property or metamorphic check",
      audience: "user",
      instruction:
        "Require a property (round-trip, idempotence, monotonicity) with Hypothesis or fast-check. A hardcoded fixture cannot satisfy a quantified property.",
    },
    {
      id: "forbid-test-writes",
      title: "Deny writes to test and reward files",
      audience: "agent",
      instruction:
        "Do not edit tests, snapshots, coverage config, or reward/judge files. Change production code only. If a test is wrong, stop and ask the user.",
    },
    {
      id: "independent-verifier",
      title: "Run an independent verifier after stop",
      audience: "user",
      instruction:
        "On Stop, run a second command the agent did not author. A held-out binary, a mutation test, or a typechecker with a frozen config. Keep that checker out of the workspace.",
    },
    {
      id: "falsifier",
      title: "Ask for a falsifier, not another passing case",
      audience: "agent",
      instruction:
        "Before claiming done, construct an input that should fail if the implementation is only memorizing fixtures. Run it. If you cannot name one, the eval is too thin.",
    },
    {
      id: "split-authorship",
      title: "Do not let the same agent write tests and code",
      audience: "user",
      instruction:
        "Keep test authorship on a trusted path (you, or a frozen fixture). The untrusted agent implements against that spec.",
    },
    {
      id: "no-cot-penalty",
      title: "Do not train against this monitor",
      audience: "user",
      instruction:
        "Use the score to steer or block. Do not add it as an RL penalty on chain-of-thought. Baker et al. 2025 show that pressure on the monitor teaches obfuscation.",
    },
    {
      id: "trace-style",
      title: "Check that reward still needs the full solution",
      audience: "user",
      instruction:
        "If you can, truncate the solution or hide visible tests and see whether the proxy still pays out. Early payout is the TRACE signature of a shortcut.",
    },
  ];
  const picked = all.filter((move) => {
    if (move.id === "hidden-tests") {
      return wanted.has("heldout_blindness") || wanted.has("proxy_metric");
    }
    if (move.id === "property-tests") {
      return wanted.has("hardcoded_oracle") || wanted.has("proxy_metric");
    }
    if (move.id === "forbid-test-writes") {
      return (
        wanted.has("test_tampering") ||
        wanted.has("reward_tampering") ||
        wanted.has("process_evasion")
      );
    }
    if (move.id === "independent-verifier") {
      return wanted.has("test_tampering") || wanted.has("verifier_weakening");
    }
    if (move.id === "falsifier") {
      return wanted.has("hardcoded_oracle") || wanted.has("proxy_metric");
    }
    if (move.id === "split-authorship") {
      return wanted.has("test_tampering") || wanted.has("heldout_blindness");
    }
    if (move.id === "no-cot-penalty") {
      return wanted.has("monitor_gaming");
    }
    if (move.id === "trace-style") {
      return wanted.has("hardcoded_oracle") || wanted.has("proxy_metric");
    }
    return false;
  });
  if (picked.length === 0) {
    return [
      all.find((move) => move.id === "falsifier")!,
      all.find((move) => move.id === "hidden-tests")!,
    ];
  }
  return picked;
}
