"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/logiflow',
        testUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/logiflow_test',
    },
    jwt: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret_here',
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret_here',
        accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    email: {
        smtp: {
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    },
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    },
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
        uploadPath: process.env.UPLOAD_PATH || 'uploads',
    },
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },
};
//# sourceMappingURL=index.js.map