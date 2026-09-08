# Agentforce Voice Implementation Guide

> **Preview.** This is an early release of the implementation guide in a new, interactive format. The
> lifecycle content is complete and the walkthrough runs end to end; we'll keep refining the
> experience. **"Preview" describes this guide, not Agentforce Voice** — it says nothing about the
> product's release status.

This is a self-contained copy of the Agentforce Voice Implementation Guide. You can read it as plain
Markdown, or walk through it interactively with an AI assistant that narrates each section and walks
you through the setup one step at a time. A full guided walkthrough takes roughly **30–45 minutes**
(longer if you build along in an org).

The guide covers the full agent development lifecycle — **Get Started → Ideate → Build → Test →
Deploy → Monitor** — using a real-world retail example: Northern Trail Outfitters (NTO) and its
voice-enabled agent, **Pippin**.

## Two ways to use this guide

- **Read it directly.** Open the section files (`01-get-started.md` through `06-monitor.md`) and read
  them like any document. They stand on their own.
- **Run it as a guided walkthrough.** In an agentic host, a concierge reads the guide with you and,
  for the hands-on phases, walks the setup clicks one at a time. It's built to **never invent** a
  click, a field name, or a value — if something isn't in the guide, it says so and points you to the
  source rather than making it up.

## Before you start

- **You need an agentic host for the guided walkthrough.** Run it in a host with a filesystem and
  subagent support — **Claude Code**, Codex, Cursor, Agentforce Vibes, or similar. A bare chat window
  won't work. (You can still read the Markdown directly anywhere.)
- **Bring an org licensed for Agentforce Voice to build along.** To perform the steps in a real
  org, you need an org with the **Agentforce Voice licenses your org needs**, plus the
  **permissions you need to build** the agent. The walkthrough assumes you have such an org — it
  doesn't provision licenses or assign permissions for you. You can also follow along without an org
  (see *Choose Your Mode* below).

## Get started (2 steps)

1. **Open this folder at its root** in your agentic host. (The walkthrough reads files at the root —
   `03-build.md`, the `skills/` folder, and the NTO assets — so the root must be your working
   directory.)
2. **Start the walkthrough.** In **Claude Code**, type **`/start-guide`**. In another host, send:

   > *"Follow the instructions in `interactive-voice-guide/start-here.md` and act as the concierge
   > orchestrator. I'm the customer."*

   The concierge introduces itself, confirms whether you'll build along in an org, and walks you
   through the guide phase by phase. Answer its questions, ask your own, and say "next" to move through
   steps. You don't have to do all six phases in one sitting — it remembers where you left off.

   > **Expect a save-your-place edit.** To remember where you left off, the walkthrough keeps a small
   > progress file (`interactive-voice-guide/artifacts/session-index.md`). Saving it is a normal file
   > edit, so your host may ask you to approve it — that's expected; allow it. In **Claude Code**, you
   > can choose "Yes, and don't ask again" the first time, or start with `/start-guide` already in
   > accept-edits mode, so the guide can save your progress without interrupting you. This file lives
   > only on your machine — nothing is sent anywhere.

## Pick up where you left off

You don't have to finish in one sitting. To stop, just leave. To continue, reopen this folder in your
agentic host and start the walkthrough again (`/start-guide` in Claude Code, or the prompt above). It
reads the progress file it saved (see the note above), tells you where you left off, and offers to
resume at the right phase. A fresh session on the same machine works too, because the progress file
lives on disk, not in the chat. If you run the optional "build for your own use case" step, its plans
and notes are saved separately under `interactive-voice-guide/my-notes/`.

## Choose Your Mode: Follow Along or Build Along

The only difference between the two modes is whether you perform the setup steps in a real org. Either
way, the walkthrough is interactive. You drive.

**1. Follow along (no org needed).** Walk through all six phases in conversation. The concierge reads
each step and explains it; you don't perform the clicks anywhere. This mode stands on its own.

**2. Build along (in an org licensed for Agentforce Voice).** The same walkthrough, but you perform each step in your
own org as the concierge walks you through it. Two things to know:

- **Bring your own org, licensed for Agentforce Voice.** It needs the Agentforce Voice licenses your org requires in
  place, plus the permissions you need to build. The walkthrough assumes you have one and does not
  set one up for you.
- **Ground the agent with the knowledge article.** The Build phase creates a data library that grounds
  Pippin's FAQ answers on NTO's customer-service knowledge. The article ships with this guide as
  **`nto-customer-service-knowledge.pdf`** (at the root) — upload it when the walkthrough reaches
  "Ground the Agent with Data."

## Performance and model notes

- **The first response takes a moment.** When you start, the guide loads into context before the
  concierge can respond, so the first turn is the slowest — later turns, and resumed sessions, are
  quicker.
- **Set your own pace.** During the hands-on steps you control how much you get at once. Ask for "one
  step at a time," "a few at a time," or "the whole step," whatever is easiest to follow.
- **Match the model to the task.** The conceptual, back-and-forth parts of the walkthrough
  (orientation and the routing questions) don't need the most powerful model. A faster, cost-efficient
  tier keeps them snappy, and if your AI assistant offers a faster response mode, turning it on for
  these parts helps. Reserve the most capable model available to you for the **Build** and
  skill-generation steps, where output quality matters most.
- **This guide is designed to be tool-agnostic.** It doesn't depend on any specific tool or model:
  skill output targets the Salesforce UI (you paste it into Agentforce Builder, Testing Center, and
  the pronunciation dictionary), so it works regardless of which assistant you use, and any agentic
  host with a filesystem and subagents can run the walkthrough. Results may vary across tools — iterate
  if a first output needs refinement.
- **Tested in Claude Code.** In the interest of transparency: the guided walkthrough was developed and
  tested in **Claude Code**, which is why `/start-guide` is shown for it. We haven't tested it in other
  agentic hosts. They should work through the prompt above, but exact behavior may vary — if something
  looks off in another host, the plain-Markdown reading path always works.
- **Two different runtimes.** The model you choose here runs *the guide*. Your live voice agent runs on
  **Agentforce (Salesforce)** — the model behind live voice turns is Salesforce's, not one you pick
  here.

## What's in this package

- **`01-get-started.md` – `06-monitor.md`** — the guide, one file per lifecycle stage.
- **`skills/`** — five AI-assistant skills for building your **own** voice agent. The NTO
  walkthrough ships with pre-built versions of what these produce (agent instructions, a
  pronunciation dictionary, a test suite), so you follow along without generating anything. The
  skills are how you create those artifacts for **your own use case**: Ideate planning,
  voice-instruction scaffolding, pronunciation-dictionary entries, test-suite generation, and
  analyzing your own test results once you've run them. The guide points to each at the right stage,
  and the walkthrough ends with an optional step to run them on your own use case.
- **`interactive-voice-guide/`** — the concierge that powers the guided walkthrough.
- **`nto-customer-service-knowledge.pdf`** — NTO's customer-service knowledge article, uploaded to the
  agent's data library in Build.
- **`nto-voice-test-suite.csv`** — a pre-built set of voice test cases, uploaded in Testing Center
  during Test.
- **`troubleshooting.md`** — common snags you hit while building along, keyed by what you see on
  screen, each pointing to the fix.

## Use the skills for your own use case

During the NTO walkthrough you follow along with pre-built output, so you don't need to run the skills
to complete the guide. Their real value comes after: they build the same kinds of artifacts for **your
own** voice agent. To use one, paste its prompt into your AI assistant. The skills produce plans,
notes, and files that you then paste into the Salesforce UI (Agentforce Builder, Testing Center, and
the pronunciation dictionary); they don't change your org for you. The walkthrough ends with an
optional step that walks you into the adaptation skills, and you can also run any skill on its own at
any time.

- **Ideate Planner** — walks the ideation frameworks (use case, jobs to be done, versioned scope,
  business value, data readiness, escalation triggers, and a guardrail matrix), showing how NTO
  answered each, then offers an exercise to turn the same frameworks into a plan for your own use case.
- **Voice Instruction Scaffolder** — teaches the voice-writing principles behind NTO's subagent
  instructions (General FAQ, Order Inquiries, Escalation), then offers an exercise to adapt them to
  your own agent's subagents.
- **Pronunciation Dictionary Builder** — give it your brand names, product names, and industry terms
  plus a little context, and it returns a ready-to-use pronunciation table (CMU for English, IPA for
  other languages) that you add to the Salesforce pronunciation dictionary one row at a time. No
  phonetic-notation knowledge needed. Built for your own use case from the start.
- **Test Suite Generator** — describe your agent and its subagents, and it generates a batch test
  suite as a CSV, formatted to import directly into Agentforce Testing Center. Built for your own use
  case from the start.
- **Test Results Analyzer** — after you run a test suite, paste your Testing Center export and it
  identifies root causes and suggests specific fixes, applying a built-in lens for which scorers to
  trust (for example, batch runs often fail to capture an action even when it ran correctly, so verify
  those in the interactive preview rather than treating them as defects).

Two of these narrate NTO first and then offer an adapt step (Ideate Planner, Voice Instruction
Scaffolder); two are built for your own use case from the start (Pronunciation Dictionary Builder,
Test Suite Generator); and Test Results Analyzer runs once you have real test results to analyze.
