# Ideate Your Voice Agent

The first step in building a voice-enabled agent is ideation. This is where you define what your agent will do, who it will serve, and what success looks like — before writing a single line of configuration.

Good planning upfront accelerates the build and reduces rework. It also keeps your agent aligned with business goals and helps it meet security, legal, and ethical requirements.

When planning a voice agent, consider:

* Voice use case definition and scope
* Data and technical requirements
* Channel and escalation strategy
* Risks and guardrails

That said, balance planning with experimentation. Hands-on prototyping is one of the best ways to understand what a voice agent can do. You don't need to have every answer before you start building.

> This section walks through an ideation exercise for **Northern Trail Outfitters (NTO)**. If you want to get straight into building, skip ahead to the [Build](03-build.md) section.

---

## Identify Your Use Case

A voice agent use case is a specific customer interaction where an AI agent can handle a spoken conversation, take action, and deliver value — either by resolving the interaction autonomously or by routing the customer efficiently to the next step.

When evaluating a potential voice use case, ask:

* **Value**: Why is voice the right channel for this? Does a spoken, conversational experience serve the customer better than typing or browsing?
* **Work**: Can you describe exactly what the agent will say and do during the conversation? Do you understand the full interaction flow?
* **Decision-making**: Can the agent handle this interaction without requiring human judgment for most scenarios?
* **Risk**: Are there compliance, security, or sensitivity concerns that require human oversight?
* **Data**: Does your Salesforce org contain the data the agent needs to assist the customer?

As you decide on your answers, it's important to understand what agents can do. Often the easiest way to get started is by building an agent and seeing how its capabilities match with the goals you have for implementation.

### Voice-Specific Considerations

Voice-enabled agents require distinct conversational design patterns compared to text-based agents. Before committing to a voice use case, make sure that your planning accounts for these characteristics.

**Conversational design**

Voice interactions are fundamentally different from chat. Customers can't skim a response or re-read something they missed — every word is heard once, in real time. Design for the spoken experience from the start:

* Keep responses concise and conversational. Customers can't skip or scroll — long responses are dead air.
* Customers can't interrupt or skip greetings. Keep welcome messages short and avoid dynamic greetings that repeat information the customer already provided.
* In a pure-voice channel such as telephony, customers can't see menus, buttons, or structured text. Every interaction is spoken, heard once, in real time. On Enhanced Chat v2, this is less of a concern: because the agent runs in a chat widget, customers can still see and interact with menus, cards, and buttons, and can switch between voice and text during the conversation.
* Latency is noticeable. Customers expect near-immediate responses. If the agent needs time to look something up, it fills the gap verbally.

**Listen first, ask second**

Conversational design is where most voice agent implementations run into trouble. The most common failure pattern: an agent that opens with a long series of intake questions before attempting to help. Every question asked before attempting to help adds friction, and customers came to get something done.

Design your agent to attempt to help with what it already knows before asking for more information:

* Use context that's already available (a recognized phone number, a provided order number) before asking the customer to confirm it again.
* Ask one question at a time. Never front-load a multi-question intake sequence.
* Use closed questions. "Are you calling about an existing order?" is more effective than "How can I help you today?" It guides the conversation and improves recognition accuracy.
* If the agent can make a reasonable attempt to help, it does so. Ask for clarification only when genuinely needed.

**Use case complexity**

Start with routine, high-volume interactions — FAQs, order status checks, account lookups. Avoid high-acuity or high-stakes scenarios (such as medical triage or financial transactions) during initial deployment. Low-complexity use cases let you validate agent performance and build confidence within your company before expanding scope.

**Starting small: FAQ before actions**

The lowest-friction starting point for a voice agent is a pure FAQ layer — common questions the agent can answer without triggering any actions. FAQ responses are conversational, require no system integration, and give the agent immediate value from day one. Build the FAQ layer first, then expand to action-based use cases such as order lookup.

**Data and knowledge quality**

Agent performance in voice depends directly on the quality of the underlying data. Before building, audit your CRM records and Knowledge articles:

* Resolve duplicate records.
* Make sure that Knowledge articles are well-structured, current, and cover the scenarios the agent will handle.
* For voice use cases, response speed matters more than in chat — slow retrieval becomes conversational dead air. To keep retrieval fast and relevant, keep Knowledge articles focused on a single topic (broad articles that cover multiple subjects dilute relevance), and use clear headings and structure so content is indexed accurately. Where possible, confirm that your org's retrieval configuration uses a fast model for generation.

**Capacity**

The default limit for concurrent voice calls is 500 per org. Estimate your expected peak call volumes and confirm that they fall within this limit before go-live. Contact your Salesforce account executive if you require higher capacity.

**Legal and compliance**

Voice recording introduces legal obligations that don't apply to chat. Engage your legal team early:

* Define a voice recording retention policy before deployment. If full retention is restricted, establish a short troubleshooting window (for example, 24 hours).
* Plan how you'll protect PII and PHI in voice call transcripts. [Sensitive Data Rules](https://help.salesforce.com/s/articleView?id=service.messaging_block_sensitive_data.htm&type=5) can mask or redact sensitive data in transcripts, and [Shield Platform Encryption](https://help.salesforce.com/s/articleView?id=xcloud.security_pe_overview.htm&type=5) encrypts data at rest. Work with your security and legal teams to decide which controls you need and to set them up. For PHI, also confirm that your Salesforce Business Associate Agreement (BAA) covers the entire voice pipeline.

**Fallback design**

Always configure a fallback queue so customers are never left without a resolution path. Plan fallback handling for error scenarios, including cases where the agent can't respond, to prevent accidental disconnection.

### NTO's Business Challenge

To see how these considerations play out in practice, follow along as Northern Trail Outfitters works through them for a real use case. The rest of this section applies the same planning steps to NTO's voice agent, Pippin.

Northern Trail Outfitters sells outdoor apparel and gear across digital and in-store channels. Their customer service team handles a high volume of repetitive inbound contacts — most of them asking about order status, commonly referred to as "Where Is My Order" or WISMO. Customers want fast, conversational answers without waiting on hold or navigating a self-service portal.

By deploying a voice-enabled agent named **Pippin** on their digital storefront via Enhanced Chat v2, NTO aims to:

* Answer frequently asked questions immediately — without involving a service rep
* Let customers check order status by providing their phone number and order number
* Escalate to a human representative when the request is outside Pippin's scope

NTO starts with two jobs: answering FAQs (no actions required) and handling WISMO (order status lookup). These are high-volume, low-complexity, and keep customer identification light (no formal login, just a phone number to identify the customer and an order number to find the order), making them the ideal starting point.

**Why start here:** FAQ responses are pure conversation — no actions, no integrations, no customer identification. WISMO adds customer identification by phone number and an order lookup by order number, both with a low identification bar. Together they cover the majority of inbound contact volume while keeping the initial build simple and testable.

---

## Define Your Use Case

After identifying your use case ideas, flesh out each one so your company can assess and prioritize them. Focus on the project goals at this stage — not the technical solution.

### Identify the Jobs to Be Done

Describe the specific tasks the voice agent will perform during an interaction. Be precise — vague task descriptions lead to vague agent configurations. Many companies use the [Jobs to Be Done framework](https://trailhead.salesforce.com/content/learn/modules/jobs-to-be-done-framework-for-designers) to structure this exercise.

| Job to Be Done | Tasks |
| :---- | :---- |
| **FAQ** | Answer common questions about shipping, returns, store hours, and product availability — no system lookup required |
| **Order status (WISMO)** | Identify the customer by phone number · Accept an order number from the customer · Look up the order in Salesforce · Report the current status, estimated delivery date, and last tracking event |

### Determine the Scope

Start with the smallest unit of work that delivers value. An iterative approach lets you validate assumptions, manage risk, and scale gradually.

| Job to Be Done | Scope |
| :---- | :---- |
| **FAQ** | **Version 1 (MVP):** Answer high-frequency questions about shipping, returns, store hours, and product availability — no system lookup required. **Version 2:** Expand the FAQ library as new common questions are identified from conversation transcripts. |
| **Order status (WISMO)** | **Version 1 (MVP):** Identify the customer by phone number, then look up order status by order number. **Version 2:** Expand to include shipment tracking detail and estimated delivery updates. **Version 3:** Personalize responses for authenticated customers (account-level order history). |

> **What this guide covers:** This guide walks through Version 1 of both use cases: FAQ (no actions) and WISMO (identify the customer by phone number, then look up the order by order number). The versioning above shows how you can expand from there. Future expansions, such as authenticated lookups or deeper tracking integration, may be supported through additional skills or follow-on guidance.

### Define the Business Value

Set specific, measurable goals tied to outcomes — not features.

| Job to Be Done | Business Value |
| :---- | :---- |
| **FAQ** | Deflect high-volume repetitive contacts from the service team · Reduce average handle time · Increase first-contact resolution rate |
| **Order status (WISMO)** | Deflect order status calls without agent involvement · Reduce inbound call volume · Improve customer satisfaction by providing instant, accurate status updates |

### Evaluate Data Readiness

Confirm that your Salesforce org has the data the agent needs before committing to a use case. This is a preliminary gut-check to assess feasibility — not a full data audit. You'll dig deeper into data readiness when you define technical requirements.

AI agents perform well only when they're powered by trustworthy, high-quality data that's relevant to the business context. Don't commit to a use case until you've confirmed that the data can support it.

| Use Case | Data Source | Readiness |
| :---- | :---- | :---- |
| **FAQ** | Knowledge articles | Confirm that FAQ articles are current, accurate, and written in plain language the agent can present conversationally |
| **Order status (WISMO)** | Order and Contact records in Salesforce | Confirm that Contact records carry the phone numbers the agent uses to identify customers, and that order objects are populated with status, tracking, and estimated delivery fields the agent can retrieve by order number |

### Assess and Prioritize the Use Cases

After defining your use cases, assess the feasibility and impact of each and prioritize them on your AI roadmap. Consider factors such as data readiness, implementation complexity, and expected business value. Start with the use case that is the most feasible and delivers the most value — then expand from there.

See [AI Strategy](https://trailhead.salesforce.com/content/learn/modules/ai-strategy) for information about prioritization frameworks and how to incorporate Agentforce into your broader AI roadmap.

---

## Define the Technical Requirements

Before building, identify the technical foundation your voice agent needs. Key areas to explore include data, channels, routing and escalation, and security controls.

### Data

Starting an AI project requires data readiness: the data for the project is accurate, complete, available, accessible, and securely governed. When defining data requirements for your use case, assess data quality, confirm data is accessible to the agent, establish data governance, and create a plan for data analytics. See [AI + Data: Project Planning](https://trailhead.salesforce.com/content/learn/modules/ai-data-project-planning) for a full data readiness checklist.

### Channel Strategy

This guide uses **Enhanced Chat v2** as the walkthrough channel. Enhanced Chat v2 deploys the voice-enabled agent on a chat widget embedded in a web page or Experience Cloud site. On NTO's storefront, shoppers can speak with Pippin or switch to text at any point during the conversation.

Conversations are routed to the agent via Omni-Channel Flow. See [Deploy Your Agent to Channels](https://help.salesforce.com/s/articleView?id=ai.agent_parent_deploy.htm&type=5) to learn more about the different channel options.

### Routing and Escalation

AI agents sometimes escalate conversations to a service representative. Reasons for escalation can include company policy, brand requirements, security measures, risk management, or regulatory compliance.

During planning, define all the ways human decision-making and oversight will occur during the agent's work. Clear guidelines about when and how representatives step in make it easier to configure the right guardrails later: you state the escalation triggers in the agent's instructions during Build, and you configure the routing that carries out the handoff during Deploy.

Define your escalation criteria now — you'll put them in place across the Build and Deploy sections.

**NTO's escalation triggers:**

| Trigger | Escalation Path |
| :---- | :---- |
| Customer requests a human | Route to general customer service queue |
| Question outside Pippin's configured topics | Route to general customer service queue with conversation summary |
| Order not found or lookup fails | Offer to connect the customer with a service representative |

### Security Controls

Plan permissions and access before building.

* **Admin access**: To create and manage agents, you need the **Manage AI Agents** user permission and the required permissions for your [agent type](https://help.salesforce.com/s/articleView?id=ai.agent_setup_explore_types.htm&type=5), or the **Customize Application** user permission.
* **Agent access**: The voice agent operates as an agent user with a dedicated profile and role. The actions the agent can take depend on the permissions it's assigned. See [Best Practices for Agent User Permissions](https://help.salesforce.com/s/articleView?id=ai.agent_user.htm&type=5) to learn how to control what data your agent can access.
* **Customer access**: Pippin's FAQ and order status topics don't require formal authentication. FAQ answers need no customer identification at all. For order status, Pippin identifies the customer by phone number, then looks up their order by order number. Both are low-friction and reliable in a voice interaction, and neither requires a customer to spell out an email address.

> **Voice authentication recommendation:** This guide doesn't use an email address as an authentication method, and we don't recommend it for voice. Asking a customer to spell out their email address is highly error-prone. Characters like A and 8, B and D, or M and N are easily confused in speech recognition. Prefer order number, account number, phone number, or date of birth instead. See [Maintain Trust with Agentforce Actions](https://help.salesforce.com/s/articleView?id=service.service_agentforce_trusted_private_actions.htm&type=5) for guidance on configuring authentication for sensitive actions.

---

## Salesforce Considerations for Your Voice Agent

Your voice agent runs alongside your current Salesforce configuration and architecture. Consider these Salesforce-specific factors as you plan your implementation.

### Licensing and Provisioning

Each Agentforce project is unique, so the Salesforce products and features you need vary depending on your use case. This guide uses an Agentforce Service Agent deployed on Enhanced Chat v2 with voice enabled. Here's what's required:

**Agentforce Service Agent with Enhanced Chat v2**
- Available in: Lightning Experience
- Available in: Enterprise, Performance, Unlimited, and Developer Editions with Foundations or Agentforce 1 Editions
- Access to some standard agent actions requires additional add-on licenses

**Voice on Enhanced Chat v2**
- Requires the **Agentforce Voice Add-on license**
- Available in: Enterprise, Unlimited, and Developer Editions with Foundations or Agentforce 1 Editions, and [Salesforce Voice add-ons](https://help.salesforce.com/s/articleView?id=service.voice_editions.htm&type=5)

> **Voice needs the Agentforce Voice Add-on license.** Voice on Enhanced Chat v2 requires the Agentforce Voice Add-on license on a Foundations or Agentforce 1 edition. **If you're not sure whether your org is licensed for voice, contact your Salesforce account executive or admin before you build** (see [Get Started](01-get-started.md)).

### Billing and Consumption

Agentforce uses a consumption-based pricing model. The following usage types apply to this implementation:

| Usage Type | What's Metered |
| :---- | :---- |
| **Standard Action** | Number of standard (out-of-the-box) actions called by the agent in a text conversation. Each action call is metered as one standard action. |
| **Custom Action** | Number of custom actions called by the agent in a text conversation. Each action call is metered as one custom action. |
| **Standard Voice Action** | Number of standard actions executed by the agent in a voice conversation. |
| **Custom Voice Action** | Number of custom actions called by the agent in a voice conversation. |

Note: FAQ responses that don't trigger an action are not metered. For more information, see [Flex Credits and Usage Types](https://help.salesforce.com/s/articleView?id=ai.usage_flex_credits.htm&type=5).

### Requirements

Enable these products and features in your Salesforce org:

* Einstein Generative AI
* Agentforce
* Data 360

### Existing Automation

Agent actions in Agentforce are built on top of existing Salesforce platform technology — flows, Apex, and prompt templates. Start cataloging any existing automations related to your use case that you can repurpose as agent actions.

For NTO's use case, catalog any existing order-lookup flows, Apex, or integrations that retrieve order status, tracking, and delivery data — you can reuse these as the agent action behind WISMO. Reusing existing automation reduces build time and helps the agent integrate cleanly with existing business processes.

---

## Define Your Guardrails

Autonomous AI has inherent risks that you can mitigate, including security threats, data breaches, reputational harm, inaccurate or fabricated responses, and issues with transparency and accountability. Voice interactions carry additional risks specific to the audio modality. By building on the Agentforce platform, you have access to built-in guardrails and controls to help mitigate risk.

When planning a voice agent, discuss potential risks with key stakeholders and use the platform to define risk mitigation strategies. A robust guardrail strategy gives your team confidence that the agent is safe to deploy.

### Frame Conversations About Risk

Use the People, Business, Technology, and Data framework to surface risks — with voice-specific considerations included.

| Category | Considerations |
| :---- | :---- |
| **People** | **Empowerment**: Roles and responsibilities, training, and upskilling for agents who handle escalations. **Culture and practice**: Change management for service teams. **Voice-specific**: Shoppers may not realize they're speaking to an AI. Customers in noisy environments (outdoors, commuting) may experience poor speech recognition. |
| **Business** | **Value**: Benefits, objectives, KPIs, and metrics. **Operations**: Org structure, capability management, AI governance, DevOps strategy. **Voice-specific**: Agent scope must be clearly bounded — an order-status assistant asked to handle returns or complaints must redirect gracefully. Escalation handoffs must preserve conversation context. |
| **Technology** | **AI tooling**: AI infrastructure, applications, APIs, prompts, security safeguards. **AI models**: Model selection, training, management, cost. **Voice-specific**: TTS voice must match NTO's brand tone. ASR accuracy varies by accent and noise level — outdoor retail customers may call from field conditions. Response length must be optimized for voice delivery. |
| **Data** | **Quality**: Accuracy, completeness, accessibility, recency. **Strategy**: Data management, infrastructure, governance, analytics. **Voice-specific**: Order status and tracking data must be current and accurate. Stale or missing order data erodes customer trust — and is harder to recover from in a spoken conversation, where the customer can't scan the screen to double-check. |

### Identify Risks and Concerns

Using the framework above, identify the specific risks for your use case. Here are the risks and concerns NTO's stakeholders identified.

| Category | Risks |
| :---- | :---- |
| **People** | **AI transparency**: Shoppers don't know they're talking to an AI and feel deceived when they find out. **Recognition failure**: Speech recognition fails for customers with strong accents or in noisy outdoor environments. **Agent rejection**: Customers don't want to interact with a voice agent and insist on a human immediately. |
| **Business** | **Scope creep**: Shoppers ask Pippin about order status, returns, or complaints — outside its configured scope. **Escalation gaps**: Handoffs from Pippin to a service representative are unclear, slow, or lose conversation context. **KPI impact**: Existing service team metrics are affected by the introduction of an AI agent. |
| **Technology** | **Response length**: Agent responses are too long to be comfortable to listen to — customers tune out or hang up. **Latency**: Pippin pauses too long while looking up an order, creating dead air. **Order lookup failure**: The order-lookup action fails or returns no match mid-conversation, leaving the customer without a resolution path. |
| **Data** | **Stale order data**: Order status or tracking details are out of date, so Pippin reports the wrong status. **Missing FAQ coverage**: Knowledge articles don't cover common questions customers ask, so Pippin can't answer. **Privacy**: Order details shared during a lookup must be handled per NTO's privacy policy. |

Note that this list isn't exhaustive — every use case involves its own unique risks and concerns.

### Define Risk Mitigation Strategies

After cataloging the risks and concerns, develop mitigation strategies for each risk. Categorize each guardrail as a People, Business, Technology, or Data guardrail to clarify ownership and implementation path.

Here are mitigation strategies for two of the high-priority risks NTO identified.

| Category | Risk | Mitigation Strategies |
| :---- | :---- | :---- |
| **People** | **AI transparency**: Shoppers don't know they're talking to an AI and feel deceived. | **People guardrail**: Create a communication strategy that sets expectations about AI on NTO's storefront. **Technology guardrail**: Design Pippin to identify itself as an AI assistant in its opening message. For example: *"Hi, I'm Pippin, NTO's AI assistant. I can help with common questions or check your order status. What can I do for you?"* **Technology guardrail**: Configure Pippin to reaffirm its AI nature if a shopper directly asks whether they're speaking with a person. |
| **Business** | **Escalation gaps**: Handoffs from Pippin to a human service representative are unclear or lose conversation context. | **Business guardrail**: Define the criteria and context for escalation from Pippin to a service representative. Document these before building, and configure them in the Deploy stage. **Technology guardrail**: Configure Agentforce to pass a conversation summary to the service representative at handoff, so the representative doesn't have to ask the customer to repeat themselves. **Technology guardrail**: Build an [escalation path](https://help.salesforce.com/s/articleView?id=ai.service_agent_escalation.htm&type=5) triggered by keywords ("speak to a person", "talk to someone"), shopper frustration signals, or out-of-scope requests. State these triggers clearly in Pippin's agent instructions. |

When you've documented your risks and guardrails, you're ready to move on to the Build stage.
