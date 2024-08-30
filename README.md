# Einstein AI Platform

Artificial intelligence is becoming increasingly personalized and specialized. At Salesforce we recognize the growing need for businesses and developers to integrate their chosen large language models (LLMs) into the Einstein AI Platform. To address this need, we're sharing API specifications, sample code, and other developer tools with the open-source community.

## LLM Open Connector

The Bring Your Own Large Language Model (BYOLLM) Open Connector is designed to provide powerful AI solutions to customers, independent software vendors (ISVs), and internal Salesforce teams. With this connector, you can connect the Einstein AI Platform to any language model, including custom-built models.

The BYOLLM Open Connector is a commitment to community-driven growth and innovation. By allowing users to integrate any LLM—from those models hosted on major cloud platforms to those models developed in-house—we're opening up a world of possibilities for enhanced, bespoke AI applications. This capability not only caters to the needs of large enterprises looking to leverage specific models like IBM Granite or Databricks DBRX, but also supports smaller teams eager to experiment with open-source models. With features designed to ensure ease of use, such as a streamlined UX in Einstein Studio and API specifications closely based on the OpenAI API, this connector empowers our users to enhance their AI-driven applications while maintaining high standards of security and compatibility.

### Usage

1. Clone this repository.
2. Implement an HTTP REST service using the [LLM Open Connector OpenAPI specification](api-specs/llm-open-connector/llm-open-connector.yml).
3. Test your service connection using Bring Your Own Large Language Model (BYOLLM) in Einstein 1 Studio.
   - Blog post: [Bring Your Own Large Language Model in Einstein 1 Studio](https://developer.salesforce.com/blogs/2024/03/bring-your-own-large-language-model-in-einstein-1-studio)
   - Help content: [Bring Your Own Large Language Model](https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_foundation_models.htm)

You can now use your LLM from anywhere that can access generative models from Einstein Studio.

### Sample Implementation

See [Implement LLM Open Connector with Groq](./cookbook/llm-open-connector-groq/cookbook-groq.md) for a step-by-step guide to implementing an LLM Open Connector with the [Groq](https://groq.com/) platform for fast AI inference. This guide also covers how to deploy the connector as a Flask app on Heroku with a simple UI for testing.

<img width="978" alt="UI for LLM Open Connector" src="https://github.com/user-attachments/assets/306bc3ec-ba57-470a-9ccb-b3054475a4dc" />

## Models API

The Models API connects your application to large language models (LLMs) through the Einstein Trust Layer. It supports the BYOLLM feature of Einstein Studio, including models created with the [LLM Open Connector](#llm-open-connector).

To get started, see the [Models API Developer Guide](https://developer.salesforce.com/docs/einstein/genai/guide/models-api.html).

## Policies for this Repo

### Contribute

Your contributions to this repository are welcome! Refer to the [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) to get started.

If you like the projects that we've shared, consider adding a ⭐ on the GitHub Repo. It helps other people discover them!

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
