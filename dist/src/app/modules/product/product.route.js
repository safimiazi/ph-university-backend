"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
//will call controller function:
router.post("/products", product_controller_1.productControllers.createProduct);
router.get("/products", product_controller_1.productControllers.getAllProducts);
router.get("/products/:productId", product_controller_1.productControllers.getSignleProduct);
router.put("/products/:productId", product_controller_1.productControllers.updateSingleProduct);
router.delete("/products/:productId", product_controller_1.productControllers.deleteProduct);
router.get("/searchproduct", product_controller_1.productControllers.searchProducts);
exports.productRoutes = router;
