import mongoose, { Document } from 'mongoose';
interface IWarehouseDocument extends Document {
    name: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    capacity: number;
    currentUtilization: number;
    managerId?: string;
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
export declare const Warehouse: mongoose.Model<IWarehouseDocument, {}, {}, {}, mongoose.Document<unknown, {}, IWarehouseDocument, {}, mongoose.DefaultSchemaOptions> & IWarehouseDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWarehouseDocument>;
export {};
//# sourceMappingURL=Warehouse.d.ts.map