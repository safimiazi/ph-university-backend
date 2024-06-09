import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is created successfully",
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.getAllOfferedCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is get successfully",
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "single Offered Course is get successfully",
    data: result,
  });
});


const deleteOfferedCourse = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await offeredCourseServices.deleteOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is deleted successfully",
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
const {id} = req.params;
const result = await offeredCourseServices.updateOfferedCourseIntoDB(id, req.body)
sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: "Offered Course is updated successfully",
  data: result,
});
});

export const offeredCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  updateOfferedCourse,
  getSingleOfferedCourse,
  deleteOfferedCourse
};
