import { AppShell } from "@/components/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LITERATURE } from "@/lib/risk/literature";

export default function LiteraturePage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="font-heading text-2xl tracking-tight">What else detects reward hacking</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Jev is TypeSafe AI&apos;s System One model (Almeida, Sep 2026). It is the
          live scorer in this repo. There is no public Jev reward-hack ROC as of 17
          Sep 2026. Bergen et al. 2026 (arXiv 2609.19101) is a white-box
          difference-of-means probe. It is strong on open SWE agents and useless on
          Claude or Cursor, where you cannot read activations. GLiClass is the
          offline label catalog, not the hosted decision model. Lexical /
          GLiClass fallback in this app is degraded. Open System One heads
          (for example Laya) are future backends, not drop-in ROC replacements.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {LITERATURE.map((row) => (
          <Card key={row.name}>
            <CardHeader>
              <CardTitle>{row.name}</CardTitle>
              <CardDescription>
                {row.needsInternals
                  ? "Needs model internals (weights, activations, or gradients)."
                  : "Text or trajectory only. Fits a third-party hook."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <p>
                <span className="font-medium">When. </span>
                {row.when}
              </p>
              <p>
                <span className="font-medium">Hook. </span>
                {row.hookFit}
              </p>
              <p>
                <span className="font-medium">Limit. </span>
                {row.limit}
              </p>
              <ul className="flex flex-col gap-2">
                {row.citations.map((cite) => (
                  <li key={cite.url}>
                    <a
                      className="font-medium underline-offset-4 hover:underline"
                      href={cite.url}
                    >
                      {cite.title}
                    </a>{" "}
                    ({cite.year}). {cite.claim}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
