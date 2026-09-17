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
    name: "DoM probes on activations",
    needsInternals: true,
    when: "Open-weight agents where you can read residual-stream activations, including CoT tokens before the next action.",
    hookFit:
      "Not usable on Claude or Cursor closed models. Use it on local SWE agents (Qwen, GLM, Kimi) as a cheap online gate.",
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
    hookFit: "Same closed-model wall. Useful as a lab monitor while you train a text classifier on the tokens it flags.",
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
      "afterAgentThought / PostToolBatch / Stop. Too slow for every PreToolUse unless you cache and sample.",
    limit:
      "Baker et al. found ~95% recall with CoT vs ~60% on actions alone, then near-zero recall after training against the monitor (obfuscation). Do not put this score into the RL reward.",
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
    when: "You have labeled trajectories (Terminal-Wrench or your own) and need a sidecar cheaper than a frontier judge.",
    hookFit: "The design target for a trained GLiClass or 14M encoder sitting behind HTTP hooks.",
    limit:
      "The 14M encoder's AUC dropped from 0.95 to 0.62 when reasoning was stripped. Action-only detection is real but weaker. Do not train on unsanitized hack-elicitation prompts.",
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
    when: "You want multi-label zero-shot on prompts and traces without a full LLM, and you may later fine-tune on 8 examples per label.",
    hookFit:
      "CPU-viable for UserPromptSubmit (30s budget). Fine-tune on School of Reward Hacks plus your own tool traces; keep labels identical to this repo.",
    limit:
      "Zero-shot F1 on generic classification is 0.49–0.72 by size. Reward-hacking is a new domain. Few-shot (+17–50% F1 with 8 shots) is the actual path.",
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
          "A few-shot cousin if you would rather train a linear head on sentence embeddings than GLiClass. Hugging Face reports 0.46 ms/sentence vs 31.18 ms for bart-large-mnli on one GPU comparison. No published reward-hacking ROC. Train it on School of Reward Hacks plus Terminal-Wrench sanitized traces.",
      },
    ],
  },
  {
    name: "School of Reward Hacks SFT set",
    needsInternals: false,
    when: "You need paired hack vs control dialogues to train or eval a classifier.",
    hookFit: "Training data, not a detector. The 100 coding rows are hardcoded unit tests. The rest are rubric gaming and judge injection.",
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
    hookFit: "PreToolUse deny on those paths. This is a block, not a steer.",
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
    when: "You are collecting labels for a DoM or SAE probe and might be tempted to use 'please hack' demonstrations.",
    hookFit: "Do not train the white-box probe on School of Reward Hacks prompted CoT if you want it to catch RL-emergent SWE hacks.",
    limit:
      "A probe that looks great on prompted exploits can miss the hacks that appear in GRPO or production RL.",
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
      "Treat the HTTP or command hook as an untrusted monitor. Add synthetic honeypots. Do not ask the same agent to justify its own diff. Prefer a weaker trusted model or a locked checker for the final gate.",
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
    when: "You control training and want CoT monitors to have something to read.",
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
];
