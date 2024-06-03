import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleMongooseValidationError from "../errors/handlemongooseValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/appErrors";


const globalErrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
)  => {
  let statusCode =  500;
  let message =  "Something went wrong!";

  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleMongooseValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }else if ( err?.name === 'CastError'){
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }else if ( err?.code === 11000){
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }else if ( err instanceof AppError){
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [{
      path: '',
      message: err?.message
    }]
  }else if ( err instanceof Error){
    message = err?.message;
    errorSource = [{
      path: '',
      message: err?.message
    }]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorhandler;
