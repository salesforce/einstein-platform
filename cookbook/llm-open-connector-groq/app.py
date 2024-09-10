import os
import requests
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
APP_API_KEY = os.getenv("APP_API_KEY", "your-api-key-here")  # Set default if not in env

def check_api_key():
    api_key = request.headers.get('api-key')
    if api_key != APP_API_KEY:
        return jsonify({"error": "Invalid or missing API key"}), 401
    return None

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/completions", methods=["POST"])
def create_completion():
    error_response = check_api_key()
    if error_response:
        return error_response

    data = request.json
    messages = [{"role": "user", "content": data["prompt"]}]

    groq_payload = {
        "messages": messages,
        "model": "llama3-8b-8192",
        "max_tokens": data.get("max_tokens", 500),
        "temperature": data.get("temperature", 1),
        "n": data.get("n", 1),
    }

    response = requests.post(
        GROQ_API_URL,
        headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
        json=groq_payload,
    )

    groq_response = response.json()

    return jsonify(
        {
            "id": groq_response["id"],
            "object": "text_completion",
            "created": groq_response["created"],
            "model": data["model"],
            "choices": [
                {
                    "text": choice["message"]["content"],
                    "index": choice["index"],
                    "finish_reason": choice["finish_reason"],
                }
                for choice in groq_response["choices"]
            ],
            "usage": groq_response["usage"],
        }
    )

@app.route("/embeddings", methods=["POST"])
def create_embedding():
    error_response = check_api_key()
    if error_response:
        return error_response

    return (
        jsonify(
            {
                "error": "Embedding generation is not supported by the Groq API with the specified model"
            }
        ),
        400,
    )

@app.route("/chat/completions", methods=["POST"])
def create_chat_completion():
    error_response = check_api_key()
    if error_response:
        return error_response

    data = request.json

    groq_payload = {
        "messages": data["messages"],
        "model": "llama3-8b-8192",
        "max_tokens": data.get("max_tokens", 500),
        "temperature": data.get("temperature", 1),
        "n": data.get("n", 1),
    }

    response = requests.post(
        GROQ_API_URL,
        headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
        json=groq_payload,
    )

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)