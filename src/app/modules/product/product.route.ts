import express from "express";
import { productControllers } from "./product.controller";
const router = express.Router();

//will call controller function:
router.post("/products", productControllers.createProduct);
router.get("/products", productControllers.getAllProducts);
router.get("/products/:productId", productControllers.getSignleProduct);
router.put("/products/:productId", productControllers.updateSingleProduct);
router.delete("/products/:productId", productControllers.deleteProduct);
router.get("/searchproduct", productControllers.searchProducts);

export const productRoutes = router;
