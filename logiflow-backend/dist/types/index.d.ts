import { Request } from 'express';
export interface IUser {
    _id: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    phone: string;
    profile: {
        avatar?: string;
        department?: string;
        permissions: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    DRIVER = "driver",
    CUSTOMER = "customer"
}
export interface IVehicle {
    _id: string;
    vehicleId: string;
    type: VehicleType;
    licensePlate: string;
    make: string;
    model: string;
    year: number;
    status: VehicleStatus;
    currentLocation: {
        lat: number;
        lng: number;
        address: string;
        timestamp: Date;
    };
    specifications: {
        capacity: number;
        dimensions: {
            length: number;
            width: number;
            height: number;
        };
        fuelType: string;
    };
    assignedDriver?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum VehicleType {
    TRUCK = "Truck",
    VAN = "Van",
    AIRCRAFT = "Aircraft",
    CARGO_SHIP = "Cargo Ship"
}
export declare enum VehicleStatus {
    ACTIVE = "Active",
    IN_TRANSIT = "In Transit",
    MAINTENANCE = "Maintenance"
}
export interface IShipment {
    _id: string;
    trackingNumber: string;
    customerId: string;
    origin: {
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        contact: {
            name: string;
            phone: string;
            email: string;
        };
    };
    destination: {
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        contact: {
            name: string;
            phone: string;
            email: string;
        };
    };
    package: {
        weight: number;
        dimensions: {
            length: number;
            width: number;
            height: number;
        };
        description: string;
        value: number;
    };
    status: ShipmentStatus;
    priority: Priority;
    assignedVehicle?: string;
    estimatedDelivery?: Date;
    actualDelivery?: Date;
    cost: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum ShipmentStatus {
    PENDING = "Pending",
    IN_TRANSIT = "In Transit",
    DELIVERED = "Delivered",
    DELAYED = "Delayed"
}
export declare enum Priority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    URGENT = "Urgent"
}
export interface IWarehouse {
    _id: string;
    name: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    capacity: number;
    currentUtilization: number;
    managerId: string;
    zones: Array<{
        name: string;
        capacity: number;
        currentStock: number;
    }>;
    operatingHours: {
        open: string;
        close: string;
        days: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}
export interface IActivity {
    _id: string;
    vehicle: string;
    action: string;
    location: string;
    time: string;
}
export interface FleetStats {
    total: number;
    active: number;
    inTransit: number;
    maintenance: number;
}
export interface JWTPayload {
    userId: string;
    email: string;
    role: UserRole;
    permissions: string[];
    iat: number;
    exp: number;
}
export interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}
//# sourceMappingURL=index.d.ts.map