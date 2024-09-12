#!/usr/bin/env python3
from aws_cdk import App
from lib.aws_bedrock_llama_connector_stack import AwsBedrockLlamaConnectorStack

app = App()
AwsBedrockLlamaConnectorStack(app, "AwsBedrockLlamaConnectorStack")

app.synth()