"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.RedisConnection = void 0;
const redis_1 = require("redis");
const logger_1 = require("../utils/logger");
class RedisConnection {
    constructor() {
        this.isConnected = false;
        this.client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: {
                connectTimeout: 5000,
            },
        });
        this.client.on('error', (error) => {
            logger_1.logger.error('Redis connection error:', error);
            this.isConnected = false;
        });
        this.client.on('connect', () => {
            logger_1.logger.info('Connected to Redis');
            this.isConnected = true;
        });
        this.client.on('disconnect', () => {
            logger_1.logger.warn('Redis disconnected');
            this.isConnected = false;
        });
    }
    static getInstance() {
        if (!RedisConnection.instance) {
            RedisConnection.instance = new RedisConnection();
        }
        return RedisConnection.instance;
    }
    async connect() {
        if (this.isConnected) {
            logger_1.logger.info('Redis already connected');
            return;
        }
        try {
            await this.client.connect();
            this.isConnected = true;
            logger_1.logger.info('Connected to Redis successfully');
        }
        catch (error) {
            logger_1.logger.error('Failed to connect to Redis:', error);
            this.isConnected = false;
            throw error;
        }
    }
    async disconnect() {
        if (!this.isConnected) {
            return;
        }
        try {
            await this.client.disconnect();
            this.isConnected = false;
            logger_1.logger.info('Disconnected from Redis');
        }
        catch (error) {
            logger_1.logger.error('Error disconnecting from Redis:', error);
            throw error;
        }
    }
    getClient() {
        return this.client;
    }
    getConnectionStatus() {
        return this.isConnected;
    }
    async set(key, value, expireInSeconds) {
        try {
            if (expireInSeconds) {
                await this.client.setEx(key, expireInSeconds, value);
            }
            else {
                await this.client.set(key, value);
            }
        }
        catch (error) {
            logger_1.logger.error('Redis SET error:', error);
            throw error;
        }
    }
    async get(key) {
        try {
            return await this.client.get(key);
        }
        catch (error) {
            logger_1.logger.error('Redis GET error:', error);
            throw error;
        }
    }
    async del(key) {
        try {
            await this.client.del(key);
        }
        catch (error) {
            logger_1.logger.error('Redis DEL error:', error);
            throw error;
        }
    }
    async exists(key) {
        try {
            const result = await this.client.exists(key);
            return result === 1;
        }
        catch (error) {
            logger_1.logger.error('Redis EXISTS error:', error);
            throw error;
        }
    }
    async healthCheck() {
        try {
            await this.client.ping();
            return true;
        }
        catch (error) {
            logger_1.logger.error('Redis health check failed:', error);
            return false;
        }
    }
}
exports.RedisConnection = RedisConnection;
exports.redis = RedisConnection.getInstance();
//# sourceMappingURL=redis.js.map