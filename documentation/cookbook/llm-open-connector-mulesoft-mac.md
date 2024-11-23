---
slug: mulesoft
authors: [amirkhan-ak-sf]
tags: [mulesoft, mac, llm-open-connector]
date: 2024-11-25
---
# LLM Open Connector + MuleSoft

Learn how to implement Salesforce's [LLM Open Connector](/docs/apis/llm-open-connector/) with MuleSoft Anypoint Platform using its [AI Chain Connector](https://mac-project.ai/docs/mulechain-ai/getting-started) and [Inference Connector](https://mac-project.ai/docs/mac-inference/getting-started) for various LLM Providers. Implement BYOLLM for the following LLM Providers and Inference Offerings. 

## Supported Providers and Offerings
- [HUGGING FACE](https://huggingface.co/)
- [OLLAMA](https://ollama.com/)
- [OPENROUTER](https://openrouter.ai/)
- [GROQ AI](https://console.groq.com/)
- [GITHUB MODELS](https://docs.github.com/en/github-models)
- [PORTKEY](https://portkey.ai/)
- [CEREBRAS](https://cerebras.ai/inference)
- [MISTRAL AI](https://mistral.ai/)
- [ANTHROPIC](https://www.anthropic.com/)

The cookbook will implement the example of **Cerebras Inference**, however, the approach is the same for all other Providers and offerings.

![High Level Process](/documentation/static/img/mule-mac-process.png)

<!-- truncate -->

## Prerequisites

Before you begin, make sure to meet the following prerequisites:

1. You have a MuleSoft Account (Sign up at https://anypoint.mulesoft.com/login/signup).
2. You have Anypoint Code Builder or Studio installed. (https://www.mulesoft.com/lp/dl/anypoint-mule-studio)
3. Make sure to install [Inference Connector](https://mac-project.ai/docs/mac-inference/getting-started) before you start.
3. You have a Cerebras account with an API key. (https://inference.cerebras.ai/)

## Step 1: Download the API Specification for the LLM Open Connector

1. Download LLM Open Connector [API Spec](https://github.com/salesforce/einstein-platform/blob/main/api-specs/llm-open-connector/llm-open-connector.yml)

2. Rename the file from `llm-open-connector.yml` to `llm-open-connector.yaml`

## Step 2: Import the API Specification into Anypoint Design Center

1. Login to your MuleSoft account.

2. Go to [Anypoint Design Center](https://anypoint.mulesoft.com/designcenter/#/projects). 

3. Import a new API Specification from file using the following values:
  - Project Name: `Cerebras-LLM-Provider`,
  - API Specification: Select `REST API`,
  - File upload: `llm-open-connector.yaml`, make sure to use the renamed file,
  - Click on Import.

4. The API Specification is imported. 

![Import API Specification](/documentation/static/img/mule-mac-publish-provider-asset.png)

5. Change `termsOfService: ""` to `termsOfService: "-"`

6. Remove the servers including the url. 

```
servers:
  - url: https://bring-your-own-llm.example.com
```

7. Click on Publish. 

8. Provide the following information and click on `Publish to Exchange`:
  - Asset version: `1.0.0`
  - API version: `v1`
  - Lifecycle State: `Stable`

![Publish to Exchange](/documentation/static/img/mule-mac-publish-to-exchange.png)

## Step 3: Implement the API Specification

This cookbook uses Anypoint Studio to implement the API Specification. As you prefer, you can implement the same steps using Anypoint Code Builder.

### Import API Specification into Studio

1. Open Anypoint Studio.

2. Create a new Mule Project.

3. Provider the following informations:
  - Project Name: `cerebras-llm-provider`, 
  - Import a published API: Select the `Cerebras-LLM-Provider` API Specification from previous step.

![Add API to Mule Project](/documentation/static/img/mule-mac-scaffold.png)

  - Click on Finish.

4. The Mule Project is created. 

### Add Inference Connector to your project

1. If you have not installed the Inference Connector, [Install it first](https://mac-project.ai/docs/mac-inference/getting-started) before you start. 
2. Add the Inference Connector dependency to the Mule Project.

```xml
<dependency>
  <groupId>com.mulesoft.connectors</groupId>
  <artifactId>mac-inference-chain</artifactId>
  <version>0.1.0</version>
  <classifier>mule-plugin</classifier>
</dependency>
```
3. Make sure, the Inference Connector is present in the Mule Palette.
![Mule Palette](/documentation/static/img/mule-mac-mule-palette-inference.png)


### Implement the API

1. Go to the scaffolded flow `post:\chat\completions:application\json:llm-open-connector-config`

2. Drag and drop `Chat completions` operations from the Inference Connector into the Flow.

3. Provide the Inference connector configuration for Cerebras.

4. Parametrise all properties needed by the LLM Open Connector API Spec.
![Configuraton Params](/documentation/static/img/mule-mac-configuration-params.png).

5. In the `Chat completions` operations, enter the following expressing `payload.messages`. 

6. Before the `Chat completions` operations, add the `Set Variable` operation with the name `model` and enter in the value `payload.model`.

7. After the `Chat completions` operations, add the `Transform Message` operation and provide the following mapping:

```json
%dw 2.0
output application/json
---
{
	id: "chatcmpl-" ++ now() as Number as String,
	created: now() as Number,
	usage: {
		completion_tokens: attributes.tokenUsage.outputCount,
		prompt_tokens: attributes.tokenUsage.inputCount,
		total_tokens: attributes.tokenUsage.totalCount
	},
	model: vars.model,
	choices: [
    	{
      finish_reason: "stop",
      index: 0,
      message: {
        content: payload.response default "",
        role: "assistant"
      }
    }
  ],
	object: "chat.completion"
}
```

8. Save the project.


### Test Locally

1. Start the Mule Application.

2. Go to the API Console. 
![Configuraton Params](/documentation/static/img/mule-mac-test-locally.png)

3. Enter the API Key and following payload:

```json
{
  "messages": [
    {
      "content": "What is the capital of Switzerland?",
      "role": "user",
      "name": ""
    }
  ],
  "model": "llama3.1-8b",
  "max_tokens": 500,
  "n": 1,
  "temperature": 0.7,
  "parameters": {
    "top_p": 0.5
  }
}
```

4. Validate the result, make sure the values are mapped correctly for the token usage. 

```json
{
  "id": "chatcmpl-1732373228",
  "created": 1732373228,
  "usage": {
    "completion_tokens": 8,
    "prompt_tokens": 42,
    "total_tokens": 50
  },
  "model": "llama3.1-8b",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The capital of Switzerland is Bern.",
        "role": "assistant"
      }
    }
  ],
  "object": "chat.completion"
}
```

### Deploy to Anypoint Cloudhub

1. Once the application is tested successfully, deploy it to Anypoint Cloudhub.

2. Right-click your Mule Project and go to `Anypoint Platform > Deploy to Cloudhub`.

3. Choose the environment, you want to deploy it to.

4. Provide the following informations:
  - App name: i.e. `cerebras-llm-provider`
  - Deployment target: i.e. `Shared Space (Cloudhub 2.0)`
  - Replica Count: `1`
  - Replica Size: `Micro (0.1 vCore)`

5. Click on Deploy Application.

6. Wait until the Application is deployed. 

![Deployed App](/documentation/static/img/mule-mac-deployed-app.png)



_Note: In case you receive the error `[The asset is invalid, Error while trying to set type: app. Expected type is: rest-api.]`, go to Exchange and delete or rename the asset. [This is a known issue](https://help.salesforce.com/s/articleView?id=001119384&type=1)._



## Configuration in Einstein Model Builder

1. After you API is deployed to Cloudhub, go to Salesforce Einstein Model Builder in the **Data Cloud** App. 

2. Go to Einstein Studio.

3. Add Foundation Model, and click on `Connect to your LLM`.

4. Click Next.

4. Provide the following informations:
  - Name: `Cerebras-LLM-Provider`
  - URL: `<cloudhub_url>/api`
  - Model: For this recipe, model name is required. Choose between `llama3.1-70b` or `llama3.1-8b`.

![Model Builder](/documentation/static/img/mule-mac-add-model-einstein-studio.png)

5. Click on Connect.

6. The Model Provider should be added. 

7. Now add 2 configruation for the supported models:
  - `llama3.1-70b`
  - `llama3.1-8b`

![Model Builder Playground](/documentation/static/img/mule-mac-einstein-playground.png)

## Important Considerations

1. This cookbook uses Cerebras models:
  - `llama3.1-70b`
  - `llama3.1-8b`
2. When configuring through the Einstein Model Builder, you need to provide a default value for model. As in this recipe the model name is parametrised, a value is required. 
3. The API is fully under governance in the MuleSoft Anypoint Platform, which means: 
  - You have the ability to monitor the application, i.e. view logs and errors
  - You can apply additional security using the API Management capabilities of the Anypoint Platform
  - You have the ability to deploy multiple replicas to scale horizontally and vertically if needed.

## Conclusion
This cookbook demonstrates how to set up an LLM Open Connector using MuleSoft for the Chat Completion endpoints of Cerebras. This is a sandbox implementation, which is not production ready. For production use, please optimize your implementation based on your specific requirements and expected usage patterns.