<!-- BUILD SUBSKILL — narration of ../03-build.md's NTO voice instructions + a verbatim UI-step
     walk (Grep the heading map + a targeted Read of each step's span; no subagent). Extraction
     mechanism + rationale: subagents/extract-ui-steps.md § "The inline path". -->

# build — Build Subskill

Dispatched by `start-here`. Wraps `../skills/voice-instruction-scaffolder.md`. This is the
**narration of `../03-build.md`'s NTO instructions** plus a **verbatim UI-step walk**. It is NOT an
interview, and it produces **no artifact**.

## The interactive-vs-extraction split

- **Interactive (you, main context):** narrate the voice-writing rules + how NTO applied them per
  subagent; then walk the customer through the UI steps one batch at a time.
- **Extraction, inline (you, main context — DEFAULT):** both the ordered **map** and each step's
  verbatim **detail** are deterministic extraction from `../03-build.md`, done inline with
  `Grep` + a targeted `Read` — **no subagent**. Build's headings are clean (`## Step N:` in document
  order), so a tool computes step boundaries with zero invention or reorder risk. See
  `subagents/extract-ui-steps.md` § "The inline path" for the mechanism and why it's the default;
  Steps 3 and 5 apply it. The isolated subagent is the **fallback** for sections whose headings
  don't parse cleanly — Build isn't one of them.

## Notes guardrail — comment types this file's source carries

Framing / no-invent / Help-link rules follow `start-here`'s **Hard rules** — don't restate them.
`../03-build.md` carries authoring comments such as `<!-- SME REVIEW -->`, `<!-- NOTE -->`,
`<!-- VERIFY -->`, and `<!-- USE CASE -->`, among others; the inline detail-slice scrubs **every**
`<!-- ... -->` before you present (Step 5). A genuine content gap gets stated plainly in customer
terms; an internal comment is dropped.

## Entry — steps-first vs. rationale-first (A2 Option 2)

Build has two spans: **rationale** (Steps 1–2 — narrate *why* voice instructions work the way they
do) and the **UI walk** (Steps 3–5 — the click-by-click build). At Build entry, offer the customer
which comes first, ask once, and record the choice:

- **Rationale-first (default for newcomers):** run the spans in document order — narration (Steps
  1–2) then the walk (Steps 3–5). This is the current flow.
- **Steps-first (experts / hands-on):** go straight to the walk — build the map (Step 3), gate
  prereqs (Step 4), and walk the steps (Step 5) — and make the rationale span **pull-based**: tell
  the customer they can ask "why is this instruction written this way?" for any subagent and you'll
  narrate that rationale section on demand. Load the scaffolder `## Prompt` block (Step 1) **lazily**
  — on the first "why," not up front — so a customer who never asks never pays for it. Offer the
  full rationale span again at the end for anyone who wants it.

This is also an A1 latency mitigation — a steps-first customer skips ~5 gated conceptual-narration
turns. Keep it **orthogonal to the org-capability grain**: the `build-along`/`narrate-only`
determination still governs the *grain* of the walk (Step 5's mode fork); this fork governs the
*order* of the two spans. The two compose — e.g. steps-first + narrate-only lands the customer
directly on the walk at the read-only grain.

## Steps

1. **Load the skill prompt — the `## Prompt` block only, not the whole file.** In
   `../skills/voice-instruction-scaffolder.md` the narration script lives in the `## Prompt` block;
   the rest of the file (the NTO output template and the "adapt to your own agent" tail) is not
   narration and must not run now. Slice just that block, the same inline way the UI walk slices a
   step: `Grep` the file for `^## Prompt` and the following `^---` to get the span, then a
   targeted `Read` of it (`offset` = the `## Prompt` line, `limit` = next `---` line − this line).
   This is cheaper than a whole-file read AND keeps the deferred adaptation/output-template text out
   of context during narration — one fewer thing to run early by accident. Use its sections (why
   voice differs, FAQ, Order Inquiries, Escalation, Voice Persona) as your narration script; do
   **not** run the "adapt to your own agent" block — deferred to end-of-guide.

2. **Narrate in main context.** Walk the voice-writing rules and how NTO applied them per subagent
   (General FAQ, Order Inquiries / WISMO, Escalation), section by section, pausing "Ready to
   continue?" between sections. This is narration — do not ask the customer to describe their own
   agent, and do not reframe the guide's content.

   Build is a **two-span phase**, so the progress locator changes partway through. This narration
   is the **first span — 5 sections**: (1) why voice differs, (2) FAQ, (3) Order Inquiries, (4)
   Escalation, (5) Voice Persona. Print the locator at the TOP of each:

   > **Build · Section 4 of 5: Escalation**

   The **second span** is the UI-step walk in Step 5, which switches to `Build · Step i of N` once
   the inline heading map (Step 3) gives you N.

   - **Frame this span as rationale, not do-it-now (A2 fix).** A follow-along reader isn't in the
     app during this span, so the narration must stand on its own — say so up front: "You're not in
     the app yet; this span is the *why* behind Pippin's instructions, and the click-by-click build
     starts right after." Do **not** issue do-it-now instructions here (no "keep the default name
     and description" as if the reader is on the screen). When a concrete UI element comes up,
     **anchor it to the step where the reader will actually set it** rather than leaving it floating:
     "you'll set this when you create the agent in Step 1." Use the authored step summaries (each
     `## Step N` lead in `../03-build.md`) as the source for those anchors — a paraphrase-grain
     pointer, not a read-moment. This keeps the span self-contained for build-along and follow-along
     alike (CLAUDE.md § Screenshots: steps must stand on their own).

3. **Build the ordered map INLINE from the section's headings (main context, no subagent).** Get
   the ordered map of the Build section FIRST, so the walk starts at Step 1 and never drops into an
   interior procedure. `../03-build.md`'s headings are clean and predictable — top-level
   steps are `## Step N: <title>` in document order, prerequisites live under `## Before You Start`,
   and interior sub-procedures are `###`/`####` under their step. So extract the map by reading
   heading lines, not by dispatching an LLM:

   - Grep `../03-build.md` for `^## ` (and `^### `/`^#### ` if you want nested sub-procedure titles).
     `Grep` with `-n`, `output_mode: "content"`, `pattern: "^#{2,4} "` returns every heading line
     with its line number — that IS the ordered map, verbatim, in document order.
   - `map.steps` = the `^## Step N:` lines in the order returned (keep each line's number for the
     detail slice in Step 5); `map.prereqs` = the content under `## Before You Start` (read that one
     short block if you need the prereq text).
   - The heading text is literal file content, so there is **no invention risk** and **no reorder
     risk** — a heading scan is a *stronger* start-at-Step-1 guard than a model-generated map.

   Produce the map shape the walk expects:
   ```
   map = { source: "../03-build.md", found, prereqs: [...], steps: [{title, line}, ...] }
   ```
   `found = false` only if the Grep returns no `## Step` headings at all (section missing/renamed).

   > **Fallback — irregular sections.** If a section's steps aren't regular, parseable headings
   > (unnumbered, inconsistent depth, steps buried in prose), do NOT infer the order by hand — fall
   > back to a `skeleton`-mode dispatch of `subagents/extract-ui-steps.md`. Inline is the default;
   > Build's clean `## Step N:` headings keep it available (CLAUDE.md § Content-Design Rules).

4. **Guardrail check + surface prerequisites.** If `map.found == false`,
   tell the customer the Build procedure isn't in the file and point them at `../03-build.md` —
   don't walk invented steps. Otherwise, present `map.prereqs` first and ask the customer to
   confirm they're set (an org licensed for Agentforce Voice, features enabled, access) **before the first click**.
   Never assume prerequisites silently.

5. **Walk the section in order, starting at Step 1 (interactive, main context).** Walk
   `map.steps` top-down. Now that the inline heading map is built, you know N = `len(map.steps)`, so
   this second span uses the step locator: at the TOP of each step, print
   `**Build · Step <i> of <N>: <step.title>**` — e.g. `**Build · Step 3 of 7: Customize Your
   Subagents**`. For each step the customer reaches, get THAT step's verbatim sub-steps by an
   **inline targeted `Read`** of the step's span (`subagents/extract-ui-steps.md` § "Extract one
   step's detail") — no dispatch. GUARDRAIL: present verbatim; never author a click.

   - **Mode fork — build-along vs. narrate-only.** Check the org-capability determination
     (`build-along` or `narrate-only`) recorded in the session index under
     `## Org-capability determination` (set by Get Started or `start-here`'s up-front gate).
     **Build-along** walks the full verbatim detail per step, as below. **Narrate-only** (following
     without an org today) leads with the **read-only grain** instead — the step's authored summary
     + its `###` sub-task list — and drops to full verbatim detail only when the customer asks
     (`subagents/extract-ui-steps.md` § "The read-only grain"). The locator
     (`**Build · Step i of N: title**`), start-at-1 ordering, skip rules, and walked/skipped
     recording are identical in both modes.
   - **Slice the step's span deterministically.** The step's content runs from its `## Step N:`
     heading line to the **next level-2 (`## `) heading**, exclusive — that span includes all its
     `###`/`####` sub-procedures. `Read` with `offset` = the step's heading line and `limit` = (next
     `## ` line − this line). This reads only the span, not the whole file.
   - **Scrub, then present verbatim.** Drop every `<!-- ... -->` comment from the slice,
     then present the remaining text verbatim, in customer-chosen batches. Because you just read the
     literal bytes, this is a read-moment satisfied by the read itself — no memory.
   - **Bundled files → resolved full path.** When a step references a file that ships
     with the guide (e.g. the NTO knowledge file in *Ground the Agent with Data* —
     `../nto-customer-service-knowledge.pdf`), give the resolved absolute path, not the guide's
     generic "same folder" phrasing. See `start-here.md` Hard rule "Resolve bundled-file paths."
   - **Start at the first step, in order.** Begin at `map.steps[0]`
     and proceed in document order. Never begin mid-section.
   - **Batch size is the customer's to set.** Default to a small batch (2–3 sub-steps
     per turn). Offer control: "one at a time," "a few," or "the whole step." Batching is
     presentation only — the verbatim slice still holds per sub-step.
   - **Skip only on explicit instruction.** Advance linearly unless the
     customer explicitly says "skip to Step X" or "I already did Steps 1–N, resume at X." Absent an
     explicit signal, never assume progress. When the customer does jump, honor it: slice the target
     step's span, present it verbatim, and do NOT invent a bridge or pretend skipped steps were
     walked.
   - **Record what was walked vs. skipped.** Track per step whether it was
     **walked** (you presented it verbatim) or **skipped by customer** (they jumped past it).
     Report this in the handback so the index can distinguish walked / skipped / not-reached.
   - **Downgrade to pointing on a gap.** If the step's span doesn't spell out a click the customer
     needs (or the span is rationale-only prose, not a procedure), say: "The guide doesn't spell out
     the next click here — see `../03-build.md` directly rather than me guessing," and don't invent
     the click.

   ```
   walked = []; skipped = []
   N = len(map.steps)
   i = 0
   detailPref = value carried from an earlier phase's UI walk, else unset
                               # narrate-only granularity: unset -> summary -> full; offered ONCE per
                               # RUN (A7). Set on the first narrate-only UI step of the walk; because
                               # the dispatcher runs inline in main context, it persists across phases
                               # — don't reset it here, and don't re-offer in a later phase if it's set.
   while i < N:
      step = customer jumped? -> the requested step : map.steps[i]
      if customer skipped past steps to reach it:
         skipped += those intervening steps
      pos = index of `step` in map.steps + 1                # actual position, correct even after a jump
      print "**Build · Step {pos} of {N}: {step.title}**"   # progress locator
      span_end = line of next `## ` heading after step.line (or EOF for the last step)
      slice = Read("../03-build.md", offset=step.line, limit=span_end - step.line)
      slice = drop_html_comments(slice)
      if narrate-only:
         if detailPref == unset:                    # FIRST narrate-only step only — offer once
            summary  = lead prose of slice (heading -> first ###/numbered step/blockquote)
            subtasks = the `### ` headings in map between step.line and span_end   # [] if none
            present summary; if subtasks: "In this step you'll:" + subtasks
            offer "Want the click-by-click on each step, or is this level of detail right?
                   I'll keep to your choice from here — just say the word to switch."
            detailPref = full if they want clicks else summary
            if detailPref == summary: walked += [step.title]; i = index of next step; continue
            # detailPref == full -> fall through to present this step's clicks now
         elif detailPref == summary:                # remembered — apply SILENTLY, no re-offer (A7)
            summary  = lead prose of slice (heading -> first ###/numbered step/blockquote)
            subtasks = the `### ` headings in map between step.line and span_end
            present summary; if subtasks: "In this step you'll:" + subtasks
            walked += [step.title]; i = index of next step; continue
         # detailPref == full -> fall through to full verbatim detail, no re-offer
         # (customer may flip the standing pref at any time, or ask for clicks on just one step)
      if slice has no procedure (rationale-only / click not spelled out):
         say "The guide doesn't spell out the next click here — see ../03-build.md directly."
         continue          # downgrade to POINTING for this step, never invent
      present slice verbatim, in customer-chosen batches, gating between batches
      walked += [step.title]
      i = index of next step after `step`
   ```

6. **Defer adaptation.** Do NOT run the "adapt to your own agent" block now. Say:
   > "You'll be able to try this on your own agent at the end."

## Return to the orchestrator

Carry per-step walked/skipped so the index can distinguish walked / skipped-by-customer /
not-reached. `blocked` if the inline heading map found no `## Step` headings
(section missing/renamed) — or, on the irregular-section fallback, if the skeleton dispatch itself
came back `found: false`.

```
{
  phase:         "build",
  status:        map.found ? "complete" : "blocked",
  summary:       "Narrated NTO voice instructions (3 subagents); walked <K> of <N> steps; skipped <S> by customer; <M> unresolved from 03-build.md",
  walked:        [ "Step 1 Create the Agent", ... ],       // steps presented verbatim
  skipped:       [ "Step 4 …", ... ],                        // steps the customer jumped past
  nextPhase:     "test",
  needsFromUser: anyUnresolved ? "content gaps in 03-build.md: " + unresolved : null
}
```

(No `artifacts` field — the walk writes no content artifact.)
