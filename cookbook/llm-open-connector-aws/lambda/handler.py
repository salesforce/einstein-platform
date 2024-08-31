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
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # or specify your domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            }
        }

    try:
        # Parse the request body
        body = json.loads(event['body'])

        # Validate the presence and structure of the 'messages' key
        if 'messages' not in body or not isinstance(body['messages'], list):
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',  # or specify your domain
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                },
                'body': json.dumps({'error': 'The request body must contain a "messages" key with a list of messages.'})
            }

        messages = body['messages']

        # Validate each message structure
        for message in messages:
            if not isinstance(message, dict) or 'role' not in message or 'content' not in message:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',  # or specify your domain
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                    },
                    'body': json.dumps({'error': 'Each message must be a dictionary with "role" and "content" keys.'})
                }

        # Construct the prompt from the messages and append "Assistant:"
        prompt = "\n".join([f"{m['role']}: {m['content']}" for m in messages]) + "\nAssistant:"

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
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',  # or specify your domain
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                },
                'body': json.dumps({
                    'id': f"chatcmpl-{os.urandom(12).hex()}",
                    'object': 'chat.completion',
                    'created': int(time.time()),
                    'model': 'llama-bedrock',
                    'choices': [{
                        'index': 0,
                        'message': {
                            'role': 'assistant',
                            'content': response_body['generation']
                        },
                        'finish_reason': 'stop'
                    }],
                    'usage': {
                        'prompt_tokens': response_body.get('prompt_token_count', -1),
                        'completion_tokens': response_body.get('generation_token_count', -1),
                        'total_tokens': response_body.get('prompt_token_count', 0) + response_body.get('generation_token_count', 0)
                    }
                })
            }
        except (BotoCoreError, ClientError) as e:
            logger.error(f"Bedrock API error: {str(e)}")
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',  # or specify your domain
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                },
                'body': json.dumps({'error': f"Bedrock API error: {str(e)}"})
            }

    except json.JSONDecodeError as e:
        logger.error(f"JSON Decode error: {str(e)}")
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # or specify your domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            'body': json.dumps({'error': f"Invalid JSON in request body: {str(e)}"})
        }
    except KeyError as e:
        logger.error(f"KeyError: {str(e)}")
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # or specify your domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            'body': json.dumps({'error': f"Missing required key in request: {str(e)}"})
        }
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # or specify your domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            },
            'body': json.dumps({'error': f"An unexpected error occurred: {str(e)}"})
        }
