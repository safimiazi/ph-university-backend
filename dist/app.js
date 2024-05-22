"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./src/app/modules/product/product.route");
const order_route_1 = require("./src/app/modules/orders/order.route");
//parsers:
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', product_route_1.productRoutes);
app.use('/api', order_route_1.OrderRoutes);
exports.default = app;
