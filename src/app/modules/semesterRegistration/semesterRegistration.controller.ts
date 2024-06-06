import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester Registration succesfully",
        data: result,
      });
})

const updateSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await semesterRegistrationServices.updateSemesterRegistrationFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Semester Registration succesfully",
        data: result,
      });
})


const getAllSemesterRegistration =catchAsync(async(req, res)=>{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get All Semester Registration succesfully",
        data: result,
      });
})


const getSingleSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get single Semester Registration succesfully",
        data: result,
      });
})


export const semesterRegistrationControllers = {
createSemesterRegistration,
updateSemesterRegistration,
getAllSemesterRegistration,
getSingleSemesterRegistration
}



