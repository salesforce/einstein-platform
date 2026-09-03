# Test Results Analyzer

Paste this prompt into your AI assistant of choice — Claude, Copilot, Gemini, or any AI assistant with chat or agent mode — to analyze your Agentforce Testing Center results, identify root causes, and get specific fixes you can apply directly in Agentforce Builder.

> **Token usage warning:** The Testing Center export CSV contains full LLM reasoning and raw JSON session data for every row. A 36-row test suite with all scorers enabled can produce a file over 1 MB — significantly larger than a typical document. Pasting the full file into an AI assistant will consume a large number of tokens and may hit context limits. Use this skill with discretion: start with Option A (summary-first) when you have a general picture of the failures. Use Option B (full file) only when you need deep diagnostic detail on a specific run.

> **Not every failure is a real defect — read this first.** Before treating any FAIL as a problem to fix, know which scorers to trust:
> - **Subagent Evaluation** and the response-quality scorers (**Completeness, Coherence, Conciseness**) are reliable — act on these directly.
> - **Actions Evaluation is unreliable.** Batch runs frequently don't capture an action even when it ran correctly, so the Actual Actions column comes back empty and the scorer reports a failure. A blank Actual Actions column is *not* proof the action didn't fire. This happens most with (a) multi-turn, confirmation-gated actions (like an order lookup that reads details back before running) that a single-turn test can't reach, and (b) knowledge answers, which often don't register as a captured action even when the answer is correct. **Verify action execution in the interactive preview, not in batch results.**
> - **Latency** in a Mocked Data run is model response time only — not a prediction of live voice-call speed.
>
> When using the prompts below, tell the AI to apply this same lens: don't propose fixes for Actions Evaluation failures unless the routing was also wrong or you've confirmed the action truly isn't running in preview.

---

## Option A: Summarize first, then troubleshoot (recommended)

Before pasting the full file, open the export in a spreadsheet and note:
- Which scorer columns have the most FAIL results
- Which utterances or subagents appear most often in failing rows
- What the Actual Subagent column shows for rows that expected a different subagent

Then use this prompt:

```
I ran a batch test on my Agentforce voice agent and have the following results summary. Analyze the failure patterns, identify root causes, and give me specific fixes I can apply directly in Agentforce Builder — including updated subagent descriptions, instruction changes, or action configuration adjustments.

Agent name: [your agent name]

Subagent configuration (provide the current description for each subagent):
- [SubagentDeveloperName]: "[current description]"
- [SubagentDeveloperName]: "[current description]"
(add more as needed)

Actions:
- [ActionDeveloperName]: [what it does]
(add more as needed)

Scorer results summary:
- Subagent Evaluation: [X fails out of Y rows — list which utterances failed and what the actual subagent was]
- Action Evaluation: [X fails — list which utterances and what action was actually run]
- Response Evaluation: [X fails]
- Completeness Evaluation: [X fails]
- Coherence Evaluation: [X passes/fails]
- Conciseness Evaluation: [X passes/fails]

Notable patterns I observed: [e.g., "all OrderInquiries rows routed to GeneralFAQ instead"]

For each failure pattern:
1. Identify the root cause
2. Note whether failures are cascading from one upstream problem or are independent
3. Write the specific fix — if it's a subagent description, write the updated description I can paste directly into Agentforce Builder. If it's an instruction change, write the updated instruction. If it's an action configuration issue, describe exactly what to change.
4. Prioritize fixes — tell me which one to apply first and why
5. Tell me which test cases I should rerun to confirm the fix worked
```

---

## Option B: Paste the full export file

If you need the AI to read the raw session data, reasoning text, and actual agent responses for a detailed diagnostic, paste the full CSV. Be aware this will use significantly more tokens.

```
I'm pasting the full export from an Agentforce Testing Center batch test run. The file contains LLM reasoning and session JSON for each row — it's large, so work through it systematically.

Agent name: [your agent name]

Subagent configuration (provide the current description for each subagent):
- [SubagentDeveloperName]: "[current description]"
- [SubagentDeveloperName]: "[current description]"
(add more as needed)

Actions:
- [ActionDeveloperName]: [what it does]
(add more as needed)

[PASTE CSV CONTENTS HERE]

Analyze the results and do the following:
1. Summarize the pass/fail rate for each scorer
2. Identify failure patterns — group by subagent, utterance type, or scorer
3. For each failure pattern, identify the root cause and note whether failures are cascading from a single upstream problem
4. Flag failures caused by missing data (data library not attached, test org not set up) vs. agent configuration issues — these need different fixes
5. For each configuration issue, write a specific fix I can apply in Agentforce Builder:
   - If the subagent description needs updating, write the new description
   - If a subagent instruction needs changing, write the updated instruction text
   - If an action description needs updating, write the updated description
6. Prioritize fixes in order — root causes before symptoms
7. For each fix, tell me which test cases to rerun to confirm it worked
```

---

## What to look for

These patterns point to specific fixes:

| Pattern | Likely cause | Where to fix |
| :--- | :--- | :--- |
| Many rows routed to the wrong subagent | Subagent description is too vague or overlaps with another subagent | Update the subagent description in Agentforce Builder — make routing criteria specific and distinct from other subagents |
| Actions Evaluation failure but Subagent Evaluation passed | Usually not a real defect — the action likely ran but wasn't captured in batch (see the note at the top). Common on multi-turn/confirmation-gated actions and knowledge answers | Don't change configuration based on this alone. Verify the action in the interactive preview; only treat it as a problem if it genuinely doesn't run there |
| Action failures on rows that also have wrong subagent | Cascade from routing failure — not an action problem | Fix routing first; the action result is unreliable until routing is correct anyway |
| `AnswerQuestionsWithKnowledge` runs on order-related utterances | Agent routed to FAQ subagent instead of Order Inquiries | Tighten the OrderInquiries subagent description to clearly signal order status and WISMO intent |
| All FAQ rows failing with a data library error | Data library not attached to the agent | Complete the data library setup in the Build section before retesting |
| Response Evaluation fails but Coherence and Conciseness pass | Response is well-formed but incorrect — wrong action ran or wrong data returned | Check action configuration and data library content |
| Completeness failures on knowledge-based responses | Answer is too shallow — knowledge article may lack detail | Review and expand the relevant article in the data library |
| Escalation rows failing Action Evaluation | Expected Actions was not set to `[]` | Escalation is a routing event, not an action — Expected Actions for escalation rows must always be `[]` |

---

## Applying fixes in Agentforce Builder

Once you have your fixes:

1. In Agentforce Builder, open your agent and select the subagent to update.
2. To update a **subagent description**: click the subagent, find the Description field, and replace it with the updated text.
3. To update a **subagent instruction**: open the subagent's Instructions (Reasoning Instructions) panel and edit the relevant instruction.
4. To update an **action description**: open the action within the subagent and update the description field.
5. Save your changes, commit a new version, and re-run the affected test cases to confirm the fix.

> Changes to subagent descriptions and instructions take effect in the next committed version. Always commit before retesting — running tests against an uncommitted draft will not reflect your changes.

---

<!-- ORCHESTRATOR NOTE (not customer-facing): this section is NOT an end-of-guide adaptation tail.
     test-results-analyzer is deliberately excluded from the endgame "build for your own use case"
     loop (see orchestrator-endgame.md) — its only input is a real Testing Center export, which
     doesn't exist at plan-time. Present it in-phase (test.md Step 6) as a run-it-after-you've-tested
     next step; do NOT run this prompt at the endgame. -->

## After the walkthrough: analyze your own results

> This section is for **after you've built and run a batch test on your own agent** in an org licensed for Agentforce Voice. Unlike the other skills in this guide, this one can't be run against an example — it needs real Testing Center results, which only exist once you've tested your own agent. So it's the one skill you're most likely to come back to later, on a different day, once you have a run to look at. Nothing here reaches into your org: you export your own results and hand the file to your assistant. (Manually giving your assistant an export is still the guided path — connecting directly to your org to pull results is what the Extended tier adds.)
>
> If your AI assistant can read local files (agent mode, or a coding assistant with filesystem access), you don't have to paste the export into the chat at all — which sidesteps the token-usage warning above entirely. Export your results from Testing Center, save the file into your working folder, and point your assistant at it with the prompt below. If your assistant can't read files, use Option A or B above instead.

```
I've saved my Agentforce Testing Center batch-test export to this file: [path to your exported CSV]

Read that file and analyze the failure patterns. Do NOT ask me to paste the contents — read them from the file directly.

Agent name: [your agent name]

Subagent configuration (current description for each):
- [SubagentDeveloperName]: "[current description]"
- [SubagentDeveloperName]: "[current description]"
(add more as needed)

Actions:
- [ActionDeveloperName]: [what it does]
(add more as needed)

Apply the same discipline this skill uses:

1. Use the "Not every failure is a real defect" lens from the top of this skill. Trust Subagent Evaluation and the Completeness/Coherence/Conciseness scorers. Treat a blank Actual Actions column as capture noise, not proof an action didn't fire — especially on multi-turn/confirmation-gated actions and knowledge answers. Don't flag Latency in a Mocked Data run as a live-speed problem.

2. Map each real failure onto the patterns in this skill's "What to look for" table. For each one, name the pattern, the likely cause, and where to fix it, drawn from that table. If a failure does NOT match any pattern in the table, say so plainly — "this doesn't match a known pattern; worth reproducing in the interactive preview" — rather than inventing a cause or a fix.

3. Give me suggested DIRECTIONS, not step-by-step instructions and not guarantees. A human decides what's a real defect and what to change — your job is to point me at the likely cause and the field to look at, not to hand me a finished fix or walk me through clicks. If a fix would mean editing a subagent description or instruction, you can show suggested wording, but frame it as a starting point to review and preview, not a drop-in answer.

4. Group failures by pattern, tell me which look like real issues vs. capture noise, and prioritize: which one to look at first and why.

Do not walk me through Agentforce Builder clicks — this skill's "Applying fixes in Agentforce Builder" section covers that if I need it.
```

> **This is a read, not a verdict.** The suggestions are grounded in this skill's own lens and pattern table — they point you at likely causes, they don't confirm defects. Reproduce anything that matters in the interactive preview, and preview any instruction or description change in Salesforce before you commit it.
