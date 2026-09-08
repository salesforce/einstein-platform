<!-- DEPLOY SUBSKILL — verbatim UI walk of ../05-deploy.md (Steps 1–5: routing config, fallback
     queue, escalation flow, Enhanced Chat v2 channel, publish) + a narrate-then-link close (the
     surface table + "Before You Go Live" pointers). Extraction mechanism + rationale:
     subagents/extract-ui-steps.md § "The inline path". -->

# deploy — Deploy Subskill

Dispatched by `start-here`. This is a **verbatim UI-step walk of `../05-deploy.md`** — activating
Pippin, configuring Omni-Channel routing, setting up escalation, creating the Enhanced Chat v2
channel, and publishing. It has **no skill wrapper** and produces **no artifact**.

Deploy is almost entirely verbatim UI steps (Steps 1–5), so — like Build — it extracts both the
ordered map and each step's detail **inline** (`Grep` + a targeted `Read`), with **no subagent**.
Deploy's headings are clean (`## Step N:` in document order — verified), so a tool computes step
boundaries with zero invention or reorder risk. This applies the read-from-source rule to a fact-dense phase:
every click, field label, tab name, and configuration value is a read-moment — satisfied by reading
the step's span at the moment you present it, never from memory. Mechanism + rationale:
`subagents/extract-ui-steps.md` § "The inline path"; the isolated subagent is the **fallback** for
sections whose headings don't parse cleanly — Deploy isn't one of them.

## The interactive-vs-extraction split

- **Interactive (you, main context):** a one-line idea-level intro to each step ("what this step
  accomplishes," in the guide's own framing), the prereq gate, batch pacing, and the closing
  narrate-then-link span. Idea-level intros are fine in main context under the read-from-source rule — but the instant
  a **specific value** is involved (a routing-config setting like *Least Active*, the `recordId`
  description text, a checkbox label), it's a read-moment: present it verbatim from the step's
  freshly-read span, never from memory.
- **Extraction, inline (you, main context — DEFAULT):** both the ordered **map** and each step's
  verbatim **detail** come from `../05-deploy.md` via `Grep` + targeted `Read`, no subagent
  (`subagents/extract-ui-steps.md` § "The inline path"). Reserve the subagent for irregular
  sections.

## Notes guardrail — comment types this file's source carries

Framing / no-invent / Help-link rules follow `start-here`'s **Hard rules** — don't restate them.
`../05-deploy.md` carries several `<!-- VERIFIED -->` notes; the inline detail-slice scrubs every
`<!-- ... -->` before you present the span (Step 4) — do the scrub every time; never relay one. A
genuine content gap gets stated plainly in customer terms; an internal comment is dropped.

## Steps

1. **Frame the phase (one line, main context).** Deploy is where Pippin becomes real — you'll set
   up routing, a fallback queue, escalation to a human, the Enhanced Chat v2 channel (where you
   talk to Pippin and switch between voice and chat), and publish. Say plainly what the guide says:
   it takes you to a **tested, published deployment you can prove works** — not a finished
   customer-facing website (that's Step 5's hand-off to platform docs). Don't over-promise a site.

2. **Build the ordered map INLINE from the section's headings (main context, no subagent).** Get
   the ordered map FIRST so the walk starts at Step 1 and never drops into an interior procedure.
   `../05-deploy.md`'s headings are clean and predictable — top-level steps are
   `## Step N: <title>` in document order, prerequisites live under `## Before You Start`, and
   interior sub-procedures (Step 3's *Create the Escalation Flow* / *Add the Escalation Flow to
   Pippin*) are `###` under their step. Extract the map by reading heading lines:

   - `Grep ../05-deploy.md` with `-n`, `output_mode: "content"`, `pattern: "^#{2,4} "` — the
     returned lines, in order, ARE the map (verbatim, document order).
   - `map.steps` = the `^## Step N:` lines in order (keep each line number for the detail slice in
     Step 4); `map.prereqs` = the content under `## Before You Start`.
   - Heading text is literal file content → no invention or reorder risk. See
     `subagents/extract-ui-steps.md` § "The inline path."

   ```
   map = { source: "../05-deploy.md", found, prereqs: [...], steps: [{title, line}, ...] }
   ```
   `found = false` only if the Grep returns no `## Step` headings (section missing/renamed).

   > **Fallback — irregular sections.** If a section's steps aren't regular parseable headings, fall
   > back to a `skeleton`-mode dispatch of `subagents/extract-ui-steps.md`. Inline is the default;
   > Deploy's clean headings keep it available (CLAUDE.md § Content-Design Rules).

3. **Guardrail check + surface prerequisites.** If `map.found == false`,
   tell the customer the Deploy procedure isn't in the file and point them at `../05-deploy.md` —
   don't walk invented steps. Otherwise, present `map.prereqs` first and ask the customer to
   confirm they're set — for Deploy these are consequential: **Build complete, Test complete
   (Builder preview + Testing Center batch testing), and service reps identified** for escalation.
   Never assume prerequisites silently.

   > Also surface the ordering gotcha the guide states: **escalation must be in place before the
   > Enhanced Chat v2 channel** — the channel's Routing page requires an activated escalation flow.
   > This comes verbatim from the file (Step 3's callout); present it, don't paraphrase the
   > dependency into something looser.

4. **Walk the section in order, starting at Step 1 (interactive, main context).** Walk
   `map.steps` top-down. N = `len(map.steps)` (5). At the TOP of each step print
   `**Deploy · Step <i> of <N>: <step.title>**`. Give a one-line idea-level intro to the step, then
   get THAT step's verbatim sub-steps by an **inline targeted `Read`** of the step's span
   (`subagents/extract-ui-steps.md` § "Extract one step's detail") — no dispatch. Present verbatim;
   never author a click or a value.

   - **Mode fork — build-along vs. narrate-only.** Check the org-capability determination
     (`build-along` or `narrate-only`) recorded in the session index under
     `## Org-capability determination` (set by Get Started or `start-here`'s up-front gate).
     **Build-along** walks the full verbatim detail per step, as below. **Narrate-only** (following
     without an org today) leads with the **read-only grain** instead — the step's authored summary
     + its `###` sub-task list — and drops to full verbatim detail only when the customer asks
     (`subagents/extract-ui-steps.md` § "The read-only grain"). The locator
     (`**Deploy · Step i of N: title**`), start-at-1 ordering, skip rules, and walked/skipped
     recording are identical in both modes.
   - **Slice the step's span deterministically.** The step's content runs from its `## Step N:`
     line to the **next level-2 (`## `) heading**, exclusive (includes its `###` sub-procedures).
     `Read` with `offset` = the step's heading line, `limit` = (next `## ` line − this line). Scrub
     `<!-- ... -->` comments, then present.
   - **Start at Step 1, in order.** Never begin mid-section.
   - **Batch size is the customer's to set.** Default 2–3 sub-steps per turn; offer
     "one at a time," "a few," or "the whole step." Deploy's steps are long (Step 3's escalation
     flow is ~19 sub-steps across two sub-procedures) — batching matters here. Batching is
     presentation only; the verbatim slice holds per sub-step.
   - **Skip only on explicit instruction.** Advance linearly unless the
     customer explicitly says "skip to Step X" or "I already did Steps 1–N." When they jump, honor
     it: slice the target step's span, present it verbatim, don't invent a bridge or pretend
     skipped steps were walked.
   - **Record walked vs. skipped.** Track per step; report in the handback.
   - **Preserve callouts verbatim.** Deploy's steps carry load-bearing callouts — "add your own
     user as a queue member so you can test escalation" (Step 2), "Enhanced Chat v2 does the heavy
     lifting" (Step 4), "channel row = bot icon, deployment row = monitor icon" (Step 4), the
     voice-icon confirmation (Step 4). They're in the step's span; present them, don't drop or
     summarize them.
   - **Downgrade to pointing on a gap.** If the step's span doesn't spell out a click the customer
     needs, say: "The guide doesn't spell out the next click here — see `../05-deploy.md` directly
     rather than me guessing," and don't invent the click.

   ```
   walked = []; skipped = []
   N = len(map.steps)
   i = 0
   detailPref = value carried from an earlier phase's UI walk, else unset
                               # narrate-only granularity: unset -> summary -> full; offered ONCE per
                               # RUN (A7). Persists across phases (dispatcher runs inline in main
                               # context) — don't reset, and don't re-offer here if it's already set.
   while i < N:
      step = customer jumped? -> the requested step : map.steps[i]
      if customer skipped past steps to reach it:
         skipped += those intervening steps
      pos = index of `step` in map.steps + 1
      print "**Deploy · Step {pos} of {N}: {step.title}**"
      span_end = line of next `## ` heading after step.line (or EOF for the last step)
      slice = drop_html_comments( Read("../05-deploy.md", offset=step.line, limit=span_end - step.line) )
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
      if slice has no procedure (click not spelled out):
         say "The guide doesn't spell out the next click here — see ../05-deploy.md directly."
         continue          # downgrade to POINTING, never invent
      present slice verbatim, in customer-chosen batches, gating between batches
      walked += [step.title]
      i = index of next step after `step`
   ```

5. **Close with the narrate-then-link span (main context).** Step 5's "Choose your surface" table
   and the "Before You Go Live" section are **not verbatim click-steps** — they're
   narrate-what-you'll-do-then-point-to-the-right-doc content (getting the agent onto a real
   surface is platform-specific work the guide deliberately hands off). Narrate what the guide says
   here — you finish with a **tested, published deployment you can prove works**, and the path to a
   live surface (external site / Experience Cloud / mobile) lives in dedicated Salesforce docs —
   and **surface the Help links the guide already carries**. These links exist
   in `../05-deploy.md` and are verified; present the ones relevant to what the customer asks
   about. **Never invent a help.salesforce.com URL** — surface only links that are in the source.
   Briefly name the "Before You Go Live" topics the guide flags as out of scope (prepare service
   reps, test the full human handoff, stand up a real web surface, deploy to staging/production) so
   the customer knows what's left, and point at the guide's links for each.

## Return to the orchestrator

```
{
  phase:         "deploy",
  status:        map.found ? "complete" : "blocked",
  summary:       "Walked <K> of <N> Deploy steps (routing, fallback queue, escalation, ECv2 channel, publish); skipped <S> by customer; <M> unresolved from 05-deploy.md",
  walked:        [ "Step 1 Create a Routing Configuration", ... ],
  skipped:       [ ... ],
  nextPhase:     "monitor",
  needsFromUser: anyUnresolved ? "content gaps in 05-deploy.md: " + unresolved : null
}
```

(No `artifacts` field — the walk writes no content artifact, per the no-artifacts rule. Deploy has no adaptation
tail — it wraps no skill.)
