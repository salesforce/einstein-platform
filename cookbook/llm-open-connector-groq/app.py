import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

@app.route('/completions', methods=['POST'])
def create_completion():
    data = request.json
    messages = [{"role": "user", "content": data['prompt']}]
    
    groq_payload = {
        "messages": messages,
        "model": "llama3-8b-8192",
        "max_tokens": data.get('max_tokens', 16),
        "temperature": data.get('temperature', 1),
        "n": data.get('n', 1)
    }
    
    response = requests.post(
        GROQ_API_URL,
        headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
        json=groq_payload
    )
    
    groq_response = response.json()
    
    return jsonify({
        "id": groq_response['id'],
        "object": "text_completion",
        "created": groq_response['created'],
        "model": data['model'],
        "choices": [
            {
                "text": choice['message']['content'],
                "index": choice['index'],
                "finish_reason": choice['finish_reason']
            } for choice in groq_response['choices']
        ],
        "usage": groq_response['usage']
    })

@app.route('/embeddings', methods=['POST'])
def create_embedding():
    return jsonify({"error": "Embedding generation is not supported by the Groq API with the specified model"}), 400

@app.route('/chat/completions', methods=['POST'])
def create_chat_completion():
    data = request.json
    
    groq_payload = {
        "messages": data['messages'],
        "model": "llama3-8b-8192",
        "max_tokens": data.get('max_tokens'),
        "temperature": data.get('temperature', 1),
        "n": data.get('n', 1)
    }
    
    response = requests.post(
        GROQ_API_URL,
        headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
        json=groq_payload
    )
    
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
