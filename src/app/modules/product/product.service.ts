import { Types } from "mongoose";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

//create a single product
const createProductIntoDB = async (product: TProduct) => {
  try {
    const result = await ProductModel.create(product);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//  Retrieve a List of All Products

const getAllProductsFromBD = async () => {
  try {
    const result = await ProductModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// Retrieve a single product:

const getSignleProductFromBD = async (id: string) => {
  try {
    const result = await ProductModel.findOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateSignleProductFromBD = async (
  id: string,
  updatedProduct: TProduct,
) => {
  try {
    const result = await ProductModel.findByIdAndUpdate(id, updatedProduct);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteProductFromDB = async (id: string) => {
  try {
    console.log("id", id);
    const objectId = new Types.ObjectId(id);
    const result = await ProductModel.updateOne(
      { _id: objectId },
      { $set: { isDelete: true } },
    );
    return result;
  } catch (error) {
    console.log(error);
    return null; // Return null in case of error
  }
};

const searchProduct = async (searchTerm: string) => {
  try {
    console.log("object", searchTerm);
    const products = await ProductModel.find({
      name: { $regex: searchTerm, $options: "i" },
      isDelete: false,
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromBD,
  getSignleProductFromBD,
  updateSignleProductFromBD,
  deleteProductFromDB,
  searchProduct,
};
