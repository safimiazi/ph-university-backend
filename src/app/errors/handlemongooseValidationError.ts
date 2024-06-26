import mongoose, {  CastError } from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";



const handleMongooseValidationError = (err: mongoose.Error.ValidationError) : TGenericErrorResponse => {
  const errorSource: TErrorSource = Object.values(err.errors).map((value ) => {
    return {
      path: value.path,
      message: value.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSource,
  };
};

export default handleMongooseValidationError;