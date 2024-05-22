"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// Define the routes and connect to the controller functions
router.post("/order", order_controller_1.orderController.createOrder);
router.get("/getorders", order_controller_1.orderController.getAllOrders);
router.get("/getsingleorder", order_controller_1.orderController.getSingleOrder);
exports.OrderRoutes = router;
