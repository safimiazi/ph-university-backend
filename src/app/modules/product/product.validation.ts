import { z } from "zod";

// Define Zod Schemas
const variantsZodSchema = z
  .object({
    type: z.string(),
    value: z.string(),
  })
  .required();

const inventoryZodSchema = z
  .object({
    quantity: z.number().int().nonnegative(),
    inStock: z.boolean(),
  })
  .required();

const productZodSchema = z.object({
  name: z.string().max(33, "max length is 33 characters"),
  description: z.string(),
  price: z.number().nonnegative(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantsZodSchema),
  inventory: inventoryZodSchema,
  isDelete: z.boolean().optional(),
});

export default productZodSchema;
