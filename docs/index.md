# Reward Hack Guard

RH Guard (`rh-guard`) is a live hazard gate on coding-agent tools. It sits in
hooks for Claude Code, Cursor, Codex, Grok Build, Pi, Amp, Prime Agent, and
DeepSeek Harness, and blocks reward-hacking tool use—tampering with graders,
hidden tests, or the eval process. Exo is support via ToolRuntime wrap, not
drop-in hooks.

Structural detectors deny writes to designated evaluation assets. TypeSafe Jev
scores remaining events. Soft judgment is never the sole veto.

## Install

Full steps: [install the hook pack](https://github.com/24601/rh-guard/blob/main/docs/install-plugin.md)
· [README](https://github.com/24601/rh-guard#readme)
· [host matrix](https://github.com/24601/rh-guard/blob/main/docs/hosts.md)

```bash
# Skill only (Amp, Codex, Cursor, …). Does not start the sidecar.
npx skills add 24601/rh-guard --skill rh-guard

# Claude Code plugin (skill + hook pack). Sidecar still required.
claude plugin marketplace add 24601/rh-guard
claude plugin install rh-guard@rh-guard
```

Companion skill: [`.agents/skills/rh-guard/SKILL.md`](https://github.com/24601/rh-guard/blob/main/.agents/skills/rh-guard/SKILL.md)

## Eval integrity

Harbor, jevals, and openevals are practices, not install dependencies.
See [eval integrity](https://github.com/24601/rh-guard/blob/main/docs/eval-integrity.md).

Source: [24601/rh-guard](https://github.com/24601/rh-guard)

## License

MIT. Copyright (c) 2026 Basit Mustafa / 24601. See [LICENSE](https://github.com/24601/rh-guard/blob/main/LICENSE).
