import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { authenticateToken } from '../middleware/auth';
import { config } from '../config';
import { UserRole, JWTPayload, ApiResponse } from '../types';
import Joi from 'joi';

const router = Router();

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).required(),
  role: Joi.string().valid(...Object.values(UserRole)).default(UserRole.CUSTOMER),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Generate JWT tokens
const generateTokens = (user: any): { accessToken: string; refreshToken: string } => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    permissions: user.profile?.permissions || [],
  };

  const accessToken = jwt.sign(payload, config.jwt.accessTokenSecret, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(
    { userId: user._id.toString() },
    config.jwt.refreshTokenSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Register user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message,
      } as ApiResponse);
      return;
    }

    const { email, password, firstName, lastName, phone, role } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      } as ApiResponse);
      return;
    }

    // Create new user
    const user = new User({
      email,
      passwordHash: password, // Will be hashed by pre-save middleware
      firstName,
      lastName,
      phone,
      role,
      profile: {
        permissions: getDefaultPermissions(role),
      },
    });

    await user.save();

    const { accessToken, refreshToken } = generateTokens(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    } as ApiResponse);
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message,
      } as ApiResponse);
    }

    const { email, password } = value;

    // Find user with password
    const user = await (User as any).findByEmailWithPassword(email);
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      } as ApiResponse);
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      } as ApiResponse);
      return;
    }

    const { accessToken, refreshToken } = generateTokens(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    } as ApiResponse);
  }
});

// Refresh token
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required',
      } as ApiResponse);
    }

    const decoded = jwt.verify(refreshToken, config.jwt.refreshTokenSecret) as any;
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      } as ApiResponse);
      return;
    }

    const { accessToken } = generateTokens(user);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: { accessToken },
    } as ApiResponse);
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
      error: error.message,
    } as ApiResponse);
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      } as ApiResponse);
    }

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        profile: user.profile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      error: error.message,
    } as ApiResponse);
  }
});

// Helper function to get default permissions based on role
function getDefaultPermissions(role: UserRole): string[] {
  switch (role) {
    case UserRole.ADMIN:
      return ['users.manage', 'vehicles.manage', 'shipments.manage', 'warehouses.manage', 'system.admin'];
    case UserRole.MANAGER:
      return ['vehicles.view', 'vehicles.update', 'shipments.view', 'shipments.update', 'warehouses.view'];
    case UserRole.DRIVER:
      return ['vehicles.assigned', 'shipments.assigned', 'routes.view'];
    case UserRole.CUSTOMER:
      return ['shipments.create', 'shipments.own', 'profile.manage'];
    default:
      return [];
  }
}

export default router;
