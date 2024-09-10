import json
import boto3
import os
import time
import logging
from botocore.exceptions import BotoCoreError, ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)

bedrock = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    # Handle CORS preflight request
    if event['httpMethod'] == 'OPTIONS':
        return create_cors_response(200)

    # Check for API key
    if not validate_api_key(event):
        return create_error_response(401, "Invalid or missing API key")

    try:
        # Parse the request body
        body = json.loads(event['body'])

        # Determine which endpoint was called
        resource_path = event['resource']

        if resource_path == '/chat/completions':
            return handle_chat_completions(body)
        elif resource_path == '/completions':
            return handle_completions(body)
        else:
            return create_error_response(400, f"Unsupported endpoint: {resource_path}")

    except json.JSONDecodeError as e:
        logger.error(f"JSON Decode error: {str(e)}")
        return create_error_response(400, f"Invalid JSON in request body: {str(e)}")
    except KeyError as e:
        logger.error(f"KeyError: {str(e)}")
        return create_error_response(400, f"Missing required key in request: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return create_error_response(500, f"An unexpected error occurred: {str(e)}")

def validate_api_key(event):
    # Check for the 'api-key' header
    headers = event.get('headers', {})
    api_key = headers.get('api-key') or headers.get('Api-Key')
    
    # Here you would typically validate the API key against a database or secret manager
    # For this example, we'll use an environment variable (set this in your Lambda configuration)
    valid_api_key = os.environ.get('VALID_API_KEY', 'your-api-key-here')
    
    return api_key == valid_api_key

def handle_chat_completions(body):
    # Validate the presence and structure of the 'messages' key
    if 'messages' not in body or not isinstance(body['messages'], list):
        return create_error_response(400, 'The request body must contain a "messages" key with a list of messages.')

    messages = body['messages']

    # Validate each message structure
    for message in messages:
        if not isinstance(message, dict) or 'role' not in message or 'content' not in message:
            return create_error_response(400, 'Each message must be a dictionary with "role" and "content" keys.')

    # Construct the prompt from the messages and append "Assistant:"
    prompt = "\n".join([f"{m['role']}: {m['content']}" for m in messages]) + "\nAssistant:"

    return invoke_bedrock_model(prompt, body)

def handle_completions(body):
    # Validate the presence of the 'prompt' key
    if 'prompt' not in body or not isinstance(body['prompt'], str):
        return create_error_response(400, 'The request body must contain a "prompt" key with a string value.')

    prompt = body['prompt'] + "\nAssistant:"

    return invoke_bedrock_model(prompt, body)

def invoke_bedrock_model(prompt, body):
    try:
        # Invoke the Bedrock model
        response = bedrock.invoke_model(
            modelId='meta.llama3-1-70b-instruct-v1:0',
            contentType='application/json',
            accept='application/json',
            body=json.dumps({
                "prompt": prompt,
                "temperature": body.get('temperature', 1),
            })
        )

        response_body = json.loads(response['body'].read())

        # Construct and return the successful response
        return create_cors_response(200, {
            'id': f"cmpl-{os.urandom(12).hex()}",
            'object': 'text_completion' if 'prompt' in body else 'chat.completion',
            'created': int(time.time()),
            'model': 'llama-bedrock',
            'choices': [{
                'index': 0,
                'text' if 'prompt' in body else 'message': {
                    'content': response_body['generation'].lstrip(),
                    'role': 'assistant' 
                } if 'prompt' not in body else response_body['generation'].lstrip(),
                'finish_reason': 'stop'
            }],
            'usage': {
                'prompt_tokens': response_body.get('prompt_token_count', -1),
                'completion_tokens': response_body.get('generation_token_count', -1),
                'total_tokens': response_body.get('prompt_token_count', 0) + response_body.get('generation_token_count', 0)
            }
        })
    except (BotoCoreError, ClientError) as e:
        logger.error(f"Bedrock API error: {str(e)}")
        return create_error_response(500, f"Bedrock API error: {str(e)}")

def create_cors_response(status_code, body=None):
    response = {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,api-key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        }
    }
    if body:
        response['body'] = json.dumps(body)
    return response

def create_error_response(status_code, error_message):
    return create_cors_response(status_code, {'error': error_message})