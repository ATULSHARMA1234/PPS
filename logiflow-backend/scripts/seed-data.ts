import mongoose from 'mongoose';
import { Vehicle } from '../src/models/Vehicle';
import { Warehouse } from '../src/models/Warehouse';
import { VehicleType, VehicleStatus } from '../src/types';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/logiflow');

// Sample vehicles data
const sampleVehicles = [
  {
    vehicleId: 'TRK-001',
    type: VehicleType.TRUCK,
    licensePlate: 'MH01AB1234',
    make: 'Tata',
    vehicleModel: 'Prima',
    year: 2022,
    status: VehicleStatus.ACTIVE,
    currentLocation: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Mumbai, Maharashtra, India',
      timestamp: new Date()
    },
    specifications: {
      capacity: 5000,
      dimensions: {
        length: 20,
        width: 8,
        height: 10
      },
      fuelType: 'Diesel'
    }
  },
  {
    vehicleId: 'TRK-002',
    type: VehicleType.TRUCK,
    licensePlate: 'DL02CD5678',
    make: 'Ashok Leyland',
    vehicleModel: 'Boss',
    year: 2021,
    status: VehicleStatus.IN_TRANSIT,
    currentLocation: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Delhi, NCT, India',
      timestamp: new Date()
    },
    specifications: {
      capacity: 7500,
      dimensions: {
        length: 25,
        width: 9,
        height: 12
      },
      fuelType: 'Diesel'
    }
  },
  {
    vehicleId: 'VAN-003',
    type: VehicleType.VAN,
    licensePlate: 'KA03EF9012',
    make: 'Mahindra',
    vehicleModel: 'Supro',
    year: 2023,
    status: VehicleStatus.ACTIVE,
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'Bangalore, Karnataka, India',
      timestamp: new Date()
    },
    specifications: {
      capacity: 1500,
      dimensions: {
        length: 12,
        width: 6,
        height: 8
      },
      fuelType: 'Petrol'
    }
  },
  {
    vehicleId: 'TRK-004',
    type: VehicleType.TRUCK,
    licensePlate: 'TN04GH3456',
    make: 'Eicher',
    vehicleModel: 'Pro 6048',
    year: 2020,
    status: VehicleStatus.MAINTENANCE,
    currentLocation: {
      lat: 13.0827,
      lng: 80.2707,
      address: 'Chennai, Tamil Nadu, India',
      timestamp: new Date()
    },
    specifications: {
      capacity: 6000,
      dimensions: {
        length: 22,
        width: 8.5,
        height: 11
      },
      fuelType: 'Diesel'
    }
  },
  {
    vehicleId: 'AIR-005',
    type: VehicleType.AIRCRAFT,
    licensePlate: 'VT-LOG001',
    make: 'Boeing',
    vehicleModel: '737-800',
    year: 2019,
    status: VehicleStatus.ACTIVE,
    currentLocation: {
      lat: 22.5726,
      lng: 88.3639,
      address: 'Kolkata, West Bengal, India',
      timestamp: new Date()
    },
    specifications: {
      capacity: 20000,
      dimensions: {
        length: 39,
        width: 35,
        height: 12
      },
      fuelType: 'Jet Fuel'
    }
  },
  {
    vehicleId: 'SHP-006',
    type: VehicleType.CARGO_SHIP,
    licensePlate: 'IND-SHP001',
    make: 'Maersk',
    vehicleModel: 'Triple-E',
    year: 2021,
    status: VehicleStatus.IN_TRANSIT,
    currentLocation: {
      lat: 17.3850,
      lng: 78.4867,
      address: 'Hyderabad, Telangana, India',
      timestamp: new Date()
    },
    specifications: {
      capacity: 50000,
      dimensions: {
        length: 400,
        width: 60,
        height: 70
      },
      fuelType: 'Heavy Fuel Oil'
    }
  }
];

// Sample warehouses data
const sampleWarehouses = [
  {
    name: 'Mumbai Central Warehouse',
    address: 'Navi Mumbai, Maharashtra 400703',
    coordinates: {
      lat: 19.0330,
      lng: 73.0297
    },
    capacity: 100000,
    currentUtilization: 75,
    zones: [
      { name: 'Zone A', capacity: 25000, currentStock: 18000 },
      { name: 'Zone B', capacity: 25000, currentStock: 20000 },
      { name: 'Zone C', capacity: 25000, currentStock: 22000 },
      { name: 'Zone D', capacity: 25000, currentStock: 15000 }
    ],
    operatingHours: {
      open: '06:00',
      close: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  {
    name: 'Delhi Logistics Hub',
    address: 'Gurgaon, Haryana 122001',
    coordinates: {
      lat: 28.4595,
      lng: 77.0266
    },
    capacity: 80000,
    currentUtilization: 60,
    zones: [
      { name: 'North Zone', capacity: 20000, currentStock: 12000 },
      { name: 'South Zone', capacity: 20000, currentStock: 11000 },
      { name: 'East Zone', capacity: 20000, currentStock: 13000 },
      { name: 'West Zone', capacity: 20000, currentStock: 12000 }
    ],
    operatingHours: {
      open: '07:00',
      close: '21:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    name: 'Bangalore Distribution Center',
    address: 'Electronic City, Bangalore 560100',
    coordinates: {
      lat: 12.8399,
      lng: 77.6800
    },
    capacity: 60000,
    currentUtilization: 45,
    zones: [
      { name: 'Tech Zone', capacity: 20000, currentStock: 8000 },
      { name: 'Retail Zone', capacity: 20000, currentStock: 9000 },
      { name: 'Bulk Zone', capacity: 20000, currentStock: 10000 }
    ],
    operatingHours: {
      open: '08:00',
      close: '20:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  {
    name: 'Chennai Port Warehouse',
    address: 'Port Area, Chennai 600001',
    coordinates: {
      lat: 13.0878,
      lng: 80.2785
    },
    capacity: 120000,
    currentUtilization: 85,
    zones: [
      { name: 'Import Zone', capacity: 40000, currentStock: 35000 },
      { name: 'Export Zone', capacity: 40000, currentStock: 33000 },
      { name: 'Transit Zone', capacity: 40000, currentStock: 34000 }
    ],
    operatingHours: {
      open: '05:00',
      close: '23:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  }
];

// Seed the database
async function seedDatabase() {
  try {
    console.log('Clearing existing data...');
    await Vehicle.deleteMany({});
    await Warehouse.deleteMany({});

    console.log('Seeding vehicles...');
    const vehicles = await Vehicle.insertMany(sampleVehicles);
    console.log(`Created ${vehicles.length} vehicles`);

    console.log('Seeding warehouses...');
    const warehouses = await Warehouse.insertMany(sampleWarehouses);
    console.log(`Created ${warehouses.length} warehouses`);

    console.log('Database seeded successfully!');
    
    // Display some stats
    const vehicleStats = await (Vehicle as any).getFleetStats();
    const warehouseStats = await (Warehouse as any).getWarehouseStats();
    
    console.log('\n=== Fleet Statistics ===');
    console.log(`Total Vehicles: ${vehicleStats.total}`);
    console.log(`Active: ${vehicleStats.active}`);
    console.log(`In Transit: ${vehicleStats.inTransit}`);
    console.log(`Maintenance: ${vehicleStats.maintenance}`);
    
    console.log('\n=== Warehouse Statistics ===');
    console.log(`Total Warehouses: ${warehouseStats.total}`);
    console.log(`Total Capacity: ${warehouseStats.totalCapacity}`);
    console.log(`Average Utilization: ${warehouseStats.averageUtilization.toFixed(1)}%`);
    console.log(`Available: ${warehouseStats.available}`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
