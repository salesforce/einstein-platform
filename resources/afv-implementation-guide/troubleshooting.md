# Troubleshooting

Common snags people hit while building along, keyed by what you see on screen. Scan the headings
for your symptom. Most fixes live in the phase where the step appears — this page points you there
so the explanation stays with the step it belongs to. A few environment-level issues are explained
in full here.

---

## The Preview "Send" button is greyed out

**You see:** In Agentforce Builder, the **Send** button in the Preview panel is disabled and you
can't run a quick test.

**Why:** The agent has to be committed and active before Preview will accept input.

**Fix:** Commit and activate the agent first. This is covered inline where it comes up —
see [Build → Quick Test: Preview the Order Lookup](03-build.md#quick-test-preview-the-order-lookup).

---

## The data library doesn't show up when you go to assign it

**You see:** You created the **NTO Customer Service** data library, but it isn't in the list when
you try to assign it to the agent.

**Why:** A newly created library can take a minute or two to appear.

**Fix:** Wait a moment and refresh the page. See
[Build → Assign the Data Library to Pippin](03-build.md#assign-the-data-library-to-pippin).

---

## The wrong connection is assigned to the channel

**You see:** The Enhanced Chat v2 channel is wired to a connection you didn't mean to use, or you
can't tell which connection to pick.

**Fix:** Confirm the connection when you set up the channel — see
[Build → Step 6: Set Up the Enhanced Chat v2 Channel](03-build.md#step-6-set-up-the-enhanced-chat-v2-channel).

---

## "Agentforce Agents" (or the builder) isn't in Setup

**You see:** The Agentforce area you need isn't in Quick Find, so you can't start building.

**Why:** The feature isn't enabled in the org yet.

**Fix:** Enable it first. See [Get Started → Enable Agentforce](01-get-started.md#enable-agentforce),
which walks the conditional steps depending on what's already turned on in your org.

---

## The action accuracy score looks surprisingly low

**You see:** After a test run, the overall Actions Evaluation score is well below the other scorers,
even though the agent behaved correctly.

**Why:** An agent that correctly asks for and confirms a phone number and order number before acting
depresses the single-turn action score without anything actually being wrong.

**Fix:** Read the score in context — see
[Test → A Note on Verifying Actions](04-test.md#a-note-on-verifying-actions).

---

## The observability / monitoring setup page isn't in Setup

**You see:** The **Einstein Audit, Analytics, and Monitoring Setup** page doesn't appear in Quick
Find, so you can't turn on session tracing.

**Why:** The observability features depend on Einstein generative AI and Data 360 being enabled.

**Fix:** Confirm those prerequisites, then return to the step — see
[Monitor → Step 2: Set Up Analytics and Session Tracing](06-monitor.md#step-2-set-up-analytics-and-session-tracing).

---

## A flow you deployed outside the builder isn't showing up

**You see:** You deployed the order-lookup flow using the CLI or a metadata deploy, and it doesn't
appear in the builder's asset search when you go to reference it.

**Why:** Assets deployed outside the builder can take a few minutes to be indexed for search.

**Fix:** Wait 5–10 minutes and refresh. If you'd rather not wait, build the flow directly in the
builder as this guide does — it's available immediately after you activate it, no indexing delay.

---

## The data library status is stuck, or shows "Failed"

**You see:** After you upload the knowledge file, the data library doesn't reach a ready state — it
sits in **In Progress** (or **Not Started**), or it shows **Failed**.

**What to do depends on the status:**

- **In Progress / Not Started** — indexing (chunking) is still running or hasn't started yet; the
  library just isn't ready. This usually clears on its own. Refresh and wait, and if it stalls,
  trigger indexing manually — the guide walks this in Build under
  [Create the Data Library](03-build.md#create-the-data-library) (the "Troubleshooting: File uploads
  and indexing" note), and Salesforce Help lists what each status means:
  [Troubleshoot Data Libraries](https://help.salesforce.com/s/articleView?id=ai.data_library_troubleshooting.htm&type=5).
- **Failed** — the library won't recover on its own (the retriever wasn't created). If a manual
  rebuild doesn't clear it, it isn't something a different setup step will fix: try the walkthrough
  in a different org licensed for Agentforce Voice, or contact your Salesforce admin to confirm the org is
  provisioned for Agentforce data libraries.

---

## Pippin can't look up an order, or says it can't access the information

**You see:** In testing, Pippin fails to return order details, or responds that it can't find or access
the customer's information — even though the order exists.

**Why:** The agent runs as its own agent user, and that user only has the data access you've granted
it. If the agent user is missing the Order or Contact object permissions, or the **Agentforce Service
Agent User** permission set, it can't read the records its actions need.

**Fix:** Confirm the agent user's permissions — see
[Build → Add Permissions to the Agent User](03-build.md#add-permissions-to-the-agent-user), which
covers assigning the Agentforce Service Agent User permission set and adding Order and Contact object
access.

---

## "Get Order by Order Number" isn't available in the builder

**You see:** When configuring the Order Inquiries subagent, **Get Order by Order Number** isn't listed
in its actions, and it doesn't appear when you search **Add from Asset Library** either — so you can't
add the order-lookup action the guide relies on.

**Why:** That action is a standard order-management action that comes with the Agentforce Service Agent.
If it isn't available in your org, the org doesn't have those standard order actions installed.

**Fix:** Confirm you built the agent from the **Agentforce Service Agent** template, and use an org that
includes its standard order actions (and order records to retrieve) — see
[Build → If Get Order by Order Number Isn't in the Asset Library](03-build.md#if-get-order-by-order-number-isnt-in-the-asset-library).
The guide doesn't build a substitute action, so there's no workaround that skips the standard one.

---

## Commit fails: "Voice modality cannot be used"

**You see:** After you add the Enhanced Chat v2 connection (Build, Step 6) and try to commit the
agent, the commit is rejected with the banner **"We found errors in the Agent Script. Fix the
errors and try again."** Clicking **Show Errors** reveals: **"Voice modality cannot be used.
Organization does not have access to Voice features."**

**Why:** Adding the Enhanced Chat v2 connection adds a voice modality to the agent's Agent Script.
Committing that modality requires Agentforce Voice to be enabled on your org — so this error means
your org doesn't have access to Voice features.

**Fix:** This error means your org isn't voice-enabled — even if you expected it to be. It's the
voice prerequisite doing its job, not a bug to work around. Don't try to strip the voice modality
out to force the commit — that would leave you with an agent that can't actually do voice.
- **To build along, you need an org licensed for Agentforce Voice**, plus the permissions you need to
  build. If the licenses aren't in place, contact your Salesforce account executive.
- **Or follow along without building in an org.** You can walk every phase and see exactly what's
  involved without performing the voice steps in a live org.
