"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
// create a single product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.body;
        const zodParseProduct = product_validation_1.default.parse(product);
        const result = yield product_service_1.productServices.createProductIntoDB(zodParseProduct);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Product is created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error, // Only send the error message to the client, not the entire error object
        });
    }
});
//get all products:
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productServices.getAllProductsFromBD();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error,
        });
    }
});
//get single Product:
const getSignleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        console.log(id);
        const result = yield product_service_1.productServices.getSignleProductFromBD(id);
        res.status(200).json({
            success: true,
            message: "product retrieve successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error,
        });
    }
});
//update a single product:
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.body;
        const id = req.params.productId;
        const zodParseProduct = product_validation_1.default.parse(product);
        const result = yield product_service_1.productServices.updateSignleProductFromBD(id, zodParseProduct);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Product is updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error, // Only send the error message to the client, not the entire error object
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.productServices.deleteProductFromDB(id);
        res.status(200).json({
            success: true,
            message: "product delete successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error,
        });
    }
});
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                message: "Search term is required",
            });
        }
        const products = yield product_service_1.productServices.searchProduct(searchTerm);
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products",
            error: error,
        });
    }
});
exports.productControllers = {
    createProduct,
    getAllProducts,
    getSignleProduct,
    updateSingleProduct,
    deleteProduct,
    searchProducts,
};
