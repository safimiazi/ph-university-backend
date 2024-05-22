"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderZodSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z
        .string()
        .regex(/^[a-f\d]{24}$/i, { message: "Invalid product ID" }),
    price: zod_1.z.number().min(0),
    quantity: zod_1.z.number().int().min(1),
});
exports.default = OrderZodSchema;
