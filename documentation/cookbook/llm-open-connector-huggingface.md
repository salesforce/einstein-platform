---
slug: Hugging Face
authors: [msrivastav13]
tags: [huggingface, heroku, llm-open-connector]
date: 2024-09-14
---
# LLM Open Connector + Hugging Face

Learn how to implement Salesforce's [LLM Open Connector](/docs/apis/llm-open-connector/) with the Hugging Face [Serverless Inference API](https://huggingface.co/docs/api-inference/index) for LLM models that support [Chat Completion](https://huggingface.co/docs/api-inference/en/tasks/chat-completion). We also cover how to implement and deploy the connector as a Node.js app on Heroku.

<!-- truncate -->

## Prerequisites

Before you begin, make sure that your local environment meets these prerequisites.

1. Node.js and npm installed on your local machine
2. A Heroku account (sign up at https://signup.heroku.com/)
3. Heroku CLI installed (https://devcenter.heroku.com/articles/heroku-cli)
4. Git installed on your local machine
5. A Hugging Face account with API key (https://huggingface.co/docs/hub/en/security-tokens)

## Set Up Your Local Environment

1. Clone the einstein-platform repository to your local
   ```
    git clone https://github.com/salesforce/einstein-platform.git
    ```

2. Create a new directory for your project:
   ```
   mkdir llm-open-connector-hf
   cd llm-open-connector-hf
   ```
3. Locate the source files specific to Hugging Face connector. In your cloned `einstein-platform` project directory (from Step 1), navigate to the `documentation/cookbook-assets/llm-open-connector-huggingface` folder. Copy all the files in this folder

4.  Paste them into the `llm-open-connector-hf` directory you created in Step 2.

5. Install the required dependencies
   ```
   npm install
   ```
## Project Structure

   ```
    llm-open-connector-hf/
    ├── config/
    │   └── index.js
    ├── controllers/
    │   └── chatController.js
    ├── middleware/
    │   └── index.js
    ├── routes/
    │   └── chat.js
    ├── utils/
    │   └── logger.js
    ├── .gitignore
    ├── .prettierrc
    ├── index.js
    ├── package.json
    └── Procfile
   ```
### Description

- `config/`: Holds configuration settings.
  - `index.js`: Exports configuration options for different environments.
- `controllers/`: Manages the request handling logic for the chat API.
  - `chatController.js`: Calls the chat completion API.
- `middleware/`: Contains custom middleware functions.
  - `index.js`: Includes functions for API key validation and error handling.
- `routes/`: Defines API routes.
  - `chat.js`: Contains endpoints for chat completion functionality.
- `utils/`: Utility functions for support tasks.
  - `logger.js`: Custom logger with data sanitization for secure logging.
- `.gitignore`: Lists files and directories that should be ignored by Git, such as `node_modules` and sensitive files.
- `.prettierrc`: Configuration file for Prettier, which enforces consistent code formatting across the project.
- `index.js`: Main application file that initializes the server and routes.
- `package.json`: Contains metadata for the project and manages dependencies, scripts, and configurations.
- `Procfile`: Specifies process types and commands for deploying the app on platforms like Heroku.



## Configure Your Local Environment

1. Create a `.env` file in the root directory of the project and add the following variables:

   ```
   PORT=3000
   HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
   ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
   ```

   > Replace `your_hugging_face_api_key_here` with your actual Hugging Face API key and adjust the `ALLOWED_ORIGINS` as needed.`ALLOWED_ORIGINS` should whitelist your Salesforce domain.

2. Make sure your `.gitignore` file includes the `.env` file to avoid accidentally committing sensitive information.

## Test Your Application Locally

1. Run your Node.js application locally:

   ```
   npm start
   ```
2. The server will start on the port specified in your .env file (default is 3000).

3. Test the endpoints using a tool like cURL or Postman to ensure they're working correctly.  

To test the `chat/completions` endpoint, run this cURL command:

```bash
curl -X POST http://localhost:3000/chat/completions \
-H 'Content-Type: application/json' \
-H 'api-key: <use your HuggingFace access token here>' \
-d '{
  "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
  "messages": [
    {
      "content": "What is the capital of Italy?",
      "role": "user"
    }
  ],
  "max_tokens": 100,
  "temperature": 0.7,
  "n": 2,
  "parameters": {
    "top_p": 0.9
  }
}'
```
## Prepare for Heroku Deployment

1. Initialize a Git repository in your project directory:

   ```
   git init
   ```

2. Add your files to the repository:

   ```
   git add .
   ```

3. Commit your changes:
   ```
   git commit -m "Initial commit"
   ```

## Update Your Default Branch

To switch the default branch used to deploy apps from `master` to `main`, follow these steps:

1. Create a new branch locally:

   ```bash
   git checkout -b main
   ```

2. Delete the old default branch locally:

   ```bash
   git branch -D master
   ```

   Now, the local environment only knows about the `main` branch.

3. Reset the git repository on the Heroku Platform:

   - Use the `heroku-reset` command from the `heroku-repo` CLI plugin.
   - This will not impact the running application.

   **Note:** Communicate this change with your team. If other developers are unaware of the reset, they might push to `master`, overwriting the reset.

4. To switch the default branch in GitHub, refer to this article: [Setting the Default Branch](https://docs.github.com/en/github/administering-a-repository/setting-the-default-branch).

## Deploy to Heroku

1. Make sure you're logged in to the Heroku CLI:

   ```
   heroku login
   ```

2. Create a new Heroku app:

   ```
   heroku create your-app-name
   ```

   Replace `your-app-name` with a unique name for your application.

3. Set the API_KEY config var on Heroku:

   ```
   heroku config:set HUGGING_FACE_API_KEY=your_api_key_here -a your-app-name
   ```

   Replace `your_api_key_here` with your actual API key.

4. Set the ALLOWED_ORIGINS config var on Heroku:

```
   heroku config:set ALLOWED_ORIGINS=your_salesforce_domain_here -a your-app-name
   ```

    Replace `your_salesforce_domain_here` with your actual Salesforce domain.

5. Deploy your app to Heroku:

   ```
   git push heroku main
   ```
## Test Your Deployed Application

You can test your deployed application using the deployed API endpoint

Use a tool like cURL or Postman to test the endpoints of your Node.js app:

   - Chat Completions: `POST https://your-app-name.herokuapp.com/chat/completions`

To test the `chat/completions` endpoint with cURL run this command:

```bash
curl -X POST https://still-beach-80840-58cbb07ae5f4.herokuapp.com/chat/completions \
-H 'Content-Type: application/json' \
-H 'api-key: <use your HuggingFace access token here>' \
-d '{
  "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
  "messages": [
    {
      "content": "What is the capital of Italy?",
      "role": "user"
    }
  ],
  "max_tokens": 100,
  "temperature": 0.7,
  "n": 2,
  "parameters": {
    "top_p": 0.9
  }
}'
```
## Bring Chat Completion Endpoint to the Salesforce Model Builder

Follow the instructions in this [developer blog](https://developer.salesforce.com/blogs/2024/10/build-generative-ai-solutions-with-llm-open-connector) to bring in your model within Model Builder. Once you have your Model activated you can use within Prompt Builder, Models API and for building actions using prompt templates in Agent Builder with built-in security offered by the [Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_layer.htm&type=5)

## Current Features

- Integration with the [Hugging Face](https://huggingface.co/docs/api-inference/index) Serverless Inference API for [models](https://huggingface.co/docs/api-inference/en/tasks/chat-completion) that support Chat Completion.
- Express server with advanced security configurations
- CORS configuration with customizable allowed origins
- Rate limiting to prevent abuse
- API key validation for protected routes
- Comprehensive error handling and sanitized logging
- Helmet.js integration for enhanced security headers
- Chat completion controller with input validation and response reshaping
- Optimized message processing:
  - Concatenates multiple system messages into a single message as required by some LLMs
  - Preserves the order of user and assistant messages

## API Endpoints

- POST `/chat/completions`: Send a chat message and receive an AI-generated response
  - Optimizes message processing by concatenating system messages
  - Example:
    ```json
    {
      "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "system", "content": "Always be polite."},
        {"role": "user", "content": "Hello!"},
        {"role": "assistant", "content": "Hi there!"},
        {"role": "user", "content": "How are you?"}
      ],
      "model": "gpt-3.5-turbo",
      "max_tokens": 150
    }
    ```
  - The API will process this into:
    ```json
    {
      "messages": [
        {"role": "system", "content": "You are a helpful assistant.\nAlways be polite."},
        {"role": "user", "content": "Hello!"},
        {"role": "assistant", "content": "Hi there!"},
        {"role": "user", "content": "How are you?"}
      ],
      "model": "gpt-3.5-turbo",
      "max_tokens": 150
    }
    ```

## Current Security Measures

- Helmet.js configuration with strict security settings:
  - Content Security Policy (CSP) with restrictive directives
  - Cross-Origin Embedder Policy
  - Cross-Origin Opener Policy
  - Cross-Origin Resource Policy
  - DNS Prefetch Control
  - Expect-CT header
  - Frameguard to prevent clickjacking
  - HTTP Strict Transport Security (HSTS)
  - IE No Open
  - X-Content-Type-Options nosniff
  - Origin-Agent-Cluster header
  - Permitted Cross-Domain Policies
  - Referrer-Policy
  - X-XSS-Protection
- CORS configuration to restrict allowed origins
- Rate limiting: 100 requests per 15 minutes per IP
- API key validation for protected routes
- Sanitized logging to prevent accidental exposure of sensitive data

## Notes

1. This cookbook uses the `mistralai/Mixtral-8x7B-Instruct-v0.1` model in the example cURL requests. You can replace it with any supported models. For a list of supported model IDs, see [Hugging Face Chat Completion](https://huggingface.co/docs/api-inference/en/tasks/chat-completion).
2. Monitor your  usage to manage costs, especially if you expect high traffic.
3. Consider further enhancing security for Production application
4. Error handling and input validation should be improved for production use.

## Conclusion
This cookbook demonstrates how to set up an LLM Open Connector using Hugging Face Serverless API for Chat Completion endpoints for various models. Remember to optimize your implementation based on your specific requirements and expected usage patterns.