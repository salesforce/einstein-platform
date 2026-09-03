# Deploy Your Voice Agent

The Deploy stage is where you activate Pippin, configure Omni-Channel routing, set up escalation, and create the Enhanced Chat v2 channel — the point where your voice-enabled agent becomes real and you can talk to it, switch between voice and chat, and hand off to a human.

> **What this section does (and doesn't do).** This guide takes you to a working, voice-enabled agent that you can see and test end-to-end: a live Enhanced Chat v2 channel where you converse with Pippin, switch between voice and chat, and confirm escalation. It does **not** build you a production website. Enhanced Chat v2 generates the deployment for you; putting it in front of real customers on a specific surface (an external website, a Salesforce Experience Cloud site, or a mobile app) is platform-specific work that lives in dedicated Salesforce docs. Step 5 points you to the right resource for your surface. In other words: you'll finish this section with a voice agent you can prove works, not a finished customer-facing site.

Here's what you'll do in this section:

1. Create a routing configuration
2. Create a fallback queue
3. Set up escalation to a human service representative
4. Configure the Enhanced Chat v2 channel and test voice and chat
5. Publish, and find the right deployment path for your surface

---

## Before You Start

Make sure you've completed the following before deploying:

- Completed all steps in the [Build](03-build.md) section
- Completed the [Test](04-test.md) section — including both Builder preview and Testing Center batch testing
- Identified the service representatives who will handle escalated conversations

---

## Step 1: Create a Routing Configuration

Create a routing configuration, which tells Omni-Channel how to prioritize and assign conversations routed to a queue.

1. From Setup, in the Quick Find box, enter **Routing**, and then select **Routing Configurations**.
2. Click **New**.
3. Configure the following settings:

   | Setting | Value |
   | :--- | :--- |
   | **Routing Configuration Name** | *NTO Queue* |
   | **Routing Priority** | *1* |
   | **Routing Model** | *Least Active* |
   | **Capacity Type** | *Inherited* |
   | **Percentage** | *25* |

4. Save your changes.

---

## Step 2: Create a Fallback Queue

Create the fallback queue, where conversations are routed when Pippin is unavailable.

1. From Setup, in the Quick Find box, enter **Queues**, and then select **Queues**.
2. Click **New**.
3. Configure the following settings:
   - **Label:** Enter a name for the queue — for example, *NTO Fallback Queue*. The Queue Name is populated automatically.
   - **Routing Configuration:** Select *NTO Queue*, the routing configuration you created in the previous step.
4. In the **Supported Objects** section, add **Messaging Session**.
5. In the **Queue Members** section, add the service representatives who will handle conversations escalated from Pippin.

   > For this guide, your org won't have dedicated service rep accounts set up — add your own user account as a queue member instead, so you can test escalation end-to-end. In a production deployment, add your actual service reps here.

6. Save your changes.

---

## Step 3: Set Up Escalation

When Pippin can't resolve a conversation, it hands off to a human service representative using the Escalation subagent. Escalation on Enhanced Chat v2 works through an outbound Omni-Channel flow, so in this step you'll build that flow and connect it to Pippin. The flow determines where a transferred conversation goes.

> Escalation must be in place before you create the Enhanced Chat v2 channel in the next step — the Routing page for the channel requires an activated escalation flow.

### Create the Escalation Flow

1. In Setup, in the Quick Find box, enter **Flows**, and then select **Flows**.
2. Click **New Flow**. Search for and select **Omni-Channel Flow**.
3. In the Toolbox panel, click **New Resource**.
4. For **Resource Type**, select **Variable**.
5. For **API Name**, enter *recordId*.
6. For **Description**, enter *"The ID of the record being routed to a queue or agent."*
7. For **Data Type**, select **Text**.
8. Check **Available for input**.
9. Click **Done**. The Route Work element you add next requires this variable to exist in the flow.
10. Click the **+** icon, then search for and select the **Route Work** element.
11. For **Label**, enter *Escalate to Fallback Queue*. For **Description**, enter *"Transfers the conversation to the NTO Fallback Queue when Pippin escalates to a human service representative."*
12. In the **Set Input Values** section, for the record to route, select the `{!recordId}` variable you created.
13. For **Service Channel**, select *Messaging*.
14. For **Route To**, select *Queue*.
15. Search for and select the NTO Fallback Queue you created in Step 2.
16. Verify that all elements in the flow are connected, then click **Save**.
17. For **Flow Label**, enter *NTO Escalation Flow*. The API name populates automatically.
18. For **Description**, enter *"Routes escalated conversations from Pippin to the NTO Fallback Queue."*
19. Click **Save**, then **activate** the flow.

### Add the Escalation Flow to Pippin

1. In Agentforce Builder, open Pippin. If the latest version you've been working on is already committed or activated, click **New Version** to create an editable version.
2. In the Explorer panel, select the **Enhanced Chat v2** connection.
3. On the canvas, in the **Escalations** section, in the **Escalation Flow** field, select *NTO Escalation Flow* — the flow you created and activated in the previous step. If it doesn't appear in the list, confirm it's activated and refresh the builder.
4. In the **Escalation Message** field, review the default message and edit it to match NTO's brand voice — for example: *"I'm going to connect you with a team member now. Is that OK?"* This is the message Pippin delivers before attempting the transfer.
5. Save your changes.

> **Voice guidance for escalation.** The escalation message is the last thing the customer hears from Pippin before a handoff. Keep it short, and make sure it clearly signals a transfer is happening rather than trailing off ambiguously. Step 3 of [Configure the WISMO Subagent](03-build.md#configure-the-wismo-where-is-my-order-subagent) already adds this same confirmation language to the Order Inquiries instructions; make sure the two match.

---

## Step 4: Configure the Enhanced Chat v2 Channel

Create the Enhanced Chat v2 channel, which automatically builds and publishes its embedded service deployment. Then enable voice on the channel and test both chat and voice end to end in the deployment's test environment.

1. In Agentforce Builder, open Pippin. Click **Activate**.
2. In the Explorer panel, expand **Enhanced Chat v2** under Connections, then click **Routing**.
3. In the **Enhanced Chat Channel** section, click **New Channel**.
4. For **Channel Name**, enter *NTO Voice Chat*. The **API Name** populates automatically from the label, with underscores in place of spaces.
5. For **Domain**, enter *NTO.com*. This is a placeholder so you can finish creating the channel and test it. Pointing the channel at a real customer-facing surface (an external website domain or an Experience Cloud Sites domain) is part of the platform-specific deployment covered in Step 5.
6. For **Fallback Queue**, select *NTO Fallback Queue* — the queue you created in Step 2.
7. Click **Create Channel**.

   > **Enhanced Chat v2 does the heavy lifting here.** Clicking Create Channel kicks off a process that automatically builds the channel and its embedded service deployment, configures security settings, and activates and publishes both the channel and the deployment — all in one step. This is one of the key benefits of Enhanced Chat v2 over building each of these pieces manually.

8. When the dialog updates to confirm *"Your channel is created. Find it under Channels,"* click **Got it**.
9. The new channel now appears in the **Enhanced Chat Channels** section. If you don't see it, refresh your browser.

   > **Finding channel vs. deployment settings.** The section lists two rows for *NTO Voice Chat*. The top-level row (with the bot icon) is the channel: click its name to open the channel's settings. Expand that row, and the nested row below it (with the monitor icon) is the deployment: click its name to open the deployment's settings.

10. Click the channel row's name to open its settings.
11. In the **Agentforce Voice** section, click **Edit**.
12. Check **Allow Agentforce Voice Calls in Enhanced Chat**. This is what enables Pippin to have voice conversations from the chat window.
13. Go back to the Routing page and click the deployment row's name to open its settings.
14. Click **Test Enhanced Web Chat** to open a testing environment for the deployment.
15. In the test chat window, confirm that the message bar shows a **voice icon** (waveform) alongside the text input. The voice icon is what lets you switch modes, and its presence confirms that the **Allow Agentforce Voice Calls in Enhanced Chat** setting from Step 12 took effect.
16. Click the **voice icon** to switch to voice mode. The window confirms the switch ("Switched to voice") and connects you directly to Pippin ("Pippin joined").
17. Speak to Pippin back and forth using voice to confirm the voice conversation works, then end the conversation. To switch back to typing at any time, click the **text icon** in the message bar.

    > **Listen for the holding phrases here.** This test launches the real widget with live voice and real latency, so it is the first place the agent's holding behavior actually plays as a customer hears it. Batch testing and Builder preview don't surface this. As you run the WISMO flow, listen for the "let me check" style cues before a lookup: they should sound natural and varied, not a robotic, repeated stall on every turn. If you hear the agent stall repeatedly, treat it the same way as in testing: it usually signals too many tool calls or too broad an action set, so tighten the agent's actions rather than just rewording the phrase. See [Iterate and Troubleshoot](04-test.md#iterate-and-troubleshoot).

---

## Step 5: Publish, and Find the Right Deployment Path for Your Surface

Now that testing has confirmed chat and voice work, publish your deployment. Publishing makes your configuration available to pull onto a customer-facing surface; from there, this guide points you to the platform-specific steps for your target surface (external website, Experience Cloud, or mobile).

1. On the **Embedded Service Deployments** settings page (the same page where you clicked **Test Enhanced Web Chat** in Step 4), click **Publish**.

> **What publishing does.** When you click Publish, all your Agentforce configuration changes are sent to that deployment's backend site container. Publishing makes your configuration available to be pulled onto a customer-facing surface — it does not, on its own, put your agent on a live website.

### Choose your surface

Getting your published agent in front of real customers is platform-specific work, and the exact steps depend on where you're deploying. This guide takes you as far as a tested, published deployment; from here, follow the Salesforce documentation for your target surface:

| Where you're deploying | What you do | Where to go |
| :--- | :--- | :--- |
| **An external website** (your own site) | Add your website domain to the CORS allowlist (allowed domains) section on the deployment page, then copy the generated code snippet into your site's HTML. | [Configure an Enhanced Web Chat Deployment](https://help.salesforce.com/s/articleView?id=service.miaw_configure_web_deployment_1.htm&type=5) |
| **A Salesforce Experience Cloud site** | Add the Embedded Messaging component to your Experience Cloud page; it finds this deployment and pulls down your configuration. | [Embedded Messaging](https://help.salesforce.com/s/articleView?id=experience.rss_embedded_messaging.htm&type=5) |
| **A mobile app** | Use the Agentforce SDK for iOS or Android to embed the agent in a native app. | [Agentforce Mobile SDK Developer Guide](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-sdk.html) |

> **Why this guide stops here.** Building a full customer-facing site (web, Experience Cloud, or mobile) is a substantial effort with its own dedicated documentation, and the steps differ for every surface. Rather than duplicate that here and risk it going stale, this guide gets your voice agent tested and published, then hands you off to the resource built and maintained for your platform.

---

## Before You Go Live: What This Guide Doesn't Cover

You've proven that Pippin works — it holds a voice conversation, and the escalation flow is wired to hand off to a queue. Getting from that tested state to a production rollout involves a few more pieces that are outside this guide's scope. This guide keeps the focus on getting a voice agent working end-to-end; the topics below are standard Agentforce Service deployment work that isn't voice-specific, so rather than reproduce it here, here's what you'll need to do and where to find the steps.

**Prepare your service team to receive escalated conversations.** In this guide you added your own user to the fallback queue so you could test escalation. In production, your real service reps need to be set up to receive and handle handoffs: create a **service resource** for each rep, create **presence statuses** so reps can mark themselves available, and add the **Omni-Channel sidebar** and a **Messaging Session record page** to the Service Console so reps can accept sessions and chat with customers.

- [Set Up Service Reps](https://help.salesforce.com/s/articleView?id=service.voice_set_up_agents.htm&type=5)
- [Set Up Service Rep Statuses and Capacity](https://help.salesforce.com/s/articleView?id=service.service_set_up_agent_status_and_capacity.htm&type=5)
- [Add Messaging to the Service Console](https://help.salesforce.com/s/articleView?id=service.livemessage_create_console_app.htm&type=5)

**Test the full escalation-to-human handoff.** Once your reps are set up, test escalation in both directions: when **no rep is available** (confirm the agent tells the customer and, if you've configured it, creates a case) and when a **rep is available** (set your Omni-Channel status to online, ask the agent to transfer you to a human, and confirm you can accept the session and message the customer from the Service Console). This is the end-to-end check that the queue and escalation flow you built in Steps 2–3 actually reach a person.

- [Route Work with Omni-Channel](https://help.salesforce.com/s/articleView?id=service.omnichannel_route_work.htm&type=5)

**Stand up a real web surface to test and host the agent.** In this guide you tested Pippin in the built-in Test mode, which is enough to prove that voice and chat work. Before going live, it's worth testing on an actual web surface — the way real customers will reach the agent. A common path is to create an **Experience Cloud site** (the Help Center template gets one running quickly), drag the **Embedded Messaging** component onto it, add the site's domain to the **CORS allowlist**, and publish. You can then run your full test on the live site, including the escalation-to-human and case-creation scenarios above. Turning on **Digital Experiences** is a prerequisite. This is one concrete way to build out the external-website and Experience Cloud options from the surface table above.

- [Turn On Digital Experiences](https://help.salesforce.com/s/articleView?id=experience.networks_enable.htm&type=5)
- [Experience Cloud](https://help.salesforce.com/s/articleView?id=experience.networks_overview.htm&type=5)
- [Embedded Messaging](https://help.salesforce.com/s/articleView?id=experience.rss_embedded_messaging.htm&type=5)

**Deploy your agent to staging or production.** This guide builds and tests everything in a single org. A real rollout moves your agent's metadata (subagents, instructions, flows, actions, and permission sets) from a sandbox into a staging or production org, typically with Salesforce CLI (Agentforce DX). Agents deploy as a new, inactive version that you activate explicitly, so you control when the new version goes live.

---

## What's Next

Pippin is live and reachable through your Enhanced Chat v2 deployment, with escalation configured to hand off to your service representatives — you've proven voice and chat work end-to-end. When you're ready to put the agent in front of customers, follow the deployment path for your surface in Step 5. Meanwhile, move on to the [Monitor](06-monitor.md) section to track performance, review conversation transcripts, and continue improving Pippin based on real customer interactions.
