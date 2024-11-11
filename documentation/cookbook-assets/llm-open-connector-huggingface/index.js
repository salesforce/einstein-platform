import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { validateApiKey, errorHandler } from './middleware/index.js';
import config from './config/index.js';
import createSanitizedLogger from './utils/logger.js';
import chatRoutes from './routes/chat.js';

// Create logger with sensitive data filtering
const logger = createSanitizedLogger();

const app = express();

// Middleware
app.use(express.json());

// Helmet configuration with strict security settings
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https:'],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
                frameSrc: ["'none'"],
            },
        },
        crossOriginEmbedderPolicy: true,
        crossOriginOpenerPolicy: { policy: 'same-origin' },
        crossOriginResourcePolicy: { policy: 'same-origin' },
        dnsPrefetchControl: { allow: false },
        expectCt: { maxAge: 86400, enforce: true },
        frameguard: { action: 'deny' },
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        ieNoOpen: true,
        noSniff: true,
        originAgentCluster: true,
        permittedCrossDomainPolicies: { permittedPolicies: 'none' },
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        xssFilter: true,
    })
);

app.use(cors(config.corsOptions));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/chat', validateApiKey, chatRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

export default app;
