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
exports.orderServices = exports.createOrderIntoDB = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
//create a single Order
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield order_model_1.OrderModel.startSession();
    session.startTransaction();
    try {
        const product = yield product_model_1.ProductModel.findById(orderData.productId).session(session);
        if (!product) {
            throw new Error("Product not found");
        }
        if (product.inventory.quantity < orderData.quantity) {
            throw new Error("Insufficient stock");
        }
        product.inventory.quantity -= orderData.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save({ session });
        const order = new order_model_1.OrderModel(orderData);
        yield order.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return order;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.createOrderIntoDB = createOrderIntoDB;
//  Retrieve a List of All Orders
const getAllOrdersFromBD = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.OrderModel.find();
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
// Retrieve a single Order:
const getSignleOrderFromBD = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("email", email);
        const result = yield order_model_1.OrderModel.findOne({ email });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.orderServices = {
    createOrderIntoDB: exports.createOrderIntoDB,
    getAllOrdersFromBD,
    getSignleOrderFromBD,
};
