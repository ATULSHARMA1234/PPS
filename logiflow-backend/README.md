# LogiFlow Backend API

Backend API for LogiFlow logistics platform built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Fleet Management**: Real-time vehicle tracking and management
- **User Authentication**: JWT-based authentication with role-based access control
- **Real-time Communication**: WebSocket support for live updates
- **RESTful API**: Comprehensive API endpoints for all logistics operations
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis for session storage and performance optimization

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Cache**: Redis
- **Authentication**: JWT tokens
- **Real-time**: Socket.io
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate limiting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis (optional, for caching)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## API Endpoints

### Health Check
- `GET /health` - Server health status
- `GET /api` - API information
- `GET /api/health` - API health status

### Fleet Management
- `GET /api/fleet/vehicles` - Get all vehicles
- `GET /api/fleet/vehicles/:id` - Get vehicle by ID
- `POST /api/fleet/vehicles` - Create new vehicle
- `PUT /api/fleet/vehicles/:id` - Update vehicle
- `PUT /api/fleet/vehicles/:id/location` - Update vehicle location
- `GET /api/fleet/stats` - Get fleet statistics
- `GET /api/fleet/vehicles/status/:status` - Get vehicles by status
- `GET /api/fleet/vehicles/type/:type` - Get vehicles by type

### Authentication (Coming Soon)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/profile` - Get user profile

## WebSocket Events

### Fleet Tracking
- `join-fleet-tracking` - Join fleet tracking room
- `vehicle:location:update` - Vehicle location updates
- `vehicle:status:change` - Vehicle status changes

### Shipment Tracking
- `join-shipment-tracking` - Join shipment tracking room
- `shipment:status:update` - Shipment status updates

## Data Models

### Vehicle
```typescript
{
  vehicleId: string;        // Format: XXX-123
  type: VehicleType;        // Truck, Van, Aircraft, Cargo Ship
  licensePlate: string;
  make: string;
  vehicleModel: string;
  year: number;
  status: VehicleStatus;   // Active, In Transit, Maintenance
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
  assignedDriver?: ObjectId;
}
```

### User
```typescript
{
  email: string;
  passwordHash: string;
  role: UserRole;          // admin, manager, driver, customer
  firstName: string;
  lastName: string;
  phone: string;
  profile: {
    avatar?: string;
    department?: string;
    permissions: string[];
  };
}
```

## Environment Variables

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/logiflow

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Redis Configuration
REDIS_URL=redis://localhost:6379

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Project Structure

```
src/
  config/           # Database and Redis configuration
  controllers/      # Route controllers
  middleware/       # Custom middleware
  models/          # Mongoose models
  routes/          # API routes
  services/        # Business logic
  utils/           # Utility functions
  types/           # TypeScript type definitions
  websocket/       # Socket.io handlers
```

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building
```bash
npm run build
```

### Watching for Changes
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC
