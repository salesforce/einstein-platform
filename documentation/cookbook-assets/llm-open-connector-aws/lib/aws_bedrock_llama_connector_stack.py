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

        # Create API Gateway with API key required
        api = apigateway.RestApi(
            self, 'BedrockLlamaApi',
            rest_api_name='Bedrock Llama Service',
            description='This service provides an LLM Open Connector interface for Llama on AWS Bedrock.',
        )

        # Create API Gateway resource and method for chat completions with CORS enabled
        chat_completions = api.root.add_resource('chat').add_resource('completions')
        self.add_cors_options(chat_completions)
        chat_completions.add_method('POST', apigateway.LambdaIntegration(bedrock_lambda))

        # Create API Gateway resource and method for completions with CORS enabled
        completions = api.root.add_resource('completions')
        self.add_cors_options(completions)
        completions.add_method('POST', apigateway.LambdaIntegration(bedrock_lambda))

    def add_cors_options(self, api_resource):
        api_resource.add_method(
            'OPTIONS',
            apigateway.MockIntegration(
                integration_responses=[{
                    'statusCode': '200',
                    'responseParameters': {
                        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,api-key,X-Amz-Security-Token'",
                        'method.response.header.Access-Control-Allow-Origin': "'*'",
                        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,POST'"
                    }
                }],
                passthrough_behavior=apigateway.PassthroughBehavior.NEVER,
                request_templates={"application/json": "{\"statusCode\": 200}"}
            ),
            method_responses=[{
                'statusCode': '200',
                'responseParameters': {
                    'method.response.header.Access-Control-Allow-Headers': True,
                    'method.response.header.Access-Control-Allow-Methods': True,
                    'method.response.header.Access-Control-Allow-Origin': True,
                }
            }]
        )