import dotenv from 'dotenv';

dotenv.config();

const validateEnvironment = () => {
    const requiredEnvVars = ['HUGGING_FACE_API_KEY'];

    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingVars.join(', ')}\n` +
                'Please check your .env file or environment configuration.'
        );
    }
};

// Validate environment variables immediately
validateEnvironment();

export default {
    port: process.env.PORT || 3000,
    huggingFaceApiKey: process.env.HUGGING_FACE_API_KEY,
    huggingFaceApiUrl: 'https://api-inference.huggingface.co/models/',
    corsOptions: {
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [],
        methods: ['POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
};
