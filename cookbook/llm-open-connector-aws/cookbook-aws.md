# Implement LLM Open Connector with Amazon Web Services

This cookbook is a step-by-step guide to implementing Salesforce's [LLM Open Connector](https://github.com/salesforce/einstein-platform?tab=readme-ov-file#llm-open-connector) using Amazon Web Services (AWS). We use Amazon Bedrock to host a Llama model from Meta, a Lambda for serverless compute, and an API Gateway to expose our API.

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI. For installation instructions, see [Install or update to the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [Set up the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html).
3. Python 3.9 or later
4. AWS CDK installed (`npm install -g aws-cdk`)
5. Access to AWS Bedrock (you may need to request access if it's not enabled in your account)

## Set Up AWS Bedrock and Model Access

Before deploying and using the LLM Open Connector, you need to set up access to AWS Bedrock and enable the specific model you want to use. Follow these steps:

**Enable AWS Bedrock:**

- Go to the [AWS Bedrock console](https://console.aws.amazon.com/bedrock).
- If you see a "Get started" button, click it to enable Bedrock for your account.
- If Bedrock is already enabled, you'll see the Bedrock dashboard.

**Request access to models:**

- In the Bedrock console, go to "Model access" in the left navigation pane.
- Find the model you want to use (for example, Llama 3.1 70B Instruct).
- Click the menu (three dots) and select "Request model access".
- Verify that the model is selected and click **Next**.
- Read and accept the terms and conditions, then click **Submit**.
- Wait for your request to be approved. This is usually instant for most models.

## Installation

1. Create a new local directory for your project and navigate to it:

   ```
   mkdir aws-bedrock-llama-connector
   cd aws-bedrock-llama-connector
   ```

2. Copy these files in this repository to the new directory.

   - [lib/aws_bedrock_llama_connector_stack.py](lib/aws_bedrock_llama_connector_stack.py)
   - [lambda/handler.py](lambda/handler.py)
   - [app.py](app.py)
   - [cdk.json](cdk.json)
   - [index.html](index.html)
   - [requirements.txt](requirements.txt)

3. Create a virtual environment and install Python dependencies:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

## Project Structure

Your project structure should now look like this:

```
aws-bedrock-llama-connector/
├── lib/
│   └── aws_bedrock_llama_connector_stack.py
├── lambda/
│   └── handler.py
├── app.py
├── cdk.json
├── index.html
└── requirements.txt
```

## Deployment

1. Configure AWS CLI with your credentials:

   ```
   aws configure
   ```

2. Bootstrap your AWS environment (if you haven't already):

   ```
   cdk bootstrap
   ```

3. Deploy the stack:

   ```
   cdk deploy
   ```

4. After deployment, CDK will output the API Gateway URL. You can use this URL to make requests to your Llama model.

## Usage

To use the deployed API, send a POST request to the `/chat/completions` endpoint with the following JSON structure:

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Tell me a joke about programming." }
  ],
  "temperature": 0.7
}
```

You can use tools like cUrl, Postman, or any programming language to make HTTP requests to your API.

### Example using cUrl

Here's an example cUrl command to test your API:

```bash
curl -X POST https://your-api-id.execute-api.your-region.amazonaws.com/prod/chat/completions \
-H "Content-Type: application/json" \
-d '{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Tell me a joke about programming."}
  ],
  "temperature": 0.7
}'
```

Replace `https://your-api-id.execute-api.your-region.amazonaws.com/prod` with the actual URL of your deployed API Gateway, which you can find in the AWS Console or in the output of the `cdk deploy` command.

This cUrl command sends a POST request to your API with the specified JSON payload. The API should respond with a JSON object containing the generated text from the Llama model.

**Note**: If you're using Windows Command Prompt, you may need to escape the double quotes in the JSON payload differently. For PowerShell or bash on Windows (e.g., Git Bash), the command should work as written above.

## Testing with a Web UI

Use the included [index.html](index.html) file to test your API gateway with a web UI.

Before using the web UI, edit the file and replace `https://your-api-id.execute-api.your-region.amazonaws.com/prod` with the actual URL of your deployed API Gateway, which you can find in the AWS Console or in the output of the `cdk deploy` command.

## Notes

1. This cookbook uses the `meta.llama3-1-70b-instruct-v1:0` model as a placeholder. You can replace it with any supported model that you have been granted access to in Amazon Bedrock. For a list of supported model IDs, see [Amazon Bedrock model IDs](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html).
2. The token count in the response is set to -1 as AWS Bedrock doesn't provide token usage information. You may need to implement your own token counting logic if required.
3. Error handling and input validation should be improved for production use.
4. Consider disabling CORS.
5. Consider implementing authentication and rate limiting for your API Gateway.
6. Monitor your AWS usage to manage costs, especially if you expect high traffic.

## Conclusion

This cookbook demonstrates how to set up an LLM Open Connector using AWS Bedrock, Lambda, and API Gateway. It provides a serverless, scalable solution for integrating Llama models into your applications. Remember to optimize your implementation based on your specific requirements and expected usage patterns.
