<!-- TEST SUBSKILL — mixed phase. Mostly conceptual narration of ../04-test.md (define
     objectives, design scenarios, interpret results, iteration) with ONE bounded verbatim UI
     procedure ("Create and Run the Batch Test," steps 1–7), extracted inline via a targeted Read.
     Wraps TWO skills: test-suite-generator (before testing) and test-results-analyzer (after).
     Only test-suite-generator has an end-of-guide adaptation tail; test-results-analyzer does NOT
     (its only input is a real test export that doesn't exist at plan-time) — present it in-phase as
     a run-it-after-you've-tested next step. See orchestrator-endgame.md.
     Extraction mechanism + rationale: subagents/extract-ui-steps.md § "The inline path". -->

# test — Test Subskill

Dispatched by `start-here`. This narrates `../04-test.md` — how NTO tests Pippin: define testing
objectives, design realistic voice scenarios, run manual preview + batch tests, interpret the
results, and iterate. It wraps **two** skills — `test-suite-generator` (used before testing) and
`test-results-analyzer` (used after) — and produces **no artifact**.

## Why Test is a PARTIAL-helper phase (not shaped like Build/Deploy)

Build and Deploy are linear Step-1-to-N procedures, so they build the ordered map (inline `Grep` of
the headings) and walk it top-down, reading each step's span in turn. **Test is different: it's
mostly conceptual, with one small verbatim UI procedure embedded in it.** So the split here is:

- **Interactive (you, main context):** narrate the *ideas* — testing objectives, what makes a good
  voice scenario, manual preview, the voice-experience listen-for checklist, how to read the
  scorers, iteration. Idea-level paraphrase is fine in main context.
- **Extraction, inline (you, main context):** any **specific verifiable fact** and the one
  **verbatim UI procedure** come from `../04-test.md` via a targeted `Read` — no dispatch. This is
  the read-from-source rule's read-moment: the moment you'd state the six subagent names, a scorer's exact score
  thresholds, the batch-plan values, or a click in "Create and Run the Batch Test," `Read` the
  relevant span and present it verbatim — never from memory. Reserve the isolated subagent
  (`subagents/extract-ui-steps.md`) for a section whose headings don't parse cleanly. (Test has just
  one small embedded procedure, so this is a single targeted read, not a whole-section walk.)

Do **not** try to run `skeleton` over all of `../04-test.md` and walk it Step 1→N — the section
isn't a single ordered procedure, and forcing that shape would misrepresent it. Narrate the section
in **document order** (Planning → Core Testing → Iteration); the batch procedure arrives in its
natural place.

## Notes guardrail — comment types this file's source carries

Framing / no-invent / Help-link rules follow `start-here`'s **Hard rules** — don't restate them.
`../04-test.md` carries `<!-- ORG -->` and other internal comments — drop every `<!-- ... -->`.
(Note: any **visible** callout — `> **Known issue: ...**` prose, tips, warnings — is guide prose,
not an HTML comment. Narrate it faithfully if the customer reaches it; suppressing visible content
is a pre-publish scrub concern, not a runtime one. Only `<!-- ... -->` comments get dropped.)

## Steps

1. **Frame the phase (one line, main context).** Test is where you confirm Pippin actually works —
   not just that answers are correct, but that they *sound* right in voice, route to the right
   subagent, and hold up across the many ways real customers phrase things. Say the guide's own
   structure: **Planning & Preparation → Core Testing (manual preview + batch) → Iteration &
   Refinement**, and its principle — *test deep first (preview), then broad (batch)*.

2. **Narrate Planning & Preparation (main context).** Walk, in document order:
   - **Define Testing Objectives** — goals linked to business value, deconstruct the agent (name
     the six subagents *from a read* — Agent Router, General FAQ, Order Inquiries, Escalation, Off
     Topic, Ambiguous Question — this is a read-moment: `Read` the relevant span of `../04-test.md`
     if you're not certain rather than reciting from memory), and the voice-specific success criteria.
   - **Create Test Scenarios** — what a strong scenario includes, and the voice-specific variations
     (fast speech, repeated input, background-noise phrasing, number-format variation). Point to
     the two worked example scenarios in the file rather than reproducing their tables from memory.
   - Print the locator at the top of each: `**Test · <span> <i> of <N>: <Title>**`. Gate between
     sections ("Ready to continue?").

3. **Point to the Test Suite Generator skill (adaptation deferred).** The guide presents
   `test-suite-generator` here. In the NTO walk, say what the guide says: a **pre-built NTO voice
   test suite** (`nto-voice-test-suite.csv`) ships with the guide and is uploaded as-is; the skill
   is the "generate your own for your agent" path. Do **not** run the skill's "own agent" block now
   — defer it: *"At the end, you'll be able to generate a test suite for your own agent."*
   **When the customer needs the CSV, give the resolved full path — not "the same folder"** (see
   `start-here.md` Hard rule "Resolve bundled-file paths"): it's `../nto-voice-test-suite.csv`
   relative to this file, resolved to an absolute path.

4. **Narrate Core Testing concepts (main context).**
   - **Manual Preview Testing** — Preview is where you go deep on one conversation (Trace tab,
     Summary, Variables, reproduce-and-diagnose). For the *mechanics* of holding the WISMO
     conversation, the guide points back to Build's Quick Test — say so and point there; don't
     re-invent the click-path.
   - **Test the Voice Experience** — the listen-for checklist (natural opening ask, digit read-back
     pacing, short order-status result, the no-order-number branch). This is narration of what to
     listen for.
   - Gate between sections.

5. **Walk "Create and Run the Batch Test" — the one verbatim UI procedure (helper).** This is the
   read-moment span. First surface the **"Before you run"** prerequisite the guide states verbatim
   (the NTO Customer Service data library must be populated — FAQ cases fail without it) and the
   **"update the sample order and phone numbers to match your org"** note. Then extract the
   procedure inline:

   - `Grep ../04-test.md` for the **Create and Run the Batch Test** heading (`-n`,
     `output_mode: "content"`) to get its line, and the next `## `/`### ` heading after it for the
     span end. `Read` that span (`offset` = the heading line, `limit` = span length) — steps 1–7:
     Tests → New Suite → Details (incl. Test Scope = Turn-Level) → Conditions → Data upload → Scorers →
     Save/Run. Scrub `<!-- ... -->` comments, then present verbatim.

   **Mode fork — build-along vs. narrate-only.** Check the org-capability determination
   (`build-along` or `narrate-only`) recorded in the session index under
   `## Org-capability determination`. **Build-along** walks the batch procedure's sub-steps verbatim,
   below. **Narrate-only** (following without an org today) leads with the **read-only grain**
   (`subagents/extract-ui-steps.md` § "The read-only grain"): the batch procedure is a flat numbered
   list under one `###` heading, so there's no `###` sub-task list to show — present its purpose
   (the surrounding narration already covers *what* the batch test does). Then honor the run's
   granularity preference (`detailPref`, `subagents/extract-ui-steps.md` § "The read-only grain"
   point 3): if the customer already chose **full** earlier in the walk, drop to the verbatim span
   without asking; if they chose **summary**, don't drop and don't re-offer; only if the preference
   is still unset (this is their first narrate-only UI span) do you offer the full click-by-click
   once ("Want the click-by-click on each step, or is this level of detail right?"). Do NOT re-offer
   if it's already set (A7). The rest of Test is conceptual narration and reads the same in both modes.

   Present the sub-steps verbatim, in customer-chosen batches, gating between batches;
   switch the locator to `**Test · Step <i> of <7>: …**` for this span. If the span doesn't spell
   out a click, downgrade to pointing ("see `../04-test.md` directly") — never invent a click. Then
   narrate reviewing the run (Run History, Download results) and **interpret the
   results before acting** — trust the routing/quality signals; treat Actions Evaluation failures
   as a prompt to verify in preview, not proof of a defect (a read-moment for the scorer
   specifics).

6. **Point to the Test Results Analyzer skill (a run-it-later skill — no end-of-guide tail).** The
   guide presents `test-results-analyzer` here. Say what it does: paste your Testing Center export, it
   groups failures by pattern, separates real issues from noise (like uncaptured actions), and
   writes specific fixes. Frame it as a **next step for after you've built and run your own tests**:
   *"Once you've run tests against your own agent, come back to this skill and paste your results in
   for analysis."* **Be honest** that it's useless to a narration-only customer right now — there's
   nothing to feed it yet — and note there is **no** end-of-guide "adapt it now" step for this one
   (unlike the other skills): its only input is real test results, so it belongs here, in-phase. (And:
   pasting an export into chat is still Base — the concierge never reaches into the org; MCP
   org-connection is what Extended adds.)

7. **Narrate Iteration & Refinement (main context).** Track Performance (Run History,
   compare-and-retest), the optional Knowledge-change loop (narrate it as optional — the customer
   can try it or skip it), and the voice-specific failure patterns to watch in production. Point to
   the Notes ("A Note on Escalation Tests," "A Note on Verifying Actions") for the customer to read
   in the file rather than reproducing their detail from memory.

## Return to the orchestrator

Test walks one small UI procedure, so `walked`/`skipped` cover the batch-test steps only.

```
{
  phase:         "test",
  status:        "complete",   // "blocked" only if the batch procedure detail came back found:false wholesale
  summary:       "Narrated NTO testing (objectives, voice scenarios, preview, batch); walked the batch-test procedure; pointed to test-suite-generator + test-results-analyzer",
  walked:        [ ... ],      // batch-test steps presented verbatim (if the customer walked them)
  skipped:       [ ... ],      // batch-test steps the customer jumped past
  nextPhase:     "deploy",
  needsFromUser: anyUnresolved ? "content gaps in 04-test.md: " + unresolved : null
}
```

(No `artifacts` field — the walk writes no content artifact. Of Test's two skills, only
`test-suite-generator` has an end-of-guide adaptation tail; `test-results-analyzer` has none — it's
presented in-phase (Step 6) as a run-it-after-you've-tested skill, since its only input is real test
results. See orchestrator-endgame.md.)
