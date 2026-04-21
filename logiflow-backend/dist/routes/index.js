"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const basic_auth_1 = __importDefault(require("./basic-auth"));
const fleet_1 = __importDefault(require("./fleet"));
const warehouse_1 = __importDefault(require("./warehouse"));
const router = (0, express_1.Router)();
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is healthy',
        timestamp: new Date().toISOString(),
    });
});
router.use('/auth', basic_auth_1.default);
router.use('/fleet', fleet_1.default);
router.use('/warehouse', warehouse_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map