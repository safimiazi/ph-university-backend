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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("./product.model");
//create a single product
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.ProductModel.create(product);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
//  Retrieve a List of All Products
const getAllProductsFromBD = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.ProductModel.find();
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
// Retrieve a single product:
const getSignleProductFromBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.ProductModel.findOne({ _id: id });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const updateSignleProductFromBD = (id, updatedProduct) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.ProductModel.findByIdAndUpdate(id, updatedProduct);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("id", id);
        const objectId = new mongoose_1.Types.ObjectId(id);
        const result = yield product_model_1.ProductModel.updateOne({ _id: objectId }, { $set: { isDelete: true } });
        return result;
    }
    catch (error) {
        console.log(error);
        return null; // Return null in case of error
    }
});
const searchProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("object", searchTerm);
        const products = yield product_model_1.ProductModel.find({
            name: { $regex: searchTerm, $options: "i" },
            isDelete: false,
        });
        return products;
    }
    catch (error) {
        console.log(error);
    }
});
exports.productServices = {
    createProductIntoDB,
    getAllProductsFromBD,
    getSignleProductFromBD,
    updateSignleProductFromBD,
    deleteProductFromDB,
    searchProduct,
};
