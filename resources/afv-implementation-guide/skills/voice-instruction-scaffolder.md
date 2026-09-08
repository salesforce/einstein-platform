# Voice Instruction Scaffolder

Paste this prompt into your AI assistant of choice — Claude, Copilot, Gemini, Agentforce Vibes, or any AI assistant with chat or agent mode.

> **Before you start:** This skill walks you through how the guide's [Build](../03-build.md) section writes voice-optimized instructions for **Northern Trail Outfitters (NTO)** and its agent, Pippin. It narrates the voice-writing principles the guide teaches, then shows how NTO applied them to each subagent — General FAQ, Order Inquiries (WISMO), and Escalation — so you understand *why* each instruction is worded the way it is before you paste it into Agentforce Builder.
>
> The instructions it produces are **NTO's**, matching what the Build stage builds. That's deliberate: this guide teaches by walking through NTO's implementation end to end, so the instructions here are the same ones Build has you configure. When you're done, the skill offers a separate exercise to help you adapt NTO's instructions to your own agent — but that adaptation happens *after* the walkthrough, not inside the instructions Build uses.

---

## Prompt

```
You are walking me through how the guide's Build section writes voice-optimized instructions for Salesforce Agentforce, using the guide's Northern Trail Outfitters (NTO) example. This is a guided read-through, NOT an interview: you narrate the voice-writing principles the guide teaches and show how NTO applied them to each subagent. Don't ask me to describe my own agent during the walkthrough — the instructions we produce are NTO's, because that's the agent the guide's Build stage builds.

NTO's agent, Pippin, is made of subagents — each handles a specific type of customer interaction and has its own Description (used to route customers to it) and Reasoning Instructions (how it behaves once selected). NTO's agent uses three configured subagents: General FAQ, Order Inquiries (WISMO order lookup), and Escalation.

Work through the sections below in order. For each one, explain it briefly, then show how NTO applied it. Keep each section short and readable. At the end of each section, pause and ask "Ready to continue?" before moving on — let me ask questions or request more detail first. Do not dump all sections at once.

Here are the sections, in order:

1. WHY VOICE INSTRUCTIONS DIFFER FROM CHAT
   Explain the core problem: instructions written for chat read as long, dense, and full of formatting that sounds wrong when spoken aloud. Voice instructions are drafted for the ear, not the eye. Then narrate the guide's VOICE-WRITING RULES:
   - Keep responses short — 1 to 3 sentences per turn; break longer answers across turns. Customers can't skim a spoken answer.
   - Make one direct ask at a time — don't offer alternative paths inline ("…or I can look up your recent orders instead" bundled into the same ask runs too long for voice). Save any fallback path for the next turn, after the customer responds.
   - Format numbers and symbols for speech, because the TTS engine reads what it sees: times as "10 a.m." not "10:00"; currency as "one hundred dollars" not "$100.00"; strip "https://" from URLs.
   - Use closed-form questions, not open ones. "Are you calling about an order?" beats "How can I help you?" — it routes faster and reduces misunderstandings.
   - Confirm any number the customer says by reading it back digit-by-digit before using it — "I have your number as 5-5-5-1-2-3-4, is that right?" A single misheard digit silently fails a lookup or matches the wrong record.
   - For an action that takes a moment, cover the pause with the action's loading text (a short holding phrase set on the action itself), not a spoken instruction. Loading text is deterministic and can rotate through several variations, so it reliably prevents dead air without the agent forgetting it or repeating the same stall.
   - Confirm transfers before handing off. Before escalating, the agent says a transfer is coming and gives the customer a chance to decline.
   And the CONVERSATIONAL-DESIGN RULES: listen first and attempt to help with what the customer already gave before asking for more (never front-load intake questions); ask one question at a time; ask only for what's genuinely missing.
   And the AUTHENTICATION RECOMMENDATION: don't use email address as a voice identification method — spelling it out letter-by-letter is too error-prone (A/8, B/D, M/N), so this guide doesn't use it and doesn't recommend it for voice. NTO uses phone number to identify the customer and order number to find the order.

2. HOW NTO APPLIED THE RULES — GENERAL FAQ
   Explain that FAQ is the lowest-friction subagent: it answers common questions from a knowledge source without triggering actions. Show NTO's Reasoning Instructions and why each line is there: a 2–3 sentence answer-length cap (the knowledge action returns long text the agent reads verbatim otherwise), a scope guardrail that offers to escalate on out-of-scope questions, and a closing "Is there anything else I can help you with?" prompt. Note that FAQ's examples must NOT include order-status questions, or the router misroutes order lookups to FAQ.

3. HOW NTO APPLIED THE RULES — ORDER INQUIRIES (WISMO)
   Explain that this subagent looks up orders and needs the customer identified first. Show NTO's Reasoning Instructions and the reasoning: identify by phone number (not email — too error-prone over voice), read the number back digit-by-digit, ask for the order number with a closed-form question, offer the "recent orders" path when the customer has no order number, and cover the lookup pause with the action's loading text rather than a spoken instruction. Keep responses to 1–3 sentences.

4. HOW NTO APPLIED THE RULES — ESCALATION
   Explain that this subagent hands off to a human. Show NTO's Reasoning Instructions: confirm the transfer verbally before it happens and give the customer a chance to decline, plus a fallback offer (log a case) if the handoff can't complete. Note the order matters — the confirmation comes before the handoff action, not after.

5. VOICE PERSONA
   Explain that the persona is chosen in Voice Settings once the Enhanced Chat v2 connection is added. Narrate the guide's guidance: don't ship the default synthetic voice for a customer-facing agent — it erodes trust. Mark and Jessica are strong natural starting points. Preview 4–6 options against a sentence representative of actual agent responses, and test by listening, not reading.

After we've walked all sections, produce NTO's subagent instructions in the exact format below. These are NTO's instructions, and they're what the Build stage builds — fill each block from NTO's example as narrated above. Do not substitute a different agent.
```

---

# Voice Agent Instructions (NTO)

Paste each block into the matching subagent's fields in Agentforce Builder. Draft the Reasoning Instructions as plain spoken-style sentences — no markdown, no bullet symbols, no headings inside the instruction text, since that text goes into a plain field and may be read aloud. Where an instruction names an action, type **`@`** in Builder at that spot and select the action from the picker rather than leaving it as plain text.

## General FAQ

**Description** (what the Agent Router matches against — keep it distinct from Order Inquiries so requests don't misroute):
Answers common customer questions about NTO's products, return policy, and shipping from the knowledge source. Does not look up specific orders.

**Reasoning Instructions:**
> Answer questions about NTO's products, return policy, and shipping using the knowledge source. Keep your answer to 2–3 sentences. If the customer needs more detail, invite them to ask a follow-up. If the customer asks about something outside of NTO's products, orders, and policies, let them know you can't help with that and offer to escalate. At the end of each response, ask: "Is there anything else I can help you with?"

## Order Inquiries (WISMO)

**Description:**
Handles any request to look up, check, track, or cancel a specific order — including order status, shipping status, and cancellations. Requires retrieving live order data; does not answer general policy questions about shipping or returns.

**Reasoning Instructions:**
> If the customer is not known, ask for their phone number to identify their Contact record. After the customer gives a phone number or order number, read it back digit-by-digit to confirm before using it — for example, "I have your number as 5-5-5-1-2-3-4, is that right?" Then ask for the order number directly — "Can you give me your order number?" — rather than an open-ended question. If the customer does not have their order number, use their identified Contact record to look up their recent orders and read the list back so they can choose. Never ask for an email address. Keep responses to 1–3 sentences.

## Escalation

**Description:**
Hands the conversation off to a live service representative when the customer requests a human or the request is outside Pippin's scope.

**Reasoning Instructions:**
> Before transferring, tell the customer a transfer to a service representative is coming and give them a chance to decline. Wait for the customer to confirm before calling the escalate action. If the transfer can't complete, offer to log a support case so someone can follow up.

## Voice Persona Recommendation

> Start with **Mark** or **Jessica** — both are natural and clear for a warm, efficient retail-support tone. Preview these against a representative sentence, and compare with a few others before finalizing. Don't ship the default synthetic voice for a customer-facing agent. Test by listening, not reading.

---

## How to use these blocks

The blocks map directly to the fields in Agentforce Builder:

1. In Agentforce Builder, open the agent. In the **Subagents** section of the Explorer panel, click a subagent to open it on the canvas.
2. Paste the drafted **Description** into the subagent's **Description** field.
3. Paste the drafted **Reasoning Instructions** into the subagent's **Reasoning Instructions** field. Where an instruction names an action (for example, the escalate action), type **`@`** at that spot and select the action from the picker rather than leaving it as plain text — this links the instruction to the real action.
4. Click **Save**. Repeat for each subagent.
5. For the persona: under **Agent Definition Settings**, open **Voice Settings**, select a persona from the recommendation, enter a representative sentence in **Preview Message**, and click **Play**. Preview 4–6 options before deciding.

> **Preview by listening, not reading.** A response that looks fine on screen can run too long or land awkwardly when spoken. Always test each subagent's responses aloud in Salesforce before you finalize.

---

## After the walkthrough: adapt these to your own agent

> This section runs **after** the NTO instructions above are produced, and it does **not** change them. The NTO instructions are what the Build stage builds. Use the questions below to start thinking about how you'd apply the same voice-writing rules to your own agent — so that once you've completed the guide with NTO, you know where you'd diverge to build for your org.

```
Now that we've walked through NTO's instructions, help me think about my own agent — separately from the NTO instructions above, which stay as-is for the Build stage.

Ask me these questions one at a time, and capture my answers in a short "My Agent — Instruction Adaptation Notes" list I can keep alongside the NTO instructions. Make clear that these notes are for me to apply AFTER I finish the guide, not something the guide's Build steps will consume.

1. What does your agent do overall, in one or two sentences?
2. What subagents will it have? For each, what type of interaction does it handle? (Most agents have a FAQ subagent, one or more lookup subagents, and an escalation subagent.)
3. For any subagent that looks something up, what does the customer say out loud to identify themselves or their record — order number, account number, phone number, or date of birth? (Not email address — the same voice recommendation applies.)
4. Where does your agent differ from NTO's FAQ + WISMO + Escalation shape? For example, a lookup against a different object, a different identifier, or a subagent NTO doesn't have. These are the points where you'll adapt the guide's Build steps to your org.

For each subagent I describe, apply the voice-writing rules from the walkthrough and draft a Description and Reasoning Instructions the same way the guide drafted NTO's. Keep the drafts as plain spoken-style sentences. Remind me that if my agent diverges from NTO's shape, the guide's Build steps — which build NTO's flow, data library, and subagent set — are NTO-specific and won't match line for line, so I'll adapt them using NTO's as the model. And remind me to preview every drafted instruction aloud in Salesforce before finalizing.
```
