# main.py
import os
import json
import logging
import functions_framework
from flask import jsonify, Request
from google.cloud import secretmanager
from datetime import datetime
import uuid
import requests
from google.auth import default
from google.auth.transport.requests import Request as GoogleRequest

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
PROJECT_ID = "data-cloud-llm-open-connector"
LOCATION = "us-central1"
ENDPOINT_ID = "3524270118068551680"

def get_secret_api_key():
    """Retrieve API key from Secret Manager."""
    try:
        client = secretmanager.SecretManagerServiceClient()
        name = f"projects/{PROJECT_ID}/secrets/llm_connector_api_key/versions/latest"
        response = client.access_secret_version(request={"name": name})
        return response.payload.data.decode("UTF-8")
    except Exception as e:
        logger.error(f"Error retrieving API key from Secret Manager: {str(e)}")
        raise

def validate_api_key(request):
    """Validate the API key from request headers."""
    api_key_header = request.headers.get('api-key')
    if not api_key_header:
        logger.error("No API key provided in headers")
        return False
    
    try:
        stored_api_key = get_secret_api_key()
        return api_key_header == stored_api_key
    except Exception as e:
        logger.error(f"Error validating API key: {str(e)}")
        return False

def get_access_token():
    """Get Google Cloud access token."""
    credentials, _ = default()
    if not credentials.valid:
        credentials.refresh(GoogleRequest())
    return credentials.token

@functions_framework.http
def llm_connector(request):
    """
    Cloud Function (Gen 2) entry point for HTTPS trigger.
    Handles /chat/completions endpoint for the Open LLM Connector.
    """
    logger.info(f"Received request: {request.method} {request.path}")
    logger.info(f"Headers present: {list(request.headers.keys())}")

    # Set CORS headers for all responses
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, api-key',
        'Access-Control-Max-Age': '3600'
    }

    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        return ('', 204, headers)

    # Verify path is /chat/completions
    if request.path != '/chat/completions':
        return jsonify({
            "error": {
                "message": "Not Found",
                "type": "invalid_request_error",
                "param": None,
                "code": "not_found"
            }
        }), 404, headers

    # Verify method is POST
    if request.method != 'POST':
        return jsonify({
            "error": {
                "message": "Method not allowed",
                "type": "invalid_request_error",
                "param": None,
                "code": "method_not_allowed"
            }
        }), 405, headers

    # Validate API key
    if not validate_api_key(request):
        return jsonify({
            "error": {
                "message": "Invalid API key",
                "type": "invalid_request_error",
                "param": "api-key",
                "code": "invalid_api_key"
            }
        }), 401, headers
    
    try:
        request_json = request.get_json(silent=True)
        logger.info(f"Request body: {request_json}")
        
        if not request_json or 'messages' not in request_json:
            return jsonify({
                "error": {
                    "message": "messages field is required",
                    "type": "invalid_request_error",
                    "param": "messages",
                    "code": "missing_required_field"
                }
            }), 400, headers

        # Format messages for the model
        messages = request_json['messages']
        last_message = messages[-1]['content']
        
        # Prepare the request for generateContent
        model_request = {
            "contents": [
                {
                    "role": "USER",
                    "parts": {
                        "text": last_message
                    }
                }
            ],
            "generation_config": {
                "temperature": request_json.get('temperature', 0.2),
                "topP": request_json.get('top_p', 0.8),
                "topK": request_json.get('top_k', 40),
                "maxOutputTokens": request_json.get('max_tokens', 1024)
            }
        }
        
        # Get access token
        access_token = get_access_token()
        logger.info("Successfully obtained access token")
        
        # Make request to generateContent endpoint
        endpoint_url = f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{LOCATION}/endpoints/{ENDPOINT_ID}:generateContent"
        
        logger.info(f"Making request to endpoint: {endpoint_url}")
        response = requests.post(
            endpoint_url,
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            },
            json=model_request
        )
        
        # Log the response for debugging
        logger.info(f"Model API response status: {response.status_code}")
        logger.info(f"Model API response: {response.text}")
        
        if response.status_code != 200:
            return jsonify({
                "error": {
                    "message": f"Model API error: {response.text}",
                    "type": "model_error",
                    "param": None,
                    "code": "model_error"
                }
            }), response.status_code, headers

        # Parse the response
        model_response = response.json()
        
        # Extract the generated text and usage metrics
        if "candidates" in model_response:
            generated_text = model_response["candidates"][0]["content"]["parts"][0]["text"]
            usage_metadata = model_response.get("usageMetadata", {})
            
            return jsonify({
                "id": f"chatcmpl-{str(uuid.uuid4())}",
                "object": "chat.completion",
                "created": int(datetime.now().timestamp()),
                "model": "fine-tune-gemini-flash-pro",
                "choices": [{
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": generated_text
                    },
                    "finish_reason": model_response["candidates"][0].get("finishReason", "stop").lower()
                }],
                "usage": {
                    "prompt_tokens": usage_metadata.get("promptTokenCount", 0),
                    "completion_tokens": usage_metadata.get("candidatesTokenCount", 0),
                    "total_tokens": usage_metadata.get("totalTokenCount", 0)
                }
            }), 200, headers
        else:
            logger.error(f"Unexpected response format: {model_response}")
            return jsonify({
                "error": {
                    "message": "Invalid response from model",
                    "type": "model_error",
                    "param": None,
                    "code": "invalid_response"
                }
            }), 500, headers
            
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({
            "error": {
                "message": str(e),
                "type": "server_error",
                "param": None,
                "code": "internal_server_error"
            }
        }), 500, headers