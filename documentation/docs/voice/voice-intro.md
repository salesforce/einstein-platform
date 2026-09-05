# Build a Voice Agent with Agentforce

This guide is a complete, guided walkthrough for building a voice-enabled Agentforce agent. It covers the full agent development lifecycle, **Get Started → Ideate → Build → Test → Deploy → Monitor**, using a real-world retail example: Northern Trail Outfitters (NTO) and its voice-enabled agent, **Pippin**.

You can read the guide as plain Markdown, or walk through it interactively with an AI assistant that narrates each section and walks you through the setup one step at a time. A full guided walkthrough takes roughly **30 to 45 minutes**, longer if you build along in an org.

:::note Preview

This is an early release of the implementation guide in a new, interactive format. The lifecycle content is complete and the walkthrough runs end to end, and we will keep refining the experience. "Preview" describes this guide, not Agentforce Voice.

:::

## How to use this guide

This guide is built to be run as a **guided walkthrough** in an agentic host. A concierge reads the guide with you and, for the hands-on phases, walks through the setup clicks one at a time. It is built to never invent a click, a field name, or a value. If something is not in the guide, it says so and points you to the source rather than making it up. That is the experience the guide was designed for, and it is where the walkthrough below picks up.

You can also read the section files (`01-get-started.md` through `06-monitor.md`) as plain Markdown if you don't have an agentic host. They stand on their own, but the guide was written for the walkthrough, not for straight reading, so open them in a Markdown-capable viewer such as an IDE, a code editor, or a rendered Markdown view rather than a plain text window.

## Prerequisites

- **An agentic host for the guided walkthrough.** Run it in a host with a filesystem and subagent support, such as Claude Code, Codex, Cursor, or Agentforce Vibes. A bare chat window will not work. (You can still read the Markdown directly anywhere.)
- **An org licensed for Agentforce Voice, if you want to build along (optional).** To perform the steps in a real org, you need an org with the Agentforce Voice licenses your org requires, plus the permissions you need to build the agent. The walkthrough assumes you have such an org. It does not provision licenses or assign permissions for you. You can also follow along without an org (see *Choose your mode* below).

## Get the guide

The guide package is available two ways, and both give you the same files. If you don't use Git, download the package. If you want to pull in later updates easily, clone the repository.

**Option 1:** Download the package on the [GitHub Releases page](https://sfdc.co/voice-implementation-guide) (no Git required). Download the guide `.zip` from the latest release and unzip it.

**Option 2:** Clone the repository (best for getting updates).
```bash
git clone https://github.com/salesforce/einstein-platform.git
cd einstein-platform/resources/afv-implementation-guide
```

Then open the guide package folder at its root in your agentic host. The walkthrough reads files at the package root, including `03-build.md`, the `skills/` folder, and the NTO assets, so the root must be your working directory.

> **Getting updates.** The Release `.zip` is a snapshot from when you downloaded it, so download the latest release again to update. If you cloned the repository, run `git pull` in your copy to pick up later updates.

## Start the walkthrough

In **Claude Code**, type **`/start-guide`**. In another host, send:

> *"Follow the instructions in `interactive-voice-guide/start-here.md` and act as the concierge orchestrator. I'm the customer."*

The concierge introduces itself, confirms whether you will build along in an org, and walks you through the guide phase by phase. Answer its questions, ask your own, and say "next" to move through steps. You do not have to do all six phases in one sitting. It remembers where you left off.

## Choose your mode: follow along or build along

The only difference between the two modes is whether you perform the setup steps in a real org. Either way, the walkthrough is interactive. You drive.

**1. Follow along (no org needed).** Walk through all six phases in conversation. The concierge reads each step and explains it, and you do not perform the clicks anywhere. This mode stands on its own.

**2. Build along (in an org licensed for Agentforce Voice).** The same walkthrough, but you perform each step in your own org as the concierge walks you through it. Two things to know:

- **Bring your own org, licensed for Agentforce Voice.** It needs the Agentforce Voice licenses your org requires, plus the permissions you need to build. The walkthrough assumes you have an org and does not set one up for you.
- **Ground the agent with the knowledge article.** The Build phase creates a data library that grounds Pippin's FAQ answers on NTO's customer-service knowledge. The article ships with the guide as `nto-customer-service-knowledge.pdf` (at the package root). Upload it when the walkthrough reaches "Ground the Agent with Data."

## What's in the package

- **`01-get-started.md` – `06-monitor.md`** — the guide, one file per lifecycle stage.
- **`skills/`** — five AI-assistant skills (instructions your agentic host runs, not Agentforce subagents) for building your **own** voice agent. The NTO walkthrough ships with pre-built versions of what these produce (agent instructions, a pronunciation dictionary, a test suite), so you follow along without generating anything. The skills are how you create those artifacts for your own use case: Ideate planning, voice-instruction scaffolding, pronunciation-dictionary entries, test-suite generation, and analyzing your own test results once you have run them. The guide points to each at the right stage, and the walkthrough ends with an optional step to run them on your own use case.
- **`interactive-voice-guide/`** — the concierge that powers the guided walkthrough.
- **`nto-customer-service-knowledge.pdf`** — NTO's customer-service knowledge article, uploaded to the agent's data library in Build.
- **`nto-voice-test-suite.csv`** — a pre-built set of voice test cases, uploaded in Testing Center during Test.
- **`troubleshooting.md`** — common snags you hit while building along, keyed by what you see on screen, each pointing to the fix.

## Good to know

- **This guide is designed to be tool-agnostic.** It does not depend on any specific tool or model. Skill output targets the Salesforce UI (you paste it into Agentforce Builder, Testing Center, and the pronunciation dictionary), so it works regardless of which assistant you use, and any agentic host with a filesystem and subagents can run the walkthrough. Results may vary across tools, so iterate if a first output needs refinement.
- **Tested in Claude Code.** In the interest of transparency, the guided walkthrough was developed and tested in Claude Code, which is why `/start-guide` is shown for it. We have not tested it in other agentic hosts. They should work through the prompt above, but exact behavior may vary. If something looks off in another host, the plain-Markdown reading path always works.

## More tips for running the guide

For how to pause and pick back up where you left off, performance tips, and how to use the packaged skills to build for your own use case, see [Tips for Running the Agentforce Voice Guide](./voice-tips.md).

## Feedback

This guide is an early release and we're actively refining it. If you have feedback, hit a snag, or want to suggest an improvement, let us know through the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSeafQ0pwmUxIE9Y364zv77xmKAToF_pafHYTKCHfdupY7hK7A/viewform).

## Conclusion

By the end of the walkthrough, you will have taken a voice agent through the full lifecycle: framed the use case, built and grounded the agent, tested it against realistic voice scenarios, deployed it, and set up monitoring. Read the guide straight through for the reference version, or run it as a guided walkthrough to build alongside a concierge that never invents a step. When you are ready to build for your own use case, the packaged skills turn each stage into a repeatable exercise.
