<!-- MONITOR SUBSKILL — mixed phase, the mirror image of Test. ONE verbatim setup procedure
     (Step 2: turn on observability today) extracted inline via a targeted Read; Steps 1/3/4/5 are
     narrate-what-you'll-see-then-link, because a day-one agent has no data to populate the
     dashboards (the guide itself says make the first pass a read-through). Monitor is the last
     phase — nextPhase = null, no skill, no adaptation tail. Extraction mechanism + rationale:
     subagents/extract-ui-steps.md § "The inline path". -->

# monitor — Monitor Subskill

Dispatched by `start-here`. This narrates `../06-monitor.md` — how NTO monitors Pippin once it's
live: the Agentforce Observability suite, turning on analytics and session tracing, reviewing
performance, understanding Sessions & Intents, and building a monitoring strategy. It has **no
skill wrapper** and produces **no artifact**. It is the **last phase** of the walk.

## Why Monitor is a PARTIAL-helper phase (the mirror of Test)

Most of Monitor describes views the customer **can't populate yet** — on a just-launched agent the
dashboards, sessions, and intents are empty, and the guide explicitly says to make the first pass a
*read-through* and come back once Pippin has real calls. That content is **narrate-what-you'll-see
+ link the Salesforce Help article** (the guide-wide narrate+link policy), not a click-walk.

**The one exception is Step 2** — "Set Up Analytics and Session Tracing" — which the guide says to
do *today* regardless of call volume (session tracing isn't retroactive). That's a real verbatim
setup procedure → the extract-subagent read-moment span.

So the split is:

- **Interactive (you, main context):** narrate the observability suite (Step 1), what each
  dashboard/view shows and what to look for (Steps 3, 4), and the monitoring strategy/cadence (Step
  5) — idea-level, fine in main context. Surface the guide's Help links so the
  customer can see each populated view.
- **Extraction, inline (you, main context):** Step 2's verbatim setup steps and any **specific
  verifiable fact** — a permission-set name, a package version like *1.130*, an exact toggle label,
  the edition requirements for scorers — come from `../06-monitor.md` via a targeted `Read`, no
  dispatch. Those are read-moments: `Read` the relevant span and present verbatim, never from
  memory. Reserve the isolated subagent (`subagents/extract-ui-steps.md`) for a section whose
  headings don't parse cleanly. (Monitor has just one embedded setup procedure, so this is a single
  targeted read.)

## Notes guardrail — comment types this file's source carries

Framing / no-invent / Help-link rules follow `start-here`'s **Hard rules** — don't restate them.
`../06-monitor.md` opens with a `<!-- SKELETON ... -->` authoring comment and carries many
`<!-- VERIFIED ... -->` notes — drop every `<!-- ... -->`, never quoted or paraphrased. Note that
Monitor's narrate+link design *depends* on surfacing the guide's Help links (Agent Analytics
dashboards, Agent Optimization / voice session trace, live-call monitoring) — but only the ones
that exist in the source.

## Steps

1. **Frame the phase + set the data-reality expectation up front (main context).** Monitor is where
   you confirm Pippin is delivering on the Ideate goals (deflect FAQs, resolve WISMO, escalate
   cleanly) and catch problems early. **Say the guide's own caveat immediately:** because Pippin
   just launched, most dashboards and session views will be sparse or empty — so the useful day-one
   work is Step 2 (turn tracing on) plus listening to individual calls, and Intent Monitoring /
   Root-Cause Analysis are "come back later" activities. This sets honest expectations before you
   narrate views the customer can't populate.

2. **Narrate Step 1 — the Observability suite (main context) + link.** Explain the three parts in
   the guide's framing: **Agent Analytics** (the overall picture / *is Pippin working?*), **Agent
   Optimization — Sessions & Intents** (the specific problems / *where to improve?*, and where you
   listen to voice recordings), and **Scorers** (your own quality criteria; note the edition
   requirement as a read-moment if the customer asks specifics). Surface the guide's link to *Get
   Insights with Agent Analytics Dashboards* so they can preview a populated dashboard. Locator:
   `**Monitor · Section 1 of 5: The Observability Suite**`. Gate.

3. **Walk Step 2 — the one do-it-today setup procedure (helper).** This is the read-moment span.
   First surface the **permissions prerequisite** the guide states (Data Cloud permissions aren't
   assigned by default even for a System Administrator — one of the two combinations) as a
   read-moment, then extract Step 2 inline:

   - `Grep ../06-monitor.md` for `## Step 2: Set Up Analytics and Session Tracing` (`-n`,
     `output_mode: "content"`) to get its line, and the next `## ` heading after it for the span
     end. `Read` that span (`offset` = the heading line, `limit` = span length) — it covers the
     permissions to confirm, *Install the Standard Data Model* (version number + where to check),
     *Turn on observability in Setup* (the Einstein Audit page and each numbered toggle), and
     installing the *Service Agent Analytics* app (the two-stage wait-then-install), with exact page
     names, toggle labels, and version numbers. Scrub `<!-- ... -->` comments, then present.

   **Mode fork — build-along vs. narrate-only.** Check the org-capability determination
   (`build-along` or `narrate-only`) recorded in the session index under
   `## Org-capability determination`. **Build-along** walks Step 2's sub-steps verbatim, below.
   **Narrate-only** (following without an org today) leads with the **read-only grain**
   (`subagents/extract-ui-steps.md` § "The read-only grain"): present Step 2's authored summary +
   its `###` sub-task list (*Install the Standard Data Model*, *Turn on observability in Setup*).
   Then honor the run's granularity preference (`detailPref`, § "The read-only grain" point 3): if
   the customer already chose **full** earlier in the walk, drop to the verbatim span without asking;
   if **summary**, don't drop and don't re-offer; only if the preference is still unset do you offer
   the full click-by-click once ("Want the click-by-click on each step, or is this level of detail
   right?"). Do NOT re-offer if it's already set (A7). Monitor's other sections (Steps 1, 3, 4, 5)
   are narrate-what-you'll-see + link and read the same in both modes.

   Present the sub-steps verbatim, in customer-chosen batches, gating between
   batches; use a `**Monitor · Step <i> of <N>: …**`-style locator for this span. Preserve the
   guide's load-bearing callouts verbatim (why do this before you have data / tracing isn't
   retroactive; the "app template only appears once prerequisites are met" gate; Analytics vs.
   Optimization configured separately). If the span doesn't spell out a click, downgrade to
   pointing ("see `../06-monitor.md` directly") — never invent a click. Gate.

4. **Narrate Steps 3 & 4 — review performance + Sessions/Intents (main context) + links.** These
   are **read-through** sections: narrate where each view lives (the *Observe & Optimize* group in
   Agentforce Studio — monitoring is *not* inside the agent builder), what the Analytics tabs/lenses
   show (call out the **Voice** lens for a voice agent), how Sessions & Intents works, and —
   emphasize this, it's the biggest voice difference — that a voice session trace has an
   **integrated audio player** so you *listen* to the call, not just read it. Give the guide's
   "what to listen for" checklist. Surface the guide's links (*Analyze Data with Agent
   Optimization* for both the sessions views and the voice session trace). Remind the customer
   these pages are empty until Pippin has calls — a first pass is a read-through. One optional
   read-moment: the intent-pipeline timing numbers (every 3h scheduler, 10-similar-intents cluster
   floor) — pull from the file if the customer drills in, don't recite from memory. Locators + gate.

5. **Narrate Step 5 — the monitoring strategy (main context) + link.** Present the three-stage
   roadmap (Post-Launch now → Intent Monitoring ~30 days → Root-Cause Analysis ~100 clustered
   intents) as a *roadmap, not a week-one checklist* — the guide's own framing. Walk the three
   day-one Post-Launch actions (confirm data is collected, listen to individual calls, watch a live
   call with **Omni Supervisor**) and surface the *Monitor Voice-Enabled Agents* link. Give the
   daily/weekly/monthly cadence. Note the guide's tie-back: reuse the NTO batch test suite from Test
   to validate changes in a sandbox before redeploying. Locator + gate.

6. **Close the walk.** Monitor is the last phase — say the customer has now walked the full
   lifecycle (Ideate → Build → Test → Deploy → Monitor) and Pippin is live and observable. Do NOT
   run any adaptation here; the orchestrator handles the end-of-guide adaptation offer.

## Return to the orchestrator

Monitor walks one setup procedure (Step 2), so `walked`/`skipped` cover those steps only.

```
{
  phase:         "monitor",
  status:        "complete",   // "blocked" only if the Step 2 detail came back found:false wholesale
  summary:       "Narrated NTO monitoring (observability suite, review/sessions/intents, strategy); walked the Step 2 tracing setup; surfaced Help links for the populated views",
  walked:        [ ... ],      // Step 2 setup steps presented verbatim (if the customer walked them)
  skipped:       [ ... ],
  nextPhase:     null,         // Monitor is the last phase
  needsFromUser: anyUnresolved ? "content gaps in 06-monitor.md: " + unresolved : null
}
```

(No `artifacts` field — the walk writes no content artifact. Monitor has no adaptation
tail — it wraps no skill.)
