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
exports.Vehicle = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("../types");
const vehicleSchema = new mongoose_1.Schema({
    vehicleId: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        match: [/^[A-Z]{3}-\d{3}$/, 'Vehicle ID must be in format XXX-123']
    },
    type: {
        type: String,
        enum: Object.values(types_1.VehicleType),
        required: true
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    make: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    vehicleModel: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() + 1
    },
    status: {
        type: String,
        enum: Object.values(types_1.VehicleStatus),
        default: types_1.VehicleStatus.ACTIVE,
        required: true
    },
    currentLocation: {
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
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    specifications: {
        capacity: {
            type: Number,
            required: true,
            min: 0
        },
        dimensions: {
            length: {
                type: Number,
                required: true,
                min: 0
            },
            width: {
                type: Number,
                required: true,
                min: 0
            },
            height: {
                type: Number,
                required: true,
                min: 0
            }
        },
        fuelType: {
            type: String,
            required: true,
            trim: true,
            enum: ['Diesel', 'Petrol', 'Electric', 'Hybrid', 'CNG', 'LNG', 'Jet Fuel', 'Heavy Fuel Oil']
        }
    },
    assignedDriver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            return ret;
        }
    }
});
vehicleSchema.index({ vehicleId: 1 });
vehicleSchema.index({ licensePlate: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ type: 1 });
vehicleSchema.index({ 'currentLocation.coordinates': '2dsphere' });
vehicleSchema.index({ assignedDriver: 1 });
vehicleSchema.statics.findByStatus = function (status) {
    return this.find({ status });
};
vehicleSchema.statics.findByType = function (type) {
    return this.find({ type });
};
vehicleSchema.statics.getFleetStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                active: {
                    $sum: {
                        $cond: [{ $eq: ['$status', types_1.VehicleStatus.ACTIVE] }, 1, 0]
                    }
                },
                inTransit: {
                    $sum: {
                        $cond: [{ $eq: ['$status', types_1.VehicleStatus.IN_TRANSIT] }, 1, 0]
                    }
                },
                maintenance: {
                    $sum: {
                        $cond: [{ $eq: ['$status', types_1.VehicleStatus.MAINTENANCE] }, 1, 0]
                    }
                }
            }
        }
    ]);
    return stats[0] || {
        total: 0,
        active: 0,
        inTransit: 0,
        maintenance: 0
    };
};
exports.Vehicle = mongoose_1.default.model('Vehicle', vehicleSchema);
//# sourceMappingURL=Vehicle.js.map