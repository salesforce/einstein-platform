---
slug: mulesoft-ollama
authors: [alexandramartinez]
tags: [mulesoft, mac, llm-open-connector, ollama]
date: 2024-11-29
---

# LLM Open Connector + MuleSoft + Ollama

Learn how to implement Salesforce's [LLM Open Connector](/docs/apis/llm-open-connector/) using MuleSoft and the [MuleSoft AI Chain (MAC)](https://mac-project.ai/) project. This recipe relies on locally hosted [Ollama](https://ollama.com/) for quick testing. The Mule application and MAC project run in CloudHub to expose the API. The instructions in this recipe are based on Anypoint Code Builder (ACB).

<!-- truncate -->

## Prerequisites

1. Anypoint Platform account (create a free trial [here](https://anypoint.mulesoft.com/login/signup)).
2. MuleSoft's IDE: either [Anypoint Code Builder (ACB)](https://docs.mulesoft.com/anypoint-code-builder/start-acb-desktop) or [Anypoint Studio](https://www.mulesoft.com/lp/dl/anypoint-mule-studio). This recipe is based on ACB.
3. [Ollama](https://ollama.com/) locally running the model of your choice (for example, `llama3`).
4. [Ngrok](https://download.ngrok.com/) to expose your local Ollama instance to the public cloud.
5. A REST client application to test the API calls. For example, cURL or Postman.

For troubleshooting, you can compare your Mule app with [this GitHub repo](https://github.com/alexandramartinez/ollama-llm-provider).

## Expose the Ollama URL

1. Verify your model is up and running (locally) in Ollama using `ollama list` or `ollama ps`.

2. Run this command to start ngrok:

    ```shell
    ngrok http 11434 --host-header="localhost:11434"
    ```

3. Copy the address from the **Forwarding** field. This address is the URL you need to connect to Ollama from the Mule app.

## Create and publish the API specification

1. Download the `llm-open-connector.yml` file from the [einstein-platform](https://github.com/salesforce/einstein-platform/blob/main/api-specs/llm-open-connector/llm-open-connector.yml) GitHub repository.

2. Rename the extension of the file from `yml` to `yaml`.

3. Log in to your [Anypoint Platform](https://anypoint.mulesoft.com) account.

4. Navigate to **Design Center**.

5. Click **Create +** > **Import from File**.

6. Fill out the spec details:

    - Project name: `LLM Open Connector`
    - Import type: API specification `REST API`
    - Import file: The `llm-open-connector.yaml` file from steps 1 and 2. (Ensure that the file extension is `.yaml`.)

7. Click **Import**.

8. Add a character inside `termsOfService` (for example, `termsOfService: "-"`).

9. Remove the `servers` section, including the example `url`:

    ```yaml
    servers:
        - url: https://bring-your-own-llm.example.com
    ```

10. Click **Publish** in the top right of the screen.

11. Provide versioning information:

    - Asset version: `1.0.0`
    - API version: `v1`
    - LifeCycle State: Stable

12. Click **Publish to Exchange**.

13. After it is published, you can click the **Exchange** link to see the preview of the published asset, or click **Close**.

14. Exit Design Center.

## Implement the Mule app

1. Head to the IDE of your choice. In this recipe, we are using Anypoint Code Builder, the MuleSoft IDE powered by Visual Studio Code.

2. In ACB, click **Implement an API**.

    :::note
    If you haven't signed in to your Anypoint Platform account through ACB, it asks you to sign in. Follow the prompts to sign in.
    :::

3. Fill out the project details:

    - Project Name: `ollama-llm-provider`
    - Project Location: choose any folder to keep this project
    - Search an API Specification from Exchange to implement it: the **LLM Open Connector** we just published
    - Mule Runtime: `4.8.0`
    - Java Version: `17`

4. Click **Create Project** and wait for it to be fully processed.

### Maven

1. After it is processed, open the `pom.xml` file and add the Maven dependency:

    ```xml
    <dependency>
        <groupId>com.mulesoft.connectors</groupId>
        <artifactId>mule4-aichain-connector</artifactId>
        <version>1.0.0</version>
        <classifier>mule-plugin</classifier>
    </dependency>
    ```

2. Change the `version` in line 6:
    
    ```xml
    <version>1.0.0</version>
    ```
 
3. Copy the `groupId` (in `dependencies`) for the `llm-open-connector` artifact. The `groupId` is a number similar to: `d62b8a81-f143-4534-bb89-3673ad61ah01`. This number is your organization ID.

4. Paste this organization ID in the `groupId` field at the top of the file, replacing `com.mycompany`:

    ```xml
    <groupId>d62b8a81-f143-4534-bb89-3673ad61ah01</groupId>
    ```

### LLM Config

1. Create a file under src/main/resources named `llm-config.json`.

2. Paste this code into the `llm-config.json` file:

    ```json
    {
        "OLLAMA": {
            "OLLAMA_BASE_URL": "https://11-13-23-16-11.ngrok-free.app"
        }
    }
    ```

3. Replace the example URL with the one you copied from ngrok in step 3 of [Expose the Ollama URL](#expose-the-ollama-url).

### Mule Flow

1. Open the `ollama-llm-provider.xml` file under src/main/mule.

2. Add this code under `apikit:config` and before `<flow name="llm-open-connector-main">`.

    ```xml
    <ms-aichain:config configType="Configuration Json" filePath='#[(mule.home default "") ++ "/apps/" ++ (app.name default "") ++ "/llm-config.json"]' llmType="OLLAMA" modelName="#[vars.inputPayload.model default 'llama3']" name="MAC_Config" temperature="#[vars.inputPayload.temperature default 1]" maxTokens="#[vars.inputPayload.max_tokens default 500]"></ms-aichain:config>
    ```

    :::note
    If your model is not `llama3`, make sure you upload the `default` value in the previous line (for example, `modelName="#[vars.inputPayload.model default 'llama3']"`).
    :::

3. Locate the last flow in the file (for example, `post:\chat\completions:application\json:llm-open-connector-config`).

4. Remove the logger and add this code to the flow.

    ```xml
    <logger doc:name="Logger" doc:id="ezzhif" message="#[payload]" />
    <ee:transform doc:name="Transform" doc:id="dstcls">
        <ee:message>
            <ee:set-payload><![CDATA[(payload.messages filter ($.role == "user"))[0].content default payload.messages[0].content]]></ee:set-payload>
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

5. The image represents the graphical view for the flow. If you can't see this flow, make sure you click the **Flow List** button inside the canvas.

    ![Mule MAC Ollama Flow](../static/img/mule-mac-ollama-flow.png)

6. Save all the files.

## Deploy to CloudHub 2.0

:::note
To verify your setup, you can test your application locally before deploying to CloudHub. Navigate to the **Run and Debug** tab, click the green **run** button, and follow [Test the Deployed Mule App](#test-the-deployed-mule-app). Be sure to replace the URL with `http://localhost:8081/api/chat/completions`.
:::

1. With the `ollama-llm-provider.xml` file open, click **Deploy to CloudHub** in the top right of the screen (the rocket 🚀 icon).

2. Select **CloudHub 2.0**.

3. Select **Cloudhub-US-East-2** if you have a free trial account based on the US cloud. Otherwise, select any of the regions available to you.

    :::note
    To verify the regions you have access to in your Anypoint Platform account, you can do so from the **Runtime Manager** by creating a deployment and checking the available options.
    :::

4. Select **Sandbox** as the environment.

5. A new file named `deploy_ch2.json` is created under src/main/resources. You can change the data in this file if needed. By default, it contains:

    ```json
    {
        "applicationName": "ollama-llm-provider",
        "runtime": "4.8.0",
        "replicas": 1,
        "replicaSize": "0.1",
        "deploymentModel": "rolling"
    }
    ```

6. In the message that appears in the bottom right, click **Deploy**.

7. In the next prompt, select the latest Mule runtime version available. For this recipe, you can select `4.8.1:6e-java17` if available. This changes the `runtime` field in the `deploy_ch2.json` file.

8. Your asset is first published to Exchange as an Application. Afterwards, the deployment to CloudHub 2.0 starts. When you receive the message: *'ollama-llm-provider' is deployed to 'Sandbox' Env in CloudHub 2.0*, the deployment has successfully started in Anypoint Platform.

9. Navigate to your Anypoint Platform account and open **Runtime Manager** (or click **Open in Runtime Manager** in ACB).

10. When your application's status appears as 🟢 `Running`, it's ready to start receiving requests. Copy the public endpoint URL (for example, `https://ollama-llm-provider-69s5jr.5se6i9-2.usa-e2.cloudhub.io`).

11. Add `/api` at the end of the URL. This URL is used to call the API.

## Test the Deployed Mule App

You can call the previous URL using tools like cURL or Postman. Here is an example cURL command; make sure you replace the example URL with your own.

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

This cookbook demonstrates how to set up the LLM Open Connector using Ollama locally for Chat Completion endpoints for various models. This option is recommended for local testing since there are no credit limits. Another scenario is if you want to test your own model locally using Ollama. The implementation in this recipe is not recommended for production use unless you plan to host your model on-premises.
