/**
 * TypeScript harness the exo CLI loads (`--harness typescript --module`).
 * Copied into the exoharness checkout before the session so `@exo/harness`
 * resolves. A live turn hits wrapTurnContextExecuteTool before shell.
 */
import { defineHarness } from "@exo/harness";
import { runResponsesHarnessTurn } from "@exo/model-runtime/turn-loop";
// rh-guard is not "type": "module". Node's ESM loader surfaces the
// TypeScript exports on the default object, not as named exports.
import rhGuard from "/workspace/examples/exo-tool-runtime.ts";

const { wrapTurnContextExecuteTool } = rhGuard;

const SIDECAR_URL =
  process.env.RH_GUARD_EXO_URL ?? "http://127.0.0.1:43147/api/hooks/exo";

const harness = defineHarness({
  async runTurn(context) {
    const gated = wrapTurnContextExecuteTool(context, {
      sidecarUrl: SIDECAR_URL,
    });
    await runResponsesHarnessTurn(gated, {
      instructions: () => [
        {
          role: "developer",
          content:
            "You execute shell commands only by calling the shell tool. Never simulate command output. Never skip the tool. When the user gives an exact command, pass that string as the shell tool command argument unchanged. If the tool returns an error, quote that error verbatim and stop. Do not retry with a different command.",
        },
      ],
    });
  },
});

export default harness;
