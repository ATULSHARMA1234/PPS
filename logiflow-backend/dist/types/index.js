"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Priority = exports.ShipmentStatus = exports.VehicleStatus = exports.VehicleType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MANAGER"] = "manager";
    UserRole["DRIVER"] = "driver";
    UserRole["CUSTOMER"] = "customer";
})(UserRole || (exports.UserRole = UserRole = {}));
var VehicleType;
(function (VehicleType) {
    VehicleType["TRUCK"] = "Truck";
    VehicleType["VAN"] = "Van";
    VehicleType["AIRCRAFT"] = "Aircraft";
    VehicleType["CARGO_SHIP"] = "Cargo Ship";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
var VehicleStatus;
(function (VehicleStatus) {
    VehicleStatus["ACTIVE"] = "Active";
    VehicleStatus["IN_TRANSIT"] = "In Transit";
    VehicleStatus["MAINTENANCE"] = "Maintenance";
})(VehicleStatus || (exports.VehicleStatus = VehicleStatus = {}));
var ShipmentStatus;
(function (ShipmentStatus) {
    ShipmentStatus["PENDING"] = "Pending";
    ShipmentStatus["IN_TRANSIT"] = "In Transit";
    ShipmentStatus["DELIVERED"] = "Delivered";
    ShipmentStatus["DELAYED"] = "Delayed";
})(ShipmentStatus || (exports.ShipmentStatus = ShipmentStatus = {}));
var Priority;
(function (Priority) {
    Priority["LOW"] = "Low";
    Priority["MEDIUM"] = "Medium";
    Priority["HIGH"] = "High";
    Priority["URGENT"] = "Urgent";
})(Priority || (exports.Priority = Priority = {}));
//# sourceMappingURL=index.js.map