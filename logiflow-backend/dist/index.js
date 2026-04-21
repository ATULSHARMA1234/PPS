"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_1 = require("./config");
const database_1 = require("./config/database");
const redis_1 = require("./config/redis");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
exports.app = app;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.config.cors.origin,
        credentials: config_1.config.cors.credentials,
    },
});
exports.io = io;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.config.rateLimit.windowMs,
    max: config_1.config.rateLimit.maxRequests,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
});
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(config_1.config.cors));
app.use((0, morgan_1.default)('combined'));
app.use(limiter);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', async (req, res) => {
    try {
        const dbHealth = await database_1.database.healthCheck();
        const redisHealth = await redis_1.redis.healthCheck();
        const health = {
            status: dbHealth && redisHealth ? 'healthy' : 'unhealthy',
            timestamp: new Date().toISOString(),
            database: dbHealth ? 'connected' : 'disconnected',
            redis: redisHealth ? 'connected' : 'disconnected',
            uptime: process.uptime(),
        };
        res.status(health.status === 'healthy' ? 200 : 503).json(health);
    }
    catch (error) {
        logger_1.logger.error('Health check failed:', error);
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: 'Health check failed',
        });
    }
});
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'LogiFlow Backend API is running',
        version: '1.0.0',
        environment: config_1.config.nodeEnv,
    });
});
const routes_1 = __importDefault(require("./routes"));
app.use('/api', routes_1.default);
io.on('connection', (socket) => {
    logger_1.logger.info(`Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
        logger_1.logger.info(`Client disconnected: ${socket.id}`);
    });
    socket.on('join-fleet-tracking', () => {
        socket.join('fleet-tracking');
        logger_1.logger.info(`Client ${socket.id} joined fleet tracking room`);
    });
    socket.on('join-shipment-tracking', (shipmentId) => {
        socket.join(`shipment-${shipmentId}`);
        logger_1.logger.info(`Client ${socket.id} joined shipment tracking room for ${shipmentId}`);
    });
});
app.use((err, req, res, next) => {
    logger_1.logger.error('Unhandled error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(config_1.config.nodeEnv === 'development' && { stack: err.stack }),
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
const startServer = async () => {
    try {
        await database_1.database.connect();
        logger_1.logger.info('Database connected successfully');
        logger_1.logger.warn('Redis disabled - running with MongoDB only');
        server.listen(config_1.config.port, () => {
            logger_1.logger.info(`Server running on port ${config_1.config.port} in ${config_1.config.nodeEnv} mode`);
            logger_1.logger.info(`WebSocket server ready for connections`);
            logger_1.logger.info('API endpoints available:');
            logger_1.logger.info('  GET  /health - Server health check');
            logger_1.logger.info('  GET  /api - API information');
            logger_1.logger.info('  GET  /api/health - API health check');
            logger_1.logger.info('  GET  /api/fleet/vehicles - Get all vehicles');
            logger_1.logger.info('  GET  /api/fleet/stats - Get fleet statistics');
            logger_1.logger.info('  GET  /api/warehouse/warehouses - Get all warehouses');
            logger_1.logger.info('  POST /api/warehouse/warehouses/:id/book - Book warehouse');
            logger_1.logger.info('');
            logger_1.logger.info('Server is ready! Database connected and endpoints available.');
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
process.on('SIGTERM', async () => {
    logger_1.logger.info('SIGTERM received, shutting down gracefully');
    server.close(async () => {
        await database_1.database.disconnect();
        await redis_1.redis.disconnect();
        logger_1.logger.info('Server shut down successfully');
        process.exit(0);
    });
});
process.on('SIGINT', async () => {
    logger_1.logger.info('SIGINT received, shutting down gracefully');
    server.close(async () => {
        await database_1.database.disconnect();
        await redis_1.redis.disconnect();
        logger_1.logger.info('Server shut down successfully');
        process.exit(0);
    });
});
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_1.logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});
startServer();
//# sourceMappingURL=index.js.map