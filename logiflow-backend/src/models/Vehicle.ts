import mongoose, { Schema, Document } from 'mongoose';
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

const vehicleSchema = new Schema<IVehicleDocument>({
  vehicleId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    match: [/^[A-Z]{3}-\d{3}$/, 'Vehicle ID must be in format XXX-123']
  },
  type: {
    type: String,
    enum: Object.values(VehicleType),
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
    enum: Object.values(VehicleStatus),
    default: VehicleStatus.ACTIVE,
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      return ret;
    }
  }
});

// Indexes for performance
vehicleSchema.index({ vehicleId: 1 });
vehicleSchema.index({ licensePlate: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ type: 1 });
vehicleSchema.index({ 'currentLocation.coordinates': '2dsphere' });
vehicleSchema.index({ assignedDriver: 1 });

// Static method to find vehicles by status
vehicleSchema.statics.findByStatus = function(status: VehicleStatus) {
  return this.find({ status });
};

// Static method to find vehicles by type
vehicleSchema.statics.findByType = function(type: VehicleType) {
  return this.find({ type });
};

// Static method to get fleet statistics
vehicleSchema.statics.getFleetStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        active: {
          $sum: {
            $cond: [{ $eq: ['$status', VehicleStatus.ACTIVE] }, 1, 0]
          }
        },
        inTransit: {
          $sum: {
            $cond: [{ $eq: ['$status', VehicleStatus.IN_TRANSIT] }, 1, 0]
          }
        },
        maintenance: {
          $sum: {
            $cond: [{ $eq: ['$status', VehicleStatus.MAINTENANCE] }, 1, 0]
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

export const Vehicle = mongoose.model<IVehicleDocument>('Vehicle', vehicleSchema);
