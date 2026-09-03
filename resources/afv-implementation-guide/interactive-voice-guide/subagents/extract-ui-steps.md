<!-- UI-STEP EXTRACTION SPEC + fallback subagent. Canonical home for HOW a phase subskill turns a
     guide section into (a) an ordered step map and (b) one step's verbatim sub-steps. Two paths:
     the DEFAULT is deterministic inline extraction (the dispatcher does it in main context with
     Grep + a targeted Read — no LLM dispatch); the FALLBACK, for sections whose headings don't
     parse cleanly, is dispatching THIS file as an isolated subagent. Referenced by build.md,
     deploy.md, test.md, monitor.md, get-started.md. Rationale: an LLM dispatch spends far more
     time and tokens doing deterministic locate/slice/transcribe work than a Grep+Read. -->

# UI-step extraction — inline-first, subagent fallback

A phase subskill needs two things from its guide section: the **ordered step map** (so the walk
starts at Step 1 and never drops into an interior procedure) and, per step, that step's
**verbatim UI sub-steps**. Both are extraction, not reasoning: locating a heading, slicing the span
under it, and transcribing the literal text. So the **default is deterministic inline extraction**,
done by the dispatcher in main context. This file's **subagent** is the *fallback* for sections
whose structure doesn't parse cleanly.

## Why inline is the default (and safer, not just cheaper)

Dispatching an LLM to "read the file and return the steps verbatim" pays a large cost (a
whole-file read plus regenerating a big verbatim payload) to do work a
`Grep` + a targeted `Read` do deterministically. And it's a **fidelity downgrade, not just a cost**:
an LLM "returning verbatim" is itself an invention surface — it can drop a word, normalize a label,
or reorder. A `Grep`/`Read` returns literal file bytes; it *cannot* drift. Inline extraction has
**one** invention surface (you presenting the text to the customer) where the subagent path has two
(the subagent re-emitting it, then you relaying it). Fewer surfaces, lower cost, same guardrails.

This is the same principle as the heading-map fix: **reserve an LLM dispatch for work that needs
reasoning; never spend one on locate/slice/transcribe.** It works *because* guide headings are clean
and predictable (CLAUDE.md § Content-Design Rules) — that regularity is exactly what lets a tool
compute step boundaries with no invention.

## The inline path (DEFAULT — dispatcher, main context, no subagent)

### Build the ordered map — Grep the headings

`Grep` the section for heading lines with line numbers (`-n`, `output_mode: "content"`,
`pattern: "^#{2,4} "`). The returned lines, in order, ARE the map:

- `steps` = the `^## Step N: <title>` lines, in the order returned (document order == execution
  order). Each carries its line number.
- `prereqs` = the block under `## Before You Start` (read that one short span if you need its text).
- Interior sub-procedures are the `###`/`####` lines nested under their step.

`found = false` only if the Grep returns no `## Step` headings at all (section missing/renamed).
Heading text is literal file content, so there's **no invention or reorder risk** — a heading scan
is a *stronger* start-at-Step-1 guard than a model-generated map.

### Extract one step's detail — targeted Read of the step's span + comment scrub

Given the map, a step's content is the span from its `## Step N:` line to the **next `## ` (level-2)
heading**, exclusive — that span includes all the step's `###`/`####` sub-procedures. `Read` that
span with `offset` = the step's heading line and `limit` = (next level-2 heading line − this line).
This reads only the ~span, not the whole file.

Then, before presenting:

- **Scrub internal authoring comments.** Drop every `<!-- ... -->` block (single- or multi-line) —
  `<!-- VERIFY -->`, `<!-- SME REVIEW -->`, `<!-- AUTHOR NOTE -->`, `<!-- REVISIT -->`,
  `<!-- ORG -->`, `<!-- USE CASE -->`, `<!-- NOTE -->`, `<!-- VERIFIED -->`, `<!-- SKELETON -->`,
  `<!-- TERMINOLOGY -->`, etc. These are our workshop notes; the customer must never see them.
  A `<!-- -->` comment is never a UI step.
- **Present the remaining text verbatim**, in customer-set batches — exact click
  text, tab/panel names, field labels, button names, and every callout/gotcha. Do NOT paraphrase,
  reorder, merge, or split. This is a read-moment (the read-from-source rule): you are presenting
  literal file bytes you just read, never reciting from memory.
- **Re-flow wide tables as labeled lists (layout only).** A step span can contain a markdown table
  (e.g. a permissions or pronunciation table). A **wide** table (roughly 3+ columns, or cells too
  long to fit ~80 characters across) wraps and garbles in the terminal, so present it row by row as
  a short labeled list — one item per row, each value tagged with its column header — rather than
  printing the raw table. Leave **narrow** 2-column tables as tables. This is presentation layout,
  not a content edit: keep every row and cell verbatim, in order; drop nothing; invent nothing. It
  does not loosen the verbatim rule above (see `start-here.md` § Hard rules for the canonical
  statement).
- **Gap → point, don't fake.** If a sub-step the customer needs isn't in the span (the guide
  references a click it never spells out), say "the guide doesn't spell out the next click here —
  see `<source>` directly rather than me guessing." Never author the missing click. A whole step
  whose span has no procedure (rationale-only prose) is narrated/pointed, not walked.

The token/latency cost of a targeted slice is ~the sub-steps you'd present anyway — so inline is
strictly leaner than a whole-file subagent read, and the presented text reaches main context
identically either way.

## The read-only grain (narrate-only mode — the middle grain)

The inline path has two grains: the **map** (`## Step N:` lines) and a step's **full verbatim
detail** (the whole span). A reader in **narrate-only mode** (following without an org today — the
`narrate-only` org-capability determination set in `get-started.md`, recorded in the session index)
wants the grain *between* those: enough to picture what the step involves, not every click they
can't perform yet. That middle grain is composed from things the inline path already has — **no new
extraction, no runtime summarization, no invention**:

1. **The authored summary** = the step's **lead prose**: the span text between the `## Step N:`
   heading and the step's first `###`/numbered-step/blockquote. This sentence is **authored into the
   guide** (one work-shape sentence per `## Step N`, added 2026-08-27), so presenting it is a
   read-moment on literal bytes — the same zero-invention guarantee as any span slice. You are
   reading the guide's own summary, not writing one.
2. **The sub-task list** = the step's `### ` sub-headings, verbatim, taken straight from the map
   (the `^### ` lines that fall between this step's `## ` line and the next `## ` line). Present them
   as a short list. Where a step has no `###` children (its procedure is a flat numbered list under
   one heading — e.g. Test's batch procedure), there's no list to show and the authored summary
   stands alone.
3. **Full detail — offer ONCE, then remember the preference.** The **first** time you present a
   narrate-only step, offer the full click-by-click (e.g. "Want the click-by-click on each step, or
   is this level of detail right? I'll keep to your choice from here — just say the word to switch").
   Record the answer as a per-run granularity preference and **apply it silently on every later step
   — do NOT re-offer each step.** Re-asking every step is over-prompting (human-test finding A7). The
   two settings:
   - **summary** (default until they choose full): present the middle grain — authored summary +
     sub-task list — and stop. Don't tack a "want the click-by-click?" offer onto every step.
   - **full**: for each subsequent step, fall straight to the **full verbatim detail** path above
     (read the span, scrub comments, present verbatim, in batches) without asking again. Same path
     build-along uses.

   The customer can flip the preference at any time ("just give me the summary" / "walk me through
   the clicks"); honor it going forward and keep applying silently. And regardless of the standing
   preference, a one-off "show me the clicks for *this* step" is always honored for that step without
   changing the standing setting.

**Two things here are runtime-only and MUST NOT be written into the guide `.md`:** the framing line
that introduces the sub-task list (e.g. "In this step you'll:") and the one-time offer of full
detail (e.g. "Want the click-by-click on each step?"). These are concierge affordances for
narrate-only mode; the guide files carry only the authored summary sentence and the `###` headings
themselves. The granularity preference (summary vs full) is likewise runtime state for the run, held
in context — offered once, then applied silently (see point 3). Build-along mode never shows this
grain — it walks full detail directly.

## When to fall back to the subagent

Use the isolated subagent (below) **only** when the inline path can't compute step boundaries
safely — i.e. the section's steps aren't expressed as regular, parseable headings (unnumbered,
inconsistent depth, steps buried in prose, or a `## Step` span that isn't self-contained). Then a
fresh isolated context reads the whole section and returns the structured result. Treat irregular
headings as a **content bug to fix** (CLAUDE.md § Content-Design Rules), not the normal path — the
fallback keeps the walk correct in the meantime, but the goal is that no section needs it.

---

# Fallback subagent: extract-ui-steps

You run in an **isolated context**, dispatched by a phase subskill only when that section's headings
don't parse cleanly enough for inline extraction. Your entire job is to read **one file** and hand
back its UI steps **verbatim**. You do not talk to the customer. This is a high-hallucination-risk
job — verbatim UI steps (exact clicks, tab names, field labels, button names) are exactly what a
model is tempted to confidently make up. Do not.

## Your source (the ONLY thing you may use)

The dispatching subskill passes you a **`source`** — the path to the one guide section
file you extract from. The dispatching subskills live in `interactive-voice-guide/`, and they
reference the guide files one level up, at the package root: `../03-build.md` for Build,
`../05-deploy.md` for Deploy, and so on. Resolve `source` the same way the dispatcher wrote it
(relative to `interactive-voice-guide/`), so `../03-build.md` means `03-build.md` at the package
root. If in doubt, read the file at the package root by its name (`03-build.md`), never one level
above the package.

- Read **only** that file — nothing else. Not general Salesforce/Agentforce knowledge, not
  another section, not memory. Everything you return must come from the `source` file's text.

## Two modes — the dispatcher tells you which

You are called in one of two modes. The dispatching subskill states the mode, the `source`
file, and (for `detail`) the target step in its task.

### Mode `skeleton` — return the whole ordered section map

Return the section's structure **in document order, top to bottom**, so the walk can start at
the first step and never drop into an interior procedure:

1. **Prerequisites.** The "Before You Start" gates (org type, features to enable, access) as
   verbatim items — whatever the section lists before its first numbered step.
2. **Ordered step list.** Every top-level numbered step's **title/heading verbatim**, in the
   order the file presents them (e.g. `Step 1 Create a Routing Configuration`, `Step 2 Create a
   Fallback Queue`, … `Step 5 …`). Include each step's interior sub-procedure titles (e.g.
   "Create the Escalation Flow") nested under their parent step, in order — but do **not**
   expand their sub-steps here. Titles only at this stage.

You are building a table of contents, not walking it. Do NOT invent a step that isn't in the
file; if the section has no "Before You Start" block, return `prereqs: []`.

### Mode `detail` — return verbatim sub-steps for ONE named step

Given a specific step (e.g. "Step 3 Set Up Escalation" or a named sub-procedure the skeleton
listed), return that step's numbered UI sub-steps **EXACTLY as written** — verbatim click text,
tab/panel names, field labels, button names, and any callouts or gotchas. This is the detail
the customer is walked through one batch at a time.

## The no-invent guardrail (the point of isolation)

- **Verbatim only.** Do NOT paraphrase, reorder, merge, or split steps or titles. Preserve
  exact click text, tab/panel names, field labels, button names, and any callouts/gotchas.
- **You EXTRACT, you do not AUTHOR.** In `detail` mode, if a sub-step needed to proceed is
  missing from the file, mark that item `found: false` — never fill the gap with a plausible
  click. In `skeleton` mode, return only steps/prereqs the file actually contains.
- If the requested step or the whole section isn't in the file, return top-level
  `found: false`.
- **Never return internal authoring notes.** A `source` file may contain internal
  HTML comments — `<!-- VERIFY -->`, `<!-- SME REVIEW -->`, `<!-- AUTHOR NOTE -->`,
  `<!-- REVISIT -->`, `<!-- ORG -->`, `<!-- USE CASE -->`, `<!-- NOTE -->`. These are our
  workshop notes; the customer must never see them. Do NOT include them in `prereqs`, `steps`,
  `substeps`, or `unresolved`, and do not paraphrase them. A `<!-- -->` comment is never a UI
  step or a prerequisite. A genuinely omitted step is a `found:false` gap (report it) — distinct
  from an authoring comment (drop it silently).

## Return this typed result (nothing else)

Echo back the `source` you were given so the dispatcher can confirm the right section was read.

### `skeleton` mode

```
{
  source:   "<the source file you were given, e.g. 05-deploy.md>",
  mode:     "skeleton",
  found:    true | false,          // false = the walked section isn't in the file
  prereqs:  [ "<verbatim Before-You-Start item>", ... ],   // [] if the file has none
  steps:    [                      // top-level steps, IN DOCUMENT ORDER
              { title: "Step 1 Create a Routing Configuration", substeps: [] },  // substeps left empty here
              { title: "Step 3 Set Up Escalation",
                substeps: [ "Create the Escalation Flow", "Add the Escalation Flow to Pippin" ] },
              ...
            ]
}
```

### `detail` mode

```
{
  source:     "<the source file you were given>",
  mode:       "detail",
  step:       "Step 3 Set Up Escalation",     // echo the step you were asked for
  found:      true | false,                    // false = that step isn't in the file
  substeps:   [                                // ordered; the walk presents these in batches
                { text: "<verbatim sub-step text, including any callout>", found: true },
                { text: "<verbatim sub-step text>",                        found: true },
                ...
                // if a needed sub-step is missing from the file, emit it as a marker:
                { text: null, found: false }
              ],
  unresolved: [ ...anything the step references but the file never spells out... ]
}
```
