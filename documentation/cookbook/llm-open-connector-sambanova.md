---
slug: sambanova
authors: [rsexton]
tags: [heroku, llm-open-connector, sambanova]
date: 2024-09-15
---

# LLM Open Connector + SambaNova

Learn how to implement Salesforce's [LLM Open Connector](/docs/apis/llm-open-connector/) with the [SambaNova](https://sambanova.ai/) platform for fast AI inference. We also cover how to deploy the connector as a Flask app on Heroku with a simple web UI for testing.

<!-- truncate -->

## Prerequisites

Before you begin, make sure that your local environment meets these prerequisites.

1. Python 3.9 or later installed on your local machine
2. A Heroku account (sign up at https://signup.heroku.com/)
3. Heroku CLI installed (https://devcenter.heroku.com/articles/heroku-cli)
4. Git installed on your local machine
5. A SambaNova API key (sign up at https://sambanova.ai/)

## Set Up Your Local Environment

1. Create a new directory for your project:

   ```
   mkdir llm-open-connector
   cd llm-open-connector
   ```

2. Create a virtual environment and activate it:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Download these files from the einstein-platform repository:

   - [.gitignore](https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/.gitignore)
   - [app.py](https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/app.py)
   - [index.html](https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/index.html)
   - [Procfile](https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/Procfile)
   - [requirements.txt](https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/requirements.txt)
   - [runtime.txt](https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/runtime.txt)

4. Copy the downloaded files into your project directory.

5. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Configure Your Local Environment

1. For local testing, create a `.env` file in your project directory and add your API key:

   ```
   API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual API key.

2. Make sure your `.gitignore` file includes the `.env` file to avoid accidentally committing sensitive information.

## Test Your Application Locally

1. Run your Flask application:

   ```
   python app.py
   ```

2. Your app should now be running on `http://127.0.0.1:5000/`.

3. Test the endpoints using a tool like cURL or Postman to ensure they're working correctly.

To test the `chat/completions` endpoint, run this cURL command:

```bash
curl -X POST http://127.0.0.1:5000/chat/completions \
-H "Content-Type: application/json" \
-d '{
  "model": "Meta-Llama-3.1-8B-Instruct",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the capital of Canada?"}
  ],
  "temperature": 0.7,
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
   heroku config:set API_KEY=your_api_key_here -a your-app-name
   ```

   Replace `your_api_key_here` with your actual API key.

4. Deploy your app to Heroku:

   ```
   git push heroku main
   ```

5. Open your deployed app:
   ```
   heroku open
   ```

Your LLM Open Connector should now be deployed and accessible via the Heroku URL.

## Test Your Deployed Application

You can test your deployed application in two ways:

1. Using the example UI:

   - Open your browser and navigate to `https://your-app-name.herokuapp.com`
   - You'll see a simple interface where you can input prompts and get responses from the LLM
   - Try different prompts and get super fast responses!

2. Using API endpoints:
   Use a tool like cURL or Postman to test the endpoints of your Flask app:

   - Chat Completions: `POST https://your-app-name.herokuapp.com/chat/completions`

## Conclusion

You have successfully created and deployed an LLM Open Connector using the SambaNova API and deployed it to Heroku! This connector adheres to the Salesforce LLM Open Connector API specification, allowing for seamless integration with the Einstein AI Platform using the BYOLLM feature.

With this connector, you can bring new foundation models like Llama 3 into Einstein Studio that take advantage of SambaNova's fast inference platform.

Remember to monitor your usage and costs associated with the SambaNova API, and consider implementing additional security measures, such as rate limiting, CORS restrictions, and user authentication, before using this connector in a production environment.
