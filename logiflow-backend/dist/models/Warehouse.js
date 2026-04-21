"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warehouse = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const warehouseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    coordinates: {
        lat: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        },
        lng: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        }
    },
    capacity: {
        type: Number,
        required: true,
        min: 0
    },
    currentUtilization: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    managerId: {
        type: String,
        default: null
    },
    zones: [{
            name: {
                type: String,
                required: true,
                trim: true
            },
            capacity: {
                type: Number,
                required: true,
                min: 0
            },
            currentStock: {
                type: Number,
                default: 0,
                min: 0
            }
        }],
    operatingHours: {
        open: {
            type: String,
            required: true,
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        },
        close: {
            type: String,
            required: true,
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        },
        days: [{
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }]
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            return ret;
        }
    }
});
warehouseSchema.index({ name: 1 });
warehouseSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });
warehouseSchema.index({ capacity: 1 });
warehouseSchema.index({ currentUtilization: 1 });
warehouseSchema.statics.findByAvailability = function (minCapacity) {
    return this.find({
        capacity: { $gte: minCapacity },
        currentUtilization: { $lt: 90 }
    });
};
warehouseSchema.statics.getWarehouseStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                totalCapacity: { $sum: '$capacity' },
                averageUtilization: { $avg: '$currentUtilization' },
                available: {
                    $sum: {
                        $cond: [{ $lt: ['$currentUtilization', 90] }, 1, 0]
                    }
                }
            }
        }
    ]);
    return stats[0] || {
        total: 0,
        totalCapacity: 0,
        averageUtilization: 0,
        available: 0
    };
};
exports.Warehouse = mongoose_1.default.model('Warehouse', warehouseSchema);
//# sourceMappingURL=Warehouse.js.map