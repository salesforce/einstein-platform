# Get Started with Agentforce Voice

In this guide, you learn how to plan, build, test, deploy, and monitor a voice-enabled AI agent on Enhanced Chat v2. You follow the five stages of the agent development lifecycle from start to finish, using a real-world retail use case to ground each step.

To follow along, you need access to an **org licensed for Agentforce Voice**, plus the permissions you need to build the agent. You configure the agent as you work through each section.

> **Before you start: you need an org licensed for Agentforce Voice.** The hands-on steps need an org that has the Agentforce Voice licenses, plus the permissions for you to build. Confirm you have access before you begin (see [Confirm You Have an Org Licensed for Agentforce Voice](#confirm-you-have-an-org-licensed-for-agentforce-voice) below), so you don't work through the guide only to find you can't complete the voice steps.


| Goal | Instructions |
| :---- | :---- |
| I want to get hands-on right away. | Skip the Ideate section and start with Build. Come back to Ideate when you're ready to plan your own deployment. |
| I'm new to Agentforce Voice. | Walk through the guide in order, starting here. |
| I want to refine an agent I've already built. | Go to the Test and Monitor sections. |

## What Is Agentforce Voice?

Agentforce Voice is the Agentforce platform capability that lets an AI agent understand speech and speak back. It handles the full speech pipeline: automatic speech recognition (ASR) to turn what the customer says into text, intent processing to understand and act on it, and text-to-speech (TTS) to respond in a natural-sounding voice. A voice-enabled agent carries on a real spoken conversation with the customer and draws from your Salesforce data. It resolves issues autonomously and escalates to a human service representative when needed, all natively within Salesforce.

Agentforce Voice works across two channels:

- **Enhanced Chat v2** — a messaging channel you deploy on a web page or Experience Cloud site. Supports voice, text, and rich interactive content such as appointment scheduling cards.
- **Telephony** — deploys your agent on a phone number so customers can reach it by calling in. Telephony supports two options:
  - **Native Salesforce telephony (PSTN)** — a connection with a phone number provisioned directly in Salesforce in the Agentforce Contact Center.
  - **Partner telephony (PSTN and SIP)** — an integration with a partner telephony provider using PSTN or SIP.

This guide uses **Enhanced Chat v2** as the walkthrough channel. It's the fastest path to a voice-enabled agent (no phone number provisioning required), and it supports the full voice experience alongside text and interactive content in a single widget.

> **Want to use telephony instead?** See [Set Up Agentforce Contact Center with Salesforce Voice](https://help.salesforce.com/s/articleView?id=service.afcc_sv_salesforce_voice.htm&type=5). This guide does not cover PSTN setup.

**Is this a license and a toggle, or a six-month project?** For a voice-enabled agent on Enhanced Chat v2, plan for days of configuration — not months. The main investment is writing effective agent instructions, testing with real utterances, and configuring Omni-Channel routing. This guide walks you through all three. If you're adding native Salesforce telephony (PSTN), factor in additional time for number provisioning and routing setup. Third-party telephony timelines vary by provider.

## A Note on Product Names

If you've searched for Salesforce voice documentation before landing here, you've likely encountered several names that seem to describe the same thing. Here's what they mean:

| Name | What It Is |
| :--- | :--- |
| **Service Cloud Voice** | The original product name. Renamed to **Salesforce Voice**. |
| **Salesforce Voice** | The current name for the Salesforce native telephony product, covering inbound and outbound calls over PSTN. This guide does not use Salesforce Voice. |
| **Agentforce Contact Center (ACC)** | An AI-first contact center product from Salesforce. Supports multiple deployment channels, including Enhanced Chat v2 and telephony. This is the product the agent in this guide runs within. |
| **Agentforce Voice** | An Agentforce platform capability that enables AI agents to understand speech and speak. It handles the full speech pipeline — speech-to-text, intent processing, and text-to-speech. It works over both telephony channels and Enhanced Chat v2. This is the capability this guide focuses on. |

These are related but distinct. Agentforce Voice is the platform capability that gives agents a voice. This guide deploys an Agentforce Voice-enabled agent on **Enhanced Chat v2** — no telephony or phone number required.

## What Is a Voice-Enabled Agent?

A voice-enabled agent is an AI agent configured to interact with customers through spoken language. When your customer speaks on a voice-enabled channel such as Enhanced Chat v2, the agent listens through automatic speech recognition (ASR) and understands their intent. It then takes action with your business data and configured workflows, and responds through text-to-speech (TTS). On a chat channel, this experience can feel like a phone call, even though it runs over a browser-based channel.

Customize the agent's voice persona, pronunciation, and conversational style to match your brand. You configure voice settings at the agent level, and they apply no matter which channel you deploy the agent on.

## The Agent Development Lifecycle

Building a voice-enabled agent follows five stages:

* **Ideate**: Define your voice use case, scope, and business goals. Identify risks and design guardrails.
* **Build**: Create the agent, configure its voice persona and pronunciation dictionary, write voice-optimized instructions, and set up your Enhanced Chat v2 channel with voice enabled.
* **Test**: Validate the agent's performance through in-builder previews, batch testing in Testing Center, and structured test scenarios covering happy paths, edge cases, and escalation scenarios.
* **Deploy**: Activate your agent, configure Omni-Channel routing and a fallback queue, and set up escalation to a human service representative. Then configure and publish your Enhanced Chat v2 channel so the agent is live and reachable from your website.
* **Monitor**: Track performance with the Agentforce Observability suite, including Agent Analytics dashboards and the call recordings and transcripts in Sessions & Intents. Build a monitoring strategy to improve your agent over time.

## A Real-World Example

Throughout this guide, you follow **Northern Trail Outfitters (NTO)**, a leading outdoor apparel and gear retailer. NTO deploys a voice-enabled agent named **Pippin** on their digital storefront. Pippin answers common questions about returns, shipping, and store policies, and helps customers check the status of their orders — all through a conversational experience embedded in their website.

## Files Included with This Guide

This guide ships with two ready-to-use files. Both live **alongside the guide's section files** (`01-get-started.md`, `03-build.md`, and so on), in the same folder — so wherever you're reading this guide, they're in the same location:

| File | Used in | What it's for |
| :---- | :---- | :---- |
| `nto-customer-service-knowledge.pdf` | Build | NTO's customer-service knowledge content (return policy, shipping, product FAQs). You upload it to the agent's data library so Pippin can answer FAQ questions. |
| `nto-voice-test-suite.csv` | Test | A pre-built set of voice test cases for Pippin — you upload it in Testing Center to run a batch test. |

When a step tells you to upload one of these, look for it in the same folder as this guide. If you received the guide as a package or repository, the files are at its top level next to the section files.

## Confirm You Have an Org Licensed for Agentforce Voice

To follow along with the hands-on steps, you need an **org licensed for Agentforce Voice**. Two things need to be in place:

1. **The licenses your org needs for Agentforce Voice.** This is an org-level entitlement: your Salesforce account executive procures and provisions it. Voice on Enhanced Chat v2 requires the **Agentforce Voice Add-on license** on a Foundations or Agentforce 1 edition. Without it, the org can't run voice, and committing a voice-enabled agent is rejected with *"Voice modality cannot be used. Organization does not have access to Voice features."* (This org-level entitlement includes the **AgentforceVoiceAllow** permission that lets the agent use voice; it comes with the org's voice licensing.) For the full licensing and edition breakdown, see [Licensing and Provisioning](02-ideate.md#licensing-and-provisioning) in the Ideate section.
2. **The permissions you need to build.** As the person building the agent, your user needs the permissions to create and manage it — signed in as a user with admin access. Pippin is a **Service Agent**, so to build and manage it you need **Manage Agentforce Service Agents** *and* **Manage AI Agents**, or **Customize Application**. To run batch tests in Testing Center during the Test phase, you also need **Manage Agentforce Grids** *and* **Manage Agentforce Testing**. Your Salesforce admin assigns these. For the full requirements, see [Connect an Agent to Enhanced Chat v2](https://help.salesforce.com/s/articleView?id=ai.service_agent_deploy_enhanced_chat_v2.htm&type=5) in Salesforce Help.

You bring your own org that has both — this guide doesn't procure licenses or assign permissions for you. If the licenses aren't in place, your account executive can help; if you're missing the permissions to build, your admin can assign them. You can also follow along through the guide without building in a live org.

> **The agent's own runtime permissions are a separate, later task.** The permission sets your *agent user* needs (to look up orders, run prompt templates, and so on) are handled when you create the agent, walked step by step in [Add Permissions to the Agent User](03-build.md#add-permissions-to-the-agent-user) in the Build section. You don't set those up now.

> **Not sure whether your org qualifies?** Contact your **Salesforce account executive** or admin before working through the guide. The build and configuration steps run in most orgs, but the live voice steps in Build, Test, and Deploy need the Agentforce Voice licenses in place.

### What You'll Configure

You configure everything as you work through the guide. Here's what you'll set up in each section:

| Section | What You Configure |
| :---- | :---- |
| **Build** | Agent creation, agent persona and voice settings, agent instructions and actions |
| **Test** | Agent preview in Builder, batch testing in Testing Center, structured test scenarios |
| **Deploy** | Omni-Channel Flow routing, escalation flow and handoff |
| **Monitor** | Analytics and session tracing, Agent Analytics dashboards, Sessions and Intents (call recordings and transcripts), a monitoring strategy for Pippin |

## Enable Required Features

Before you build your agent, enable Einstein Generative AI, Agentforce, and Data 360 in your org. Turn on all three now so your org is ready when you reach the Build section.

> **Enable Data 360 early.** Turning on Data 360 can take 15–60 minutes to finish provisioning. Enabling it now, before you need it in Build, means it's ready when you create your agent's data library.

### Enable Einstein Generative AI

1. From Setup, in the Quick Find box, enter **Einstein Setup**, and then select **Einstein Setup**.
2. Turn on **Einstein**.
3. Accept the terms and conditions if prompted.

### Enable Agentforce

In many orgs, especially those already provisioned for Agentforce, Agentforce is already on, and the **Agentforce Agents** item may not appear in Setup. If you don't see it, Agentforce is likely already enabled; you'll confirm access when you create your agent in [Build](03-build.md). Otherwise, turn it on:

1. From Setup, in the Quick Find box, enter **Agentforce Agents**, and then select **Agentforce Agents**.
2. Turn on **Agentforce**.

### Verify Data 360 in Your Org

Data 360 is required for essential Einstein Generative AI and Agentforce functionality, such as the Trust Layer, agent event logs, and consumption billing tracking. Later in this guide, your agent's data library also uses the default data space that Data 360 creates.

> **A note on names:** In the Setup UI, Data 360 still appears under its earlier name, **Data Cloud** — so the steps below reference **Data Cloud** and **Data Cloud Setup Home**.

In many orgs, Data 360 is already provisioned and enabled. Verify your installation: from Setup, in the Quick Find box, enter **Data Cloud**, then select **Data Cloud Setup Home**. Confirm that the Data Cloud Setup Home page shows a home org, with a home org ID, a home org instance, and a tenant endpoint.

If your installation wasn't successful, turn on Data 360.

1. From the Setup Menu, select **Data Cloud Setup Home**.
   If you don't see this option, refresh your page, or log out and then log back in with your admin user credentials.
2. To enable Data 360, click **Get Started**.

Setup can take 15–60 minutes. Enabling it now, before you need it in Build, means it's ready when you create your data library.

> In a pre-configured org, Einstein, Agentforce, and Data 360 may already be enabled. Confirm all three are on before moving on.
