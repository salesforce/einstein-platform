# Cookbook: LLM Open Connector with Flask, Groq, and Heroku

## Introduction

The Bring Your Own Large Language Model (BYOLLM) Open Connector is designed to empower customers, independent software vendors (ISVs), and internal Salesforce teams with advanced AI capabilities. This connector bridges the gap between the Einstein AI Platform and any language model, including custom-built ones, opening up a world of possibilities for enhanced, bespoke AI applications.

This cookbook provides a step-by-step guide to implementing an LLM Open Connector with the [Groq](https://groq.com/) platform for fast AI inference and deploy the connector as a Flask app on Heroku.

## Prerequisites

Before you begin, make sure that your development environment meets these prerequisites.

1. Python 3.9 or later installed on your local machine
2. A Heroku account (sign up at https://signup.heroku.com/)
3. Heroku CLI installed (https://devcenter.heroku.com/articles/heroku-cli)
4. Git installed on your local machine
5. A Groq API key (sign up at https://console.groq.com/)

## Step 1: Set Up Your Local Environment

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

3. Create these files in your project directory:

   - [app.py](app.py)
   - [requirements.txt](requirements.txt)
   - [Procfile](Procfile)
   - [runtime.txt](runtime.txt)
   - [.env](.env)
   - [.gitignore](.gitignore)

4. Copy the contents of each file from the provided artifacts into the corresponding files in your project directory.

5. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Step 2: Configure Your Local Environment

1. Open the `.env` file and replace `your_groq_api_key_here` with your actual Groq API key.

2. Make sure your `.gitignore` file includes the `.env` file to avoid accidentally committing sensitive information.

## Step 3: Test Your Application Locally

1. Run your Flask application:

   ```
   python app.py
   ```

2. Your app should now be running on `http://127.0.0.1:5000/`.

3. Test the endpoints using a tool like cURL or Postman to ensure they're working correctly.

To test the `completions` endpoint, run this `curl` command.

```bash
curl -X POST http://127.0.0.1:5000/completions \
-H "Content-Type: application/json" \
-d '{
  "model": "llama3-8b-8192",
  "prompt": "Invent 31 fun names for ice cream flavours and prefix each name with an appropriate emoji.",
  "max_tokens": 50,
  "temperature": 0.7,
  "n": 1
}'
```

To test the `completions/endpoint`, run this `curl` command.

```bash
curl -X POST http://127.0.0.1:5000/chat/completions \
-H "Content-Type: application/json" \
-d '{
  "model": "llama3-8b-8192",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the capital of Canada?"}
  ],
  "max_tokens": 50,
  "temperature": 0.7,
  "n": 1
}'
```

## Step 4: Prepare for Heroku Deployment

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

## Step 5: Deploy to Heroku

1. Make sure you're logged in to the Heroku CLI:

   ```
   heroku login
   ```

2. Create a new Heroku app:

   ```
   heroku create your-app-name
   ```

   Replace `your-app-name` with a unique name for your application.

3. Set the GROQ_API_KEY environment variable on Heroku:

   ```
   heroku config:set GROQ_API_KEY=your_groq_api_key_here
   ```

   Replace `your_groq_api_key_here` with your actual Groq API key.

4. Deploy your app to Heroku:

   ```
   git push heroku main
   ```

5. Open your deployed app:
   ```
   heroku open
   ```

Your LLM Open Connector should now be deployed and accessible via the Heroku URL.

## Step 6: Test Your Deployed Application

Use a tool like cURL or Postman to test the endpoints of your Flask app:

1. Completions: `POST https://your-app-name.herokuapp.com/completions`
2. Chat Completions: `POST https://your-app-name.herokuapp.com/chat/completions`

Note that the Embeddings endpoint (`POST /embeddings`) returns an error because embeddings are not supported by the Groq API with the specified model.

## Conclusion

You have successfully created and deployed an LLM Open Connector using Flask and the Groq API and deployed it to Heroku! This connector adheres to the Salesforce LLM Open Connector API specification, allowing for seamless integration with the Einstein AI Platform.

With this connector, you can bring new foundation models like Llama 3 into Einstein Studio that take advantage of Groq's fast inference platform.

Remember to monitor your usage and costs associated with the Groq API, and consider implementing additional security measures, such as rate limiting and user authentication, before using this connector in a production environment.
