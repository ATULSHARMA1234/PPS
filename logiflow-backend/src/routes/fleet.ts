import { Router, Response, Request } from 'express';
import { Vehicle } from '../models/Vehicle';
import { VehicleStatus, VehicleType, ApiResponse, FleetStats } from '../types';

const router = Router();

// Get all vehicles
router.get('/vehicles', async (req: Request, res: Response) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    
    // Build filter
    const filter: any = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const vehicles = await Vehicle.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ updatedAt: -1 });
    
    const total = await Vehicle.countDocuments(filter);
    
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
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve vehicles',
      error: error.message,
    } as ApiResponse);
  }
});

// Get vehicle by ID
router.get('/vehicles/:id', async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      } as ApiResponse);
    }
    
    res.json({
      success: true,
      message: 'Vehicle retrieved successfully',
      data: vehicle,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve vehicle',
      error: error.message,
    } as ApiResponse);
  }
});

// Create new vehicle
router.post('/vehicles', async (req: Request, res: Response) => {
  try {
    const vehicleData = req.body;
    
    // Check if vehicle ID already exists
    const existingVehicle = await Vehicle.findOne({ vehicleId: vehicleData.vehicleId });
    if (existingVehicle) {
      return res.status(409).json({
        success: false,
        message: 'Vehicle with this ID already exists',
      } as ApiResponse);
    }
    
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    
    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create vehicle',
      error: error.message,
    } as ApiResponse);
  }
});

// Update vehicle
router.put('/vehicles/:id', async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      } as ApiResponse);
    }
    
    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update vehicle',
      error: error.message,
    } as ApiResponse);
  }
});

// Update vehicle location
router.put('/vehicles/:id/location', async (req: Request, res: Response) => {
  try {
    const { lat, lng, address } = req.body;
    
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        'currentLocation.lat': lat,
        'currentLocation.lng': lng,
        'currentLocation.address': address,
        'currentLocation.timestamp': new Date(),
        updatedAt: new Date(),
      },
      { new: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      } as ApiResponse);
    }
    
    res.json({
      success: true,
      message: 'Vehicle location updated successfully',
      data: vehicle,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update vehicle location',
      error: error.message,
    } as ApiResponse);
  }
});

// Get fleet statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await (Vehicle as any).getFleetStats();
    
    res.json({
      success: true,
      message: 'Fleet statistics retrieved successfully',
      data: stats,
    } as ApiResponse<FleetStats>);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve fleet statistics',
      error: error.message,
    } as ApiResponse);
  }
});

// Get vehicles by status
router.get('/vehicles/status/:status', async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    
    if (!Object.values(VehicleStatus).includes(status as VehicleStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle status',
      } as ApiResponse);
    }
    
    const vehicles = await (Vehicle as any).findByStatus(status as VehicleStatus);
    
    res.json({
      success: true,
      message: `Vehicles with status ${status} retrieved successfully`,
      data: vehicles,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve vehicles by status',
      error: error.message,
    } as ApiResponse);
  }
});

// Get vehicles by type
router.get('/vehicles/type/:type', async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    
    if (!Object.values(VehicleType).includes(type as VehicleType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle type',
      } as ApiResponse);
    }
    
    const vehicles = await (Vehicle as any).findByType(type as VehicleType);
    
    res.json({
      success: true,
      message: `Vehicles of type ${type} retrieved successfully`,
      data: vehicles,
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve vehicles by type',
      error: error.message,
    } as ApiResponse);
  }
});

export default router;
