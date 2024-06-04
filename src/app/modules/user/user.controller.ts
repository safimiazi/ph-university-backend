import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  // const zodParseData = studentValidationSchema.parse(student)
  const result = await UserService.createStudentIntoDB(password, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});


const createFaculty = catchAsync(async(req, res)=> {
  const {password, faculty} = req.body;
  console.log("faculty", password, faculty)
  const result = await UserService.createFacultyIntoDb(password, faculty);
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result
  })
})



const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});






export const userControllers = {
  createStudent,createFaculty,createAdmin
};
