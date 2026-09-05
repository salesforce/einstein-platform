<!-- IDEATE SUBSKILL — narration of ../02-ideate.md's NTO plan. Pure narration, no verbatim UI
     walk, so NO extract subagent and no artifact. -->

# ideate — Ideate Subskill

Dispatched by `start-here`. Wraps `../skills/ideate-planner.md`. This is the **narration of
`../02-ideate.md`'s NTO plan** — NOT an interview. You walk NTO's planning decisions; you do not
collect the customer's own use case here (that's the end-of-guide adaptation phase).

## Narration-only — runs entirely in main context

Ideate has **no heavy verbatim read to isolate and no artifact to produce**, so it needs **no
subagent** and writes **no file**. The narration the customer hears comes from the skill's
pre-written `## Prompt` block — read that in main context and narrate from it. The plan already
lives, fully authored, in `../02-ideate.md` and in `../skills/ideate-planner.md`; you narrate it,
you do not regenerate it.

> **Do NOT dispatch a subagent to "build the plan," and do NOT write `project-plan.md`.** This
> narrates; it produces no content artifact. Generating already-authored, fixed
> content is what invites drift + schema-fill pressure. (In **Extended**, where the customer's OWN
> plan is real input, a plan artifact returns.)

## Framing guardrail — the phase-specific trap

Framing / no-invent / no-comment rules follow `start-here`'s **Hard rules** — don't restate them.
The trap specific to Ideate: if asked "do we build all the versions?", say what the guide says
("the guide walks through Version 1"); don't recast later versions as a "roadmap" or "future
expansions." `../02-ideate.md` carries `<!-- VERIFY -->`, `<!-- AUTHOR NOTE -->`, `<!-- USE CASE
-->`, `<!-- REVISIT -->`, `<!-- NAME -->`, `<!-- EDITION -->`, and `<!-- ORG -->` comments — drop
every `<!-- ... -->`.

## Concept before instance

When you narrate a topic the reader pulls, lead with **"The idea"** (a one-sentence definition of
the framework) and **"Why it matters here"** (one sentence on why it matters for a voice agent),
THEN NTO's application. Ground all three in `../02-ideate.md`'s own framing — never invent a
definition. This turns each topic from "here's what NTO did" into "here's the concept, here's why it
matters, here's NTO's version." Print a lightweight locator at the top of a pulled topic — e.g.
`**Ideate · Define Your Guardrails**` — but **not** a "Section N of X" count; the reader chose this
topic, they aren't walking a fixed sequence.

## Steps

1. **Load the skill prompt — the `## Prompt` block only, not the whole file.** In
   `../skills/ideate-planner.md` the narration script lives in the `## Prompt` block; the rest of
   the file (the NTO plan template and the "adapt to your own use case" tail) is not narration and
   must not run now. Slice just that block inline: `Grep` for `^## Prompt` and the following
   `^---` to get the span, then a targeted `Read` of it (`offset` = the `## Prompt` line, `limit` =
   next `---` line − this line). Cheaper than a whole-file read AND it keeps the deferred
   adaptation/plan-template text out of context during narration. Use its sections (use case,
   jobs/scope/value/data, technical requirements, guardrails) as your narration script; do **not**
   run the "adapt to your own use case" block — that's deferred to the end-of-guide adaptation phase.

2. **Open with an overview, then a topic menu — reader-driven, NOT a forced linear walk.** Ideate
   is conceptual, not step-by-step, so it does **not** use the "Step N of X" position map that the
   procedural phases use. Instead:
   - **Offer a depth choice first (A2 Option 2 skip lever, extended to Ideate).** Before the
     overview, give the customer a depth fork and record the choice, the same way Build offers
     steps-first vs. rationale-first at its entry. Ask once:
     - **Walk me through it (default for newcomers):** the full flow below — overview, then the
       reader-driven topic menu, narrating any topic they pull.
     - **Just the overview, then move on (experienced / short on time):** narrate the overview only,
       then hand back to the orchestrator for Build. Keep the pull open — tell them they can ask
       about any Ideate topic anytime, or come back to Ideate later — so nothing is cut, it's
       deferred. This mirrors Build's steps-first lever and is the same A1 latency win: a customer
       who doesn't want the conceptual walk skips ~5 gated topic turns. It is **orthogonal** to the
       org-capability grain (`build-along`/`narrate-only`), which governs the procedural phases, not
       this conceptual one. Ideate content is never removed from `../02-ideate.md`; this only
       demotes the *default depth* for the customer who opts out.
   - **Overview first.** Read the intro block of `../02-ideate.md` (the opening paragraphs above the
     first `## ` heading) and narrate it verbatim-grounded: what ideation is, the four things worth
     considering, and "you don't need every answer before you start building." Keep it short. (Under
     "just the overview," this is the whole phase — narrate it, restate that the topics are pullable
     on request, and return to the orchestrator.)
   - **Then present the topic menu.** The menu **is** the top-level `## ` headings of
     `../02-ideate.md`, read literally (`Grep '^## '`) — as of this writing: **Identify Your Use
     Case · Define Your Use Case · Define the Technical Requirements · Salesforce Considerations for
     Your Voice Agent · Define Your Guardrails.** Give each a one-line teaser drawn from that
     section's own opening sentence. Then invite the customer to pick any topic, in any order, or to
     ask for the full walk: *"Which do you want to start with? Or say 'walk me through all of them.'"*
   - **Narrate a topic only when pulled.** On request, narrate that one section (see § Concept
     before instance for the shape), then point the reader **back to the menu** ("want more on any of
     these, or move to another topic?") — don't force-march to the next section. If they ask for the
     full walk, go top to bottom through the same headings, still pausing between topics.
   - Do **not** dump all sections at once. This is narration — do not ask the customer to supply
     their own use case, and do not reframe the guide's content.

3. **Carry the guide's Help links through narration.** `../02-ideate.md`
   carries Help links; surface the relevant one when you narrate a section it belongs to ("the
   guide links this — see …"). Surface only links that EXIST in the source; never invent a
   help.salesforce.com URL.

4. **Handle questions in the guide's terms.** Answer from the narrated content (a read-moment —
   the read-from-source rule — if it's a specific fact). If the customer asks about something
   `../02-ideate.md` genuinely doesn't cover, say so plainly (a content gap) — but never quote or
   paraphrase an internal authoring comment, and never invent a value to fill the gap.

5. **Defer adaptation.** Do NOT run the "adapt to your own use case" block now. Say:
   > "At the end, you'll be able to build a plan for your own use case."

   (That end-of-guide block produces a FULL structured plan for the customer's own use
   case — same section shape as NTO's plan — written to `./my-notes/my-project-plan.md`, with
   `> Decide this:` placeholders for anything they don't answer. Never fabricate their business
   facts. The orchestrator runs it; this subskill only points at it.)

## Return to the orchestrator

```
{
  phase:         "ideate",
  status:        "complete",
  summary:       "Narrated NTO plan (FAQ + WISMO V1), overview + topic menu, reader-pulled",
  nextPhase:     "build",
  needsFromUser: null
}
```

(No `artifacts` field — the walk writes no content artifact. No `walked`/`skipped` —
Ideate walks no UI steps.)
