import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { config } from './config';
import { database } from './config/database';
import { redis } from './config/redis';
import { logger } from './utils/logger';

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: config.cors.origin,
    credentials: config.cors.credentials,
  },
});

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await database.healthCheck();
    const redisHealth = await redis.healthCheck();
    
    const health = {
      status: dbHealth && redisHealth ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: dbHealth ? 'connected' : 'disconnected',
      redis: redisHealth ? 'connected' : 'disconnected',
      uptime: process.uptime(),
    };

    res.status(health.status === 'healthy' ? 200 : 503).json(health);
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    });
  }
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'LogiFlow Backend API is running',
    version: '1.0.0',
    environment: config.nodeEnv,
  });
});

// Import and use API routes
import routes from './routes';
app.use('/api', routes);

// WebSocket connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });

  // Join room for fleet tracking
  socket.on('join-fleet-tracking', () => {
    socket.join('fleet-tracking');
    logger.info(`Client ${socket.id} joined fleet tracking room`);
  });

  // Join room for shipment tracking
  socket.on('join-shipment-tracking', (shipmentId: string) => {
    socket.join(`shipment-${shipmentId}`);
    logger.info(`Client ${socket.id} joined shipment tracking room for ${shipmentId}`);
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await database.connect();
    logger.info('Database connected successfully');

    // Skip Redis connection for now
    logger.warn('Redis disabled - running with MongoDB only');

    // Start server
    server.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
      logger.info(`WebSocket server ready for connections`);
      logger.info('API endpoints available:');
      logger.info('  GET  /health - Server health check');
      logger.info('  GET  /api - API information');
      logger.info('  GET  /api/health - API health check');
      logger.info('  GET  /api/fleet/vehicles - Get all vehicles');
      logger.info('  GET  /api/fleet/stats - Get fleet statistics');
      logger.info('  GET  /api/warehouse/warehouses - Get all warehouses');
      logger.info('  POST /api/warehouse/warehouses/:id/book - Book warehouse');
      logger.info('');
      logger.info('Server is ready! Database connected and endpoints available.');
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  
  server.close(async () => {
    await database.disconnect();
    await redis.disconnect();
    logger.info('Server shut down successfully');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  
  server.close(async () => {
    await database.disconnect();
    await redis.disconnect();
    logger.info('Server shut down successfully');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

startServer();

export { app, io };
