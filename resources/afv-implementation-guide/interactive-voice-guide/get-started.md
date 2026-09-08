<!-- GET STARTED SUBSKILL — the first phase. Mostly conceptual (what Agentforce Voice is, the
     five-stage lifecycle, the NTO/Pippin example, product-name disambiguation) + ONE verbatim
     config chunk ("Enable Required Features": Einstein → Agentforce → Data 360) extracted inline
     via a targeted Read. Also carries a load-bearing job unique to this phase: the org-licensing
     check that determines whether the customer can BUILD ALONG or only be NARRATED for the
     org-dependent steps later. No skill, no adaptation tail. Extraction mechanism + rationale:
     subagents/extract-ui-steps.md § "The inline path". -->

# get-started — Get Started Subskill

Dispatched by `start-here`. This narrates `../01-get-started.md` — what Agentforce Voice is, the
five-stage lifecycle, the NTO/Pippin example, the org-licensing prerequisite, and enabling the
required org features. It has **no skill wrapper** and produces **no artifact**. It's
the **first phase** of a full walk.

## Why Get Started is a PARTIAL-helper phase

Most of Get Started is conceptual orientation — fine to narrate in main context. It
has **one verbatim config procedure** ("Enable Required Features": Einstein Generative AI →
Agentforce → Data 360) that's a real do-this-in-Setup chunk → the extract-subagent read-moment
span. The split:

- **Interactive (you, main context):** narrate what Agentforce Voice / a voice-enabled agent is,
  the five-stage lifecycle, the NTO example, and the product-name disambiguation table's *ideas*.
- **Extraction, inline (you, main context):** the "Enable Required Features" steps verbatim, and
  any **specific fact** the customer drills into — a license name (Agentforce Voice Add-on), a
  permission name (AgentforceVoiceAllow), an edition — come from `../01-get-started.md` via a
  targeted `Read`, no dispatch. Read-moments: `Read` the relevant span and present verbatim, never
  from memory. Reserve the isolated subagent (`subagents/extract-ui-steps.md`) for a section whose
  headings don't parse cleanly.

## The org-capability check — load-bearing, CANONICAL HOME for the determination

Get Started is where the guide establishes that the walk needs an **org licensed for Agentforce Voice** (the
required Agentforce Voice licenses and build permissions in place). The distinction that matters for routing:
**building and configuring an agent works in most orgs, but the live voice experience (spoken
back-and-forth / TTS) needs an org licensed for Agentforce Voice.** This check does real routing work for the rest
of the walk. (State the requirement positively — never name "Developer Edition" to the customer;
see `start-here.md` Hard rule.)

**This section is the single source of the build-along-vs-narrate-only logic.** When a route skips
Get Started (a (B) Jump or (C) Stuck landing on Build/Test/Deploy/Monitor), the orchestrator runs
this same check up front — see `start-here.md` § "Org-capability gate." Keep the yes/no logic here
only; the gate points at it rather than restating it.

The check: 

- Ask the customer (once, plainly) about **intent, not possession**: *"Will you build along in a
  org licensed for Agentforce Voice today, or follow the walkthrough without one?"* Asking whether they *have* an
  org misroutes — a customer can truthfully have one yet not intend to open it today, and then the
  build-along steps assume an app that isn't in front of them (a failure mode testers hit). Intent is what
  routes correctly.
- **If building along today → build-along is available** for the org-dependent steps in Build, Test,
  Deploy, Monitor. Tell them they can follow along in their org.
- **If following without an org today (or not sure) → narrate-only.** Say clearly: you'll walk them
  through everything and they'll see exactly what to do, but the live voice steps (spoken
  back-and-forth in Deploy, the voice experience in Test) need an org licensed for Agentforce Voice they can come
  back to. Do **not** block the walk — narration works for everyone; only the *doing* of
  voice-runtime steps needs the org.
- Carry this fact forward: later phases check "build-along or narrate-only?" rather than
  re-asking. (This is orientation the customer stated, not a product fact — safe to remember.)

The guide now nails down the org-licensing specifics — surface them when asked, especially for a
reader who **is** the admin (whom "ask your AE" doesn't help). Read `../01-get-started.md` § "Confirm
You Have an Org Licensed for Agentforce Voice" and relay what's there: **(1) org licenses** — the Agentforce Voice
licenses the org needs, where **AgentforceVoiceAllow comes with the org's voice licensing (it's not an
admin toggle the reader flips)**; full editions/licensing detail is in Ideate § Licensing and
Provisioning. **(2) build permissions** — *Manage Agentforce Service Agents* and *Manage AI Agents*,
or *Customize Application* (plus *Manage Agentforce Grids* and *Manage Agentforce Testing* for Testing
Center in the Test phase). If the reader is the admin, that's the checklist to act on; if licenses are
missing, the account executive is the right pointer. Read-moment discipline still applies — relay
these from a `Read` of the source, not memory — and still don't invent anything the guide genuinely
doesn't state.

## Notes guardrail — comment types this file's source carries

Framing / no-invent / Help-link rules follow `start-here`'s **Hard rules** — don't restate them.
`../01-get-started.md` carries `<!-- VERIFY -->`, `<!-- ORG -->`, and `<!-- TERMINOLOGY -->`
comments — drop every `<!-- ... -->`. **Terminology note the customer SHOULD hear** (this is
guide-visible prose, not a comment): the house term is **Data 360**, but the Setup UI still
literally reads "Data Cloud" / "Data Cloud Setup Home" — so when you narrate the enable steps, use
the real UI labels the file uses for the clicks (a read-moment) while calling the capability Data 360.

## Steps

1. **Frame the phase (main context).** This guide walks the five-stage lifecycle — Ideate, Build,
   Test, Deploy, Monitor — to build a voice-enabled agent on Enhanced Chat v2, using NTO/Pippin as
   the running example. Open with three orienting facts up front, so the customer isn't left holding
   confusion (all three surfaced by testers):
   - **Who this is for:** builders and admins new to Agentforce Contact Center — no prior Agentforce
     knowledge assumed. If they ask "do I need to know Agentforce first?", the answer is no; the
     guide defines terms as it goes.
   - **The names, up front:** several product names describe overlapping things (Service Cloud Voice,
     Salesforce Voice, Agentforce Contact Center, Agentforce Voice). Say plainly that **this guide
     builds an Agentforce Voice-enabled agent on Enhanced Chat v2**, and give the one-line
     distinction now rather than making them wait — the full table is still a read-moment in Step 3
     if they want it.
   - **Enhanced Chat v2 is still voice:** the channel is Enhanced Chat v2 (fastest path, no phone
     number), but the agent is fully voice-enabled — the spoken back-and-forth runs *on* that
     channel. Telephony/PSTN is out of scope, with a pointer to the Help article the guide links.

2. **Do the org-capability check (main context).** Run § The org-capability check above. This
   comes early because it sets narrate-only vs. build-along for the whole session.

3. **Narrate the concepts (main context).** Walk, in document order, with locators + gating: *What
   Is Agentforce Voice?* (the ASR → intent → TTS pipeline), *What Is a Voice-Enabled Agent?*, *The
   Agent Development Lifecycle* (the five stages), *A Real-World Example* (NTO/Pippin), and *A Note
   on Product Names* (the Service Cloud Voice / Salesforce Voice / ACC / Agentforce Voice
   disambiguation — narrate the distinctions in the guide's terms; if the customer wants the exact
   table wording, that's a read-moment). Locator: `**Get Started · Section <i> of <N>: <Title>**`.

4. **Walk "Enable Required Features" — the verbatim config chunk (helper).** This is the
   read-moment span. Frame why (turn on Einstein, Agentforce, and Data 360 now so the org is ready
   for Build; Data 360 provisioning can take 15–60 min, so enabling early matters). Then extract the
   procedure inline:

   - `Grep ../01-get-started.md` for `## Enable Required Features` (`-n`,
     `output_mode: "content"`) to get its line, and the next `## ` heading after it for the span
     end. `Read` that span (`offset` = the heading line, `limit` = span length) — it covers the
     three sub-procedures *Enable Einstein Generative AI*, *Enable Agentforce*, and *Verify Data 360
     in Your Org*, including the Setup Quick Find search terms, the exact UI labels (*Einstein
     Setup* / *Agentforce Agents* / *Data Cloud Setup Home*), and the toggle/click text. Scrub
     `<!-- ... -->` comments, then present.

   Present the sub-steps verbatim, in customer-chosen batches, gating between
   batches; use a `**Get Started · Step <i> of <N>: …**`-style locator for this span. Preserve the
   guide's callouts verbatim (enable Data 360 early / 15–60 min provisioning; "in a pre-configured
   org these may already be enabled — confirm all three"). If the span doesn't spell out a click,
   downgrade to pointing ("see `../01-get-started.md` directly") — never invent a click. If the
   customer is
   narrate-only (no org), still narrate the steps so they know what's ahead, framed as "here's what
   you'll do when you have your org."

5. **Hand off to the next phase.** Get Started sets up the org; the actual agent build starts in
   Build (or Ideate, if walking in order from the beginning). `nextPhase = ideate` (the orchestrator
   sequences from here).

## Return to the orchestrator

Get Started walks one config procedure, so `walked`/`skipped` cover those steps only.

```
{
  phase:         "get-started",
  status:        "complete",   // "blocked" only if the Enable-Required-Features detail came back found:false wholesale
  summary:       "Narrated Get Started (what AF Voice is, lifecycle, NTO/Pippin, org prerequisite); confirmed <build-along|narrate-only>; walked Enable Required Features (Einstein, Agentforce, Data 360)",
  walked:        [ ... ],      // enable-features steps presented verbatim (if walked)
  skipped:       [ ... ],
  nextPhase:     "ideate",
  needsFromUser: anyUnresolved ? "content gaps in 01-get-started.md: " + unresolved : null
}
```

(No `artifacts` field — the walk writes no content artifact. Get Started has no
adaptation tail — it wraps no skill. The build-along-vs-narrate-only determination should be noted
in the index so later phases don't re-ask.)
