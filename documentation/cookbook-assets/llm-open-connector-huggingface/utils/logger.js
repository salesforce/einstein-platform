import winston from 'winston';

const createSanitizedLogger = (options = {}) => {
    const defaultOptions = {
        level: 'info',
        format: winston.format.combine(
            winston.format.simple(),
            winston.format.printf(({ level, message }) => {
                const sanitizedMessage = message
                    .replace(/Authorization:.*?(?=\s|$)/gi, 'Authorization: [REDACTED]')
                    .replace(/api[_-]?key:.*?(?=\s|$)/gi, 'api_key: [REDACTED]')
                    .replace(/Bearer\s+[A-Za-z0-9-._~+/]+=*/g, 'Bearer [REDACTED]')
                    .replace(/"token":\s*"[^"]*"/g, '"token": "[REDACTED]"')
                    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/g, '[EMAIL REDACTED]');
                return `${level}: ${sanitizedMessage}`;
            })
        ),
        transports: [new winston.transports.Console()],
    };

    const mergedOptions = { ...defaultOptions, ...options };

    return winston.createLogger(mergedOptions);
};

export default createSanitizedLogger;
