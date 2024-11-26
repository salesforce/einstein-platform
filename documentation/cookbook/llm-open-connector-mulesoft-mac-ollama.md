---
slug: mulesoft-ollama
authors: [alexandramartinez]
tags: [mulesoft, mac, llm-open-connector, ollama]
date: 2024-11-29
---

# LLM Open Connector + MuleSoft + Ollama

Learn how to implement Salesforce's [LLM Open Connector](/docs/apis/llm-open-connector/) using MuleSoft and the [MAC](https://mac-project.ai/) (MuleSoft AI Chain) project. We have our [Ollama](https://ollama.com/) host running locally for quick testing and our Mule application using the MAC project running in CloudHub to expose the API.

<!-- truncate -->

## Prerequisites

1. Anypoint Platform account (create a free trial [here](https://anypoint.mulesoft.com/login/signup)).
1. MuleSoft's IDE: either [Anypoint Code Builder](https://docs.mulesoft.com/anypoint-code-builder/start-acb-desktop) or [Anypoint Studio](https://www.mulesoft.com/lp/dl/anypoint-mule-studio) (instructions are based on ACB).
1. [Ollama](https://ollama.com/) running locally + the model of your choice (i.e., `llama3`).
1. [ngrok](https://download.ngrok.com/) to expose your local Ollama instance to the public cloud.
1. Any REST client application to test the API calls. For example, cURL or Postman.

Additionally, you can compare your Mule app with [this GitHub repo](https://github.com/alexandramartinez/ollama-llm-provider) to avoid confusion.

## Expose Ollama's URL

1. Verify your model is up and running (locally) in Ollama using `ollama list` or `ollama ps`.

1. Run the following command to start ngrok:

    ```shell
    ngrok http 11434 --host-header="localhost:11434"
    ```

1. Copy the address from the **Forwarding** field. This is the URL you will use to connect to Ollama from the Mule app.

## Create and publish the API specification

1. Download the `llm-open-connector.yml` file from the [einstein-platform](https://github.com/salesforce/einstein-platform/blob/main/api-specs/llm-open-connector/llm-open-connector.yml) GitHub repository.

1. Rename the extension of the file from `yml` to `yaml`.

1. Head to your [Anypoint Platform](https://anypoint.mulesoft.com) account.

1. Navigate to **Design Center**.

1. Click on **Create +** > **Import from File**.

1. Fill out the following details:

    - Project name: `LLM Open Connector`
    - Import type: API specification `REST API`
    - Import file: the file you downloaded on step 1

1. Click on **Import**

1. Add a character inside `termsOfService` (i.e., `termsOfService: "-"`)

1. Remove the `servers` section:

    ```yaml
    servers:
        - url: https://bring-your-own-llm.example.com
    ```

1. Click on **Publish** at the top-right side of the screen.

1. Make sure the following details are selected:

    - Asset version: `1.0.0`
    - API version: `v1`
    - LifeCycle State: Stable

1. Click on **Publish to Exchange**.

1. Once published, you can click on the **Exchange** link to see the preview of the published asset, or click on **Close**.

1. Exit Design Center

## Implement the Mule app

1. Head to the IDE of your choice. In this case, we will be using Anypoint Code Builder (the Visual Studio Code-based IDE).

1. In ACB, click on **Implement an API**.

    :::note
    If you haven't signed in to your Anypoint Platform account through ACB, it will ask you to sign in now. Follow the prompts to sign in.
    :::

1. Fill out the following details:

    - Project Name: `ollama-llm-provider`
    - Project Location: choose any folder to keep this project
    - Search an API Specification from Exchange to implement it: the **LLM Open Connector** we just published
    - Mule Runtime: `4.8.0`
    - Java Version: `17`

1. Click on **Create Project** and wait for it to be fully processed.

### Maven

1. Once processed, open the `pom.xml` file and add the following Maven dependency:

    ```xml
    <dependency>
        <groupId>com.mulesoft.connectors</groupId>
        <artifactId>mule4-aichain-connector</artifactId>
        <version>1.0.0</version>
        <classifier>mule-plugin</classifier>
    </dependency>
    ```

1. Change the `version` (should be line 6) to the following:
    
    ```xml
    <version>1.0.0</version>
    ```
 
1. Copy the `groupId` (in `dependencies`) for the `llm-open-connector` artifact. If should be a number similar to this: `d62b8a81-f143-4534-bb89-3673ad61ah01`. This is your organization ID.

1. Paste this organization ID in the `groupId` field at the top of the file (should be line 4), replacing `com.mycompany` with your org ID. It should look similar to this:

    ```xml
    <groupId>d62b8a81-f143-4534-bb89-3673ad61ah01</groupId>
    ```

### LLM Config

1. Create a new file under src/main/resources named `llm-config.json`.

1. Paste the following content into this file:

    ```json
    {
        "OLLAMA": {
            "OLLAMA_BASE_URL": "https://11-13-23-16-11.ngrok-free.app"
        }
    }
    ```

1. Replace the example URL with the one you copied from ngrok.

### Mule Flow

1. Open the `ollama-llm-provider.xml` file under src/main/mule.

1. Add the following code under the `apikit:config` and before the `<flow name="llm-open-connector-main">` (should be line 7)

    ```xml
    <ms-aichain:config configType="Configuration Json" filePath='#[(mule.home default "") ++ "/apps/" ++ (app.name default "") ++ "/llm-config.json"]' llmType="OLLAMA" modelName="#[vars.inputPayload.model default 'llama3']" name="MAC_Config" temperature="#[vars.inputPayload.temperature default 1]" maxTokens="#[vars.inputPayload.max_tokens default 500]"></ms-aichain:config>
    ```

    :::note
    If your model is not `llama3`, make sure you upload the `default` value in the previous line (i.e., `modelName="#[vars.inputPayload.model default 'llama3']"`).
    :::

1. Locate the last flow in the file (should be `post:\chat\completions:application\json:llm-open-connector-config`).

1. Remove the logger and add the following code inside this flow.

    ```xml
    <logger doc:name="Logger" doc:id="ezzhif" message="#[payload]" />
    <ee:transform doc:name="Transform" doc:id="dstcls">
        <ee:message>
            <ee:set-payload><![CDATA[payload.messages[0].content]]></ee:set-payload>
        </ee:message>
        <ee:variables>
            <ee:set-variable variableName="inputPayload">
                <![CDATA[payload]]>
            </ee:set-variable>
        </ee:variables>
    </ee:transform>
    <ms-aichain:chat-answer-prompt config-ref="MAC_Config" doc:id="mmoptd" doc:name="Chat answer prompt" />
    <ee:transform doc:name="Transform" doc:id="czdqgi">
        <ee:message>
            <ee:set-payload>
                    <![CDATA[output application/json
    ---
    {
        id: uuid( ),
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
        created: now() as Number,
        model: vars.inputPayload.model default "",
        object: "chat.completion",
        usage: {
            completion_tokens: (attributes.tokenUsage.outputCount default 0) as Number,
            prompt_tokens: (attributes.tokenUsage.inputCount default 0) as Number,
            total_tokens: (attributes.tokenUsage.totalCount default 0) as Number
        }
    }]]>
            </ee:set-payload>
        </ee:message>
    </ee:transform>
    <logger doc:name="Logger" doc:id="rzhuiw" message="#[payload]" />
    ```

1. This is what you would see from the graphical view for this flow. If you can't see this flow, make sure you click on the **Flow List** button inside the canvas.

    ![Mule MAC Ollama Flow](/documentation/static/img/mule-mac-ollama-flow.png)

1. Make sure you save all the files.

## Deploy to CloudHub 2.0

:::note
You can test your application locally before deploying to CloudHub to verify everything was set up correctly. To do this, head to the **Run and Debug** tab, press the green run button, and use the [Test the deployed Mule app](#test-the-deployed-mule-app) instructions. Just replace the URL with `http://localhost:8081/api/chat/completions`
:::

1. Still with the `ollama-llm-provider.xml` file open, click on the **Deploy to CloudHub** button located at the top-right side of the screen (the little rocket 🚀 icon).

1. Select **CloudHub 2.0**.

1. Select **Cloudhub-US-East-2** if you have a free trial account based on the US cloud. Otherwise, select any of the regions available to you.

    :::note
    To double-check the regions you have access to in your Anypoint Platform account, you can do so from **Runtime Manager** by trying to create a new deployment and seeing the available options.
    :::

1. Select **Sandbox** as the environment.

1. A new file with the name `deploy_ch2.json` will be created under src/main/resources. You can change the data in this file if needed. If not, it should look like this:

    ```json
    {
        "applicationName": "ollama-llm-provider",
        "runtime": "4.8.0",
        "replicas": 1,
        "replicaSize": "0.1",
        "deploymentModel": "rolling"
    }
    ```

1. Click on **Deploy** in the message that appears at the bottom-right of the screen.

1. Select the latest Mule runtime version available from the next prompt. In this case, you can select `4.8.1:6e-java17` if available. This will change the `runtime` field from the `deploy_ch2.json` file.

1. Your asset will first be published to Exchange as an Application. After that, the deployment to CloudHub 2.0 will start. Once you receive the *'ollama-llm-provider' is deployed to 'Sandbox' Env in CloudHub 2.0*, it means the deployment has successfully started in Anypoint Platform.

1. Head to your Anypoint Platform account and open **Runtime Manager** (or click the **Open in Runtime Manager** button from ACB).

1. Once your application's status appears as 🟢 `Running`, it means it's ready to start receiving requests. Copy the URL (Public Endpoint). It should look similar to this: `https://ollama-llm-provider-69s5jr.5se6i9-2.usa-e2.cloudhub.io`.

1. Add `/api` at the end of this URL. This is the URL we will use to call this API.

## Test the deployed Mule app

You can call the previous URL using tools like cURL or Postman. Here is an example cURL command you can use, just make sure you replace the example URL with your own.

```shell
curl -X POST https://ollama-llm-provider-69s5jr.5se6i9-2.usa-e2.cloudhub.io/api/chat/completions \
-H 'Content-Type: application/json' \
-d '{
  "messages": [
    {
      "content": "What is the capital of Canada?",
      "role": "user",
      "name": "Alex"
    }
  ],
  "model": "llama3",
  "max_tokens": 0,
  "n": 1,
  "temperature": 1,
  "parameters": {
    "top_p": 0.5
  }
}'
```

:::note
Since Ollama does not require an `api-key` header, we are not sending it in this request.
:::

## Bring Your Connected Endpoint to Salesforce Model Builder

Follow the instructions in [this developer blog](https://developer.salesforce.com/blogs/2024/10/build-generative-ai-solutions-with-llm-open-connector) to use your model in Model Builder. When you activate your model, you can use it within [Prompt Builder](https://developer.salesforce.com/docs/einstein/genai/guide/get-started-prompt-builder.html), the [Models API](https://developer.salesforce.com/docs/einstein/genai/guide/models-api.html), and for building actions using prompt templates in Agent Builder. All these methods provide built-in security offered by the [Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_layer.htm&type=5).

## Conclusion

This cookbook demonstrates how to set up an LLM Open Connector using Ollama locally for Chat Completion endpoints for various models. This option is recommended for local testing since there are no credit limits. Another scenario is if you want to test your own model locally using Ollama. This is not a recommended use case for production use unless you want to host your model on-prem.
