import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

const router = Router();

// Simple in-memory user store for demo (will be replaced with proper DB later)
const users: any[] = [];

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

    // Find existing user or create demo user
    let user = users.find(u => u.email === email);
    
    if (!user) {
      // Create a demo user
      user = {
        id: 'user_' + Date.now(),
        email,
        firstName: 'Demo',
        lastName: 'User',
        role: 'customer',
        createdAt: new Date()
      };
      users.push(user);
    }

    // Generate JWT token
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: ['profile.manage', 'shipments.create']
    };

    const accessToken = jwt.sign(payload, config.jwt.accessTokenSecret, {
      expiresIn: '15m'
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
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
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    // Create new user
    const user = {
      id: 'user_' + Date.now(),
      email,
      firstName,
      lastName,
      phone: phone || '9876543210',
      role: 'customer',
      createdAt: new Date()
    };

    users.push(user);

    // Generate JWT token
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: ['profile.manage', 'shipments.create']
    };

    const accessToken = jwt.sign(payload, config.jwt.accessTokenSecret, {
      expiresIn: '15m'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: user.id,
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
    const user = users.find(u => u.id === decoded.userId);
    
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
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
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
