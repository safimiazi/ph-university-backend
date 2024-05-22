"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const variantsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [variantsSchema],
        required: true,
    },
    inventory: {
        type: inventorySchema,
        required: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
        required: false,
    },
});
//query middleware:
productSchema.pre("find", function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
productSchema.pre("findOne", function (next) {
    this.findOne({ isDelete: { $ne: true } });
    next();
});
exports.ProductModel = (0, mongoose_1.model)("product", productSchema);
