"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
const users = [];
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
            return;
        }
        let user = users.find(u => u.email === email);
        if (!user) {
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
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            permissions: ['profile.manage', 'shipments.create']
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwt.accessTokenSecret, {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        if (!email || !password || !firstName || !lastName) {
            res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
            return;
        }
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
            return;
        }
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
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            permissions: ['profile.manage', 'shipments.create']
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwt.accessTokenSecret, {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});
router.get('/profile', async (req, res) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.accessTokenSecret);
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
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
});
exports.default = router;
//# sourceMappingURL=basic-auth.js.map