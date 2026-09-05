# Tips for Running the Agentforce Voice Guide

This is a companion to [Build a Voice Agent with Agentforce](./voice-intro.md). It explains how to make the guided walkthrough smoother: how to pause and pick back up, how to keep it fast, and how to use the packaged skills to build for your own use case.

## Pick up where you left off

You do not have to finish the walkthrough in one sitting.

- **It saves your place as it goes.** The walkthrough keeps a small progress file at `interactive-voice-guide/artifacts/session-index.md`. It records which phase you are on and what you have covered.
- **Stopping and continuing.** To stop, just leave. To continue, reopen the same package folder in your agentic host and start the walkthrough again (type `/start-guide` in Claude Code, or send the same prompt in another host). It reads the progress file, tells you where you left off, and offers to resume at the right phase.
- **A new session is fine.** You can resume in a different session on the same machine. The progress file lives on disk, not in the chat, so a fresh session picks it up.
- **Your own work is saved separately.** If you run the optional "build for your own use case" step, the plans and notes it produces are saved under `interactive-voice-guide/my-notes/`, kept apart from the walkthrough's progress file.
- **Everything stays local.** Nothing is sent anywhere. Saving your place is a normal file edit, so your host may ask you to approve it. Allow it. In Claude Code you can choose "don't ask again," or start in accept-edits mode, so saving does not interrupt you.

## Performance tips

- **The first response is the slowest.** When you start, the guide loads into context before the concierge can respond, so the first turn takes a moment. Later turns, and resumed sessions, are quicker.
- **Match the model to the task.** The conceptual, back-and-forth parts of the walkthrough (orientation, the routing questions, and narration) run fine on a faster, cost-efficient model tier. Reserve the most capable model available to you for the **Build** phase and for generating skill output, where quality matters most. If your assistant offers a faster response mode, turning it on for the conversational parts keeps them snappy.
- **Set your own pace.** During the hands-on steps you control how much you get at once. Ask for "one step at a time," "a few at a time," or "the whole step," whatever is easiest to follow.
- **Two different runtimes.** The model you pick here runs *the guide*. Your live voice agent runs on **Agentforce (Salesforce)**. The model behind live voice turns is Salesforce's, not one you choose here.

## Use the skills for your own use case

The package includes five AI-assistant skills in the `skills/` folder. During the NTO walkthrough you follow along with pre-built output, so you do not need to run the skills to complete the guide. Their real value comes after: they build the same kinds of artifacts for **your own** voice agent.

To use one, paste its prompt into your AI assistant. The skills produce plans, notes, and files that you then paste into the Salesforce UI (Agentforce Builder, Testing Center, and the pronunciation dictionary). They do not change your org for you.

The walkthrough ends with an optional step that walks you into the adaptation skills for your own use case. You can also run any skill on its own, at any time.

- **Ideate Planner.** Walks the ideation frameworks (use case, jobs to be done, versioned scope, business value, data readiness, escalation triggers, and a guardrail matrix). It narrates how NTO answered each one, then offers an exercise to turn the same frameworks into a plan for your own use case.
- **Voice Instruction Scaffolder.** Teaches the voice-writing principles behind NTO's subagent instructions (General FAQ, Order Inquiries, and Escalation), then offers an exercise to adapt them to your own agent's subagents.
- **Pronunciation Dictionary Builder.** You give it your brand names, product names, and industry terms, plus a little context. It returns a ready-to-use pronunciation table (CMU for English, IPA for other languages) that you add to the Salesforce pronunciation dictionary one row at a time. You do not need to know phonetic notation. This one is aimed straight at your own use case from the start.
- **Test Suite Generator.** Describe your agent and its subagents, and it generates a batch test suite as a CSV, formatted to import directly into Agentforce Testing Center. Also aimed at your own use case from the start.
- **Test Results Analyzer.** After you run a test suite, paste your Testing Center export and it identifies root causes and suggests specific fixes. It applies a built-in lens for which scorers to trust. For example, batch runs often fail to capture an action even when it ran correctly, so it tells you to verify those in the interactive preview rather than treating them as defects.

Two of the skills narrate NTO first and then offer an adapt step (Ideate Planner and Voice Instruction Scaffolder). Two are built for your own use case from the start (Pronunciation Dictionary Builder and Test Suite Generator). The last one, Test Results Analyzer, runs after you have real test results to analyze.

---

Back to [Build a Voice Agent with Agentforce](./voice-intro.md).
