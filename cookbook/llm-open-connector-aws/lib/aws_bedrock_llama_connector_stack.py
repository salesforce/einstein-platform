from aws_cdk import (
    Stack,
    aws_lambda as lambda_,
    aws_apigateway as apigateway,
    aws_iam as iam,
    Duration,
)
from constructs import Construct

class AwsBedrockLlamaConnectorStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create Lambda function
        bedrock_lambda = lambda_.Function(
            self, 'BedrockLlamaHandler',
            runtime=lambda_.Runtime.PYTHON_3_9,
            handler='handler.lambda_handler',
            code=lambda_.Code.from_asset('lambda'),
            timeout=Duration.seconds(30)  # Set timeout to 30 seconds
        )

        # Grant Bedrock permissions to Lambda
        bedrock_lambda.add_to_role_policy(iam.PolicyStatement(
            actions=['bedrock:InvokeModel'],
            resources=['*']
        ))

        # Create API Gateway
        api = apigateway.RestApi(
            self, 'BedrockLlamaApi',
            rest_api_name='Bedrock Llama Service',
            description='This service provides an LLM Open Connector interface for Llama on AWS Bedrock.'
        )

        # Create API Gateway resource and method with CORS enabled
        chat_completions = api.root.add_resource('chat').add_resource('completions')
        
        # Enable CORS for the resource
        chat_completions.add_method(
            'POST',
            apigateway.LambdaIntegration(bedrock_lambda),
            authorization_type=apigateway.AuthorizationType.NONE,  # Change this if you plan to use authorization
            method_responses=[{
                'statusCode': '200',
                'responseParameters': {
                    'method.response.header.Access-Control-Allow-Origin': True,
                    'method.response.header.Access-Control-Allow-Headers': True,
                    'method.response.header.Access-Control-Allow-Methods': True,
                }
            }]
        )
        
        # Add CORS options to the resource if it doesn't already exist
        try:
            chat_completions.add_method(
                'OPTIONS',
                apigateway.MockIntegration(
                    integration_responses=[{
                        'statusCode': '200',
                        'responseParameters': {
                            'method.response.header.Access-Control-Allow-Origin': "'*'",
                            'method.response.header.Access-Control-Allow-Headers': "'Content-Type,Authorization'",
                            'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,POST'",
                        }
                    }],
                    passthrough_behavior=apigateway.PassthroughBehavior.WHEN_NO_MATCH,
                    request_templates={"application/json": "{\"statusCode\": 200}"}
                ),
                method_responses=[{
                    'statusCode': '200',
                    'responseParameters': {
                        'method.response.header.Access-Control-Allow-Origin': True,
                        'method.response.header.Access-Control-Allow-Headers': True,
                        'method.response.header.Access-Control-Allow-Methods': True,
                    }
                }]
            )
        except Exception as e:
            print(f"OPTIONS method for 'chat/completions' already exists: {e}")

