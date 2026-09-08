# Monitor Your Voice Agent

Pippin is live. The Monitor stage is where you confirm it's actually delivering on the goals you set in [Ideate](02-ideate.md), such as deflecting FAQs, resolving WISMO lookups, and escalating cleanly when it can't help. It's also where you catch problems before they become patterns.

> **A note on data.** This section walks through Salesforce's observability tooling and a monitoring strategy you'll grow into. Since Pippin just launched, you won't have enough conversation volume yet to work through live dashboards or intent clustering the way this section describes. Use Post-Launch Monitoring now, and treat Intent Monitoring and Root-Cause Analysis as what to come back to once Pippin has real usage — not something to complete in this walkthrough.

> **A note on the dashboards.** Because Pippin just launched, the dashboards and session views in this section will be sparse or empty in your org until real calls come in. So instead of screenshots, each view below is described in prose with a link to the matching **Salesforce Help** article, where you can see the populated view. Exact labels, columns, and layout may shift slightly between releases and orgs — treat the help articles as a guide to *where things are*, not the precise numbers you'll see. Your own dashboards populate with Pippin's data over time.

Here's what you'll do in this section:

1. Get to know the Agentforce Observability suite
2. Set up analytics and session tracing
3. Review performance in Agentforce Studio
4. Understand Sessions & Intents
5. Build a monitoring strategy for Pippin

---

## Step 1: Get to Know the Agentforce Observability Suite

Agentforce Observability is the set of tools that gives you visibility into how Pippin behaves in production. Use it to spot trends, review individual conversations, and tune the agent toward the goals you set in [Ideate](02-ideate.md). Two questions frame the work: *Is Pippin working as expected?* and *Where should we improve?*

This step introduces the tools. You'll turn them on in [Step 2](#step-2-set-up-analytics-and-session-tracing) and learn where to find each dashboard in [Step 3](#step-3-review-performance-in-agentforce-studio) — so don't worry about locating anything yet.

The suite has three parts. You'll set them up now, but they become useful at different points as call volume grows.

- **Agent Analytics** — The overall picture. Dashboards that record every step of a conversation and roll them up into trends: usage patterns, average quality score, escalation rate, and agent latency. Use Agent Analytics to see how Pippin is performing over time and to share that view with stakeholders.
- **Agent Optimization (Sessions & Intents)** — The specific problems. An LLM groups similar customer goals across conversations into *intents*, so you can move past whole-session summaries and find the moments where Pippin was inaccurate, went off-topic, or didn't run a configured action. For a voice agent, this is also where you **listen to call recordings** and read transcripts turn by turn (Step 4).
- **Scorers**: Your own quality criteria. Salesforce provides standard scorers out of the box (like deflection and response quality), and you can define **custom scorers** that use an LLM judge to score sessions against what "good" means for Pippin, such as accuracy, resolution, or an on-brand tone that matches your chosen voice persona. Because tone and brand voice matter as much as accuracy on a voice call, custom scorers are a natural fit for a voice agent. Scorers require Enterprise, Performance, or Unlimited edition with an Einstein or Agentforce add-on, so confirm your org qualifies. You create custom scorers in **Next Gen Testing** in Agentforce Studio (the same testing area you worked in during [Test](04-test.md)). Creating custom scorers by API is generally available; creating them in the Agentforce Studio UI (Next Gen Testing) is in beta.

> **The mental model.** Agent Analytics tells you *what* is happening across all of Pippin's conversations. Agent Optimization helps you understand *why* by letting you drill into specific sessions and intents. You'll use them together throughout this section.

> **See the dashboards in Salesforce Help.** To preview what Agent Analytics looks like once Pippin has data (including the Performance Insights breakdowns by subagent, intent, and action), see [Get Insights with Agent Analytics Dashboards](https://help.salesforce.com/s/articleView?id=ai.generative_ai_agent_analytics_use.htm&type=5) in Salesforce Help. You'll turn these on in Step 2 and open them in Step 3.

---

## Step 2: Set Up Analytics and Session Tracing

This is the one step in this section you should complete *today*, regardless of how few calls Pippin has taken. Session tracing has to be turned on *before* conversations happen for those conversations to appear in analytics later, so do it now, even though the dashboards will look empty for a while.

> **Permissions you need first.** Installing Agent Analytics requires Data Cloud permissions in addition to your admin access — and they aren't assigned by default, even for a System Administrator. Confirm your user has **one** of these combinations before you start, or the Service Agent Analytics app won't surface for you to install:
> - **System Administrator** *and* **Data Cloud Admin**, or
> - **Agentforce Service Agent Configuration** *and* **Data Cloud Architect**
>
> To check, go to Setup → **Users**, open your user, and look at **Permission Set Assignments**. If the Data Cloud permission set is missing, assign it (or ask your admin to) before continuing.

Setup happens in two places: first install a managed package, then turn on a few switches on a single Setup page.

### Install the Standard Data Model

**Install or verify the Salesforce Standard Data Model.** Analytics and session tracing read from this managed package, so it has to be in your org at **version 1.130 or later**. To check, go to Setup, search for **Packaging** in the Quick Find box, and click **Installed Packages** — then look for **Salesforce Standard Data Model** and confirm the version. If it's missing or below 1.130, install the current version from the [package install link](https://login.salesforce.com/packaging/installPackage.apexp?p0=04tKe000000Pc4v) and follow the prompts.

### Turn on observability in Setup

In Setup, search for **Einstein Audit** in the Quick Find box and open **Einstein Audit, Analytics, and Monitoring Setup**. This one page holds most of the switches the observability tools rely on. At the top, confirm **Data Cloud Status** shows *Enabled*; the rest depends on it. If the **Einstein Audit, Analytics, and Monitoring Setup** page doesn't appear in Quick Find at all, the observability features aren't available in your org yet. Confirm Einstein generative AI and Data 360 are enabled (you set both up in [Get Started](01-get-started.md#enable-required-features)), since this page depends on them. Then set these toggles:

1. **Turn on Audit and Feedback.** This authorizes Salesforce to collect and store the Einstein generative AI audit and feedback data the observability tools report on.
2. **Turn on Agentforce Session Tracing.** This is the switch that starts recording each step of Pippin's conversations — reasoning, actions, inputs and outputs, and responses. It also provisions the analytics semantic model the observability tools need.
3. **Confirm Agent Optimization is on.** It turns on automatically when you turn on Session Tracing, so once Session Tracing is on, just verify this toggle followed.
4. **Turn on Agent Health Monitoring.** This tracks silent agent failures (spiking error rates and high latency) in near real time, and surfaces error rate, latency, escalation rate, and response rate in a **Health** subtab in Agent Analytics. These are the same day-one KPIs you'll watch in [Step 5](#step-5-build-a-monitoring-strategy-for-pippin), so turn it on now. The toggle enables on its own — no extra setup required.

You can leave **Enable the Agentforce (Default) Agent** and **Agent Platform Tracing** off (neither is needed for Pippin) and keep the **Model Option for Agentforce** on **Salesforce Default**.

> **A note for the FAQ/Knowledge path.** The same page has a **Knowledge/RAG Quality Data and Metrics** toggle. It scores how well the agent retrieves and uses knowledge (Context Precision, Faithfulness, and Answer Relevance), so it only matters once Pippin answers from a Knowledge or Data Library source — your FAQ expansion, not the core WISMO order lookup. If you add that layer, turn it on and raise the **Sample Rate** above 0. Note that collecting these metrics increases your org's credit consumption.

Finally, install the **Service Agent Analytics** app. In Setup, open **Agent Analytics** (under Agent Studio). This works in two stages:

1. **Wait for the app template to appear.** The **Available Apps** area only lists an app once its prerequisites are all in place: Data Cloud enabled, an *active agent* in the org, Session Tracing on, and your install permissions assigned (see the note below). Until then it shows an empty state like *"You don't have any templates yet. Enable Agentforce Session Tracing and complete your agent-specific requirements to get started."* If you just turned on Session Tracing, give provisioning some time and refresh. The semantic model behind these templates isn't ready instantly.
2. **Install it.** When **Service Agent Analytics** appears, click **Install**, then refresh the page to confirm the installation completed. (You'll then view the dashboards in Agentforce Studio, Step 3, not from the App Launcher.)

> **Analytics and Optimization are configured separately.** Turning on Session Tracing auto-enables Agent Optimization's *toggle*, but using the Optimization dashboards still requires the **Access Agent Optimization** permission set. Likewise, the Analytics app surfacing here doesn't configure Optimization. Assign the permission set to anyone who needs the Sessions & Intents views (Step 4).

> **Why do this before you have data.** Session tracing isn't retroactive — calls that happen before it's on won't appear later. Turning it on now means Pippin's very first real conversations are captured.

---

## Step 3: Review Performance in Agentforce Studio

Most of your monitoring happens in Agentforce Studio, but not inside the agent. You don't open Pippin to monitor it. Instead, look at the Agentforce Studio left navigation: below the **Build** group (where Agents, Tests, and the rest live) is a separate **Observe & Optimize** group. That's the home for both tools you set up in Step 2, and it has two items you'll use here:

- **Analytics** — the dashboards. This is where you answer *is Pippin working?* Open it to see headline KPIs and trends across all of Pippin's sessions.
- **Sessions & Intents** — the drill-down. This is where you open individual conversations and intents to answer *where should we improve?* (covered in detail in Step 4).
- **Alerts** — proactive notifications. This is where the **Agent Health Monitoring** you turned on in [Step 2](#step-2-set-up-analytics-and-session-tracing) pays off: instead of you remembering to check the dashboard, an alert emails you when a metric crosses a threshold you set.

> **Set an alert so problems find you.** Rather than watching the Health subtab all day, create an alert for the KPI you most want to protect on a new voice agent — **Escalation Rate** or **Agent Interaction Latency** are good first choices. Under **Observe & Optimize**, open **Alerts**, click **Create Alert**, pick the metric and the agent (Pippin), set the threshold, and save. Salesforce evaluates alerts every minute against the previous 15 minutes of data and emails you when the threshold is breached, then pauses that alert's notifications for 30 minutes so you're not flooded. Viewing and creating alerts needs the **Access Agent Health Monitoring** and **Data Cloud User** permission sets.

### The Analytics dashboard

Select **Analytics** under Observe & Optimize, then open your installed **Service Agent Analytics** app. Set the filters at the top (**agent**, **timeframe**, **channel**, and **modality**) to scope what you see; set **modality** to **Voice** so every KPI and chart reflects only Pippin's calls. The dashboard has two tabs:

- **Agent Performance**: headline KPIs and trends, shown under an **Overview** heading. Switch between dimension lenses to load a different set of metrics: **Effectiveness** (deflection, escalation, abandonment, engagement, and success rates), **Usage** (session volume), **Quality** (quality scores from 1–5), **Health** (error rate and latency, the Health Monitoring you turned on in Step 2), **Trust** (Trust Layer evaluations), and **Voice** (voice-specific measures). For a voice agent, the **Voice** lens is the one to know because it surfaces measures the other lenses don't. This tab also carries the **Session Outcome** chart (Deflected / Escalated / Abandoned / Ambiguous), explained in Step 4.
- **Performance Insights** — breakdowns. Choose a breakdown by **Subagents**, **Intents**, or **Actions**, pick a metric, and compare across segments to find *which* part of Pippin is underperforming.

> **See the full dashboard in Salesforce Help.** For an annotated tour of every tab, lens, and chart described above (with example dashboards populated with data), see [Get Insights with Agent Analytics Dashboards](https://help.salesforce.com/s/articleView?id=ai.generative_ai_agent_analytics_use.htm&type=5). It's the best way to recognize each view before Pippin's own data arrives.

> **What you'll see on day one.** Because Pippin just launched, these dashboards will be sparse or empty — trends need volume to render, and intents need a clustering run (Step 4). That's expected. Get familiar with where each view lives now, so you know exactly where to look once the data arrives.

---

## Step 4: Understand Sessions & Intents

The **Sessions & Intents** page (the second item under **Observe & Optimize** in the Agentforce Studio left nav, Step 3) is where you inspect Pippin's conversations one at a time. It's the most useful part of the suite for a newly launched voice agent, because you can learn from a single call: you don't need weeks of data.

> **You can't try this out until Pippin has calls.** Everything in this step depends on real session data. Until Pippin handles live conversations, and until the analytics pipeline processes them (see the timing below), these pages will be empty, and you won't be able to follow along hands-on. That's expected, not a setup problem. The linked Salesforce Help articles in this step show each view populated with data, so you can recognize it when your own data arrives. Make your first pass here a read-through; come back and work through it live once Pippin has taken real calls.

### Filter to your voice sessions

At the top of the Sessions & Intents page, use the **modality filter** to view sessions by type: **Voice**, **Chat**, or **All Modalities**. Because Pippin runs on Enhanced Chat v2 and is voice-enabled, set the filter to **Voice** to focus on the calls that matter for this guide. Two more filters are worth knowing: the page shows sessions from a **rolling timeframe** (you can filter recent sessions), and **Transcript Export** downloads transcripts for everything currently in the filtered table.

> **A permission reminder.** Viewing Sessions & Intents requires the **Access Agent Optimization** and **Data Cloud User** permission sets — the same Optimization access noted back in Step 2. If the page is empty or unavailable, confirm those are assigned and that Session Tracing and Agent Optimization are both on in Setup.

The page is split into two views:
- **Processed Sessions** have passed through the optimization pipeline, so their intents are extracted and quality scores assigned.
- **Unprocessed Sessions** haven't been through the pipeline yet — including active calls and recently closed ones.

> **See the Sessions & Intents views in Salesforce Help.** For a walkthrough of the Processed and Unprocessed Sessions tabs, the intent columns, and the quality scores (with example data), see [Analyze Data with Agent Optimization](https://help.salesforce.com/s/articleView?id=ai.generative_ai_optimize_use.htm&type=5).

### Listen to a call, not just read it

This is the biggest difference between monitoring a voice agent and a chat agent. When you click into a voice session, the session trace shows the full **conversation transcript alongside an integrated audio player** — so you can play back the actual recording of the call directly from the Sessions page.

Reading a transcript tells you *what* Pippin said. Listening tells you *how* it landed. As you play back a WISMO call, listen for the things a transcript hides:

- **Did the agent pronounce brand and product names correctly?** If not, add them to the pronunciation dictionary you built in [Build](03-build.md).
- **Did the caller have to repeat a phone number or order number, or did Pippin mishear it?** Voice number capture, both the phone number that identifies the customer and the order number that finds the order, is the core of the WISMO flow. Recordings are where you catch recognition problems.
- **Did the pacing feel natural,** or were there long silences or the agent talking over the caller?
- **Did a silence timeout end or escalate the call** when the caller was simply thinking?

> **See a voice session trace in Salesforce Help.** The [Analyze Data with Agent Optimization](https://help.salesforce.com/s/articleView?id=ai.generative_ai_optimize_use.htm&type=5) article shows the voice session view described here: the turn-by-turn Voice Session Log, the integrated audio player, and the intent detail panel with Quality Score and Quality Score Reasoning. You'll recognize it when you open Pippin's first calls.

> **A note on duration metrics.** Agent Optimization's duration metrics (total session duration and per-response processing time) are **currently available for chat sessions only**. For voice, use the audio player and the quality score rather than the duration fields, which may be blank for Pippin's calls.

### How intents work

An **intent** is a sub-session the platform identifies by clustering conversations around a specific customer goal, for example "check order status" or "ask about return policy." Each intent gets a **Quality Score** from 1 (lowest) to 5 (highest), plus **Quality Score Reasoning**: a short explanation of the rating, such as "agent didn't address the pricing question."

Intents are generated on a schedule, then clustered and tagged. Two separate pipelines do this work:
- A session is marked **closed** when the customer or system ends it, or **after 3 hours of inactivity**.
- The **intent pipeline** derives intents from closed sessions. Its scheduler runs **every 3 hours**, and generating the intents themselves typically takes **4–5 hours** (up to 24).
- The **clustering pipeline** then groups similar intents and assigns tags. It runs **about once a week**, and a cluster forms only when there are **at least 10 semantically similar intents**. Groups smaller than that stay untagged — and untagged intents don't appear in the session trace.

> **Why this matters for a new agent.** That 10-intents-per-cluster floor is the key constraint: a handful of calls simply can't cluster into tagged patterns, and a low-volume agent may go weeks before its first tags appear. That's why Intent Monitoring (Step 5) is a roughly-30-day-post-launch activity, not a day-one activity. On day one, you can still learn a lot by listening to individual sessions.

### Read the Session Outcome

The **Session Outcome** column on the Sessions & Intents page is the fastest read on whether Pippin did its job — it classifies how each conversation ended, which maps directly onto your WISMO goals. At session close, Agentforce combines the escalation status with two LLM-evaluated scores (a **Deflection Score** from 1–5 and an **Abandonment Score**) to land on one of these:

| Session Outcome | What it means |
| :--- | :--- |
| **Deflected** | Pippin resolved it without a human — the WISMO win you're aiming for. |
| **Escalated** | The conversation was transferred to a human agent. |
| **Abandoned** | The caller disengaged without resolution (or the deflection score was low). |
| **Ambiguous** | A borderline result the evaluator couldn't confidently call. |
| **NOT_SET** | No session-end signal was received. |

Each score comes with an **evaluation reasoner** that explains how the outcome was reached — drill into a session to read it, especially for borderline (Ambiguous) calls. For a WISMO agent, watch the **Deflected vs. Escalated** balance: a healthy deflection rate means Pippin is handling order lookups on its own, while a rising escalation rate is your signal to dig into *which* intents are failing. If the default deflection and abandonment logic doesn't fit your business, you can tune it with custom scorers (Step 1).

---

## Step 5: Build a Monitoring Strategy for Pippin

A monitoring strategy grows in three stages. Each one unlocks as Pippin accumulates more calls, so treat this as a roadmap, not a checklist to finish in week one.

| Stage | When to begin | Goal |
| :--- | :--- | :--- |
| **Post-Launch Monitoring** | Immediately after launch | Confirm Pippin works as designed and data is being collected |
| **Intent Monitoring** | About 30 days after launch | Identify recurring issues to fix |
| **Root-Cause Analysis** | Once about 100 intents have clustered | Trace patterns back to a specific cause and fix it |

### Post-Launch Monitoring (Do This Now)

Right after launch, your goal is simply to confirm that Pippin is running and that data is flowing. With only a few calls, you won't see meaningful trends yet — but you can still do three things today:

1. **Check that data is being collected.** Open Agent Analytics and confirm sessions are appearing. Early on, watch usage patterns (unique callers, number of sessions), average quality score, escalation rate, and agent latency.
2. **Listen to individual calls.** In Sessions & Intents, filter to **Voice** and play back sample calls turn by turn (Step 4). For a WISMO agent, one careful listen tells you whether order-number capture, pronunciation, and pacing are working.
3. **Watch a live call with Omni Supervisor.** You don't have to wait for calls to close. Supervisors can monitor voice-enabled agents on **active calls** in the **Agentforce tab of Omni Supervisor**, which shows a list of agents currently on calls and their live transcripts. This is the fastest way to see Pippin in action on day one — including during your own test calls. (Confirm the Agentforce tab and your Agentforce service agents are visible in your Omni Supervisor configuration.)

> **Why this fits a brand-new agent.** Analytics and intent clustering need volume, but listening to a single call (live in Omni Supervisor or recorded in Sessions & Intents) gives you real signal immediately.

> **See live-call monitoring in Salesforce Help.** For the Agentforce tab layout and the supervisor configuration prerequisites, see [Monitor Voice-Enabled Agents](https://help.salesforce.com/s/articleView?id=ai.monitor_voice_enabled_agents.htm&type=5).

### Intent Monitoring (Come Back in About 30 Days)

Once Pippin has real usage, the system clusters and tags intents you can learn from. Open the intents view, filter by quality score, and inspect the low-scoring intents. Reading the **Quality Score Reasoning** on a poor intent often points straight at the fix — a missing knowledge answer, an action that didn't run, or an instruction that needs tightening.

For voice, pair this with the audio player: when an intent scores low, listen to a session behind it to hear whether the problem was comprehension (Pippin misheard the caller) or content (Pippin heard correctly but answered poorly). That distinction changes the fix.

### Root-Cause Analysis (Come Back Once You Have About 100 Clustered Intents)

Root-cause analysis begins after the first weekly clustering run gives you enough data — as a rule of thumb, around 100 intents, which usually comes from about 100 sessions. At that point you can move from the *what* of Analytics to the *why* of Optimization:

1. Use the Analytics dashboard to spot performance gaps and flagged interactions.
2. Let Optimization surface interactions where Pippin was inaccurate, misleading, or irrelevant (including fabricated answers), or failed to run a configured action.
3. Analyze individual intents by their Quality Score (1–5) and read the Quality Score Reasoning.
4. Correlate metrics to find deeper problems — for example, intents with **high duration and a low quality score** reveal where callers spend a long time but get poor answers. Add escalation rate to confirm whether those calls are ending in transfers.

### Monitoring Cadence

Once the three stages are in motion, settle into a rhythm:

| Cadence | Activities |
| :--- | :--- |
| **Daily** | Monitor high-level KPIs in Agent Analytics; when a negative trend appears (like a rising escalation rate), drill into the responsible intents in Optimization. Triage internal and external feedback about Pippin. |
| **Weekly** | Review clustered intents to find areas for improvement. Listen to a sample of voice sessions across your key topics. |
| **Monthly** | Collaborate with subject matter experts (SMEs) and builders on root causes; implement changes (refine instructions, update Knowledge, adjust actions); validate in a sandbox with manual and batch testing; then redeploy and monitor. |

> **Reuse your test suite.** When you validate changes before redeploying, you already have a head start: the NTO batch test suite you built in [Test](04-test.md). Rerun it in your sandbox to confirm a fix works before it reaches callers — up to 100 test cases at once, without deactivating the agent.

---

## What's Next

You've now walked the full lifecycle — from [Ideate](02-ideate.md) through [Build](03-build.md), [Test](04-test.md), [Deploy](05-deploy.md), and Monitor. Pippin is live and observable, and you have a strategy for improving it as real calls come in.

From here, the work is iterative:

- **This week:** Confirm session tracing is recording (Step 2), listen to a handful of live and recorded calls (Steps 1 and 4), and watch the escalation rate in Agent Analytics.
- **Around 30 days in:** Come back for Intent Monitoring — review clustered intents and their quality scores to find your first improvements.
- **Ongoing:** Settle into the daily/weekly/monthly cadence, and rerun your [Test](04-test.md) suite in a sandbox before every change you redeploy.

As Pippin proves out on WISMO, the natural next step is expansion (adding an FAQ layer or new topics) and repeating this lifecycle for each addition. Monitoring is what tells you when Pippin is ready for more.

