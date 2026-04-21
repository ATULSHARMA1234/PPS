import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config';
import { UserRole } from '../types';

const router = Router();

// Simple login endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }

    // Find user or create if doesn't exist (for demo purposes)
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create a new user for demo
      user = new User({
        email,
        passwordHash: password, // Will be hashed by pre-save middleware
        firstName: 'Demo',
        lastName: 'User',
        phone: '9876543210',
        role: UserRole.CUSTOMER,
        profile: {
          permissions: ['profile.manage', 'shipments.create']
        }
      });
      await user.save();
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Generate JWT token
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.profile?.permissions || []
    };

    const accessToken = jwt.sign(payload, config.jwt.accessTokenSecret, {
      expiresIn: '15m'
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        accessToken
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Simple register endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    // Create new user
    const user = new User({
      email,
      passwordHash: password, // Will be hashed by pre-save middleware
      firstName,
      lastName,
      phone: phone || '9876543210',
      role: UserRole.CUSTOMER,
      profile: {
        permissions: ['profile.manage', 'shipments.create']
      }
    });

    await user.save();

    // Generate JWT token
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.profile?.permissions || []
    };

    const accessToken = jwt.sign(payload, config.jwt.accessTokenSecret, {
      expiresIn: '15m'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        accessToken
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Get current user profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
      return;
    }

    const decoded = jwt.verify(token, config.jwt.accessTokenSecret) as any;
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
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
        updatedAt: user.updatedAt
      }
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

export default router;
