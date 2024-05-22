import { ProductModel } from "../product/product.model";
import { TOrders } from "./order.interface";
import { OrderModel } from "./order.model";

//create a single Order
export const createOrderIntoDB = async (
  orderData: TOrders,
): Promise<TOrders> => {
  const session = await OrderModel.startSession();
  session.startTransaction();
  try {
    const product = await ProductModel.findById(orderData.productId).session(
      session,
    );

    if (!product) {
      throw new Error("Product not found");
    }

    if (
      (product.inventory.quantity as number) < (orderData.quantity as number)
    ) {
      throw new Error("Insufficient stock");
    }

    (product.inventory.quantity as number) -= orderData.quantity;
    product.inventory.inStock = (product.inventory.quantity as number) > 0;

    await product.save({ session });

    const order = new OrderModel(orderData);
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();
    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

//  Retrieve a List of All Orders

const getAllOrdersFromBD = async () => {
  try {
    const result = await OrderModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// Retrieve a single Order:

const getSignleOrderFromBD = async (email: string) => {
  try {
    console.log("email", email);
    const result = await OrderModel.findOne({ email });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromBD,
  getSignleOrderFromBD,
};
