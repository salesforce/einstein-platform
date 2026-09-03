# Build Your Voice Agent

The Build stage is where you create your agent, configure its voice settings, write its instructions, add actions, and set up the Enhanced Chat v2 channel. By the end of this section, Pippin is running in your org and ready to test.

Here's what you'll do in this section:

1. Create the agent
2. Set up your subagents
3. Customize your subagents
4. Build phone identification
5. Ground the agent with data
6. Set up the Enhanced Chat v2 channel
7. Configure voice persona and pronunciation settings

Steps 2 through 5 shape how Pippin thinks and responds. Throughout them, you'll write the agent's instructions with voice in mind — because customers hear Pippin's responses rather than read them, its instructions need a different approach than chat.

---

## Before You Start

Make sure you've completed the following before building:

- Access to an org licensed for Agentforce Voice, plus the permissions you need to build (see [Get Started](01-get-started.md))
- Enabled Einstein Generative AI, Agentforce, and Data 360 in your org (see [Get Started](01-get-started.md))
- Reviewed NTO's use case, scope, and escalation strategy (see [Ideate](02-ideate.md))
- Have admin access to your org

---

## Step 1: Create the Agent

Create the agent from the Agentforce Service Agent template and give it an identity, then configure its core settings — description, welcome and error messages, agent-level instructions, and language — and grant its agent user secure access to your data. You'll use the new Agentforce Builder throughout.

> **Note:** Voice agents have limited capabilities in the legacy Agentforce Builder. Use the new builder for the best experience.

1. From the App Launcher, enter **Agent**, and then select the **Agentforce Studio** app.
2. On the Agents tab, click **New Agent**.
3. Select the **Agentforce Service Agent** template.
4. Enter the agent's name (for example, **Pippin**) and the developer name.
5. Select or create an **Agent's User Record**, and then click **Let's Go**. Every service agent operates as a dedicated Salesforce integration user — a separate identity the agent uses to access data and take actions securely. You'll configure this user's permissions in a later step.

### Configure Agent Details

> **Agentforce Builder layout:** You work across two areas. The **Explorer panel** on the left is where you select what to configure. Click an item there and its fields open in the **canvas** on the right, where you enter and save your changes. The Explorer panel groups items under **Settings** (Agent Settings, System Messages, Agent-Level Instructions, Language Settings, and, after you add a voice channel, Voice Settings) and **Subagents**.

6. Under **Settings** in the Explorer panel, click **Agent Settings**. The **Agent Details** page opens in the canvas.
7. In the **Description** field, enter the text below. It's a concise summary of what the agent does and the types of requests it handles, and the agent router uses it, along with subagent names and descriptions, to select the right subagent for each conversation. Enter this description: *"Answers common customer service questions about NTO's products, return policies, and shipping. Helps customers check the status of their orders. Escalates complex issues to a human service representative."*
8. Click **Save**.

### Configure System Messages

9. Under **Settings**, click **System Messages**. The Welcome Message and Error Message fields open in the canvas.
10. Configure the following:
   - **Welcome Message:** Introduce the agent as an AI assistant so customers know they aren't speaking with a human. Keep it short, since customers are ready to talk, not to listen. Enter this message: *"Hi, I'm Pippin, NTO's AI assistant. I can help with order status, returns, and product questions. How can I help you?"*
   - **Error Message:** The message shown when a non-recoverable system error occurs. Enter this message: *"Something went wrong. Please try again."*
11. Click **Save**.

### Configure Agent-Level Instructions

12. Under **Settings**, click **Agent-Level Instructions**. The **System Instructions** field opens in the canvas.
13. In **System Instructions**, set the agent's overall persona and ground rules. These apply across all subagents unless overridden at the subagent level. Enter this text: *"You're Pippin, a customer service AI assistant for Northern Trail Outfitters (NTO). You help customers check the status of their orders and answer questions about NTO's products, return policies, and shipping. Always respond in a friendly, conversational tone. Keep responses short and clear, since customers are speaking with you, not reading a screen. If a customer needs help beyond what you can provide, offer to transfer them to a service representative."*
14. Click **Save**.

### Configure Language Settings

15. Under **Settings**, click **Language Settings**. Confirm the default language is English. This guide uses English throughout, and English is already set as the default, so no change is needed here. If you later enable other languages, make sure they're supported by Agentforce Voice and by your chosen voice persona.

> **NTO example:** Pippin's welcome message identifies it as an AI assistant, signals what it can help with, and hands the conversation back to the customer, all in three short sentences. Customers know immediately what to expect.

### Add Permissions to the Agent User

When you created the agent, Salesforce created a new agent user — a unique user record the agent uses to securely access data and take actions. The agent user is created with minimal access so that your agent is secure by default. It starts with these properties:

- **Profile:** Einstein Agent User
- **User License:** Einstein Agent
- **Name:** EinsteinServiceAgent User
- **Permission Sets:** Agentforce Service Agent Secure Base, plus a permission set created for your agent during guided setup and named for the agent (for example, **Agentforce Agent Pippin Permissions**)
- **Permission Set Group:** AgentforceServiceAgentUserPsg, which contains the Agentforce Service Agent User, Data Cloud User, and Prompt Template User permission sets
- **Permission Set Licenses:** Agentforce Service Agent User, Data Cloud, Einstein Prompt Templates

Before Pippin can look up orders and answer questions from your data library, assign the required permission set, then confirm the agent user has the right role and object permissions.

You manage the agent user's access from the **Agent Access** page in Agentforce Builder: in the Explorer, under **Settings**, click **Agent Access**. The page has two parts. **Agent's User Record** shows the agent user this agent runs as (for NTO, **EinsteinServiceAgent User**). **Permissions and Profiles** is where you assign access: the **Permission Sets** and **Permission Set Groups** tabs list what's assigned, let you add more, and open any assigned set so you can edit what it grants. Start here whenever you need to add a permission set or edit an existing one for the agent.

#### Assign the Agentforce Service Agent User Permission Set

The **Agentforce Service Agent User** permission set often isn't assigned to the agent user automatically. If it's missing from the agent user's assigned permission sets, add it from the **Agent Access** page so the agent can run its actions.

1. On the **Agent Access** page, under **Permissions and Profiles**, open the **Permission Sets** tab.
2. Check the list for **Agentforce Service Agent User**. If it's already there, you're set. If not, click **Add permission sets**.
3. In the **Add permission sets** dialog, search for and select **Agentforce Service Agent User**, then click **Add**. It then appears in the agent user's assigned permission sets on the **Agent Access** page.


#### Assign the Agent User a Role

Roles grant users record access through sharing rules and role hierarchies. In a production org, you'd assign the agent user a role that lets it view the records it interacts with — for NTO, that's Order and Contact records.

> **If your org has no role hierarchy set up yet,** you need to create one before you can assign the agent user a role. For this guide's walkthrough, you can continue without a role — the Order and object permissions you'll add below are what let Pippin access the records it needs. When you build for production, set up a role hierarchy and assign the agent user the least-privileged role that still gives it access to the objects it needs.

> **Tip:** If you have multiple agent users, they share the same full name. Identify them by username, or edit the agent user's record to give it an identifiable first name.

#### Review the Agent User's Access and Add Any Additional Permissions

In addition to the access granted by default and by role assignment, most agent users need:

- [Permissions required to run agent actions](https://help.salesforce.com/s/articleView?id=ai.agent_actions_common_perms.htm&type=5)
- The minimum level of object permissions for each object the agent interacts with through flows, Apex, or prompt templates — when you add a new action, make sure the agent user has access to the objects it references
- Channel-specific permissions, depending on how you deploy the agent — for this guide's Enhanced Chat v2 deployment, this is already covered (see the Enhanced Chat v2 row below)

For NTO's use case (WISMO order lookups grounded in a data library, deployed on Enhanced Chat v2), review the agent user's access against this table:

| Feature Your Agent Uses | Required Permissions | Access Granted By |
|---|---|---|
| Agent actions that run flows (for example, Identify Customer By Phone) | App Permission: Run Flows | Profile: Einstein Agent User |
| Agent actions that run prompt templates (for example, Answer Questions with Knowledge) | System Permission: Execute Prompt Templates | Add the **Agentforce Service Agent User** permission set if it isn't already assigned |
| Agentforce Data Library | Permission Set: Data Cloud User | Permission Set Group: AgentforceServiceAgentUserPsg (assigned by default) |
| Order Object | Order Object: Read | Add by editing the agent's permission set (for example, **Agentforce Agent Pippin Permissions**) |
| Contact Object | Contact Object: Read, View All Records | Add by editing the agent's permission set (for example, **Agentforce Agent Pippin Permissions**) |
| Enhanced Chat v2 Channel Access | Messaging Session Object: Read, Edit | Permission Set: Agentforce Service Agent Secure Base (assigned by default) |

To add or expand object permissions, edit the permission set created for your agent during guided setup — the one named for the agent, such as **Agentforce Agent Pippin Permissions**. (If you'd rather create a separate permission set for the agent user, make sure it's associated with the Einstein Agent license and the Einstein Agent User profile.)

Add the Order and Contact object permissions NTO's WISMO use case needs:
1. On the **Agent Access** page, under **Permissions and Profiles**, on the **Permission Sets** tab, click **Agentforce Agent Pippin Permissions** (the permission set named for your agent). The permission set opens in a new browser tab.
2. In the **Apps** section, click **Object Settings**.
3. Click **Orders**.
4. Click **Edit**.
5. Under **Object Permissions**, select **Read**.
6. Click **Save**.
7. Return to **Object Settings**, and click **Contacts**.
8. Click **Edit**.
9. Under **Object Permissions**, select **Read** and **View All Records**.
10. Click **Save**.

> **Least privilege:** Grant only the object permissions the agent's actions actually need. NTO's WISMO lookup only reads Order and Contact records, so Read is enough. It doesn't need Create, Edit, or Delete on these objects.
>
> Contact also gets **View All Records** because storefront shoppers are unauthenticated, so the lookup runs in the agent user's own context and the agent user must be able to read any caller's Contact, not just records it owns. View All Records is a broad grant. If your org restricts access to Contact data, use a tighter approach: limit record access with action- and subagent-level filters, and grant the agent user access through sharing rules. See **Best Practices for Agent User Permissions** (linked below) for both approaches.

> For a full list of permissions required for each agent action and channel, see [Best Practices for Agent User Permissions](https://help.salesforce.com/s/articleView?id=ai.agent_user.htm&type=5).

> **Production security: scope order lookups to verified customers.** On an unauthenticated channel like Enhanced Chat v2, the agent runs as the agent user, so context variables (such as the caller's contact ID) identify the customer but don't restrict what data the agent can reach. For this guide's walkthrough you don't need to set this up. But before you deploy to production, scope any action that returns private customer data, like NTO's order lookup, so it returns records only for the verified customer. Salesforce's standard [Customer Verification](https://help.salesforce.com/s/articleView?id=ai.service_agentforce_customer_verification.htm&type=5) stores the verified ID in a `VerifiedCustomerId` variable you can filter on; see [Agent Script Pattern: Enforce Business Rules with Filters](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-filtering.html).

---

## Step 2: Set Up Your Subagents

In this step, you'll learn how subagents work, pick up the voice writing principles you'll apply throughout the build, and remove the subagents NTO doesn't need. Agent instructions tell Pippin how to behave, what to say, and how to handle different situations. For voice, those responses must be conversational, concise, and natural when spoken aloud.

### About Subagents

Subagents are the building blocks of your agent's conversational logic. Each subagent handles a specific type of customer interaction. When a customer sends a message, the Agent Router compares it against the names and descriptions of all available subagents and routes the conversation to the best match.

Each subagent has three key elements:

| Element | What it is | How the agent uses it |
|---|---|---|
| **Name and Description** | A short name and 1–3 sentence description of what the subagent handles and which customer requests it should respond to | The Agent Router uses these, along with conversation history, to select the right subagent for each turn |
| **Reasoning Instructions** | Guidelines for how the agent should behave within this subagent — written in plain language or Agent Script | Used to construct the prompt sent to the LLM; resolved in order, top to bottom |
| **Reasoning Actions** | The actions the agent can take during a conversation — such as looking up an order or answering from a knowledge source | Sent to the LLM alongside the instructions; the LLM decides which to run based on what the customer needs |

> **Learn more about subagents.** For a full reference on the parts of a subagent, see [Subagents](https://help.salesforce.com/s/articleView?id=ai.agent_topics.htm&type=5). For guidance on designing subagents and actions before you build, see [Design the Subagents and Actions](https://help.salesforce.com/s/articleView?id=ai.agent_plan_action_design.htm&type=5).

### Where You'll Work

You edit each subagent from the **Subagents** section of the Explorer panel. Click a subagent to open it on the canvas, where you'll see its Name, Description, Reasoning Instructions, and Reasoning Actions. Throughout this step, you'll open a subagent, edit these fields, and save — the subsections below walk you through each one.

> **Referencing an action inside Reasoning Instructions.** When an instruction needs to name a specific action (for example, "call escalate_to_human"), don't type the action name as plain text. Type **`@`** where the action name goes, and Builder opens a picker listing the subagent's available actions; select the one you want. This inserts it as a linked action reference (it renders differently from surrounding text), which is how the out-of-the-box instructions reference actions and how Agentforce reliably ties the instruction to the actual action. You'll use this anywhere the steps below have you reference an action by name.

> **A note on views.** The canvas is part of **Canvas view**, which summarizes your agent's configuration in readable blocks. Agentforce Builder also has a **Script view** that shows the underlying Agent Script: the language Agentforce uses to combine natural language instructions with programmatic logic. Both views always reflect the same configuration, so if you switch views by accident, nothing has changed. This guide works in Canvas view throughout, with one deliberate exception: setting rotating loading phrases on the order-lookup action (later in this section) needs Script view, because the Canvas loading-text field accepts only a single value. To go deeper on Agent Script and deterministic agent behavior, see [Get Started with Agent Script](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-script.html). For a concrete before/after showing how Agent Script can make instructions more reliable (expressing branching logic as explicit `if`/`else` blocks rather than natural-language prompts the LLM has to interpret, which reduces instruction overload and latency), see [Example: More Reliable Agent Instructions with Agent Script](https://help.salesforce.com/s/articleView?id=ai.agent_example_script_before_after.htm&type=5).

### Voice Writing Principles

Keep these universal rules in mind before writing any subagent instructions:

- **Keep responses short.** Customers can't skim a spoken response. Aim for 1–3 sentences per turn — if there's more to say, break it into turns.
- **Make one direct ask at a time.** Ask for one thing, and don't offer alternative paths in the same breath — an aside like *"…or I can look up your recent orders instead"* tacked onto the ask reads fine on screen but runs too long spoken. If there's a fallback, save it for the next turn, after the customer responds.
- **Use closed-form questions.** "Are you calling about an order?" is faster and clearer than "How can I help you?" — it reduces the chance of a misrouted response.
- **Format numbers and symbols for speech.** The text-to-speech (TTS) engine reads what it sees:
  - Times: *"10 a.m."*, not *"10:00"*
  - Currency: *"one hundred dollars"*, not *"$100.00"*
  - URLs: Strip *https://* — the engine reads the protocol literally
- **Read identifier numbers back, one digit at a time.** When the customer gives a number that identifies them or their request — a phone number, order number, account number, or confirmation code — confirm it by repeating it digit by digit (*"5-5-5-1-2-3-4"*), not as a grouped quantity, and wait for a clear "yes" before acting on it. A single misheard digit can fail a lookup or match the wrong record. The Order Inquiries subagent puts this in place in [Configure the WISMO (Where Is My Order) Subagent](#configure-the-wismo-where-is-my-order-subagent) (step 5); apply the same rule to any subagent that takes a spoken identifier.
- **Confirm transfers before handing off.** Before escalating to a human, the agent should tell the customer a transfer is coming and give them a chance to decline — you'll add this to the Escalation subagent in [Configure the Escalation Subagent](#configure-the-escalation-subagent).

Subagent-specific guidance, including latency cues, verification rules, and end-of-conversation prompts, is called out in each section below.

> **How much instruction is enough?** These voice rules sit on top of the general principles for writing subagent instructions — keep them minimal, give the agent business context, use consistent language, and be explicit about any required sequence. On examples specifically: a few concise, representative examples outperform long lists, which add latency without improving accuracy. For the full set of principles, see [Best Practices for Subagent Instructions](https://help.salesforce.com/s/articleView?id=ai.copilot_topics_instructions.htm&type=5).

### Remove Unnecessary Subagents

The Agentforce Service Agent template includes subagents for a broad range of customer service scenarios. Start by removing the ones that don't apply to NTO's use case. Pruning to a lean set isn't just tidiness: on voice, the fewer subagents and actions the agent has to reason over each turn, the faster and more decisive its spoken responses are, and the less it falls back on "let me check" holding phrases. Expose only what the use case needs.

For NTO's use case, keep exactly these six subagents:

- **Agent Router**
- **General FAQ**
- **Order Inquiries**
- **Escalation**
- **Off Topic**
- **Ambiguous Question**

Remove every other subagent the template includes, whatever it's named. The Agentforce Service Agent template evolves over time, so your org may show subagents not listed here (for example, ones for account management, delivery issues, customer verification, case management, or reservations). If it isn't in the keep-list above, delete it.

1. In the **Subagents** section of the Explorer panel, hover over a subagent that isn't in the keep-list.
2. Click the **more options** icon, and then click **Delete**.
3. When prompted to confirm, click **Yes, Delete**.
4. Repeat for every subagent that isn't one of the six above.

When you're done, your agent should contain only those six subagents and nothing else.

5. Click **Save** at the top of the builder to save your changes.

> You can always add subagents back later. To browse available subagents, hover over any subagent in the Explorer panel and click **Add from Asset Library**.

---

## Step 3: Customize Your Subagents

With the unused subagents removed, customize the ones that do NTO's work: the FAQ subagent for policy questions, the Order Inquiries subagent for order-status lookups, and the Escalation subagent for handoffs to a human. You'll also open a verification gate on the Agent Router that would otherwise keep Order Inquiries out of every conversation.

### Customize the FAQ Subagent

Start with the General FAQ subagent — it handles common questions without triggering any actions, which makes it the lowest-friction topic to get right first.

The General FAQ subagent uses the **Answer Questions with Knowledge** action to answer customer questions from your data library. The out-of-the-box configuration is a strong starting point. Adjust it to reflect NTO's specific scope.

1. From the Explorer panel, click **General FAQ** to open it on the canvas.
2. Leave the **Name** and **Description** fields as-is. Keep the default name **General FAQ** — the out-of-the-box description is generic enough to cover NTO's scope, and keeping the default name avoids confusion later: Testing Center reports results by the subagent's underlying developer name (`GeneralFAQ`), which a display-name change doesn't affect, so renaming here would make your test results reference a name you no longer see in the builder.
3. In the **Reasoning Instructions**, append examples of the kinds of questions NTO customers typically ask. Add this text: *"Here are some examples of commonly asked questions: 'What is your return policy?', 'Do you offer free shipping?', 'Do you offer international shipping?'"* Avoid order-status examples here — questions about a specific order belong to the Order Inquiries subagent (see below), and including an order-tracking example in this list causes the Agent Router to misroute order lookups to FAQ.
4. Add a guardrail at the bottom of the **Reasoning Instructions** to keep the agent focused: *If the customer asks about something outside of NTO's products, orders, and policies, let them know you can't help with that and offer to escalate.*
5. Add a closing prompt to the **Reasoning Instructions**: *"At the end of each response, ask: 'Is there anything else I can help you with?'"*
6. Save your changes.

> **Voice guidance for General FAQ**
> - **Keep answers short.** The Answer Questions with Knowledge action returns a full text response — the agent will read it verbatim unless instructed otherwise. In the subagent instructions, add: *"Keep your answer to 2–3 sentences. If the customer needs more detail, invite them to ask a follow-up."*

### Configure the WISMO (Where Is My Order) Subagent

The Order Inquiries subagent handles order status lookups. You'll configure it to look up orders by order number, with no email address required.

Two out-of-the-box behaviors work against this design, and both need fixing before Order Inquiries will reliably route and resolve without email: an order-lookup action that requires a Contact record resolved through email, and a hidden verification gate on the Agent Router that keeps the router from selecting Order Inquiries at all. The steps below cover the Order Inquiries subagent configuration; [Replace Email Identification with Phone Number](#replace-email-identification-with-phone-number) covers the underlying action fix, and [Open the Verification Gate on the Agent Router](#open-the-verification-gate-on-the-agent-router) covers the routing condition — a separate fix on a different subagent.

1. From the Explorer panel, click **Order Inquiries** to open it.
2. Update the description so the Agent Router can clearly distinguish it from General FAQ. The out-of-the-box description is too broad and often loses to FAQ on order-status requests. Replace it with this description, which names the trigger explicitly: *"Handles any request to look up, check, track, or cancel a specific order — including order status, shipping status, and cancellations. Requires retrieving live order data; does not answer general policy questions about shipping or returns."*
3. Confirm the order-lookup actions are included in the subagent's reasoning actions. Out of the box, Order Inquiries ships with **Get Order by Order Number**, **Get Orders by Contact**, **Cancel Order**, **Answer Questions with Knowledge**, and **Identify Customer By Email**. Confirm at least **Get Order by Order Number** is present: it's the action that retrieves a specific order from the number the customer provides. If it's missing, hover over the subagent, click **Add from Asset Library**, and search for and add it. If it isn't in the Asset Library either, see [If Get Order by Order Number Isn't in the Asset Library](#if-get-order-by-order-number-isnt-in-the-asset-library) below. Leave **Get Orders by Contact**, **Cancel Order**, and **Answer Questions with Knowledge** in place. You'll deal with **Identify Customer By Email** separately in [Replace Email Identification with Phone Number](#replace-email-identification-with-phone-number); leave it for now.
4. In the **Reasoning Instructions**, make two edits:
   - **Replace the email-identification line.** Find the default line: *"If the customer is not known, always ask for their email address and get their Contact record before running any other actions."* Replace it with: *"If the customer is not known, ask for their phone number to identify their Contact record. Then ask for the order number to look up the specific order. If the customer does not have their order number, use their identified Contact record to look up their recent orders, then read the list back so they can choose the right one. Never ask for an email address."* Order number and phone number aren't interchangeable here: phone number identifies the customer, order number identifies which order to retrieve, and the lookup action requires both. The "if the customer does not have their order number" sentence is what makes the no-order-number path work; see the callout below.
   - **Remove the scheduling line.** Find and delete the default line: *"When scheduling changes are requested, ask the customer for a date that they would like the delivery scheduled and look up available time slots."* Order Inquiries has no scheduling or time-slot action to back this — the agent would offer to reschedule a delivery and then have nothing to fulfill it, which is worse on voice, where a confident promise with no follow-through is especially jarring. Rescheduling is also outside the WISMO scope (look up, track, cancel). Leave the remaining default instructions in place.
5. Add a number confirmation instruction to the **Reasoning Instructions**: *"After the customer provides a phone number or order number, read it back to confirm before using it, and never say it as a single run-together number. Format it with dashes so the digits are spoken clearly, with natural pauses between groups. For example: 'I have your number as 555-123-4567. Is that right?' Correct any mistakes before proceeding."* This matters more than it might seem: phone number is now how the agent identifies the customer's Contact record, so a single misheard digit doesn't just produce an awkward correction later, it silently fails the lookup or, worse, matches the wrong customer's record. Reading the number back one digit at a time catches transcription errors before they reach the identification action.
6. Add a voice-specific intake instruction to the **Reasoning Instructions** (see the *Voice guidance for Order Inquiries* callout below for the reasoning):
   - **Closed-form intake:** *"Ask for the order number directly (for example, 'Can you give me your order number?') rather than an open-ended question like 'How can I help you with your order?'"*
7. Set rotating holding phrases on the order-lookup action, so the customer hears a natural filler instead of dead air while the lookup runs. Set this as **loading text on the action** rather than as a Reasoning Instruction: loading text is deterministic (it fires exactly when the action runs and doesn't depend on the agent choosing to say it), and it can rotate through several phrasings so repeated lookups don't sound like the same robotic stall. Entering more than one phrasing requires **Script view**, because the Canvas loading-text field takes only a single value. This is the one place in this guide you leave Canvas view (see the *A note on views* callout earlier in this section).
   a. Use the view toggle to switch to **Script view**.
   b. Find the **`GetOrderByOrderNumber`** action and confirm **`include_in_progress_indicator`** is set to **`True`** (the same as turning on *Show loading text for this action* in Canvas view).
   c. Set **`progress_indicator_message`** to three variations separated by `\n`. Each `\n` begins a new phrasing that the agent rotates through, so no two consecutive lookups sound identical: `Let me find that for you.\nOne moment while I pull up your order.\nChecking on that order now.`
   d. Switch back to **Canvas view**. Both views reflect the same configuration, so the change is already applied to the agent.
8. Save your changes.

> **Avoid subagent overlap.** The Agent Router selects a subagent by comparing the customer's message against every subagent's name, description, and reasoning instructions. If General FAQ's reasoning instructions also mention tracking or order status (for example, in the list of example questions from step 3 of [Customize the FAQ Subagent](#customize-the-faq-subagent)), the router can misroute order-specific requests to FAQ instead of Order Inquiries. Keep FAQ's example questions and Order Inquiries' description non-overlapping: FAQ covers policy questions, Order Inquiries covers anything tied to a specific order. For more on how the router compares a customer's message against each subagent's name and description to pick one, see [Subagent Classification and Routing](https://help.salesforce.com/s/articleView?id=ai.agent_topics_routing.htm&type=5).

> **Voice guidance for Order Inquiries**
> - **Manage latency with rotating loading text.** Order lookups take a moment. Step 7 above sets the holding phrase as **loading text on the order-lookup action** (in Script view, as three `\n`-separated variations), not as a Reasoning Instruction. Loading text is deterministic and fires exactly when the action runs, so it reliably prevents dead air, and rotating the phrasings keeps repeated lookups from sounding like the same robotic stall. The same `progress_indicator_message` field exists on **Get Orders by Contact** if you want to cover the no-order-number path the same way.
> - **Use closed-form questions for intake.** Step 6 above instructs the agent to ask for the order number directly (*"Can you give me your order number?"*) rather than an open-ended prompt like *"How can I help you with your order?"*
> - **Confirm numbers by reading them back, not by reciting them fast.** Step 5 above adds this as an explicit Reasoning Instruction — don't skip it. If a confirmation needs to include a long reference number, offer to text it instead of speaking the whole string.
> - **Why step 4 removes email address as a verification method.** Spelling out an email letter by letter is highly error-prone via voice: letters like A/8, B/D, and M/N are easily confused by speech recognition. Step 4 above replaces the out-of-the-box email-first instruction with phone number for this reason; no further action needed here.
> - **Format numbers with dashes so they're spoken digit-by-digit.** Text-to-speech reads a run-together number as a single quantity, so step 5 has the agent format phone and order numbers with dashes (555-123-4567). The dashes act as pacing cues, so the digits are spoken clearly with pauses between groups, which is what lets the customer catch a wrong digit. It also reads naturally if the customer is in text rather than voice.

#### Why the "No Order Number" Branch Matters

> Order Inquiries ships with two lookup actions: **Get Order by Order Number** (retrieves one specific order) and **Get Orders by Contact** (lists all orders on an identified Contact). Many customers won't have their order number handy: for them, listing recent orders off their phone-identified Contact is the whole point. But the agent will only select **Get Orders by Contact** if its Reasoning Instructions tell it *when* to reach for that path. The action's own description is purely mechanical ("Returns a list of orders associated with a given contact record"): it says what the action does, not when to use it, so on its own it gives the agent no cue for the no-order-number scenario. Without the "if the customer does not have their order number" sentence in step 4, the instructions dead-end at "ask for the order number," the agent keeps insisting on one, and **Get Orders by Contact is never selected at all**, not a failed action call, but an action the agent never considers. The added sentence supplies the missing trigger.

#### If Get Order by Order Number Isn't in the Asset Library

**Get Order by Order Number**, **Get Orders by Contact**, and **Cancel Order** are standard order-management actions that come with the **Agentforce Service Agent**. If you created your agent from the Agentforce Service Agent template in [Step 1](#step-1-create-the-agent), they're already in the Order Inquiries subagent, and in the **Add from Asset Library** picker if you ever need to re-add one.

If **Get Order by Order Number** isn't listed in Order Inquiries *and* doesn't appear when you search **Add from Asset Library**, your org doesn't have these standard order actions available. The order lookup this guide builds depends on that action, so the walkthrough can't be completed as written until it's available. Build the walkthrough in an org that includes the Agentforce Service Agent's standard order actions and has order records the agent can retrieve, the same kind of org the guide's NTO example assumes. If you aren't sure whether your org includes them, confirm with your Salesforce admin or account executive before you continue.

This guide doesn't build a substitute order-lookup action, so there's no workaround that skips the standard one. Getting your org set up with the standard order actions is the path forward.

### Configure the Escalation Subagent

The Escalation subagent hands the conversation off to a live human agent. Out of the box it calls the `escalate_to_human` action and offers to log a support case if the handoff fails. You'll add one voice-specific instruction: a spoken confirmation before the transfer, so the customer isn't dropped onto a queue without warning.

1. From the Explorer panel, click **Escalation** to open it.
2. In the **Reasoning Instructions**, add a confirmation line *before* the existing instruction that calls the escalate action: *"Before transferring the customer to a live agent, say: 'I'm going to connect you with a team member now. Is that OK?' Wait for the customer to confirm before calling [escalate action]."* Where you reference the escalate action, don't type its name as plain text: type **`@`** to open the action picker, then select **escalate_to_human** so it's inserted as a linked action reference (the same way it appears in the out-of-the-box instructions). Order matters: the confirmation has to come before the handoff action, not after, or the customer is transferred before they've agreed. Leave the existing instructions (the escalate action call and the log-a-case fallback) in place.
3. Save your changes.

> **Voice guidance for Escalation**
> - **Confirm before transferring.** On voice, a silent or abrupt handoff feels like a dropped call. The spoken confirmation in step 2 gives the customer a clear cue that a transfer is coming and a chance to decline. This is the Escalation-specific application of the "Confirm transfers before handing off" principle from [Voice Writing Principles](#voice-writing-principles).

### Open the Verification Gate on the Agent Router

This is the single most important fix in this step — without it, Order Inquiries can never be selected, no matter how well you worded its description and instructions above. The gate does *not* live on Order Inquiries; it's a condition on the **Agent Router**, which is why it's easy to miss when you're troubleshooting the Order Inquiries subagent itself.

**Why the gate blocks Order Inquiries.** The Agentforce Service Agent template gates order lookups behind customer verification: the Agent Router is only allowed to route to Order Inquiries after a customer has been verified, a state tracked by an `isVerified` variable. In the template, the **Service Customer Verification** subagent is what sets `isVerified` to true — but you removed that subagent in [Remove Unnecessary Subagents](#remove-unnecessary-subagents), because WISMO identifies customers by phone number rather than putting them through a formal verification step. With that subagent gone, nothing ever sets `isVerified` to true, so the gate never opens: the router can't route to Order Inquiries and falls back to General FAQ for every order-related request.

**Identification is not verification.** It's worth being clear on this, because it's a natural place to assume the gate takes care of itself. The phone number you configured Order Inquiries to collect *identifies* the customer: it matches them to a Contact record so the order lookup has something to key on. It does not *verify* them: `isVerified` is set only by a deliberate verification step, which WISMO intentionally doesn't include. So collecting a phone number does not satisfy this gate; you have to open it explicitly.

To open the gate:

1. From the Explorer panel, click **Agent Router** to open it.
2. Find the **Actions Available for Reasoning** section. This lists every subagent the router can hand off to, each as a transition action.
3. Locate the action named **`go_to_OrderInquiries`** and expand it. You'll see two conditions: **Available when `isVerified == True`** and **Transition to Order Inquiries**. The first is the gate — it tells the router that `go_to_OrderInquiries` is only available once `isVerified` is true.
4. Delete the **Available when `isVerified == True`** condition. Removing it (rather than changing `isVerified` to `False`) is the correct fix: `False` would make the route available only when the customer is *not* verified, which is backwards. Deleting the condition removes the verification requirement entirely, so the router can route to Order Inquiries regardless of verification status. Leave the **Transition to Order Inquiries** action itself in place; you're only removing the condition that gates it.
5. Save your changes.

> **This gate is easy to miss.** It's easy to miss for two reasons. First, it isn't on Order Inquiries — it's a condition on the Agent Router's `go_to_OrderInquiries` transition action, so you won't find it by inspecting the Order Inquiries subagent's own settings. Second, it's a condition, not instruction text, so it doesn't surface anywhere in a Description or Reasoning Instructions you'd normally review. If Order Inquiries never seems to get selected no matter how you word its description, check the router's `go_to_OrderInquiries` action condition before assuming it's a routing or wording problem.


---

## Step 4: Build Phone Identification

The Order Inquiries subagent is configured, but it still can't identify a customer without an email address. In this step, you'll build a custom identification action in declarative Flow Builder (no code required) so the agent can identify customers by phone number instead, then run a quick preview to confirm the order lookup works.

### Replace Email Identification with Phone Number

Opening the verification gate on the Agent Router (previous section) gets Order Inquiries into the conversation, but it doesn't remove the underlying problem: the **Get Order by Order Number** action requires a resolved Contact record as an input, and the only identification action available out of the box, **Identify Customer By Email**, resolves that Contact record using an email address. No matter how the Reasoning Instructions are worded, the agent has no other tool to reach for, so it asks for email anyway.

There's no built-in action that identifies a customer by phone number. You'll need to build one — using declarative Flow Builder, no code required.

#### Build the Identification Flow

> **Heads-up on the first save.** The first time you click **Save** (whenever that is, even mid-build), Flow Builder opens a **Save the Flow** dialog asking for a **Flow Label**, **Flow API Name**, and **Description**. This is the one chance to set the API Name correctly, because it locks after the first save. See step 8 for the exact label and API Name to enter. If you save partway through building, use those values now rather than waiting.

> **How API Names auto-populate.** For most resources you create in this flow (variables, the Get Records element, the Decision element), the **API Name** field starts blank and auto-fills from the Label as you type. The one exception is a Decision **outcome**, which ships with a default label and API name already filled in, so it won't auto-update; you set its API Name manually. The rule: a *blank* API Name auto-populates from the label; a *pre-filled* one doesn't.

1. From Setup, in the Quick Find box, enter **Flows**, and then select **Flows**.
2. Click **New Flow**, and select **Autolaunched Flow (No Trigger)**. Flow Builder opens directly — there's no separate **Create** button to click.
3. Add an input variable: open the **Toolbox** panel (use the toggle if it's not already visible), and click **New Resource**. Set **Resource Type** to **Variable**, **API Name** to **phoneNumber**, and **Data Type** to **Text**. For **Description**, enter *"Phone number provided by the customer, used to identify their Contact record."* Once the data type is set, two checkboxes appear — **Available for input** and **Available for output**. Check **Available for input** only. Click **Done**.
4. Add a **Decision** element to guard against an empty phone number. To add it, click the **+ (add element)** icon on the connector between the **Start** and **End** nodes, and search for and select **Decision** in the element picker.
   - Give the Decision a **Label** — for example, **Phone Number Provided**. As you type the label, Flow Builder auto-generates the **API Name** from it, inserting an underscore between each word (for example, `Phone_Number_Provided`). You can leave the auto-generated API Name as-is.
   - For **Description**, enter: *"Checks that the customer provided a phone number before attempting the lookup. If no phone number is present, skips the query."*
   - Under **Select Decision Logic**, leave the default **Define Manually** selected (the alternative, **Define with AI — Advanced**, isn't needed for a simple not-empty check).
   - Configure the first outcome to check that **{!phoneNumber}** has a value. The outcome defaults to a placeholder label ("Outcome 1 of Decision 1"). Change the **Outcome Label** to **Phone Provided**, and set the **Outcome API Name** to **Phone_Provided**. Note that this outcome ships with a default label and API name already filled in ("Outcome 1 of Decision 1"), so, unlike a brand-new resource whose blank API Name auto-populates as you type the label, the API Name here won't update on its own. Set it manually. Set **Condition Requirements to Execute Outcome** to **All Conditions Are Met (AND)**, then add a condition row: **Resource** `{!phoneNumber}`, **Operator** **Is Blank**, **Value** **{!$GlobalConstant.False}**. This reads as "phoneNumber is blank = false": in other words, the phone number is not blank, so it has a value. (The operator dropdown also offers Equals, Does Not Equal, Starts With, Ends With, Contains, and Is Null; **Is Blank** is preferred for a Text variable because it catches both an empty string and a null.)
   - The **default outcome** is the "no phone number provided" path. Leave its connector going straight to the flow's **End** node. Don't attach the Get Records lookup to it. That way, if the action is ever called without a phone number, the flow simply ends and returns an empty `contactRecord` instead of querying Contacts with a blank filter (which would match an arbitrary record). In practice the agent won't call this action without a phone number (the **Require input to execute action** toggle you set later enforces that), so this path is a safety net, not the normal flow.

5. Add a **Get Records** element:
   - Label: **Get Contact By Phone**. Description: *"Looks up the Contact record matching the phone number provided by the customer."*
   - Data source: **Salesforce Object** (leave as default; not Data Cloud Object). Search for and select object **Contact**. Leave **Also get related records** unchecked.
   - Condition Requirements: **All Conditions Are Met (AND)**.
   - Filter: search the field picker for a phone field to filter on. Searching "phone" returns several options (**Asst. Phone**, **Business Phone**, **Home Phone**, **Mobile Phone**, and **Other Phone**), but no field labeled simply "Phone." The one you want is **Business Phone**: Salesforce renamed the standard Contact `Phone` field's display label to Business Phone in the UI, but the underlying API name is still `Phone`. The others (Mobile, Home, Asst., Other) are separate fields. Select **Business Phone**, set Operator to **Equals**, and Value to **{!phoneNumber}**.
   - How many records to store: **Only the first record** (also the default; other options are "All records," "Up to a specified limit," and "All records" with sorting).
   - How to store record data: **Automatically store all fields** (also the default; other options are "Choose fields and let Salesforce do the rest" and "Choose fields and assign variables (advanced)" — don't use either of these, since step 6 references the whole record as a single Record variable, not individual fields).
6. Add an output variable: open the **Toolbox** panel, click **New Resource**, and set **Resource Type** to **Variable**, **API Name** to **contactRecord**, **Data Type** to **Record**, and **Object** to **Contact**. For **Description**, enter: *"The Contact record matching the customer's phone number, returned to the agent for the order lookup."* Check **Available for output** only, and click **Done**.
7. Because step 5 uses **Automatically store all fields**, the Get Records element itself becomes an implicit record variable (referenceable as `{!Get_Contact_By_Phone}`, or whatever label/API name you gave it), but it isn't automatically wired to the `contactRecord` output variable you just created. Add an **Assignment** element on the connector coming out of Get Records: label it **Set Contact Record Output** (for **Description**, enter *"Copies the Contact found by phone number into the output variable returned to the agent."*), and add a row setting **Variable** `{!contactRecord}`, **Operator** `Equals`, **Value** `{!Get_Contact_By_Phone}`. When searching for each resource in the picker, select **the entire resource** (not a specific field on it) for both the Variable and Value sides, since you're copying the whole record, not one field. This copies the retrieved record into the variable marked as the flow's output.
8. Save the flow. On first save, Flow Builder opens the **Save the Flow** dialog with three fields: **Flow Label**, **Flow API Name**, and **Description**. Enter the label **NTO Identify Customer By Phone**; the **API Name** auto-generates from it as `NTO_Identify_Customer_By_Phone` (an underscore between every word). **Edit the API Name field before saving** to remove the extra underscores and set it to exactly **NTO_IdentifyCustomerByPhone** — once you save, the API Name is locked and can't be edited from Edit Flow Details or the Setup flow list. For **Description**, enter: *"Identifies a customer by matching their phone number to a Contact record, and returns that record."*
9. If you already saved with an incorrect API Name, use **Save As New Flow** from within Flow Builder (not "Clone" from the Setup flow list, which clones list views, not the flow itself) to create a copy with the corrected label and API Name. Delete the original mis-named flow afterward to avoid confusion.
10. **Activate** the flow.

> If your org distinguishes mobile numbers from landlines, filter on **Mobile Phone** instead of (or in addition to) **Business Phone** to match how NTO customers actually provide their number.

#### Create the Custom Action

You create this action directly from the Order Inquiries subagent — the subagent that needs it. (The action is still a normal, globally available action; creating it here also attaches it to Order Inquiries in one step, which saves you a separate "add" later.)

1. In Agentforce Builder, open Pippin. In the **Subagents** section of the Explorer panel, hover over **Order Inquiries** and click the **+** icon that appears — this starts the add-action process.
2. Choose **New action** (not **Add from asset library**, which is for attaching an action that already exists). The **Add Action** dialog opens with three fields: **Action Name**, **Description**, and **Reference Action Type**.
3. Fill in the dialog:
   - **Action Name:** **Identify Customer By Phone**
   - **Description:** *"Identify a customer by their phone number and return their contact record."* An action's description is what tells the agent *when* to reach for it: a concise, specific description of what the action does and when to use it is the single most important factor in whether the agent selects it at the right moment. (This is the same lever behind the "No Order Number" branch; see [Why the "No Order Number" Branch Matters](#why-the-no-order-number-branch-matters).) For more, see [Best Practices for Agent Action Instructions](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_instructions.htm&type=5).
   - **Reference Action Type:** select **Flow** from the dropdown. (The full dropdown lists Placeholder action, Apex, API, Flow, Predictive Model, Prompt Template, and Retriever — **Flow** is the one that wraps the identification flow you built.)
4. Once you select **Flow**, a **Reference Action** search box appears. Click it and select the **NTO_IdentifyCustomerByPhone** flow (only active flows appear here — this is why you activated the flow in the previous step).
5. Click **Create and Open**. The initial dialog doesn't show the input/output mappings — they're configured on the action detail screen that opens next.
6. On the action detail screen, configure the **input**. The **phoneNumber** input is listed with a **Require input to execute action** toggle. Turn it **on** — the identification flow can't look up a Contact without a phone number, so the agent should never call this action with an empty value. (There's no data-source dropdown or per-input instruction field here; the require toggle is the only control on the input.)
7. Configure the **output**. The **contactRecord** output has two toggles, both **off by default** — leave both unchecked:
   - **Filter from agent context** — when enabled, the output is excluded from the conversation history and the agent's reasoning context. Leave it **off**.
   - **Show in conversation** — when enabled, the agent may show this output in its response to the customer. Leave it **off**.

8. Under **Additional Settings**, there are two options:
   - **Require user confirmation** — leave this **off** (unchecked). Identification is a silent lookup that shouldn't interrupt the customer with a "shall I proceed?" prompt.
   - **Show loading text for this action**: turn this **on** and set the text to *"Let me pull up your account..."* so the customer isn't met with silence while the identification lookup runs. Set this as a single value right here in Canvas view: identification happens once per conversation, so it doesn't need the rotating variations you set on the order-lookup action in [Configure the WISMO (Where Is My Order) Subagent](#configure-the-wismo-where-is-my-order-subagent). Keep this wording distinct from those order-lookup loading phrases, so that if a single turn triggers both, the customer doesn't hear the same stall twice.

#### Swap the Action on Order Inquiries

Because you created the action from the **+** on Order Inquiries, **Identify Customer By Phone** is already attached to the subagent's reasoning actions — you don't need to add it. What remains is to remove the old email-based action so it isn't chosen instead.

1. Open the **Order Inquiries** subagent, and confirm **Identify Customer By Phone** is listed in its reasoning actions (it was attached when you created it in the previous step).
2. Remove **Identify Customer By Email** from its reasoning actions: hover over the action, click the **⋮** (three vertical dots) menu that appears, and select **Delete**.
3. Save your changes, then commit a new agent version.

> **Confirm the swap, not just the addition.** If Identify Customer By Email is still present alongside the new phone action, the agent may still choose email — removing it ensures phone number is the only identification path available for this subagent.

### Design Details: Why Identification Lives Inside Order Inquiries

It's worth pausing on one design choice before moving on, because it's easy to second-guess later: this guide **removes the `isVerified` gate** on the router's route to Order Inquiries rather than restoring a separate verification subagent that would set `isVerified` to **True**. That might look like we're skipping verification. We're not — we're just enforcing it a different way.

**Why not rebuild a dedicated verification subagent (like the one we removed)?**

The Agentforce Service Agent template's default design uses `isVerified` as a gate meant to be shared across *multiple* subagents (Account Management, Billing, Case Management, and so on), all of which need a resolved identity. In that design, verifying once in a dedicated subagent and reusing the result makes sense: it avoids asking the same question in every topic.

NTO's use case doesn't have that shape. Order Inquiries is the only subagent that needs identity resolved, so there's nothing to share the verification across — a separate subagent would add a cross-subagent, cross-turn dependency for no benefit, and it's exactly that kind of dependency that broke Order Inquiries in the first place (see [Open the Verification Gate on the Agent Router](#open-the-verification-gate-on-the-agent-router)).

**What's enforcing identification instead?**

A data dependency, not a routing gate: **Get Order by Order Number** requires a resolved Contact record as input, and the only way to produce one is running **Identify Customer By Phone** first. The agent can't reach an order lookup without it — identification is structurally required, even though the `isVerified` gate no longer does that job.

**When to reconsider this.** If your agent grows beyond a single identity-dependent subagent (for example, adding a cancel-order or update-shipping-address subagent that also needs a resolved Contact), that's the point where extracting phone identification into its own reusable step (not gated by `isVerified`, just a shared action multiple subagents call) starts to pay for itself. Don't build that ahead of need; a single-subagent use case doesn't benefit from it, and the added hand-off is one more thing to test.

### Quick Test: Preview the Order Lookup

Before you ground Pippin with data, take two minutes to confirm the order-lookup path you just built actually works. You've made several connected changes (opened the verification gate, swapped in phone identification, and rewrote the Order Inquiries instructions), and it's much easier to catch a problem now, with a quick conversation, than to untangle it later after adding the data library on top.

Use the **Preview** panel in Agentforce Builder to have a short conversation with Pippin. The Preview panel offers two modes, chosen from a dropdown at the top, and it opens in **Live Test Mode** by default. Switch it to **Simulate Mode** for this check:

- **Simulate Mode** *(recommended for this check)*: a risk-free space to confirm your agent is set up correctly. It checks that Pippin routes to the right subagent, identifies the customer, calls the right actions, and responds the way you want. It runs your lookup against real org data, so an order that exists comes back, but it never writes or changes anything in your org.
- **Live Test Mode**: the agent behaves as if it's activated. It runs actions for real and can update Salesforce data. Use it later, when you want to confirm actions execute end to end under production-like conditions.

For validating the order-lookup path you just built, Simulate Mode is the right choice. It exercises the full routing and identification logic and returns real order data, with no risk to your records. Switching modes resets the current conversation, so pick Simulate before you start. For more detail, see [Simulate and Live Test Modes](https://help.salesforce.com/s/articleView?id=ai.agent_simulate_and_live_modes.htm&type=5).

> **You're testing in text mode here: that's intentional.** You'll type your side of this conversation and read Pippin's replies, because you haven't configured voice settings yet (that's [Step 7](#step-7-configure-voice-persona-and-pronunciation)). This test confirms the *conversation logic* (routing, identification, and the read-back instructions), which behaves the same whether the customer types or speaks. Once you've set up the voice persona in Step 7, you'll come back and validate the *voice* experience (how the responses actually sound and how the digit read-back paces aloud) with the voice preview panel in the [Test](04-test.md) section.

> **Before you Preview: commit and activate.** The **Send** button in the Preview panel stays disabled until your agent is both **committed** and **activated**. You committed a new version in the previous step — now make sure the agent is **activated** before you open Preview. If Send is greyed out, that's the cause: commit any pending changes, activate the agent, then return here.

Have this conversation with Pippin:

1. In Agentforce Builder, open **Pippin**, open the **Preview** panel, and select **Simulate Mode**.
2. Start with an order-status request. Type: *"I want to check the status of my order."*
   - **Look for:** Pippin routes to **Order Inquiries** (not General FAQ) and asks for your **phone number** to identify you. It should **never** ask for an email address.
3. Provide a phone number that matches a Contact in your org.
   - **Look for:** Pippin reads the number back digit-by-digit to confirm it (for example, *"I have your number as 5-5-5-1-2-3-4, is that right?"*) before continuing.
4. When Pippin asks for the order number, provide one that exists in your org.
   - **Look for:** Pippin reads the order number back to confirm it, then looks up the order and reports its status.

Then start a fresh conversation to test the **no-order-number path** — the branch that lists a customer's recent orders off their identified Contact when they don't have an order number handy:

5. Start a new conversation and type: *"Can you find my order? I don't have an order number. My phone number is 555-123-4567."* Use a phone number that matches a Contact in your org.
   - **Look for:** Pippin identifies the Contact from the phone number, then uses that Contact to list **all** the orders associated with it, rather than continuing to insist on an order number. This confirms the **Get Orders by Contact** action fires and the "if the customer does not have their order number" branch you added to the Order Inquiries instructions is working. (See [Why the "No Order Number" Branch Matters](#why-the-no-order-number-branch-matters): if Pippin keeps asking for an order number instead of listing recent orders, that branch is missing or misworded.)

> **This checks your logic, not the voice.** As noted above, this quick test runs in text mode and confirms only the *conversation logic*: that the router reaches Order Inquiries, that identification runs by phone (not email), and that the number read-back fires. It does **not** test the voice experience; you can't validate that here. Spoken pacing, pronunciation, and how the digit read-back actually sounds are all part of the voice layer, which you validate later (after configuring voice settings in [Step 7](#step-7-configure-voice-persona-and-pronunciation)) with the voice preview panel in the [Test](04-test.md) section. Right now, you're just making sure the instructions and routing behave as intended. If Pippin misroutes to General FAQ or asks for an email address, revisit [Open the Verification Gate on the Agent Router](#open-the-verification-gate-on-the-agent-router) and [Swap the Action on Order Inquiries](#swap-the-action-on-order-inquiries) before moving on.

> **Tip:** Open the interaction's trace or reasoning view in Preview to see *which* subagent handled each turn and which actions ran. This makes a misroute obvious at a glance (you'll see the turn land on General FAQ instead of Order Inquiries) rather than having to infer it from the response wording.

---

## Step 5: Ground the Agent with Data

Ground Pippin in NTO's Knowledge content by creating an Agentforce Data Library, uploading the knowledge file, and assigning the library to the agent. Once connected, the **Answer Questions with Knowledge** action retrieves the best-matching content from the library so Pippin answers customer questions accurately.

### Create the Data Library

Before you begin, locate the NTO Customer Service knowledge file. This file contains NTO's return policy, shipping policy, order status information, and product FAQs — everything Pippin needs to answer common customer questions accurately.

> The NTO Customer Service knowledge file is included with this guide: `nto-customer-service-knowledge.pdf`. Use that PDF in the upload step below.

1. From Setup, in the Quick Find box, enter **Agentforce Data Library**, and then select **Agentforce Data Library**.
2. Click **New Library**.
3. For the library name, enter **NTO Customer Service**. The API name is automatically populated.
4. For the description, enter: *"NTO customer service content: return policy, shipping policy, order status, and product FAQs."*
5. Save your changes.
6. In the **Data Type** field, select **Files**.

> **Data Space:** A **Data Space** field appears after you select the data type. This field is required and is automatically populated with the default data space created when you enable Data 360. Leave it set to the default unless your org uses multiple data spaces.

7. Upload the NTO Customer Service knowledge file (`nto-customer-service-knowledge.pdf`), included with this guide in the same folder as the guide's section files (see [Files Included with This Guide](01-get-started.md#files-included-with-this-guide)).
8. Save your changes.

> After you add your content, Salesforce creates a search index and retriever automatically. The library shows a status message when it's ready to use. You don't need to wait before moving on to the next step.

> **Troubleshooting: File uploads and indexing**
>
> **Supported file types:** The UI lists PDF, HTML, and TXT as supported formats. Markdown files (.md) aren't accepted — use the PDF version of the knowledge file provided above.
>
> **Indexing status:** After uploading, Salesforce indexes and chunks your content before the library is usable. The status may show as not started initially; refresh the page to see the latest status. When the status shows **Ready**, the library is indexed and available to the agent. You can assign the library to Pippin as soon as the data library is created; you don't need to wait for indexing to complete. If the status hasn't updated after some time, trigger indexing manually:
> 1. From the App Launcher, go to **Data Cloud**.
> 2. Click the **Search Index** tab.
> 3. Find the index matching your Data Library name. File uploads start with `FileUDMO_SI`; Knowledge streams start with `KA_`.
> 4. Open the index, click **Rebuild**, and wait for processing to complete.
>
> For what each library status means (In Progress, Failed, and so on) and the full permissions checklist, see [Troubleshoot Data Libraries](https://help.salesforce.com/s/articleView?id=ai.data_library_troubleshooting.htm&type=5).

> The quality of Pippin's responses depends directly on the quality of your Knowledge articles. Before adding articles, review them for completeness and accuracy — outdated or thin articles will surface as gaps in testing. Articles written for chat or self-service portals often include formatted lists, headers, and links that read awkwardly when spoken aloud. Flatten structured content into plain prose before adding it to the library.

### Assign the Data Library to Pippin

1. In Agentforce Builder, open **Pippin**.
2. From the Explorer panel, click **Data**, and then select **Data Library**.
3. Select the **NTO Customer Service** library. It can take a minute or two to appear after you create it — if you don't see it, wait a moment and refresh the page.
4. Leave **Show Sources** disabled. Enabling it causes the agent to cite its source on every response — unnecessary for NTO's use case where all answers come from a single internal library.
5. Save your changes.

> Pippin uses the **Answer Questions with Knowledge** action in the General FAQ subagent to access the data library. Confirm this action is present in the subagent's reasoning actions — it should be included by default from the template.

---

## Step 6: Set Up the Enhanced Chat v2 Channel

With the agent configured, add an Enhanced Chat v2 connection. This single connection is what enables voice on the agent, so the commit afterward requires an org licensed for Agentforce Voice. Setting up the channel's deployment and routing comes later, in Deploy.

> **Adding this connection enables voice on the agent, which requires an org licensed for Agentforce Voice.** When
> you commit after adding it, your org must have the Agentforce Voice licenses in place — otherwise the commit is
> rejected ("We found errors in the Agent Script"), with the detail *"Voice modality cannot be used.
> Organization does not have access to Voice features."* If you hit that, your org isn't
> voice-enabled; see [Troubleshooting](troubleshooting.md#commit-fails-voice-modality-cannot-be-used).

### Add the Enhanced Chat v2 Connection

1. In Agentforce Builder, open Pippin.
2. In the **Connections** panel, click **Add Connection** and select **Enhanced Chat v2**.

> **Select the right connection.** The connection picker can list other options (such as Agentforce Mobile) first, and clicking the top item silently assigns the wrong connection with no error. Type **Enhanced Chat** in the picker to filter, then select **Enhanced Chat v2**.

> **Adding the connection doesn't set up the deployment.** This step enables voice on the agent, but it doesn't automatically create the channel's embedded service deployment or its Omni-Channel routing; those are separate, manual steps. Channel creation (including setting up a routing configuration, fallback queue, and the Enhanced Chat v2 deployment) is covered in the [Deploy](05-deploy.md) section.

---

## Step 7: Configure Voice Persona and Pronunciation

Give Pippin its voice: choose and preview a voice persona, add pronunciation dictionary entries for names and terms Pippin should say correctly, and optionally boost recognition of key terms. Voice settings are configured at the agent level, so they apply to every voice-enabled connection on this agent.

> If your agent is active, deactivate it before modifying voice settings. (If you haven't activated it yet, there's nothing to do here.)

### Set the Voice Persona

1. In the Explorer panel, under **Agent Definition Settings**, select **Voice Settings**.
2. Select a persona from the drop-down menu and review its description.
3. In the **Preview Message** field, enter a sentence Pippin would actually say to a customer, and then click **Play** to test the audio. Use this message: *"Thanks! I have your number as 5-5-5-1-2-3-4. Let me find that order for you."* It mirrors a real order-lookup response and includes a digit read-back, so you can hear how the number pacing sounds aloud — the part of this build most sensitive to the voice you choose.
4. Optionally, expand **Advanced** to fine-tune the persona:
   - **Speed:** Adjust the pace of generated speech.
   - **Similarity:** Controls how closely the speech matches the selected persona.
   - **Stability:** Higher values produce more consistent, less expressive speech. Lower values allow more expressiveness.

   After each adjustment, click **Play** again to hear how the change affects the audio. These settings interact, so make one change at a time and listen before making the next.

> **Choose a natural-sounding voice.** Avoid the default synthetic voice for customer-facing deployments; it erodes trust quickly. **Mark** and **Jessica** are strong starting points: both are natural, clear, and work well across a range of use cases. Preview at least 4–6 options before deciding, and always test with a sentence representative of your actual agent responses, not just the placeholder text.

> **What to listen for when auditioning a voice.** Listen for these qualities across a full call:
> - **Delivery:** Natural and flowing — contractions, complete sentences, and lists spoken the way a person would say them.
> - **Demeanor:** Patient and even-keeled from the first turn to the last.
> - **Tone matching:** Warmth and emphasis that fit the moment — calm and steady on neutral content, with expression where it's warranted.
> - **Phonetic confirmation:** Because Pippin reads numbers and names back to callers, listen for clear, natural handling — a crisp "N as in Nancy" on the letters and clean, well-paced digits.

> Test by listening, not reading. A response that looks good on screen may be too long or unnatural when spoken aloud. You'll do this end to end (listening through the full WISMO conversation, not just this sample line) in [Test the Voice Experience](04-test.md#test-the-voice-experience) once the agent is fully built.

### Add Pronunciation Dictionary Entries

The pronunciation dictionary helps the agent correctly pronounce brand names, product names, and terms unique to your organization.

1. Under **Pronunciation Dictionary**, fill in the fields for the first term:
   - **Word or Phrase:** Enter the word or phrase.
   - **Pronunciation:** Enter the phonetic pronunciation.
   - **Type:** Select **CMU** for English or **IPA** for non-English speech.
2. Click **Add**. The term appears in the list below, and the fields clear so you can enter the next one.
3. Repeat for each term. Entries stack in the list, so add as many as you need, one after another — you don't save between them, and the entries remain even if you navigate to another part of the builder.
4. When you've added all your terms, **save the agent** to keep the dictionary.
5. Test how the entries sound: update the **Preview Message** to a sentence that includes a term you added (for example, *"Your ApexTrail order has shipped."*), and click **Play** to hear how the agent pronounces it. Adjust the phonetic spelling of any entry that still sounds wrong.

> **NTO example.** Add these three product-name entries. Each uses **Type: CMU**. Enter the phonetic string exactly as shown in the **Pronunciation** field.
>
> | Word or Phrase | Pronunciation (CMU) | Why it needs an entry |
> |---|---|---|
> | ApexTrail | `AY P EH K S T R EY L` | Compound brand name the TTS engine may split into "Apex" + "Trail" |
> | NovaPace | `N OW V AH P EY S` | Unusual compound; may be read as "Nova" + "Pace" with a pause |
> | TerraMax | `T EH R AH M AE K S` | May be read as two separate words; the override keeps it flowing as one |

> Preview the word in the voice preview panel first. Only add it to the dictionary if the agent mispronounces it — not every unusual word needs an entry.

### Add Key-Term Boosting (Optional)

Key-term boosting improves the agent's ability to recognize and correctly transcribe terms that are unique to your organization or industry. Use this only for terms that are being misrecognized — overuse can interfere with recognition of similar-sounding words. Entries are limited to 100 keywords, and each term should be capitalized as you want it to appear in transcripts.

We won't configure this for NTO's org, but if you were applying it to your own implementation, you'd add product names and industry-specific terms that speech recognition is likely to mishear. For NTO, that might include *ApexTrail*, *Stratus-Grip*, and *Yosemite* — terms shoppers are likely to speak that could be misrecognized without boosting.

### Learn More About Voice Personas

For deeper guidance on selecting and tuning a voice persona, see:

- [Select the Right Persona for Your Agent](https://help.salesforce.com/s/articleView?id=ai.agent_select_voice_persona.htm&type=5) — how to choose a persona deliberately, matching voice to your agent's job and audience rather than picking by first impression.
- [Customize the Persona of Your Agent](https://help.salesforce.com/s/articleView?id=ai.agent_configure_voice_settings.htm&type=5) — step-by-step instructions for selecting a persona and adjusting the Advanced settings, Pronunciation Dictionary, and Key-term Boosting.
- [Agentforce Voice Best Practices](https://help.salesforce.com/s/articleView?id=ai.agentforce_voice_best_practices.htm&type=5) — deeper guidance on speech recognition, including handling regional pronunciations with Key-term Boosting and Custom Instructions.
- [Agentforce Voice Considerations](https://help.salesforce.com/s/articleView?id=ai.agentforce_voice_considerations.htm&type=5) — supported languages, usage limits, and billing.

---

## What's Next

Pippin is configured with an Enhanced Chat v2 channel and ready to validate. Move on to the [Test](04-test.md) section to run through previews, live channel testing, and structured test scenarios. After testing, the [Deploy](05-deploy.md) section covers escalation flow setup, Omni-Channel routing, publishing, and adding Pippin to your website.
