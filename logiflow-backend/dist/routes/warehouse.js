"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Warehouse_1 = require("../models/Warehouse");
const router = (0, express_1.Router)();
router.get('/warehouses', async (req, res) => {
    try {
        const { page = 1, limit = 20, minCapacity } = req.query;
        const filter = {};
        if (minCapacity) {
            filter.capacity = { $gte: Number(minCapacity) };
        }
        const skip = (Number(page) - 1) * Number(limit);
        const warehouses = await Warehouse_1.Warehouse.find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({ name: 1 });
        const total = await Warehouse_1.Warehouse.countDocuments(filter);
        res.json({
            success: true,
            message: 'Warehouses retrieved successfully',
            data: warehouses,
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
            message: 'Failed to retrieve warehouses',
            error: error.message,
        });
    }
});
router.get('/warehouses/:id', async (req, res) => {
    try {
        const warehouse = await Warehouse_1.Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found',
            });
        }
        res.json({
            success: true,
            message: 'Warehouse retrieved successfully',
            data: warehouse,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve warehouse',
            error: error.message,
        });
    }
});
router.post('/warehouses', async (req, res) => {
    try {
        const warehouseData = req.body;
        const existingWarehouse = await Warehouse_1.Warehouse.findOne({ name: warehouseData.name });
        if (existingWarehouse) {
            return res.status(409).json({
                success: false,
                message: 'Warehouse with this name already exists',
            });
        }
        const warehouse = new Warehouse_1.Warehouse(warehouseData);
        await warehouse.save();
        res.status(201).json({
            success: true,
            message: 'Warehouse created successfully',
            data: warehouse,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create warehouse',
            error: error.message,
        });
    }
});
router.put('/warehouses/:id', async (req, res) => {
    try {
        const warehouse = await Warehouse_1.Warehouse.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!warehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found',
            });
        }
        res.json({
            success: true,
            message: 'Warehouse updated successfully',
            data: warehouse,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update warehouse',
            error: error.message,
        });
    }
});
router.put('/warehouses/:id/utilization', async (req, res) => {
    try {
        const { currentUtilization } = req.body;
        if (typeof currentUtilization !== 'number' || currentUtilization < 0 || currentUtilization > 100) {
            return res.status(400).json({
                success: false,
                message: 'Utilization must be a number between 0 and 100',
            });
        }
        const warehouse = await Warehouse_1.Warehouse.findByIdAndUpdate(req.params.id, {
            currentUtilization,
            updatedAt: new Date()
        }, { new: true });
        if (!warehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found',
            });
        }
        res.json({
            success: true,
            message: 'Warehouse utilization updated successfully',
            data: warehouse,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update warehouse utilization',
            error: error.message,
        });
    }
});
router.get('/warehouses/available/:minCapacity', async (req, res) => {
    try {
        const { minCapacity } = req.params;
        const warehouses = await Warehouse_1.Warehouse.findByAvailability(Number(minCapacity));
        res.json({
            success: true,
            message: `Available warehouses with capacity ${minCapacity}+ retrieved successfully`,
            data: warehouses,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve available warehouses',
            error: error.message,
        });
    }
});
router.get('/warehouses/stats', async (req, res) => {
    try {
        const stats = await Warehouse_1.Warehouse.getWarehouseStats();
        res.json({
            success: true,
            message: 'Warehouse statistics retrieved successfully',
            data: stats,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve warehouse statistics',
            error: error.message,
        });
    }
});
router.post('/warehouses/:id/book', async (req, res) => {
    try {
        const { customerId, duration, spaceRequired, startDate, endDate } = req.body;
        const warehouse = await Warehouse_1.Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found',
            });
        }
        const availableSpace = warehouse.capacity * (1 - warehouse.currentUtilization / 100);
        if (spaceRequired > availableSpace) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient space available in this warehouse',
            });
        }
        const newUtilization = warehouse.currentUtilization + (spaceRequired / warehouse.capacity * 100);
        await Warehouse_1.Warehouse.findByIdAndUpdate(req.params.id, {
            currentUtilization: Math.min(newUtilization, 100),
            updatedAt: new Date()
        });
        res.json({
            success: true,
            message: 'Warehouse booked successfully',
            data: {
                warehouseId: req.params.id,
                warehouseName: warehouse.name,
                spaceRequired,
                duration,
                startDate,
                endDate,
                bookingDate: new Date()
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to book warehouse',
            error: error.message,
        });
    }
});
exports.default = router;
//# sourceMappingURL=warehouse.js.map