"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.DatabaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
class DatabaseConnection {
    constructor() {
        this.isConnected = false;
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    async connect() {
        if (this.isConnected) {
            logger_1.logger.info('Database already connected');
            return;
        }
        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/logiflow';
            await mongoose_1.default.connect(mongoUri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            this.isConnected = true;
            logger_1.logger.info('Connected to MongoDB successfully');
            mongoose_1.default.connection.on('error', (error) => {
                logger_1.logger.error('MongoDB connection error:', error);
                this.isConnected = false;
            });
            mongoose_1.default.connection.on('disconnected', () => {
                logger_1.logger.warn('MongoDB disconnected');
                this.isConnected = false;
            });
            mongoose_1.default.connection.on('reconnected', () => {
                logger_1.logger.info('MongoDB reconnected');
                this.isConnected = true;
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to connect to MongoDB:', error);
            this.isConnected = false;
            throw error;
        }
    }
    async disconnect() {
        if (!this.isConnected) {
            return;
        }
        try {
            await mongoose_1.default.disconnect();
            this.isConnected = false;
            logger_1.logger.info('Disconnected from MongoDB');
        }
        catch (error) {
            logger_1.logger.error('Error disconnecting from MongoDB:', error);
            throw error;
        }
    }
    getConnectionStatus() {
        return this.isConnected;
    }
    async healthCheck() {
        try {
            const state = mongoose_1.default.connection.readyState;
            return state === 1;
        }
        catch (error) {
            logger_1.logger.error('Database health check failed:', error);
            return false;
        }
    }
}
exports.DatabaseConnection = DatabaseConnection;
exports.database = DatabaseConnection.getInstance();
//# sourceMappingURL=database.js.map