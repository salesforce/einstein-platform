---
slug: grok
authors: [brettallenyo]
tags: [grok, llm-open-connector]
date: 2025-07-16
---

# LLM Open Connector + Grok

Implementing Salesforce's [LLM Open Connector](/docs/apis/llm-open-connector/) with [Grok](https://x.ai/news/grok-4) has never been easier. No custom scripts or deployments are required. Just plug in your xAI API key and you're off to the races.

<!-- truncate -->

## Prerequisites

1. Create a team in the [xAI Cloud Console](https://console.x.ai/)
   ![xAI Cloud Console Landing Page](../static/img/xai-cloud-console-landing-page.png)
2. Buy some API credits
3. Create an API key
   - ⬆️ Make sure to save the secret somewhere!

## Integrate with Agentforce

Because xAI is fully compatible with the Open Connector API specification, you can just follow the LLM Open Connector [product guide](https://developer.salesforce.com/blogs/2024/10/build-generative-ai-solutions-with-llm-open-connector). Here is a quick version:

### 1️⃣ Add a Foundation Model

![Agentforce Add Foundation Model](../static/img/agentforce-add-foundation-model.png)

### 2️⃣ Connect your LLM

![Agentforce Connect Your LLM](../static/img/agentforce-connect-your-llm.png)

### 3️⃣ Enter your xAI API key

**TODO: insert screenshot**

- Add `https://api.x.ai/v1/chat/completions` to the _URL_ field
- Add your API secret to the _Auth Key_ field
- Add `grok-4` to the _Model Name_ field

### 4️⃣ Create your model configuration

![Agentforce New Configuration](../static/img/agentforce-new-configuration.png)

### 5️⃣ Start using Grok!

**TODO: insert screenshot**

## Wrapping up

In just minutes, you’ve unlocked the power of [Grok 4](https://x.ai/news/grok-4) within Einstein Studio, enabling cutting-edge AI capabilities for your Agentforce applications. Leverage Grok’s advanced reasoning to tackle complex use cases, streamline workflows, and deliver unparalleled user experiences.

You can easily monitor consumption, purchase additional credits, and more within the [xAI Cloud console](https://console.x.ai/).
