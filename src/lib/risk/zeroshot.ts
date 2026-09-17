import { clipExcerpt, type Evidence } from "./domain";
import type { RiskKind } from "./kinds";
import { GLICLASS_LABELS } from "./taxonomy";

export { GLICLASS_LABELS };

function normalize(text: string): string {
  return text.toLowerCase().replace(/[_./\\-]+/g, " ");
}

function phraseScore(haystack: string, phrase: string): number {
  const n = normalize(haystack);
  const p = normalize(phrase);
  if (!p) return 0;
  if (n.includes(p)) return 1;
  return 0;
}

export function zeroshotLabels(haystack: string): Evidence[] {
  if (!haystack.trim()) return [];
  const evidence: Evidence[] = [];
  for (const spec of GLICLASS_LABELS) {
    let best = 0;
    let excerpt = spec.gliclass;
    for (const phrase of spec.phrases) {
      const score = phraseScore(haystack, phrase);
      if (score > best) {
        best = score;
        excerpt = phrase;
      }
    }
    const combined = best;
    if (combined < 1) continue;
    evidence.push({
      kind: spec.kind,
      detectorId: `gliclass-shape:${spec.kind}`,
      weight: Number((0.45 + 0.4 * combined).toFixed(3)),
      excerpt: clipExcerpt(excerpt),
      why: `Lexical overlap with the offline GLiClass label "${spec.gliclass}". Live scoring uses TypeSafe Jev when TYPESAFE_API_KEY is set.`,
    });
  }
  return evidence;
}

export function gliclassLabelList(): { kind: RiskKind; label: string }[] {
  return GLICLASS_LABELS.map((spec) => ({
    kind: spec.kind,
    label: spec.gliclass,
  }));
}
