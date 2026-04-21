"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const config_1 = require("../config");
const types_1 = require("../types");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    firstName: joi_1.default.string().min(2).max(50).required(),
    lastName: joi_1.default.string().min(2).max(50).required(),
    phone: joi_1.default.string().pattern(/^\+?[\d\s\-\(\)]+$/).required(),
    role: joi_1.default.string().valid(...Object.values(types_1.UserRole)).default(types_1.UserRole.CUSTOMER),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const generateTokens = (user) => {
    const payload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        permissions: user.profile?.permissions || [],
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwt.accessTokenSecret, {
        expiresIn: '15m',
    });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, config_1.config.jwt.refreshTokenSecret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
router.post('/register', async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.details[0].message,
            });
            return;
        }
        const { email, password, firstName, lastName, phone, role } = value;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: 'User with this email already exists',
            });
            return;
        }
        const user = new User_1.User({
            email,
            passwordHash: password,
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
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message,
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.details[0].message,
            });
        }
        const { email, password } = value;
        const user = await User_1.User.findByEmailWithPassword(email);
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
            return;
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
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
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message,
        });
    }
});
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token is required',
            });
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.jwt.refreshTokenSecret);
        const user = await User_1.User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid refresh token',
            });
            return;
        }
        const { accessToken } = generateTokens(user);
        res.json({
            success: true,
            message: 'Token refreshed successfully',
            data: { accessToken },
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid refresh token',
            error: error.message,
        });
    }
});
router.get('/profile', auth_1.authenticateToken, async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
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
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve profile',
            error: error.message,
        });
    }
});
function getDefaultPermissions(role) {
    switch (role) {
        case types_1.UserRole.ADMIN:
            return ['users.manage', 'vehicles.manage', 'shipments.manage', 'warehouses.manage', 'system.admin'];
        case types_1.UserRole.MANAGER:
            return ['vehicles.view', 'vehicles.update', 'shipments.view', 'shipments.update', 'warehouses.view'];
        case types_1.UserRole.DRIVER:
            return ['vehicles.assigned', 'shipments.assigned', 'routes.view'];
        case types_1.UserRole.CUSTOMER:
            return ['shipments.create', 'shipments.own', 'profile.manage'];
        default:
            return [];
    }
}
exports.default = router;
//# sourceMappingURL=auth.js.map