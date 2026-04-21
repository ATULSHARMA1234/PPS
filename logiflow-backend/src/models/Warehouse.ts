import mongoose, { Schema, Document } from 'mongoose';

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

const warehouseSchema = new Schema<IWarehouseDocument>({
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
    transform: function(doc, ret) {
      return ret;
    }
  }
});

// Indexes for performance
warehouseSchema.index({ name: 1 });
warehouseSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });
warehouseSchema.index({ capacity: 1 });
warehouseSchema.index({ currentUtilization: 1 });

// Static method to get warehouses by availability
warehouseSchema.statics.findByAvailability = function(minCapacity: number) {
  return this.find({
    capacity: { $gte: minCapacity },
    currentUtilization: { $lt: 90 } // Less than 90% utilized
  });
};

// Static method to get warehouse statistics
warehouseSchema.statics.getWarehouseStats = async function() {
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

export const Warehouse = mongoose.model<IWarehouseDocument>('Warehouse', warehouseSchema);
