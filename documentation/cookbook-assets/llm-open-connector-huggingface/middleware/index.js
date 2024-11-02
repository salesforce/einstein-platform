import config from '../config/index.js';
import createSanitizedLogger from '../utils/logger.js';

const logger = createSanitizedLogger();

export const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (!apiKey || apiKey !== config.huggingFaceApiKey) {
        return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }
    next();
};

export const errorHandler = (err, req, res, next) => {
    logger.error(`Error name: ${err.name}`);
    logger.error(`Error message: ${err.message}`);
    logger.error(`Error code: ${err.code}`);
    logger.error(`Error stack: ${err.stack}`);
    logger.error(`Request: ${req.method} ${req.originalUrl}`);
    logger.error(`Request body: ${JSON.stringify(req.body)}`);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: message,
        }
    });
};
