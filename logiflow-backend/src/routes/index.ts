import { Router } from 'express';
import authRoutes from './basic-auth';
import fleetRoutes from './fleet';
import warehouseRoutes from './warehouse';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/fleet', fleetRoutes);
router.use('/warehouse', warehouseRoutes);

export default router;
