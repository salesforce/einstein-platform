import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import config from '../config/index.js';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

const chatCompletionSchema = Joi.object({
    messages: Joi.array()
        .items(
            Joi.object({
                role: Joi.string().valid('system', 'user', 'assistant').required(),
                content: Joi.string().required(),
            })
        )
        .min(1)
        .required(),
    model: Joi.string().required(),
    max_tokens: Joi.number().integer().min(1).default(500),
    temperature: Joi.number().min(0).max(1),
    n: Joi.number().integer().min(1).default(1),
    parameters: Joi.object({
        top_p: Joi.number().min(0).max(1),
    }),
});

export const chatCompletion = async (req, res, next) => {
    try {
        const { error, value } = chatCompletionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Optimize message processing
        const systemMessages = [];
        const otherMessages = [];
        for (const message of value.messages) {
            if (message.role === 'system') {
                systemMessages.push(message.content);
            } else {
                otherMessages.push(message);
            }
        }

        const processedMessages = systemMessages.length > 0
            ? [{ role: 'system', content: systemMessages.join('\n') }, ...otherMessages]
            : otherMessages;

        const huggingFaceRequestBody = {
            model: value.model,
            messages: processedMessages,
            max_tokens: value.max_tokens,
            stream: false,
        };

        if (value.temperature !== undefined) {
            huggingFaceRequestBody.temperature = value.temperature;
        }
        if (value.parameters && value.parameters.top_p !== undefined) {
            huggingFaceRequestBody.top_p = value.parameters.top_p;
        }

        const response = await axios.post(
            `${config.huggingFaceApiUrl}${value.model}/v1/chat/completions`,
            huggingFaceRequestBody,
            {
                headers: {
                    Authorization: `Bearer ${config.huggingFaceApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const reshapedResponse = {
            id: uuidv4(),
            object: response.data.object,
            created: response.data.created,
            model: response.data.model,
            choices: response.data.choices,
            usage: response.data.usage,
        };

        res.status(200).json(reshapedResponse);
    } catch (error) {
        logger.error('Error in chat completion:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            response: error.response?.data,
        });
        next(error);
    }
};
