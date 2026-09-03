# Test Suite Generator

Paste this prompt into your AI assistant of choice — Claude, Copilot, Gemini, or any AI assistant with chat or agent mode — to generate a batch test suite for your voice agent. The skill produces a CSV file formatted for Salesforce Agentforce Testing Center — ready to import directly.

---

## Prompt

```
You are helping me create a batch test suite CSV for my Agentforce voice agent. I'll describe my agent and you'll generate a ready-to-import CSV file.

My agent configuration:

Agent name: [your agent name]

Subagents (list each one with a brief description of what it handles):
- [SubagentDeveloperName]: [what it handles]
- [SubagentDeveloperName]: [what it handles]
(add more as needed)

Actions (list each one):
- [ActionDeveloperName]: [what it does]
(add more as needed)

Use cases to test: [describe what the agent is designed to do — e.g., "Order status lookup by order number, FAQ about returns and shipping"]

Authentication method: [how customers are identified — e.g., "phone number", "account number", "date of birth". Do NOT include email address — it doesn't work reliably over voice]

Known edge cases or boundaries: [anything specific you want tested — e.g., "customer doesn't have their order number", "customer asks for something out of scope", "customer asks to speak to a person mid-conversation"]

Generate a CSV with these exact columns:
Utterance, Expected Subagent, Expected Actions, Expected Response

Rules:
- Utterance: write it the way a customer would actually say it over the phone — casual, sometimes imprecise, sometimes incomplete. Do not write search-box queries.
- Expected Subagent: use the exact developer name I provided above (no spaces, exact casing).
- Expected Actions: use Python list format — ['ActionName'] for one action, ['Action1', 'Action2'] for multiple, [] for none. Use exact developer names.
- Expected Response: write a short, natural Pippin response. Use {placeholder} for any values that come from a data lookup (e.g., {orderStatus}, {knowledgeSummary}).

Cover these scenario types:
1. Happy path — the customer provides everything needed and the interaction completes successfully
2. Voice-specific variations — fast speech, verbal number formats (e.g., "one-two-five-four-eight"), hesitant or uncertain phrasing, repeated input
3. Frustrated or urgent tone — same request but expressed with impatience or urgency
4. Missing information — the customer wants help but is missing a key piece (e.g., no order number)
5. Edge cases — requests that test known boundaries (sale items, out-of-stock, customized products)
6. Escalation — various ways a customer asks to speak to a person
7. Off-topic — requests clearly outside the agent's scope
8. Ambiguous openers — vague first turns that require the agent to ask a clarifying question before routing

Aim for 30–40 rows total. Distribute across subagents based on which ones handle the highest call volume.

Output the CSV only — no explanation, no preamble. I'll copy it directly into a file.
```

---

## How to use

1. Copy the prompt above.
2. Fill in your agent name, subagents, actions, use cases, and authentication method.
3. Paste into your AI assistant and run it.
4. Copy the CSV output and save it as a `.csv` file.
5. In Agentforce Studio, click **Tests**, create a **New Suite**, and import the file under **Data**.

---

## Filling in the prompt

**Subagent developer names:** Find these in Agentforce Builder by switching to Script view. Each subagent appears as `SubagentName:label:` — the part before the colon is the developer name. Common names follow the pattern `OrderInquiries`, `GeneralFAQ`, `Escalation` (one word, no underscores, mixed case).

**Action developer names:** Find these in the subagent's Actions panel in Agentforce Builder. Common names follow the pattern `GetOrderByOrderNumber`, `AnswerQuestionsWithKnowledge`, `CancelOrder` (camelCase, no spaces).

**Authentication:** Stick to order number, account number, date of birth, or phone number. Do not use email address — spelling it out letter-by-letter over voice is too error-prone.

---

## Expected output format

The skill generates a CSV with four columns:

| Column | What it contains |
| :--- | :--- |
| Utterance | The exact spoken phrase — e.g., `"Hi yeah my order number is 1-2-5-4-8 what's the status"` |
| Expected Subagent | Exact developer name — e.g., `OrderInquiries` |
| Expected Actions | Python list — e.g., `['GetOrderByOrderNumber']` or `[]` |
| Expected Response | Natural language Pippin response — e.g., `"Okay, I found your order. {orderStatus}"` |

The Testing Center adds evaluation columns (Agent Response, Subagent Evaluation, Action Evaluation, etc.) automatically when the test runs. Do not add them to the import file.

---

## Tips for better results

- **Be specific about edge cases.** The more clearly you describe a boundary (e.g., "the customer asks to return a sale item — the answer is no"), the more useful the generated test case will be.
- **Include your actual developer names.** If you use generic names in the prompt, the AI will invent names that won't match your org.
- **Iterate on failures.** After your first test run, import failing utterances back into the prompt and ask the AI to generate additional variations around those patterns.
- **Results vary across AI tools.** If the first output needs adjustment — phrasing sounds unnatural, or a developer name is wrong — correct it in the prompt and rerun. One pass rarely produces a perfect suite.

---

## After the walkthrough: generate a suite for your own agent

> The guide's Test section uses a pre-built NTO voice test suite (`nto-voice-test-suite.csv`) so you can run a batch test without building the suite yourself. This skill *is* the "generate your own" path — the prompt at the top of this file already asks for **your** agent, subagents, actions, and use cases, not NTO's. So there's nothing extra to run here: once you've finished the guide and are ready to test your own agent, fill in the prompt above with your own configuration and generate a suite for it. Import it into Testing Center the same way the guide imports NTO's.
