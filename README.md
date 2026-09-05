# Agentforce Companion Resources

Open-source resources for implementing Agentforce Voice and building with the LLM Open Connector, from Salesforce.

This repository powers the [Agentforce Companion Resources](https://opensource.salesforce.com/einstein-platform/) site, which houses two collections of content:

## Agentforce Voice Implementation Guide

> **Beta** — coming soon.

A step-by-step guide to implementing Agentforce Voice, with accompanying skills.

➡️ [Run the interactive guide](https://opensource.salesforce.com/einstein-platform/docs/voice/voice-intro)

💬 Have feedback on the Voice guide? [Let us know](https://docs.google.com/forms/d/e/1FAIpQLSeafQ0pwmUxIE9Y364zv77xmKAToF_pafHYTKCHfdupY7hK7A/viewform).

## LLM Open Connector

Open-source code examples and API recipes for building with the LLM Open Connector — the option for connecting your own large language models (LLMs) to Salesforce through the Bring Your Own Large Language Model (BYOLLM) feature in Model Builder. Each recipe walks through a different AI platform, including Hugging Face, Amazon Web Services, Groq, SambaNova, IBM, and Grok.

➡️ [Explore the recipes](https://opensource.salesforce.com/einstein-platform/about)

## API Specifications

Formatted API specifications are published on the site, and their sources live in this repository:

- [LLM Open Connector API](https://opensource.salesforce.com/einstein-platform/docs/apis/llm-open-connector) — source: [`api-specs/llm-open-connector/`](api-specs/llm-open-connector/llm-open-connector.yml)
- [Models API](https://opensource.salesforce.com/einstein-platform/docs/apis/models) — connects your application to LLMs through the Einstein Trust Layer. See the [Models API Developer Guide](https://developer.salesforce.com/docs/einstein/genai/guide/models-api.html) and the [Get Started with the Models API](https://trailhead.salesforce.com/content/learn/modules/get-started-with-einstein-models-api) Trailhead module. Source: [`api-specs/models/`](api-specs/models/models.yaml)

## Policies

### Contribute

Your contributions to this repository are welcome! Refer to the [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) to get started.

If you like the resources that you see here, consider adding a ⭐ on GitHub. It helps other people discover them!

### Security

Please report any security issue to [security@salesforce.com](mailto:security@salesforce.com)
as soon as it is discovered. This library limits its runtime dependencies in
order to reduce the total cost of ownership as much as can be, but all consumers
should remain vigilant and have their security stakeholders review all third-party
products (3PP) like this one and their dependencies.

### License Info

All code in this repository is licensed under an [Apache License v2](LICENSE) license.

### Salesforce-authored Code

The shorter version of license text must be added as a comment to all Salesforce-authored source code and configuration files that support comments. This rule applies to file formats like HTML, CSS, and JavaScript, which aren't exactly source code, but are still critical to the project.

```
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * SPDX-License-Identifier: Apache-2
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

### Other Legal Disclaimers

Rights of ALBERT EINSTEIN are used with permission of The Hebrew University of Jerusalem / [CMGWorldwide.com](http://cmgworldwide.com/).
