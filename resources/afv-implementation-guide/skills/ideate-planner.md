# Ideate Planner Skill

Paste this prompt into your AI assistant of choice — Claude, Copilot, Gemini, Agentforce Vibes, or any AI assistant with chat or agent mode.

> **Before you start:** This skill walks you through the ideation the guide's [Ideate](../02-ideate.md) section does for **Northern Trail Outfitters (NTO)** and its voice agent, Pippin. It narrates the same planning frameworks — use case, jobs to be done, versioned scope, business value, data readiness, escalation triggers, and a People/Business/Technology/Data guardrail matrix — and shows how NTO answered each one, so you understand the reasoning before you build.
>
> The plan it produces is **NTO's plan**, captured as a project plan you can keep. That's deliberate: the guide's Build section builds NTO's agent step by step (FAQ + WISMO, order lookup by phone number), so the plan you carry into Build has to describe the same use case Build implements. When you're done, the skill offers a separate exercise to help you adapt NTO's plan to your own use case — but that adaptation happens *after* the walkthrough, not inside the plan Build reads.

---

## Prompt

```
You are walking me through the ideation stage of building a voice agent for Salesforce Agentforce, using the guide's Northern Trail Outfitters (NTO) example. This is a guided read-through, NOT an interview: you narrate how NTO planned its voice agent, Pippin, framework by framework, and I follow along. Don't ask me to supply my own use case during the walkthrough — the plan we produce describes NTO's agent, because that's the agent the guide's Build stage actually builds.

Work through the sections below in order. For each one, explain the framework in a sentence or two, then show how NTO applied it. Keep each section short and readable. At the end of each section, pause and ask "Ready to continue?" before moving to the next — let me ask questions or request more detail before we move on. Do not dump all sections at once.

Here are the sections, in order:

1. IDENTIFY THE USE CASE
   Explain the Value / Work / Decision-making / Risk / Data questions the guide uses to evaluate a voice use case. Then walk NTO's answer: NTO sells outdoor apparel and gear and handles high volumes of repetitive "Where Is My Order" (WISMO) contacts plus common FAQs. Voice is the right channel because customers want fast, conversational answers without waiting on hold or navigating a portal. NTO starts with two jobs — FAQ (no actions) and WISMO (order-status lookup) — because they're high-volume, low-complexity, and keep customer identification light. Cover the voice-specific considerations too: keep responses short (customers hear each word once), attempt to help before asking intake questions, start with an FAQ layer before action-based use cases, and audit data quality first.

2. DEFINE THE USE CASE — JOBS TO BE DONE, SCOPE, BUSINESS VALUE, DATA READINESS
   Explain that this is where NTO fleshes out each use case to assess and prioritize it. Walk NTO's four tables:
   - Jobs to Be Done: FAQ (answer common questions about shipping, returns, store hours, product availability — no lookup) and Order status/WISMO (identify the customer by phone number, accept an order number, look up the order in Salesforce, report status, estimated delivery, last tracking event).
   - Scope in versions: FAQ V1 answers high-frequency questions, V2 expands from transcripts. WISMO V1 identifies the customer by phone number, then looks up order status by order number; V2 adds tracking detail; V3 personalizes for authenticated customers. The guide builds V1 of both.
   - Business Value: deflect repetitive contacts, reduce handle time, improve first-contact resolution and CSAT.
   - Data Readiness (a feasibility gut-check, not a full audit): FAQ relies on current, plain-language Knowledge articles; WISMO relies on Contact records carrying the phone numbers used to identify customers and on Order records populated with status, tracking, and delivery fields retrievable by order number.

3. DEFINE THE TECHNICAL REQUIREMENTS
   Walk NTO's decisions on data, channel, routing/escalation, and security:
   - Channel: Enhanced Chat v2 — Pippin appears as a widget on NTO's storefront where shoppers can speak or switch to text. Conversations route via Omni-Channel Flow.
   - Routing and escalation: define escalation criteria now, configure them in Build and Deploy. NTO's triggers: customer requests a human (route to general queue); question outside Pippin's topics (route to general queue with a conversation summary); order not found or lookup fails (offer to connect to a rep).
   - Security and customer access: FAQ needs no identification; WISMO identifies the customer by phone number, then looks up the order by order number.
   - STATE THE VOICE AUTHENTICATION RECOMMENDATION CLEARLY: this guide doesn't use email address as an authentication method, and it isn't recommended for voice. Spelling an email address aloud is too error-prone (A/8, B/D, M/N are easily confused). Prefer order number, account number, phone number, or date of birth instead. Frame this as a strong recommendation and how this guide is built — not as a universal prohibition.

4. DEFINE THE GUARDRAILS
   Explain the People / Business / Technology / Data framework for surfacing risk, with voice-specific considerations. Walk the risks NTO's stakeholders identified in each category (for example — People: shoppers not realizing they're talking to an AI, recognition failure in noisy outdoor conditions; Business: scope creep, escalation gaps; Technology: responses too long for voice, latency/dead air, order-lookup failure; Data: stale order data, missing FAQ coverage, privacy). Then show two of NTO's mitigation strategies: for AI transparency, have Pippin identify itself as an AI in its opening message and reaffirm if asked; for escalation gaps, define escalation criteria before building and pass a conversation summary to the rep at handoff.

After we've walked all four sections, produce a structured project plan capturing NTO's decisions, in the exact format below. This plan is NTO's, and it's what the Build stage builds — fill each section from NTO's example as narrated above. Do not substitute a different use case.
```

---

# Voice Agent Project Plan (NTO)

## Use Case
FAQ (no actions) and Order Status / WISMO (identify the customer by phone number, then look up the order by order number). NTO starts with the FAQ layer before the action-based WISMO use case.

## Jobs to Be Done
| Job to Be Done | Tasks |
| :---- | :---- |
| **FAQ** | Answer common questions about shipping, returns, store hours, and product availability — no system lookup required |
| **Order status (WISMO)** | Identify the customer by phone number · Accept an order number from the customer · Look up the order in Salesforce · Report the current status, estimated delivery date, and last tracking event |

## Scope
| Job to Be Done | Scope |
| :---- | :---- |
| **FAQ** | **V1 (MVP):** Answer high-frequency questions about shipping, returns, store hours, and product availability. **V2:** Expand the FAQ library as new common questions surface from transcripts. |
| **Order status (WISMO)** | **V1 (MVP):** Identify the customer by phone number, then look up order status by order number. **V2:** Add shipment tracking detail and estimated delivery updates. **V3:** Personalize responses for authenticated customers (account-level order history). |

*The guide builds V1 of both use cases.*

## Business Value
| Job to Be Done | Business Value |
| :---- | :---- |
| **FAQ** | Deflect high-volume repetitive contacts · Reduce average handle time · Increase first-contact resolution |
| **Order status (WISMO)** | Deflect order-status calls without rep involvement · Reduce inbound call volume · Improve CSAT with instant, accurate status updates |

## Data Readiness
| Use Case | Data Source | Readiness |
| :---- | :---- | :---- |
| **FAQ** | Knowledge articles | Confirm FAQ articles are current, accurate, and written in plain language the agent can present conversationally |
| **Order status (WISMO)** | Order and Contact records in Salesforce | Confirm Contact records carry the phone numbers used to identify customers, and that Order objects are populated with status, tracking, and estimated-delivery fields retrievable by order number |

## Escalation Triggers
| Trigger | Escalation Path |
| :---- | :---- |
| Customer requests a human | Route to general customer service queue |
| Question outside Pippin's configured topics | Route to general customer service queue with a conversation summary |
| Order not found or lookup fails | Offer to connect the customer with a service representative |

## Authentication
FAQ requires no customer identification. For WISMO, Pippin identifies the customer by **phone number**, then looks up the order by **order number**. **Not email address** — spelling an email address aloud over voice is too error-prone, so this guide doesn't use it and doesn't recommend it for voice.

## Risks and Guardrails
Using the People / Business / Technology / Data framework:

| Category | Risk | Mitigation Strategy |
| :---- | :---- | :---- |
| **People** | AI transparency — shoppers don't realize they're talking to an AI | People guardrail: set expectations on the storefront. Technology guardrail: Pippin identifies itself as an AI in its opening message and reaffirms if a shopper asks. |
| **Business** | Escalation gaps — handoffs are unclear or lose context | Business guardrail: define escalation criteria before building. Technology guardrail: pass a conversation summary to the rep at handoff; trigger escalation on keywords, frustration signals, or out-of-scope requests. |
| **Technology** | Response length, latency/dead air, order-lookup failure | Keep responses to 1–3 sentences; fill lookup pauses with loading text set on the lookup action; offer a rep when a lookup fails or returns no match. |
| **Data** | Stale order data, missing FAQ coverage, privacy | Keep order and tracking data current; audit Knowledge coverage against common questions; handle order details per NTO's privacy policy. |

## Legal and Compliance Notes
Voice recording introduces obligations that don't apply to chat. Define a recording retention policy, engage legal early, and use Sensitive Data Rules to mask PII where applicable. (NTO's V1 WISMO scope keeps identification light and stores no new sensitive data beyond existing order and contact records.)

## Owner
The admin or team that builds and maintains the agent after launch. (NTO: customer service operations, with admin support.)

## Recommended Starting Point
Start with the FAQ layer, then add WISMO — high-volume, low-complexity, and FAQ-before-actions. Deploy on Enhanced Chat v2. Apply the conversational-design approach: attempt to help with what's already known before asking for more, ask one question at a time, and use closed questions. Voice persona selection and pronunciation entries are decided in the Build stage — note any brand or product names that might be mispronounced (for NTO: ApexTrail, NovaPace, TerraMax) so they're ready to address there.

---

## After the walkthrough: build a plan for your own use case

> This section runs **after** the NTO plan above is produced, and it does **not** change it. The NTO plan is what the Build stage builds. Here you produce a **separate plan for your own use case** — a document you keep and apply after you finish the guide with NTO. It follows the same structure as NTO's plan, so you can see exactly where yours lines up and where it diverges.

```
Now that we've walked through NTO's plan, help me build a plan for MY OWN use case — separate from the NTO plan above, which stays as-is for the Build stage.

Ask me the questions below ONE AT A TIME, letting me answer each before the next. When we're done, produce a document titled "Voice Agent Project Plan — <my use case>" using the SAME section structure as NTO's plan above: Use Case, Jobs to Be Done, Scope, Business Value, Data Readiness, Escalation Triggers, Authentication, Risks and Guardrails, Legal and Compliance Notes, Owner, Recommended Starting Point.

CRITICAL — do not invent facts about my business. Fill each section ONLY from what I actually tell you. For any section I haven't given you enough to fill, DO NOT guess — write a placeholder in the exact form "> Decide this: <the specific thing I need to figure out>" so I know it's mine to complete. A plan full of honest placeholders is far more useful to me than one full of plausible-sounding fabrication. Make clear this plan is mine to apply AFTER I finish the guide, not something the guide's Build steps consume.

Questions:
1. What are the top 2–3 reasons your customers reach out today? Which is the most repetitive and highest-volume?
2. Does your top interaction answer from fixed information (an FAQ) or require a system lookup (an order, account, appointment, service line, etc.)? This tells us whether you start with an FAQ layer, a lookup use case, or both — the way NTO did. If both, which comes first?
3. If a lookup is needed: what record does the agent look up (your equivalent of NTO's Order), and what would the customer say out loud to identify themselves or their record — order number, account number, phone number, or date of birth? (Not email address — the same voice recommendation applies: spelling an email aloud is too error-prone.)
4. What business value would you expect — for example deflect volume, reduce handle time, improve CSAT? (If you're not sure yet, say so and I'll leave a placeholder.)
5. What data would each use case rely on, and is it ready? (An FAQ relies on current, plain-language knowledge; a lookup relies on records populated with the fields you'd report back. Say "not sure" for a placeholder.)
6. When should the agent hand off to a human? (For example: the customer asks, an out-of-scope question, a lookup fails. Say "undecided" for a placeholder.)
7. Where does your use case differ from NTO's FAQ + WISMO shape? A different object, a different identification path, a guided multi-step flow instead of one-shot answers, an action NTO doesn't have, or an integration?

For any of questions 4–7 that I skip or answer vaguely, write a "> Decide this:" placeholder rather than filling it in yourself. Version the Scope section like NTO's (V1 MVP → later versions) only if I've given you enough to; otherwise use a placeholder. Leave Legal and Compliance Notes and Owner as "> Decide this:" placeholders unless I raise them. Remind me that voice persona and pronunciation are decided in the Build stage, and that I should flag any brand or product names likely to be mispronounced.
```
