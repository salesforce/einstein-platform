<!-- ORCHESTRATOR ENDGAME — the End-of-guide adaptation phase, split out of start-here.md so it
     isn't resident during the walk (it fires ONCE, only when the customer is done). The orchestrator
     READS this file at that moment and runs the block below. Everything the walk needs mid-flight —
     routing, the dispatch loop, stop-here/pause, pull-forward, and record() — stays in
     start-here.md. This file is NOT loaded until the endgame is reached. -->

# Orchestrator endgame — End-of-guide adaptation phase

Read this file only when `start-here` sends you here — i.e. when the customer is **done** (the last
phase in `chosen` completed, or a WRAPPING-UP/ABANDONING "stop here," or a confirmed pull-forward).
`NAMES`, `PHASES`, `ran`, and the Hard Rules are already in context from `start-here`.

## End-of-guide adaptation phase

Runs only when the customer is **done** — never on a pause, never interleaved per phase. Because
no NTO path is left to resume, there's no mode-bleed: a clean, announced step OFF the guide.

Not every phase has an adaptation tail — only the phases whose skill supports "try it on your own."
The phases with a tail, and the skill file each tail's block lives in, are:

- **Ideate** → `../skills/ideate-planner.md`
- **Build** → `../skills/voice-instruction-scaffolder.md` **and** `../skills/pronunciation-dictionary-builder.md`
- **Test** → `../skills/test-suite-generator.md`

Get Started, Deploy, and Monitor have no skill and no tail. **`test-results-analyzer` has no
adaptation tail on purpose:** its only input is a real Testing Center export, which doesn't exist at
plan-time — so it's a Test-*phase*, run-it-after-you've-tested skill (see `test.md` / `../04-test.md`),
not an end-of-guide "build for your own use case" step. Don't offer it here.

```
adaptable = phases in `ran` whose skill has an adaptation block (ideate, build, test)
if adaptable is non-empty:
   ask: "The NTO walkthrough is done. Want to build for your OWN use case?
          This steps off the guide — it produces plans/notes you keep, and it does NOT touch NTO's
          plan or your Salesforce org. (yes / no)"
   if yes:
      ensure NAMES.notesDir exists                    # namespaced: customer's own outputs
      for phase in adaptable (in lifecycle order):
         READ that phase's skill file(s) by their `../skills/<name>.md` path (listed above), then run
         the skill's SEPARATE "adapt to your own use case" fenced block STRAIGHT FROM THE FILE.
         # main context, interactive.
         # LOAD FROM FILE — do NOT reproduce the block from memory: at the
         #   endgame the skills are named, not path-referenced, so the orchestrator improvised
         #   test-suite-generator instead of reading it — a fidelity drift. Read the actual
         #   `../skills/<name>.md` so the block is literal. Paths: ideate → ideate-planner; build →
         #   voice-instruction-scaffolder + pronunciation-dictionary-builder; test → test-suite-generator.
         # TAIL SHAPE VARIES: ideate-planner and voice-instruction-scaffolder have a DISTINCT "adapt to
         #   your own use case" Q&A block to run; pronunciation-dictionary-builder and test-suite-generator
         #   have NONE — their top-level `## Prompt` already IS the own-use-case path, so "run the tail"
         #   for those two = present/point at that existing prompt, not a new question sequence.
         # SAY "your own use case" — NEVER "your own org." Guided Base has no MCP: this produces
         #   plans/notes, it does not change an org.
         # NO-INVENT: fill ONLY what the customer states; every uncovered field gets a
         #   "> Decide this: <thing>" placeholder — never fabricate a business fact.
         # The IDEATE adaptation block produces a FULL structured plan (same section
         #   shape as NTO's plan), written to NAMES.plan — NOT thin notes. Other phases' tails write
         #   "<phase>-adaptation-notes.md" (or the skill's named keepsake) under NAMES.notesDir.
```

Framing rules for the adaptation phase:
- **Announced boundary:** make clear the customer is stepping off the guide.
- **"Your own use case," never "your own org."** Don't imply an org connection.
- **Full plan, not just notes.** The Ideate adaptation produces a structured
  `my-project-plan.md` mirroring NTO's plan sections — a keepsake the customer can act on.
- **No-invent / placeholders:** fill only what the customer said; unanswered fields
  become explicit `> Decide this:` prompts. A worksheet of honest placeholders beats a fabricated
  plan.
- **Namespaced output:** customer outputs go to `./my-notes/`; NTO artifacts (none in Base) never
  mix in.

## Return to start-here

When the adaptation phase finishes (or is declined), return to `start-here` § Finish — print the
index summary and where the re-entry index lives (and `./my-notes/` if adaptation ran), then close
warmly (no feedback invitation — see `start-here` § Feedback).
