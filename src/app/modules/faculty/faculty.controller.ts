import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultiesServices } from "./faculty.service";

const getAllFaculties = catchAsync(async(req, res)=> {
    const result = await facultiesServices.getAllFacultiesFromDB(req.query);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message:"Faculties is retrieved successfully",
        data: result
      })
})


export const facultyControllers = {
    getAllFaculties,
}