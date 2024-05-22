import { z } from "zod";

const OrderZodSchema = z.object({
  email: z.string().email(),
  productId: z
    .string()
    .regex(/^[a-f\d]{24}$/i, { message: "Invalid product ID" }),
  price: z.number().min(0),
  quantity: z.number().int().min(1),
});

export default OrderZodSchema;
