# Pronunciation Dictionary Builder Skill

Paste this prompt into your AI assistant of choice — Claude, Copilot, Gemini, Agentforce Vibes, or any AI assistant with chat or agent mode.

> **Before you start:** Collect the words you want to check — brand names, product names, acronyms, and any terms unique to your organization or industry. You don't need to know how to write phonetic notation. Just provide the words and some context about your business, and the skill will do the rest.
>
> The output is a ready-to-use table you add into Salesforce's pronunciation dictionary, one row at a time. Once your entries are in, preview them with the **Preview Message** and **Play** control in Agentforce Builder — only keep entries where the pronunciation is genuinely wrong without the override.

---

## Prompt

```
I'm building a voice agent in Salesforce Agentforce Contact Center. I need to populate the pronunciation dictionary with phonetic entries for brand names, product names, and terms the agent will say aloud that might be mispronounced by the text-to-speech engine.

The Salesforce pronunciation dictionary has three fields for each entry:
- **Word** — the word or phrase exactly as written
- **Pronunciation** — the phonetic string (CMU ARPABET format for English; IPA for non-English)
- **Type** — CMU (for English) or IPA (for non-English)

Here is my word list:

[PASTE YOUR WORD LIST HERE — one word or phrase per line]

And here is some context about my organization to help with pronunciation:
- Company or brand name: [e.g., Northern Trail Outfitters / NTO]
- Industry or product category: [e.g., outdoor gear, healthcare, financial services]
- Any known pronunciation notes: [e.g., "ApexTrail is one word, not two" or "WISMO is pronounced wizz-mo"]

---

Using this information, produce a pronunciation dictionary table in the following format:

| Word | Pronunciation | Type | Notes |
| :--- | :--- | :--- | :--- |

Rules for filling in the table:
- For English words: use CMU ARPABET format. Write phoneme codes in uppercase, separated by spaces (e.g., "AY P EH K S T R EY L" for ApexTrail). Use standard ARPABET phoneme codes: AA, AE, AH, AO, AW, AY, B, CH, D, DH, EH, ER, EY, F, G, HH, IH, IY, JH, K, L, M, N, NG, OW, OY, P, R, S, SH, T, TH, UH, UW, V, W, Y, Z, ZH.
- For non-English words or names: use IPA notation and set Type to IPA.
- In the Notes column: flag any entry where you are less than confident in the phonetic output, or where the correct pronunciation depends on regional accent. Mark these with ⚠️.
- Only include words that are plausible candidates for mispronunciation. If a word is standard English and unlikely to be misread by TTS, note it as "Likely fine — preview before adding."

After the table, list any words from the input that you did not include and briefly explain why (e.g., "standard English word, no override expected").

End with this reminder:
"Test each entry using the voice preview panel in Agentforce Builder before saving. If the agent pronounces the word correctly without an override, skip the entry — unnecessary entries can interfere with natural speech patterns."
```

---

## How to use the output

The table maps directly to the pronunciation dictionary in Agentforce Builder:

1. In Agentforce Builder, open your agent and go to **Voice Settings**.
2. Under **Pronunciation Dictionary**, copy the **Word or Phrase**, **Pronunciation**, and **Type** values from the first row of the table into the corresponding fields.
3. Click **Add**. The entry appears in the list and the fields clear, ready for the next row.
4. Repeat for each row in the table. Entries stack in the list, so you don't save between them.
5. When you've added every entry, **save the agent** to keep the dictionary. To hear how a term sounds, set the **Preview Message** to a sentence that includes it and click **Play**; if it sounds wrong, adjust that entry's phonetic string.

> Results may vary across AI tools — if the first output for a word doesn't sound right when you preview it in Salesforce, paste that specific entry back into your AI assistant and ask it to try an alternative phonetic spelling. Iteration is expected for unusual names or compound words.

---

## NTO example

For the Northern Trail Outfitters implementation in this guide, the starting word list includes:

| Word | Pronunciation | Type | Notes |
| :--- | :--- | :--- | :--- |
| ApexTrail | AY P EH K S T R EY L | CMU | Compound brand name — TTS may split into "Apex" + "Trail" |
| NovaPace | N OW V AH P EY S | CMU | Unusual compound — may be read as "Nova" + "Pace" with a pause |
| TerraMax | T EH R AH M AE K S | CMU | May be read as two words; override ensures it flows as one |
| NTO | EH N T IY OW | CMU | Initialism — spoken as three letters, not as a word |
| WISMO | W IH Z M OW | CMU | Internal acronym — should sound like "wizz-mo", not spelled out |

> These are starting points. Always preview in Salesforce's voice panel before finalizing — TTS engine behavior can vary, and you may find some entries are unnecessary or need adjustment.

---

## After the walkthrough: build a dictionary for your own agent

> The NTO example above shows what finished entries look like. This skill *is* the "build your own" path — the prompt at the top of this file already asks for **your** word list and **your** business context, not NTO's. So there's nothing extra to run here: once you've finished the guide, gather your own brand names, product names, and jargon, fill in the prompt above, and generate a dictionary for your agent. Preview each entry in Agentforce Builder before saving — and keep only the ones that are genuinely mispronounced without the override.
