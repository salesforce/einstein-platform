# Test Your Voice Agent

Pippin is configured and connected — now it's time to make sure it actually works. Testing a voice agent requires more than validating that answers are correct. You need to confirm that responses sound right when spoken aloud, that the agent routes customers to the right subagent, that it never asks for information in a way that doesn't work over voice (like spelling out an email address), and that it handles the full range of ways real customers phrase real questions.

AI agents combine deterministic logic and non-deterministic reasoning. To validate both, Pippin needs to be tested across a range of scenarios: happy-path order lookups, FAQ questions, frustrated customers, fast talkers, and edge cases that push the agent toward the wrong action.

To do this, you'll use a combination of manual preview testing in Agentforce Builder and automated batch testing in Agentforce Testing Center. Manual testing gives you a detailed, turn-by-turn view of how the agent reasons. Batch testing lets you evaluate performance at scale and catch patterns that single-session testing misses.

Testing doesn't stop once Pippin goes live. As new Knowledge articles are added, instructions are updated, and LLM versions roll out, agent behavior can shift. Iteration and refinement are part of the lifecycle — not a cleanup step at the end.

Here's how the testing process is organized:

- **Planning and Preparation:** Define what success looks like, design realistic test scenarios, and identify what data Pippin needs to complete each interaction.
- **Core Testing:** Validate Pippin's behavior through manual preview testing and batch evaluation.
- **Iteration and Refinement:** Track performance over time, identify failure patterns, and retest after every fix.

---

## Planning and Preparation

Good testing starts before you open Agentforce Builder. Define your success criteria, break Pippin down into its components, and write test scenarios that reflect how real NTO customers actually talk, not how you'd phrase a query in a search box.

### Define Testing Objectives

Before running a single test, clarify what you're trying to confirm.

- **Set goals linked to business value.** NTO's agent is built around two jobs: answering common FAQ questions about returns, shipping, and products, and looking up order status by order number. A test that doesn't validate these two jobs isn't covering what matters.
- **Deconstruct the agent.** Pippin has six active subagents after the Build stage: **Agent Router**, **General FAQ**, **Order Inquiries**, **Escalation**, **Off Topic**, and **Ambiguous Question**. Test each one — not just the ones you expect to work.
- **Add voice to your success criteria.** A response that looks correct on screen can fail in voice. Add these questions to your evaluation checklist:
  - Can the response be understood when spoken aloud at normal pace?
  - Does the agent avoid asking for information that's hard to communicate via speech (email addresses, long codes, spelling-dependent inputs)?
  - Does the agent avoid reading long confirmation numbers aloud in one breath — confirming digit-by-digit or offering to text it instead?
  - Do pronunciation dictionary entries you added in the Build stage sound correct?

Your testing strategy should cycle through four steps: identify scenarios → run tests → make evidence-based adjustments → retest. Repeat until the agent meets your criteria consistently.

### Create Test Scenarios

A test scenario is a structured example of a real customer interaction. It defines what the customer says, what Pippin should do in response, and how the conversation might evolve across multiple turns.

A strong test scenario for Pippin includes:

- **Scenario description:** What is the customer's situation? For example: a customer who placed an order two days ago and wants to know when it will arrive.
- **Test utterance:** The exact phrase the customer says. Write it the way a customer would speak it — casual, imprecise, sometimes incomplete.
- **Expected subagent:** The subagent Pippin should route the conversation to.
- **Expected action:** The action Pippin should run. Leave blank for FAQ responses that don't trigger an action lookup.
- **Expected response:** What a correct, brand-appropriate response sounds like. The wording will vary — what matters is that the information is accurate and the tone is right.
- **Utterance variations:** Multiple ways the same customer might phrase the same request — polite, frustrated, and rephrased. For voice, also include variations that simulate real speech conditions.
- **Multi-turn flow:** How the conversation should progress over several turns, including topic shifts.

**Voice-specific variations to include:**

Beyond tone (polite/frustrated/neutral), voice testing requires scenarios that simulate real speech conditions:

- **Fast speech:** The customer rattles off their order number quickly or runs sentences together.
- **Repeated input:** The customer gives their order number twice because they weren't sure the agent heard it.
- **Background noise phrasing:** Inputs that are slightly garbled or incomplete — "my order, um, it's 12... 1-2-5-4-8, I think."
- **Number format variation:** "Order one-two-five-four-eight" vs. "order number 12548" vs. "it starts with a one..."

Aim for 3–5 core scenarios and 2–3 edge cases.

---

#### Testing Scenario 1

| Scenario | | Order Status (WISMO) | |
| :--- | :--- | :--- | :--- |
| Summary | | A customer placed an order recently and wants to know when it will arrive. Pippin identifies them by phone number, then takes the order number and retrieves the current status. | |
| **Expected Behavior** | | | |
| *Define how the agent should understand and respond to this scenario.* | | | |
| **Field** | | **Description** | |
| Expected Subagent | | Order Inquiries | |
| Expected Action | | Get Order by Order Number | |
| Expected Response | | "Your order 12548 is confirmed and on its way. It's expected to arrive by Thursday. Is there anything else I can help you with?" | |
| **Utterance Variations** | | | |
| *Include tone variations and voice-specific speech conditions.* | | | |
| Variation Type | | Test Utterance | |
| Neutral | | "Can you tell me where my order is?" | |
| Polite | | "Hi, I was wondering if you could check on the status of my order." | |
| Frustrated | | "I ordered something three days ago and I have no idea where it is." | |
| Rephrased | | "Has my order shipped yet?" | |
| Rephrased | | "What's the status on order 12548? My phone number is 512-757-6000." | |
| Fast speech | | "Hi yeah my order number is 1-2-5-4-8 and my phone's 5-1-2-7-5-7-6-0-0-0 what's the status" | |
| Uncertain input | | "My order number is... I think it's 12548, can you check that? My phone is 512-757-6000." | |
| **Multi-Turn Conversation Flow** | | | |
| *Outline how the conversation should progress across turns, including a topic shift.* | | | |
| **Turn** | | **Customer Input** | **Agent Response** |
| 1 | | "Where is my order?" | Ask for the phone number to identify the customer. "I can look that up for you. What's the phone number on your order?" |
| 2 | | "It's 512-757-6000." | Read the number back to confirm and identify the Contact, then ask for the order number. "Thanks. I have your number as 5-1-2-7-5-7-6-0-0-0. What's your order number?" |
| 3 | | "It's 12548." | Retrieve the order and confirm status. "Got it. Order 12548 is on its way and should arrive by Thursday." |
| 4 | | "Can you tell me more about the return policy if I don't like it?" | Recognize the topic shift and transition to General FAQ. "Of course. NTO accepts returns within 60 days of purchase for most items in original condition. Would you like details on how to start a return?" |
| 5 (Escalation) | | "I actually want to speak to someone about this." | Confirm transfer. "Absolutely. I'm going to connect you with a team member now. Is that OK?" |

---

#### Testing Scenario 2

| Scenario | | Return Policy FAQ | |
| :--- | :--- | :--- | :--- |
| Summary | | A customer asks about NTO's return policy before deciding whether to buy. They expect a clear, direct answer — not a referral to a webpage. | |
| **Expected Behavior** | | | |
| *Define how the agent should understand and respond to this scenario.* | | | |
| **Field** | | **Description** | |
| Expected Subagent | | General FAQ | |
| Expected Action | | Answer Questions with Knowledge | |
| Expected Response | | "NTO accepts returns within 60 days of purchase for most items in original, unused condition. Sale items and customized gear are final sale. Is there anything else I can help you with?" | |
| **Utterance Variations** | | | |
| *Include tone variations and voice-specific speech conditions.* | | | |
| Variation Type | | Test Utterance | |
| Neutral | | "What's the return policy?" | |
| Polite | | "Could you tell me how returns work at NTO?" | |
| Frustrated | | "I just bought something and I need to know if I can return it. What are the rules?" | |
| Rephrased | | "Do you take returns?" | |
| Rephrased | | "How long do I have to return something I bought?" | |
| **Multi-Turn Conversation Flow** | | | |
| *Outline how the conversation should progress across turns, including a topic shift.* | | | |
| **Turn** | | **Customer Input** | **Agent Response** |
| 1 | | "What's your return policy?" | Answer directly and concisely. "NTO accepts returns within 60 days of purchase for most items in original, unused condition." |
| 2 | | "What about sale items?" | Clarify the exception. "Sale items are final sale and can't be returned. The same applies to customized gear." |
| 3 | | "OK. Can I check on an order while I'm here?" | Recognize the topic shift and transition to Order Inquiries. "Sure. What's the phone number on your order?" |
| 4 (Topic Shift) | | "Never mind — I'll just call back." | Handle gracefully. "No problem at all. Is there anything else I can help you with before I let you go?" |

---

## Core Testing

With your scenarios in hand, you're ready to test. Start in the **Preview** panel, where you work through individual conversations in detail and confirm Pippin reasons the way you intended, including how it sounds in voice. Once a scenario behaves correctly there, move to **batch testing** in Agentforce Testing Center to validate that behavior at scale across dozens of utterance variations at once. Test deep first, then broad.

### Manual Preview Testing

You've already used the **Preview** panel in Agentforce Builder — in the Build section's [Quick Test](03-build.md#quick-test-preview-the-order-lookup), you had a short text conversation with Pippin to confirm the order-lookup path worked. Here, you use that same panel as a *testing* tool: to work through individual scenarios in detail and see exactly how Pippin reasons, turn by turn.

Preview is where you go deep on a single conversation — the complement to batch testing's breadth. Use it to:

- **Confirm routing and actions.** Open the **Trace** tab to see the full step chain for the interaction: each turn's routing (*Transition to Subagent*), the agent's *Reasoning*, and every *Action* it ran (for WISMO you'll see **Identify Customer By Phone** followed by **Get Order by Order Number**). This is also how you verify an action actually fired, since batch results can't give you that reliable check (see [A Note on Verifying Actions](#a-note-on-verifying-actions)). The trace also shows an **Output Evaluation** on the final response (for example, `GROUNDED`), confirming the answer was based on real action data rather than invented.
- **Read the plain-language recap.** The **Summary** button turns the trace into a sentence or two describing what happened end to end — useful for a fast sanity check before you dig into individual steps.
- **Check captured values.** The **Variables** tab (and the **Context Variables** count at the top of Preview Settings) shows the values the agent captured during the conversation, such as the order number and the resolved contact, so you can confirm it grabbed the right data.
- **Reproduce and diagnose a failure.** When a batch case fails, replay that exact utterance in Preview and read the trace to find the root cause before changing anything.
- **Walk multi-turn conversations.** Batch tests are single-turn; Preview lets you hold the full back-and-forth (provide a phone number, confirm it, provide an order number) and watch the transaction complete end to end.

For the mechanics of opening Preview and holding the WISMO conversation, follow the same steps you used in the Build [Quick Test](03-build.md#quick-test-preview-the-order-lookup): routing to Order Inquiries, phone identification, digit read-back, order lookup, and the no-order-number branch. The difference now is purpose: in Build you were confirming the path *worked*; here you're testing it against your scenarios and diagnosing anything that doesn't. (If the Preview **Send** button is greyed out, the agent isn't committed and activated; see the commit-and-activate note in the Build [Quick Test](03-build.md#quick-test-preview-the-order-lookup).)

### Test the Voice Experience

The Build Quick Test ran in **text mode** — you typed and read, because voice settings didn't exist yet. Now that you've configured the voice persona and pronunciation in [Build Step 7](03-build.md#step-7-configure-voice-persona-and-pronunciation), come back and validate what text testing can't: how Pippin actually *sounds*.

This matters because a response can pass every text-based check and still fail in voice — too long to follow when spoken, awkwardly paced, or robotic on the digit read-back that WISMO depends on.

You already auditioned individual lines in Build — the **Preview Message** and **Play** control on the **Voice Settings** page let you hear a single response at a time, which is how you chose and tuned the persona. That's a persona-tuning tool, not a conversation test. Here you do the real thing: use the **Preview** panel to *simulate and hear a full multi-turn conversation*, the same way a caller would experience it end to end.

Work through the same WISMO conversation you tested in Build, but this time **listen to the whole exchange** rather than reading it. As you go, listen for:

1. The opening ask for identification — does it sound natural and welcoming, not scripted?
2. The **digit read-back** of the phone number and order number — this is the most voice-sensitive moment in the build. Numbers should be paced clearly, not rushed together. (For example: *"I have your number as 5-5-5-1-2-3-4, is that right?"*)
3. The order-status result — is it short enough to follow by ear, and conversational rather than a data dump?
4. The no-order-number branch — does reading a list of recent orders aloud stay clear, or does it become a wall of speech?

> **Judge the voice across a whole conversation, not one line.** A persona that sounds polished on a single demo sentence can turn robotic or wearing across a full, realistic interaction — with pauses, corrections, and back-and-forth. This is exactly why the single-line Play control in Voice Settings isn't enough on its own: audition your candidate voice against the *entire* WISMO flow above in Preview before you commit to it. Apply the same "what to listen for" checklist from [Build Step 7](03-build.md#step-7-configure-voice-persona-and-pronunciation): natural delivery, even demeanor, appropriate tone, and clean phonetic confirmation on numbers and names.

### Batch Testing

Manual preview testing validates specific scenarios in detail. Batch testing evaluates Pippin's performance at scale, across dozens of utterance variations, edge cases, and conversation flows, and surfaces patterns that single-session testing can't reveal.

**What batch testing is for, and what it isn't.** Batch testing is strongest at three things: confirming Pippin **routes** each utterance to the correct subagent, checking the **quality of the first response** (is it accurate, concise, and natural to hear?), and catching **regressions**, a routing or quality change that a new instruction, a data library update, or an LLM version bump quietly introduced. It caught exactly this kind of regression during the writing of this guide: a single knowledge-base wording change misrouted every order-status case, and one batch run made the pattern obvious across dozens of utterances at once.

What batch testing does *not* prove is that a transaction completes end to end. Pippin's core WISMO job (take an order number, confirm it, take a phone number, identify the customer, run the lookup, and read the real status back) is **multi-turn and action-dependent**, and a batch test case is a single utterance. It stops at the first confirmation prompt and never reaches the lookup, so batch results tell you the customer was *routed* correctly, not that their order was *found*. For that, use preview (watch the trace complete the conversation) and live channel testing (real speech and latency). This is why the FAQ layer, single-turn and answer-quality-driven, is an especially good fit for batch, and why WISMO batch testing is best treated as a routing-and-quality regression net rather than proof the order lookup works. See [A Note on Verifying Actions](#a-note-on-verifying-actions) below.

Once Pippin performs reliably in preview for your core scenarios, use Agentforce Testing Center to generate and run batch tests.

#### Batch Test Plan

Before opening the Testing Center, document your plan.

| Batch Test Plan | | |
| :--- | :--- | :--- |
| **Scenario** | Order Status (WISMO) | |
| **Agent** | Pippin | |
| **What This Suite Evaluates** | Because you're **uploading** a test file (rather than generating cases), there's no test type to choose: the Testing Center evaluates whatever your CSV and selected scorers define. This suite's cases cover **all six subagents** (Order Inquiries, General FAQ, Escalation, Off Topic, Ambiguous Question, and the Agent Router), and the **Expected Subagent** column drives the routing check, so a single run covers both the WISMO and FAQ jobs. It confirms Pippin routes each utterance to the correct subagent; it does not grade whether a retrieved FAQ *answer* is factually correct. To validate answer accuracy against the NTO Customer Service data library, use the **Generate Test Cases** path instead and choose the **Knowledge-Based Q&A** type, a separate suite focused on answer content. | |
| **Goal** | Confirm Pippin routes each request to the right subagent across its two core jobs (order status and FAQ questions about returns, shipping, and products) and that its first response is accurate and delivered in a clear, conversational tone appropriate for voice. (Confirming that the order lookup itself completes is done in preview; see [A Note on Verifying Actions](#a-note-on-verifying-actions).) | |
| **Agent Setup** | Subagents: Agent Router, General FAQ, Order Inquiries, Escalation, Off Topic, Ambiguous Question. Actions: Answer Questions with Knowledge, Get Order by Order Number, Get Orders by Contact. Data Library: NTO Customer Service. | |
| **Test Description** | A mix of real NTO customer interactions across both core jobs. Order-status cases: a customer identifies themselves by phone number and provides an order number, and expects a status update, covering direct requests, frustrated phrasing, and fast or imprecise delivery of the number. FAQ cases: questions about returns, shipping, and product warranty, including edge cases like sale items and customized gear. Plus the boundary behaviors that matter most in voice: escalation requests, out-of-scope questions, and vague openers that require clarification. | |
| **Context Variables** | Phone Number and Order Number (both provided during the conversation, so no pre-set context variable is required for this scenario) | |
| **Response Quality Evaluations** | Select all five — a full run takes only a few minutes. For a voice agent, read these two first: | |
| **Coherence** | Verifies that order status retrieved from Salesforce is delivered as natural, conversational speech — not raw field data. | |
| **Conciseness** | Ensures responses are short enough for voice — a status update should not take more than 10 seconds to speak. | |
| **Completeness, Instruction Adherence, Latency** | Also selected. Completeness catches missing details (an arrival date, a sale-item exception); Instruction Adherence catches skipped voice instructions (like the digit read-back). Latency here reflects only model response time in a Mocked Data run — treat it as a relative signal, not a prediction of live voice-call speed. | |

#### Create and Run the Batch Test

> **Before you run:** The NTO Customer Service data library must be populated before batch testing. This is covered in the Build section — if you haven't completed that step yet, do it before continuing here. FAQ test cases will fail without it.

This guide includes a pre-built NTO voice test suite with scenarios designed specifically for voice. Before uploading it, here's what it covers so you know what to expect from the results.

**What's in the NTO Voice Test Suite**

The file uses four columns: **Utterance** (what the customer says), **Expected Subagent** (which subagent should handle it), **Expected Actions** (which action should run, in Python list format), and **Expected Response** (what a correct Pippin response looks like). The Testing Center populates the evaluation columns automatically after the run.

| Subagent | Test cases | What's covered |
| :--- | :--- | :--- |
| Order Inquiries | 16 | Happy-path order lookups with phone number and order number provided; voice-specific variations (verbal numbers like "one-two-five-four-eight", hesitant phrasing, fast speech); frustrated callers; order-number-only turns where Pippin asks for the phone number to identify the customer; the no-order-number path (Pippin lists recent orders from the phone-identified Contact via Get Orders by Contact); email deflection (Pippin redirects to phone number) |
| GeneralFAQ | 12 | Return policy — general and edge cases (sale items, customized gear); shipping timeframes and options; product warranty |
| escalation | 5 | Various phrasings of a transfer request — polite, frustrated, mid-conversation |
| off_topic | 2 | Out-of-scope requests to confirm Pippin holds its scope boundary |
| ambiguous_question | 2 | Vague openers that require Pippin to clarify before routing |

The test suite focuses on the two core jobs Pippin is built for (order status and FAQ) plus the boundary behaviors that matter most in a voice channel: escalation handling, scope guardrails, and voice-specific speech patterns. It doesn't cover multi-turn conversation flows (those are better validated in preview) or voice quality (listen to responses in the voice preview panel after batch results return).

> **Where to find the file:** the NTO Voice Test Suite is included with this guide as **`nto-voice-test-suite.csv`**, in the same folder as the guide's section files (see [Files Included with This Guide](01-get-started.md#files-included-with-this-guide)). It's already formatted for the Testing Center's four required columns, so upload it as-is. If you'd rather build your own from scratch, the **Template** link on the Data screen downloads a blank CSV with the same column headers.

> **Update the sample order and phone numbers to match your org.** The order number and phone number in the test cases are sample values. For the order-status lookups to resolve, they have to match records that actually exist in your org, so before you run the suite, replace them with an order number and phone number tied to a real Contact and Order in your own org. If the lookups return nothing, this mismatch is the first thing to check.

1. In Agentforce Studio, click **Tests**.
2. Click **New Suite**. When prompted to choose what to test, select **Agent** (not **Prompt Template**), then click **Next**.
3. On the **Details** screen, define the test:
   - **Test Name:** **Order Status (WISMO)**
   - **Description:** *Batch test of Pippin's core WISMO and FAQ behaviors — order status lookups, return/shipping/product questions, escalation routing, and voice-specific speech patterns.*
   - **Select an Agent:** **Pippin**
   - **Select version:** the most recent committed version of Pippin (shown as "Version *N* (Committed)"). This field stays disabled until you select an agent. This is the version the results are attributed to, so confirm the version label on the run detail after the test completes.
   - **Test Scope:** leave this on **Turn-Level**, which is the preselected default. Each row in this suite is a single utterance scored on its own, which is exactly what Turn-Level does ("score an agent utterance in isolation"). The other option, **Conversation-Level Testing**, scores a full end-to-end conversation across multiple turns; that's not what this CSV is built for. Turn-Level scoring in isolation is also why the Actions Evaluation looks low for Pippin, because the confirm-first action lands on a later turn. See [A Note on Verifying Actions](#a-note-on-verifying-actions).

   Click **Next**.
4. On the **Conditions** screen, set **Data Access Mode** to **Mocked Data**. This validates conversation flow without writing to your org's real order records. (The optional **Conversation History** and **Context Variables** cards below aren't needed for this suite — leave them unchecked.) Click **Next**.
5. On the **Data** screen, select **Upload Test Cases** (the alternative, **Generate Test Cases**, creates cases with AI instead — you already have a suite to upload). Under **Attachment**, click **Upload Files** and select the NTO Voice Test Suite file (**`nto-voice-test-suite.csv`**), or drop the file onto the target.
6. On the **Scorers** screen, the **Default Evaluations** (Response, Subagent, and Actions) run automatically. Under **Response Quality Evaluations**, select all five: **Completeness, Coherence, Conciseness, Latency,** and **Instruction Adherence**. A full run typically takes only a few minutes, so there's little reason to limit coverage. For a voice agent, read **Conciseness** and **Coherence** first: conciseness confirms responses are short enough to be practical when spoken aloud, and coherence confirms they sound like natural speech rather than raw field data. **One caveat on Latency:** in a Mocked Data run it measures only the model's response-generation time. There's no speech-to-text, text-to-speech, or telephony in the loop, so treat it as a relative signal, not a prediction of how fast a live voice call will feel. Real voice latency is validated during live channel testing and in the Monitor stage.
7. Click **Save**, then **Run Test**.

> Results may take a few minutes to populate depending on the number of test cases and scorers selected. If the run appears to be taking a long time, refresh the page — the Testing Center does not always update automatically when the run completes.

To review the test, click the **Run History** tab and select the latest run to see the results. **Download the results** as well — the export gives you every row's scores and reasoning to work from as you evaluate and iterate.

**Interpret the results before you act on them.** Not every failure is a real defect, so read the scores with the right expectations:

- **Trust the routing and quality signals.** **Subagent Evaluation** reliably tells you whether Pippin routed to the right subagent, and the response-quality scorers (Completeness, Coherence, Conciseness) reliably reflect answer quality. These are the results to act on directly.
- **Treat Actions Evaluation results as a prompt to verify in preview.** As explained in [A Note on Verifying Actions](#a-note-on-verifying-actions), a batch case is a single utterance, so a blank Actual Actions column usually means the action came later in the conversation than one turn could reach. Expect the overall Actions Evaluation score to look low, often well below the other scorers, for an agent like Pippin that correctly asks for and confirms the order number before acting; that pattern depresses the single-turn score without indicating anything wrong. The interactive preview is the right venue to confirm an action ran, so check there before treating it as a problem.

#### A Note on Escalation Tests

The NTO voice test suite includes escalation scenarios, but they look different from other test cases — the Expected Actions column is empty. That's intentional.

Escalation in Agentforce is a routing event, not an agent action. When a customer asks to speak to a person, the Escalation subagent is selected and the conversation is transferred to the fallback queue. There is no action to assert against in the Testing Center. What you can validate in batch testing is that **Pippin correctly routes to the Escalation subagent** when the customer requests a transfer — the Subagent Evaluation handles this.

The actual handoff behavior (does the transfer reach the queue, does a service rep receive the conversation) can only be validated through live channel testing, not batch testing. Plan to test this manually after you complete the Deploy section.

#### A Note on Verifying Actions

Batch testing shines at validating **routing** (did Pippin select the correct subagent?) and **response quality** (is the answer accurate, concise, and natural to hear?). Confirming that an *action* actually ran is a job for the **Agentforce Builder preview** — and there's a natural reason why.

The **Actions Evaluation** scorer compares the actions the test harness recorded against the actions you expected. Because a batch case is a single utterance, it often can't get far enough to record an action — so an empty or unexpected Actions column usually reflects *how batch runs work*, not a problem with your agent. Two patterns account for most of these:

- **Multi-turn actions unfold over several turns.** Pippin's order lookups confirm details first — it reads the order number and phone number back to the customer and waits for a "yes" before running the lookup. A batch case is a single utterance, so it naturally stops at that confirmation prompt before reaching `Get Order by Order Number` or `Get Orders by Contact`. The routing is correct; the action just comes later in the conversation.
- **Knowledge answers don't always register as actions.** When Pippin answers an FAQ, `Answer Questions with Knowledge` may or may not appear in the recorded-actions column even when the answer is clearly grounded in your data library. Judge these by the **Response** and **Completeness** scorers — an accurate answer is the signal that knowledge grounding worked.

**So when you want to confirm an action, head to the interactive preview.** It's built for exactly this: you can hold the full multi-turn conversation (provide the phone number, confirm it, provide the order number) and watch the trace confirm the action runs and returns data. Treat a batch **Actions Evaluation** result as a friendly nudge to go verify in preview, where you'll get a clear answer.

#### Use Test Results to Improve Your Agent

When results return, you'll see pass/fail scores and reasoning for each test case. Use failures to identify patterns — a single failed test may be a one-off, but five failures with the same phrasing pattern point to a fixable instruction gap.

Resist the urge to over-prompt. When an agent misbehaves, the common reflex is to pile on more instructions, which usually makes it more confused, not less. Instead, diagnose the specific gap from the failure pattern, make one targeted change, and retest before making another. Don't fix what isn't broken: leave the instructions that are working alone. This is the same one-change-at-a-time discipline you used for the voice persona settings in Build, applied to instructions.

**Default evaluations** (pass/fail):

| Scorer | What it measures |
| :--- | :--- |
| Response Evaluation | Whether the agent's response achieves its goal. Score 5: precise, complete, brand-aligned, no irrelevant content. Scores 3–4: minor omissions or ambiguity. Scores 1–2: unclear, missing key elements, or asks for information the agent should have retrieved itself. Score 0: complete failure — response doesn't address the customer's intent. **Tip:** Check subagent selection, instructions, and actions. Look for knowledge gaps in the NTO Customer Service data library. |
| Subagent Evaluation | Whether the agent routed the conversation to the correct subagent. Score 1: correct routing. Score 0: wrong subagent selected. **Tip:** Manually retest in Agentforce Builder. Refine the subagent description and check for overlap with other subagent descriptions. |
| Actions Evaluation | Whether the agent ran the correct action. Score 1: correct action(s) selected. Score 0: wrong action or missing action. **Tip:** Treat a result here as a prompt to verify in the Agentforce Builder preview — a batch case is a single utterance, so an action often comes later in the conversation than the run can reach (see [A Note on Verifying Actions](#a-note-on-verifying-actions)). Once preview confirms the action genuinely isn't running, review Reasoning in the trace, refine the action description and subagent instructions, and check action filters. |

**Response quality scorers** are scored 0–5 (pass threshold: 3). The LLM-as-judge evaluates each response against fixed criteria and provides reasoning.

> **What is an LLM-as-judge?** A separate LLM evaluates Pippin's response against predefined scoring criteria — checking for accuracy, tone, completeness, and voice-appropriateness. It generates a score and written reasoning for each test result.

| Scorer | What it measures |
| :--- | :--- |
| Coherence | Scores 3–5: response is grammatically correct, conversational, and flows naturally when spoken. Scores 0–2: response reads like raw data (field names, JSON, formatted lists) rather than natural speech. |
| Conciseness | Scores 3–5: response is short and accurate — delivers the point without padding. Scores 0–2: response is too long to be practical in voice, repetitive, or includes irrelevant content. |
| Completeness | Scores 3–5: full, accurate answer with no important omissions. Scores 0–2: key information is missing, which may leave the customer needing to ask a follow-up to get what they called about. |
| Instruction Adherence | Whether the agent followed the subagent instructions you configured. For Pippin, this catches skipped voice behaviors — for example, not reading the order number back digit-by-digit, or asking for an email address after you replaced that step. A low score points back to the subagent instructions written in the Build stage. |
| Latency | Measures the time, in milliseconds, for the agent to generate a response. In a **Mocked Data** run this is model-generation time only — it does not include speech-to-text, text-to-speech, or telephony, so it is not a prediction of how fast a live voice call will feel. Use it as a relative signal to spot a specific utterance that is unusually slow. Validate real end-to-end voice latency during live channel testing and in the Monitor stage. |

> Quality scores are guidance, not verdicts. If a conciseness scorer rates a response a 2 but you've confirmed it sounds natural in voice preview and customers aren't complaining, the score is less important than your direct observation. Always apply your judgment alongside the scores.

---

## Iteration and Refinement

Testing isn't finished when Pippin goes live. As NTO adds new Knowledge articles, adjusts agent instructions, or when Salesforce rolls out an updated LLM version, Pippin's behavior can shift, a phenomenon called **agent drift**. The iteration phase establishes a continuous feedback loop: track performance, identify issues, trace root causes, fix, and retest.

### Track Performance

Every time you run a test suite in the Testing Center, the results are stored as a **Test Run History** snapshot. Run the same suite on a regular cadence (after any significant instruction change, after a new data library sync, or after an LLM version update) and use Run History to compare results side by side.

Follow this compare-and-retest pattern for Pippin:

- Run the full batch suite before making a change to capture a performance baseline.
- Apply the change (updated instruction, new Knowledge article, revised action description) and commit the new agent version.
- Re-run the same suite on the updated version.
- Use **Run History** in Testing Center to compare results and confirm whether performance improved, held steady, or regressed.

A saved test suite can be re-run as-is against Pippin's newly committed version without creating a new suite; this is what supports the compare-and-retest pattern above. However, Testing Center does not support editing a suite's test data or scorer selection after it's created. If you need to change the utterances, expected values, or scorers, not just retest the same data against an updated agent, you'll need to create a new suite.

> **Optional: see the loop in action with a Knowledge change.** If you'd like to watch compare-and-retest work end to end, make a small, deliberate change to your Knowledge and see it move the results. This is optional — skip it if you're comfortable with the pattern.
>
> 1. **Baseline.** Run your NTO voice test suite and note the results for the return-policy cases — with the current Knowledge, they should pass and cite a 60-day return window.
> 2. **Change the Knowledge.** In the NTO Customer Service knowledge file, change the return window (for example, from 60 days to 30 days), rebuild the PDF, and re-upload it to the data library so the data library reflects the new content. (This is the same build-and-upload process you followed in the Build section.)
> 3. **Re-run the same suite.** No new suite needed — run your existing suite again against Pippin.
> 4. **Compare in Run History.** The return-policy cases now answer "30 days," so any test case whose expected response says 60 days will shift — a visible, traceable change you caused on purpose.
> 5. **Revert.** Change the Knowledge back to 60 days, rebuild, re-upload, and re-run to confirm the results return to your baseline.
>
> The takeaway: a single Knowledge edit ripples straight into agent behavior and shows up in your test results. This is exactly how an *unintended* Knowledge change would surface as drift — which is why re-running your suite after any data library update is worth the few minutes it takes.

### Iterate and Troubleshoot

When a test fails or a real customer interaction goes sideways, start by forming a hypothesis about the root cause. Use the trace, variables, and interaction summary in Agentforce Builder to confirm it — don't adjust instructions based on a guess.

For voice-specific issues, add one more diagnostic step: listen to the response in voice preview. A misrouting issue usually shows up in the trace. A voice quality issue (response too long, unnatural phrasing, mispronounced brand name) only shows up when you listen.

> **Voice-specific failure patterns to watch for in production:** no speech detected, low transcription confidence on names/numbers, repeated clarification loops, and call abandonment right after a "let me check" holding message — these often don't show up in batch testing but are worth tracking once real customers are calling.
>
> A *repeated* "let me check" holding message across turns is usually a symptom, not the root problem. It often means the agent is making too many tool calls or reasoning over too broad an action set, so each turn stalls before it can answer. When you see it, tighten the agent's action set rather than just rewording the holding phrase: give the agent only the actions the use case needs, the same pruning you did in Build (see [Remove Unnecessary Subagents](03-build.md#remove-unnecessary-subagents)).

Once you've identified and fixed the issue, re-run your existing test suite against the newly committed version and compare the results in **Run History** — the compare-and-retest pattern described above. This confirms two things at once: that the fix worked, and that it didn't quietly break something that was passing before.

> **Grow your test suite over time.** When a real interaction fails in a way your suite doesn't already cover (a question, a phrasing, or an edge case you didn't anticipate), turn it into a permanent test. Add the new case as a row in your test file (**Utterance, Expected Subagent, Expected Actions, Expected Response**) and upload it as a new suite, or use **Generate Test Cases** to expand coverage in that area. You can't edit a suite's test data after it's created, so growing your coverage means uploading an updated file as a new suite. Over time, each real-world surprise becomes a standing test, and Pippin gets harder to break.
