"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define Zod Schemas
const variantsZodSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string()
}).required();
const inventoryZodSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().nonnegative(),
    inStock: zod_1.z.boolean()
}).required();
const productZodSchema = zod_1.z.object({
    name: zod_1.z.string().max(33, "max length is 33 characters"),
    description: zod_1.z.string(),
    price: zod_1.z.number().nonnegative(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(variantsZodSchema),
    inventory: inventoryZodSchema
});
exports.default = productZodSchema;
