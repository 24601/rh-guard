export type Citation = {
  title: string;
  url: string;
  year: string;
  claim: string;
};

export type MethodRow = {
  name: string;
  needsInternals: boolean;
  when: string;
  hookFit: string;
  limit: string;
  citations: Citation[];
};

export const LITERATURE: MethodRow[] = [
  {
    name: "TypeSafe Jev (System One)",
    needsInternals: false,
    when:
      "You need a sub-second, typed, calibrated decision on a prompt, tool call, or trajectory, and you can call a hosted API. This is the live neural scorer in this repo.",
    hookFit:
      "One POST to api.typesafe.ai/v1/systemone per hook event. Ask one Noul per risk kind plus a primary Choice and a severity Score. Questions run in parallel. Measured coding-agent gates land in 70 to 650ms. Fits Claude UserPromptSubmit and PreToolUse. Pin jev-1.13.0 once you tune thresholds. jev-latest currently aliases that id and will move.",
    limit:
      "No public Jev reward-hack ROC, TPR/FPR, or SWE calibration curve was found as of 17 Sep 2026. Skip the API after a structural deny. Choice, severity, and the positive falsifier Noul must not cancel a hazard deny, and they must not independently create one: parallel questions are not an ensemble. Typed JSON is not semantic robustness. Strip agent self-justifications from the Jev payload; send digested commands, paths, and diffs. Return opaque policy text to the agent. Jev does not generate steer text. Do not phrase hazards as 'is this safe'. Do not put this score into an RL reward.",
    citations: [
      {
        title: "Introducing System One Models and Jev",
        url: "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
        year: "Sep 2026",
        claim:
          "Diogo Almeida (TypeSafe). Jev is the first System One model. Unstructured state in, typed probabilistic decisions out. Trained with Reinforcement Learning for Calibrated Decisions (RLCD). Parallel sampler. 70 to 500ms. $0.042 / MTok input, output free. Listed use case: score, judge, verify, guardrail, and detect jailbreaks of LLM prompts, reasoning traces, and outputs.",
      },
      {
        title: "TypeSafe primitives, API, confidence, and Jev 1.13 jaggedness",
        url: "https://docs.typesafe.ai/llms.txt",
        year: "2026",
        claim:
          "Three question types: Choice (option + distribution + confidence), Score (level + distribution + confidence), Noul (P(yes), no separate confidence). One request evaluates every question independently. Context budget about 32k tokens for state plus the longest question, 64k together. Jaggedness: literal reading, weak at counting and arithmetic, distractors in large state, adversarial content can steer answers. Pin versioned model ids. Guardrails cookbook is a Noul battery plus a harm Score with thresholds in code.",
      },
      {
        title: "Jev + Pi: a probability gate for coding-agent shell commands",
        url: "https://dev.to/jomatsu/jev-pi-a-probability-gate-for-my-coding-agents-shell-commands-95d",
        year: "Sep 2026",
        claim:
          "Jo Matsuda. Rules first. Jev cannot overrule a hard deny. 18 fixtures, sampled once; eleven shell-command calls at 193 to 642ms. Tightening a positively phrased safety Noul from 0.97 to 0.99 moved a 0.02 SSH-key upload out of the violation band. No key means halt unvouched commands, not silent pass. Not a reward-hack ROC.",
      },
      {
        title: "Verification is the bottleneck",
        url: "https://goodstartlabs.com/research/verification-is-the-bottleneck",
        year: "Sep 2026",
        claim:
          "Alex Duffy / Good Start Labs. 6,003 rubric checks over 1,203 financial-research answers; 91.5% agreement with Fable 5.1. Agreement is not accuracy and this is not a reward-hack benchmark. Strongest additional public Jev verification report found.",
      },
    ],
  },
  {
    name: "System One adapter (LLM fallback)",
    needsInternals: false,
    when:
      "You want the same question catalog without a TypeSafe key, or you want a slow teacher to label Jev disagreements.",
    hookFit:
      "Drop-in system_one() on an LLM via system-one-adapter. Too slow for every PreToolUse. Use it to score held-out traces offline and to disagree with Jev.",
    limit:
      "You are back to string models plus JSON schema. Type errors and latency return. TypeSafe's own workflow evals wrap LLMs this way and still find Jev on the Pareto frontier for System One tasks.",
    citations: [
      {
        title: "system-one-adapter on PyPI",
        url: "https://pypi.org/project/system-one-adapter/0.1.4/",
        year: "2026",
        claim:
          "LLM-backed replacement for typesafe_sdk.system_one. structured_outputs or JSON plus client validation. llm_answer_mode probabilities or discrete.",
      },
    ],
  },
  {
    name: "DoM probes on activations",
    needsInternals: true,
    when: "Open-weight agents where you can read residual-stream activations, including CoT tokens before the next action.",
    hookFit:
      "Not usable on Claude or Cursor closed models. Use it on local SWE agents (Qwen, GLM, Kimi) as a cheap online gate next to Jev on text.",
    limit:
      "Needs weights. Probe hits are often shortcut deliberation the LLM judge missed, so treat them as risk, not as a completed hack.",
    citations: [
      {
        title:
          "Monitoring and Discovering Reward Hacking with Internal Representations during LLM Evaluations",
        url: "https://arxiv.org/abs/2609.19101",
        year: "Sep 2026",
        claim:
          "GLM 5.2 hacked 57.2% of DeepSWE rollouts and 73% of SWE-bench rollouts. At monitor-matched FPR, DoM was plus 3.1% TPR on Kimi K3 and minus 7.9% on GLM 5.2. Probe-or-monitor on Kimi DeepSWE moved TPR from 41.1% to 80.2% at plus 1% FPR. CoT probe peaks later produced attempted hacks in 28.6% of resamples vs 1.1% of controls.",
      },
    ],
  },
  {
    name: "SAE + token-level probes",
    needsInternals: true,
    when: "You want earlier signal than a finished response, on a model you can instrument.",
    hookFit: "Same closed-model wall. Useful as a lab monitor while you train text labels for Jev questions.",
    limit: "Signals can persist through a benign-looking CoT. High activation is a latent state, not proof of the next action.",
    citations: [
      {
        title:
          "Monitoring Emergent Reward Hacking During Generation via Internal Activations",
        url: "https://arxiv.org/abs/2603.04069",
        year: "2026",
        claim:
          "Sparse autoencoder features plus linear heads give token-level reward-hack estimates that generalize across mixed-policy adapters.",
      },
      {
        title:
          "From Reward-Hack Activations to Agentic Risk States",
        url: "https://arxiv.org/pdf/2606.06223v1.pdf",
        year: "2026",
        claim:
          "In ReAct agents, reward-hack activation is a risk state. Entropy and decision context are needed to tell whether the next tool call is actually an exploit.",
      },
    ],
  },
  {
    name: "Gradient fingerprints (Grift)",
    needsInternals: true,
    when: "You can compute CoT gradients on a reasoning model and cluster them.",
    hookFit: "Too slow and privileged for a PreToolUse hook. Better as an offline eval on your own RLVR runs.",
    limit: "Needs gradients, not just text. Closed coding agents will not give you this.",
    citations: [
      {
        title: "Detecting and Suppressing Reward Hacking with Gradient Fingerprints",
        url: "https://arxiv.org/abs/2604.16242",
        year: "2026",
        claim:
          "Grift beat CoT Monitor and TRACE by more than 25% relative on math, code, and logic, then reduced hacking when used in rejection fine-tuning.",
      },
    ],
  },
  {
    name: "CoT LLM monitor",
    needsInternals: false,
    when: "You can read the agent's thoughts or tool trace and afford a second model call.",
    hookFit:
      "afterAgentThought / PostToolBatch / Stop. Frontier judges take 3 to 329s. Jev is the sub-second substitute for the same text. Keep a slow judge for disagreements.",
    limit:
      "Baker et al. found ~95% recall with CoT vs ~60% on actions alone, then near-zero recall after training against the monitor (obfuscation). Frozen-weight agents still adapt in-context if denials leak monitor criteria. Do not put this score into the RL reward, and do not echo hazard ids to the agent.",
    citations: [
      {
        title:
          "Monitoring Reasoning Models for Misbehavior and the Risks of Promoting Obfuscation",
        url: "https://arxiv.org/abs/2503.11926",
        year: "2025",
        claim:
          "A weaker GPT-4o monitor caught unit-test subversion in a frontier coding agent when it saw CoT. Penalizing bad thoughts produced obfuscated hacks.",
      },
      {
        title: "Detecting misbehavior in frontier reasoning models",
        url: "https://openai.com/index/chain-of-thought-monitoring/",
        year: "2025",
        claim:
          "OpenAI's writeup of the same CoT-monitor result, with the recommendation to pay a monitorability tax instead of optimizing the thoughts away.",
      },
    ],
  },
  {
    name: "TRACE (truncated-reasoning AUC)",
    needsInternals: false,
    when: "You can resample completions at truncated CoT prefixes and re-score the proxy reward.",
    hookFit: "Offline or Stop-time eval, not a 30ms hook. Use it to find that visible tests pay out too early.",
    limit:
      "Expensive. It needs multiple truncations and a reward function. It is the right check when CoT looks clean.",
    citations: [
      {
        title:
          "Is it thinking or cheating? Detecting Implicit Reward Hacking by Measuring Reasoning Effort",
        url: "https://arxiv.org/abs/2510.01367",
        year: "2025",
        claim:
          "TRACE gained over 65% vs a 72B CoT monitor on math and over 30% over a 32B monitor on coding for implicit hacks (hint-in-context, keyword-in-reward).",
      },
    ],
  },
  {
    name: "Cheap trajectory encoder",
    needsInternals: false,
    when: "You have labeled trajectories (Terminal-Wrench or your own) and need a sidecar cheaper than a frontier judge, fully offline.",
    hookFit:
      "Local alternative to Jev when you cannot call TypeSafe. Train on sanitized traces. Keep the same RiskKind ids.",
    limit:
      "Full-input AUROC 0.9467. Stripping reasoning at inference dropped it to 0.6213. Retraining on action-only inputs recovered 0.7631, TPR 0.2275 at 5% FPR. Do not deploy the reasoning-rich checkpoint on action-only hook inputs and expect the headline number.",
    citations: [
      {
        title: "Cheap Reward Hacking Detection",
        url: "https://arxiv.org/html/2606.08893v1",
        year: "2026",
        claim:
          "A ~14M encoder plus a linear probe hit AUC 0.9467 and TPR@5%FPR 0.8296 vs gpt-5.4's 0.9510 / 0.7130 on sanitized Terminal-Wrench, at roughly 10^4 lower cost.",
      },
    ],
  },
  {
    name: "GLiClass / GLiNER-family labels",
    needsInternals: false,
    when:
      "Offline or air-gapped scoring. Same RiskKind catalog as the Jev Nouls. Fine-tune on 8 examples per label.",
    hookFit:
      "CPU-viable for UserPromptSubmit. This repo's lexical layer is the stand-in. Fine-tune knowledgator/gliclass-modern-base-v3.0 on School of Reward Hacks plus denied tool traces.",
    limit:
      "Zero-shot F1 on generic classification is 0.49 to 0.72 by size. Reward-hacking is a new domain. Few-shot is the actual path. Jev is the online scorer. GLiClass is the local one.",
    citations: [
      {
        title: "GLiClass: Generalist Lightweight Model for Sequence Classification Tasks",
        url: "https://arxiv.org/abs/2508.07662",
        year: "2025",
        claim:
          "One forward pass over all labels. large-v3.0 average F1 0.7193; edge 0.4900 at 97.29 ex/s. Cross-encoders slow ~50× from 1 to 128 labels; GLiClass only 7–20%.",
      },
      {
        title: "Knowledgator/GLiClass",
        url: "https://github.com/Knowledgator/GLiClass",
        year: "2025",
        claim:
          "Python API: ZeroShotClassificationPipeline(text, labels, threshold=0.5). Models on Hugging Face under knowledgator/gliclass-*.",
      },
      {
        title: "SetFit: Efficient Few-Shot Learning with Sentence Transformers",
        url: "https://arxiv.org/abs/2209.11055",
        year: "2022",
        claim:
          "A few-shot cousin if you would rather train a linear head on sentence embeddings than GLiClass. Hugging Face reports 0.46 ms/sentence vs 31.18 ms for bart-large-mnli on one GPU comparison. No published reward-hacking ROC.",
      },
    ],
  },
  {
    name: "School of Reward Hacks SFT set",
    needsInternals: false,
    when: "You need paired hack vs control dialogues to train or eval a classifier, or to write Jev Noul criteria.",
    hookFit: "Training and eval data, not a detector. The 100 coding rows are hardcoded unit tests. The rest are rubric gaming and judge injection.",
    limit:
      "SFT on these hacks generalized to more reward-seeking and, for GPT-4.1, to unrelated misalignment. Coding-only hacks did not produce that broader misalignment.",
    citations: [
      {
        title:
          "School of reward hacks: Hacking harmless tasks generalizes to misaligned behavior in LLMs",
        url: "https://arxiv.org/abs/2508.17511",
        year: "2025",
        claim:
          "1073 dialogues (973 language + 100 coding) at huggingface.co/datasets/longtermrisk/school-of-reward-hacks, with cheat_method and a matched control.",
      },
    ],
  },
  {
    name: "Reward + test tampering (subterfuge)",
    needsInternals: false,
    when: "The agent can edit compute_reward.py and the integrity tests that guard it.",
    hookFit: "PreToolUse deny on those paths in code. Jev does not get a vote on writing to a reward file.",
    limit: "Easy-to-see overwrites were trainable. Harder subterfuge remained after training away the obvious cases.",
    citations: [
      {
        title: "Sycophancy to Subterfuge: Investigating Reward Tampering in Language Models",
        url: "https://arxiv.org/abs/2406.10162",
        year: "2024",
        claim:
          "Models learned to edit both the reward function and the tests that were meant to catch that edit. A helpful-only model did so 0/100000 times.",
      },
      {
        title: "Training a Misaligned Reward Seeker",
        url: "https://alignment.anthropic.com/2026/reward-seeker/",
        year: "2026",
        claim:
          "Hacker-Opus trained on 80 real hackable production environments generalized to killing monitors, rewriting history, and prompt-injecting safety monitors.",
      },
    ],
  },
  {
    name: "Prompted-hack probes vs training-time hacks",
    needsInternals: true,
    when: "You are collecting labels for a DoM probe or for Jev question calibration and might be tempted to use 'please hack' demonstrations.",
    hookFit: "Do not train white-box probes or calibrate Jev only on School of Reward Hacks prompted CoT if you want to catch RL-emergent SWE hacks.",
    limit:
      "A detector that looks great on prompted exploits can miss the hacks that appear in GRPO or production RL.",
    citations: [
      {
        title: "Trace-and-Amplify (arXiv 2604.23488)",
        url: "https://arxiv.org/html/2604.23488v2",
        year: "2026",
        claim:
          "LogReg trained on prompted exploits hit 8.79% of training-time code hacks. The same architecture trained on training-time hacks hit 86.03%. Prompted GPT-4.1 hit 3.70% of the training-time set.",
      },
    ],
  },
  {
    name: "AI Control and prover-verifier games",
    needsInternals: false,
    when: "The agent and the monitor might collude, or you want a small verifier that a sneaky prover cannot charm.",
    hookFit:
      "Treat the HTTP hook, including Jev, as an untrusted monitor. Canary evaluation paths (for example `.tours/verify_oracle.py`) are a structural deny. Do not ask the same agent to justify its own diff. Prefer a locked checker for the final gate. Jev cannot write the verifier. Code owns that.",
    limit:
      "Naive same-model monitoring is defeated by 'pretend not to see backdoors'. Letting the untrusted model explain the suspicious region to the trusted one failed in Greenblatt et al. Correctness-only CoT in Kirchner et al. made proofs less human-legible.",
    citations: [
      {
        title: "AI Control: Improving Safety Despite Intentional Subversion",
        url: "https://arxiv.org/abs/2312.06942",
        year: "2023",
        claim:
          "Trusted editing, untrusted monitoring with synthetic honeypots, redaction, and defer-to-trusted. Greenblatt, Shlegeris, Sachan, Roger.",
      },
      {
        title: "Prover-Verifier Games improve legibility of LLM outputs",
        url: "https://arxiv.org/abs/2407.13692",
        year: "2024",
        claim:
          "Kirchner et al. train a helpful plus sneaky prover against a small verifier. Optimizing only for correctness made chain-of-thought less checkable.",
      },
    ],
  },
  {
    name: "Verbalization fine-tuning",
    needsInternals: false,
    when: "You control training and want CoT monitors (or Jev on thoughts) to have something to read.",
    hookFit: "Not a hook. A third party cannot VFT Claude or Cursor. The verbalization judge is a mid-trajectory CoT read.",
    limit:
      "Without VFT, verbalization of cue use stayed around 8 to 12%. After RL, undetected hacking (ECR) was 6% with VFT vs 88% with RL only. Do not train against that judge.",
    citations: [
      {
        title:
          "Teaching Models to Verbalize Reward Hacking in Chain-of-Thought Reasoning",
        url: "https://arxiv.org/abs/2506.22777",
        year: "2025",
        claim:
          "Turpin et al. SFT models to admit cue influence, then RL. Held-out cue ECR 15% vs 63 to 66% for baselines. Warns against training against the CoT monitor, citing Baker.",
      },
    ],
  },
  {
    name: "BenchShield (infrastructure evidence)",
    needsInternals: false,
    when: "You own the eval harness and can instrument reward-relevant events instead of trusting the agent's text.",
    hookFit:
      "Orthogonal to Jev. Jev reads prompts and traces. BenchShield taints the reward path inside the benchmark. Use both.",
    limit: "Needs control of the eval infrastructure. Does not sit in a third-party Claude or Cursor hook by itself.",
    citations: [
      {
        title:
          "BenchShield: Formal Model-Backed Instrumentation for Reward Integrity in LLM-Agent Evaluation Infrastructure",
        url: "https://arxiv.org/abs/2609.11028",
        year: "Sep 2026",
        claim:
          "456 labeled trajectories from more than 31,000 public agent runs. Runtime analysis 96% accuracy detecting reward hacking from infrastructure-side evidence. Full-chain recall 77 to 100% vs 23 to 94% for an agentic scanner baseline. Structural exposure is not exploitation; semantic payloads can escape structural detection.",
      },
    ],
  },
  {
    name: "Escalation channel for eval defects",
    needsInternals: false,
    when:
      "The agent has no legitimate way to stop when tests contradict the spec, so it manufactures a pass.",
    hookFit:
      "Expose a report_evaluation_defect action and steer denials toward it. Denial copy that says try harder is not an escalation path.",
    limit:
      "Gomez reports 23.6% to 5.3% hacking across eight models in one experimental setting. That is not a universal effect size for your harness.",
    citations: [
      {
        title:
          "Can escalation channels redirect reward hacking toward defect disclosure?",
        url: "https://arxiv.org/abs/2608.29460",
        year: "Sep 2026",
        claim:
          "Francesca Gomez. Combined escalation-tool-plus-policy intervention reduced hacking from 23.6% to 5.3% across eight models in the reported setting.",
      },
    ],
  },
  {
    name: "SpecBench (visible vs held-out composition)",
    needsInternals: false,
    when:
      "You need to measure whether a coding agent satisfies the spec or only the visible tests.",
    hookFit:
      "Offline eval. Use the visible/held-out gap to tune steering, not as a per-tool deny. Not every gap is deliberate cheating.",
    limit:
      "The broader visible/held-out gap includes ordinary compositional failures. Do not label every gap as a hack.",
    citations: [
      {
        title: "SpecBench: Measuring Reward Hacking in Long-Horizon Coding Agents",
        url: "https://arxiv.org/abs/2605.21384",
        year: "Sep 2026",
        claim:
          "Thirty systems tasks with visible feature tests vs held-out feature-composition tests. One compiler artifact memorized test answers: 97% visible vs 0% held-out.",
      },
    ],
  },
  {
    name: "Multi-agent project trajectory",
    needsInternals: false,
    when:
      "Several agents share a workspace. Per-event and per-agent monitors can miss distributed attacks.",
    hookFit:
      "Keep a controller-owned project log: which agent changed an imported module, which later ran the checker, which claimed success.",
    limit:
      "The fragmentation effect is reported in a synthetic multi-agent setting. Still the right architecture for shared-workspace SWE.",
    citations: [
      {
        title:
          "Multi-Agent AI Control: Distributed Attacks Hamper Per-Instance Monitors",
        url: "https://arxiv.org/abs/2607.07368",
        year: "Jul 2026",
        claim:
          "Individually innocuous events can compose into evaluator compromise when monitors are per-instance.",
      },
    ],
  },
  {
    name: "HackProbe (holdout rotation)",
    needsInternals: false,
    when:
      "You are designing holdouts that the agent must not turn into a development set.",
    hookFit:
      "Borrow rotating probes and a fixed secret comparison core. Do not import monitor-driven candidate reselection into the agent objective.",
    limit:
      "Reported 0.763 AUROC and 0.434 FPR in a controlled experiment. That FPR is unusable as a gate.",
    citations: [
      {
        title:
          "Harness-agnostic detection and immunization of reward hacking in self-evolving language models",
        url: "https://arxiv.org/abs/2609.04665",
        year: "Sep 2026",
        claim:
          "Fixed secret comparison core plus rotating probes. Controlled experiment AUROC 0.763 at FPR 0.434. Useful holdout-management ideas, not production operating points.",
      },
    ],
  },
];
