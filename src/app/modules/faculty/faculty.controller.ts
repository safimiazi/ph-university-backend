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
});


const getSingleFaculty = catchAsync(async(req, res)=> {
    const {id} = req.params;
    const result = await facultiesServices.getSingleFacultyFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message:"Faculty is retrieved successfully",
        data: result 
    })
})


const updateSingleFaculty = catchAsync(async(req, res)=> {
    const {id} = req.params;
    const {faculty} = req.body;

    const result = await facultiesServices.updateSingleFacultyIntoDB(id, faculty);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `${id} faculty is updated successfully`,
        data: result
    })
})

const deleteFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await facultiesServices.deleteFacultyFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty is deleted succesfully",
      data: result,
    });
  });


export const facultyControllers = {
    getAllFaculties,getSingleFaculty,updateSingleFaculty,deleteFaculty
}