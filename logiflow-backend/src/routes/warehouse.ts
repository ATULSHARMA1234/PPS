import { Router, Response, Request } from 'express';
import { Warehouse } from '../models/Warehouse';
import { ApiResponse } from '../types';

const router = Router();

// Get all warehouses
router.get('/warehouses', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, minCapacity } = req.query;
    
    // Build filter
    const filter: any = {};
    if (minCapacity) {
      filter.capacity = { $gte: Number(minCapacity) };
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const warehouses = await Warehouse.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ name: 1 });
    
    const total = await Warehouse.countDocuments(filter);
    
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
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve warehouses',
      error: error.message,
    } as ApiResponse);
  }
});

// Get warehouse by ID
router.get('/warehouses/:id', async (req: Request, res: Response) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found',
      } as ApiResponse);
    }
    
    res.json({
      success: true,
      message: 'Warehouse retrieved successfully',
      data: warehouse,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve warehouse',
      error: error.message,
    } as ApiResponse);
  }
});

// Create new warehouse
router.post('/warehouses', async (req: Request, res: Response) => {
  try {
    const warehouseData = req.body;
    
    // Check if warehouse name already exists
    const existingWarehouse = await Warehouse.findOne({ name: warehouseData.name });
    if (existingWarehouse) {
      return res.status(409).json({
        success: false,
        message: 'Warehouse with this name already exists',
      } as ApiResponse);
    }
    
    const warehouse = new Warehouse(warehouseData);
    await warehouse.save();
    
    res.status(201).json({
      success: true,
      message: 'Warehouse created successfully',
      data: warehouse,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create warehouse',
      error: error.message,
    } as ApiResponse);
  }
});

// Update warehouse
router.put('/warehouses/:id', async (req: Request, res: Response) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found',
      } as ApiResponse);
    }
    
    res.json({
      success: true,
      message: 'Warehouse updated successfully',
      data: warehouse,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update warehouse',
      error: error.message,
    } as ApiResponse);
  }
});

// Update warehouse utilization
router.put('/warehouses/:id/utilization', async (req: Request, res: Response) => {
  try {
    const { currentUtilization } = req.body;
    
    if (typeof currentUtilization !== 'number' || currentUtilization < 0 || currentUtilization > 100) {
      return res.status(400).json({
        success: false,
        message: 'Utilization must be a number between 0 and 100',
      } as ApiResponse);
    }
    
    const warehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      { 
        currentUtilization,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found',
      } as ApiResponse);
    }
    
    res.json({
      success: true,
      message: 'Warehouse utilization updated successfully',
      data: warehouse,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update warehouse utilization',
      error: error.message,
    } as ApiResponse);
  }
});

// Get available warehouses
router.get('/warehouses/available/:minCapacity', async (req: Request, res: Response) => {
  try {
    const { minCapacity } = req.params;
    
    const warehouses = await (Warehouse as any).findByAvailability(Number(minCapacity));
    
    res.json({
      success: true,
      message: `Available warehouses with capacity ${minCapacity}+ retrieved successfully`,
      data: warehouses,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve available warehouses',
      error: error.message,
    } as ApiResponse);
  }
});

// Get warehouse statistics
router.get('/warehouses/stats', async (req: Request, res: Response) => {
  try {
    const stats = await (Warehouse as any).getWarehouseStats();
    
    res.json({
      success: true,
      message: 'Warehouse statistics retrieved successfully',
      data: stats,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve warehouse statistics',
      error: error.message,
    } as ApiResponse);
  }
});

// Book warehouse (create a booking record)
router.post('/warehouses/:id/book', async (req: Request, res: Response) => {
  try {
    const { customerId, duration, spaceRequired, startDate, endDate } = req.body;
    
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found',
      } as ApiResponse);
    }
    
    // Check if warehouse has enough capacity
    const availableSpace = warehouse.capacity * (1 - warehouse.currentUtilization / 100);
    if (spaceRequired > availableSpace) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient space available in this warehouse',
      } as ApiResponse);
    }
    
    // Update utilization
    const newUtilization = warehouse.currentUtilization + (spaceRequired / warehouse.capacity * 100);
    await Warehouse.findByIdAndUpdate(req.params.id, {
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
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to book warehouse',
      error: error.message,
    } as ApiResponse);
  }
});

export default router;
