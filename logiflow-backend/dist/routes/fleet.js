"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Vehicle_1 = require("../models/Vehicle");
const types_1 = require("../types");
const router = (0, express_1.Router)();
router.get('/vehicles', async (req, res) => {
    try {
        const { status, type, page = 1, limit = 20 } = req.query;
        const filter = {};
        if (status)
            filter.status = status;
        if (type)
            filter.type = type;
        const skip = (Number(page) - 1) * Number(limit);
        const vehicles = await Vehicle_1.Vehicle.find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({ updatedAt: -1 });
        const total = await Vehicle_1.Vehicle.countDocuments(filter);
        res.json({
            success: true,
            message: 'Vehicles retrieved successfully',
            data: vehicles,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total,
                itemsPerPage: Number(limit),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve vehicles',
            error: error.message,
        });
    }
});
router.get('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle_1.Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
            });
        }
        res.json({
            success: true,
            message: 'Vehicle retrieved successfully',
            data: vehicle,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve vehicle',
            error: error.message,
        });
    }
});
router.post('/vehicles', async (req, res) => {
    try {
        const vehicleData = req.body;
        const existingVehicle = await Vehicle_1.Vehicle.findOne({ vehicleId: vehicleData.vehicleId });
        if (existingVehicle) {
            return res.status(409).json({
                success: false,
                message: 'Vehicle with this ID already exists',
            });
        }
        const vehicle = new Vehicle_1.Vehicle(vehicleData);
        await vehicle.save();
        res.status(201).json({
            success: true,
            message: 'Vehicle created successfully',
            data: vehicle,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create vehicle',
            error: error.message,
        });
    }
});
router.put('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle_1.Vehicle.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
            });
        }
        res.json({
            success: true,
            message: 'Vehicle updated successfully',
            data: vehicle,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update vehicle',
            error: error.message,
        });
    }
});
router.put('/vehicles/:id/location', async (req, res) => {
    try {
        const { lat, lng, address } = req.body;
        const vehicle = await Vehicle_1.Vehicle.findByIdAndUpdate(req.params.id, {
            'currentLocation.lat': lat,
            'currentLocation.lng': lng,
            'currentLocation.address': address,
            'currentLocation.timestamp': new Date(),
            updatedAt: new Date(),
        }, { new: true });
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
            });
        }
        res.json({
            success: true,
            message: 'Vehicle location updated successfully',
            data: vehicle,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update vehicle location',
            error: error.message,
        });
    }
});
router.get('/stats', async (req, res) => {
    try {
        const stats = await Vehicle_1.Vehicle.getFleetStats();
        res.json({
            success: true,
            message: 'Fleet statistics retrieved successfully',
            data: stats,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve fleet statistics',
            error: error.message,
        });
    }
});
router.get('/vehicles/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        if (!Object.values(types_1.VehicleStatus).includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid vehicle status',
            });
        }
        const vehicles = await Vehicle_1.Vehicle.findByStatus(status);
        res.json({
            success: true,
            message: `Vehicles with status ${status} retrieved successfully`,
            data: vehicles,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve vehicles by status',
            error: error.message,
        });
    }
});
router.get('/vehicles/type/:type', async (req, res) => {
    try {
        const { type } = req.params;
        if (!Object.values(types_1.VehicleType).includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid vehicle type',
            });
        }
        const vehicles = await Vehicle_1.Vehicle.findByType(type);
        res.json({
            success: true,
            message: `Vehicles of type ${type} retrieved successfully`,
            data: vehicles,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve vehicles by type',
            error: error.message,
        });
    }
});
exports.default = router;
//# sourceMappingURL=fleet.js.map