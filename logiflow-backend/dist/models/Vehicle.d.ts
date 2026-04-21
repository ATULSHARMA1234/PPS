import mongoose, { Document } from 'mongoose';
import { VehicleType, VehicleStatus } from '../types';
interface IVehicleDocument extends Document {
    vehicleId: string;
    type: VehicleType;
    licensePlate: string;
    make: string;
    vehicleModel: string;
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
    assignedDriver?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Vehicle: mongoose.Model<IVehicleDocument, {}, {}, {}, mongoose.Document<unknown, {}, IVehicleDocument, {}, mongoose.DefaultSchemaOptions> & IVehicleDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IVehicleDocument>;
export {};
//# sourceMappingURL=Vehicle.d.ts.map