---
slug: ibm
authors: [tatedorman]
tags: [ibm, llm-open-connector]
date: 2024-10-18
---

# LLM Open Connector + watsonx

Learn how to implement Salesforce's [LLM Open Connector](/docs/apis/llm-open-connector/) with the IBM watsonx platform.

<!-- truncate -->

## Prerequisites

- A Salesforce org with Einstein Generative AI and Data Cloud enabled.
- A Salesforce Einstein Studio Environment.

## Step 1\. Create Your watsonx Instance

**Create an account.**

1. If you don’t already have one, [create a watsonx trial account](https://dataplatform.cloud.ibm.com/registration/stepone?context=wx). 

   If you have an existing, non-trial watsonx account, you’ll need to follow these additional steps: 

    1. In IBM Cloud, [set up IBM Cloud Object Storage for use with IBM watsonx](https://dataplatform.cloud.ibm.com/docs/content/wsj/console/wdp_admin_cos.html?context=wx&audience=wdp).   
    2. [Set up the Watson Studio and Watson Machine Learning](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/set-up-ws.html?context=wx&audience=wdp) services.   
    3. Create a new project from the [IBM watsonx console](https://dataplatform.cloud.ibm.com/projects/?context=wx).

**Find your Project ID value.**

1. In your sandbox, click on the **Manage** tab and copy your Project ID value.   
2. Store the project-id value. You’ll need this value along with an API key and a region-id in step three.

**Create an IBM Cloud API Key.**

1. In the IBM Cloud console, go to **Manage** \> **Access (IAM)**.  
2. In the sidebar, select **API Keys**.  
3. Click **Create**.  
4. Enter a name and description for your API key.  
5. Then, click **Create**.  
6. Store your API key in a safe location. 

**Get the region value for the watsonx instance.**

1. From the watsonx home page, check the region in the header bar. 

![IBM region id value](/img/ibm-region-id.png)

2. Store the region-id value.

## Step 2\. Verify Your Open Connector Implementation (Optional)

IBM automatically provides a working implementation of the Open Connector for watsonx that you can use to test this workflow. If you want to create your own implementation for production use cases, follow these steps. Otherwise, skip to step three.

1. Create your own connector implementation for watsonx. For directions and code, see [IBM's watsonx connector repo](https://ibm.biz/eebl-salesforce-watsonx-apic-connector-code).

## Step 3\. Create a BYOLLM Connection to the watsonx Model in Einstein Studio

Before you connect your Open Connector implementation to Einstein Studio, you’ll need three pieces of information from Step 1: project-id, API key, and region-id.

1. Log into your Salesforce org as an admin user and open Einstein Studio.  
2. Click **Model Library**.  
3. Click **Add Foundation Model**. 

![Add a Foundation Model](/img/ibm-model-library.png)

4. In Model Builder, click **Connect to your LLM**.

![Connect to your LLM](/img/ibm-model-builder.png)

5. Click **Next**.  
6. Enter the details of your watsonx instance.   
   * Name: IBM Granite (or your own preferred name)  
   * URL:  if you are using the connector hosted by IBM, get the URL from [IBM's watsonx connector repo](https://ibm.biz/eebl-salesforce-watsonx-apic-connector-code). Otherwise, use the URL from the connector instance that you have created from the code and documentation in [the watsonx repo](https://ibm.biz/eebl-salesforce-watsonx-apic-connector-code). When filling out the URL value, be sure to use the project-id and region-id that you copied from step 1\.  
   * Authentication: Key Based  
   * Auth Header: X-IBM-API-KEY  
   * Key: \[your IBM API key\]  
   * Model Name/ID:  ibm/granite-13b-chat-v2 (Or the specific model ID you want to connect to, refer to watsonx model IDs from your IBM watsonx console.)  
   * Token Limit: 8,192 (Or the specified model's maximum context length. Refer to the watsonx model IDs from you IBM watsonx console.)

![Example IBM Granite connection](/img/ibm-granite-connection.png)

7. Click **Connect**.
8. Click **Name and Connect**.

## Step 4\. Create a Configured Model

Before you can use your connected LLM, you need to create a configured model.

1. In the Model Library in Einstein Studio, select **Configure Foundation Model**.  
2. Select **Create Model**.  
3. Choose your connected LLM from the “Foundation Model” dropdown.   
4. Configure the model parameters.  
5. Test the model performance in the model playground.

You can now use your LLM wherever you can use Einstein Studio generative models. For instance, you can build prompt templates using [Prompt Builder](https://www.google.com/url?q=https://help.salesforce.com/s/articleView?id%3Dsf.prompt_builder_about.htm&sa=D&source=docs&ust=1729008016102516&usg=AOvVaw29nKsztGMWSoa59DEIFXZJ). 

## See Also

* [*External:* IBM watsonx Repo](https://ibm.biz/eebl-salesforce-watsonx-apic-connector-code)   
* [*Interactive Demo:* Use watsonx AI models from Salesforce](https://dsce.ibm.com/wizard/watsonx/results/watsonx-use-watsonx-ai-models-from-salesforce#)  
* [*Salesforce Help:* Add a Foundation Model](https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_foundation_models_create.htm&type=5)
