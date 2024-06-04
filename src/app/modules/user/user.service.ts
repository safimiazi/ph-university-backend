import config from "../../config";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/accademicSemester.model";
import { generateNewFacultyId, generateStudentId } from "./user.utils";
import mongoose from "mongoose";
import AppError from "../../errors/appErrors";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { facultyModel } from "../faculty/faculty.model";

const createStudentIntoDB = async (password: String, studentData: TStudent) => {
  const { email } = studentData;

  // Check if a student with the given email already exists
  const studentExist = await Student.findOne({ email });
  console.log("studentexist", studentExist);

  if (studentExist) {
    throw new Error("Student already exists");
  }

  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given, use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set generated id
    if (admissionSemester !== null) {
      userData.id = await generateStudentId(admissionSemester);
    } else {
      console.error("Admission semester not found");
    }
    //create user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id; //refferance id

    //create student (transaction-2)

    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyIntoDb = async (password: string, facultyData: TFaculty) => {
  const { email } = facultyData;

  // Check if a faculty with the given email already exists
  const facultyExist = await facultyModel.findOne({ email });
  if (facultyExist) {
    throw new Error("Faculy is already exist!");
  }

  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = "faculty";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateNewFacultyId();

    //transection-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    facultyData.id = newUser[0].id;
    facultyData.user = newUser[0]._id;

    //create faculty transaction-2:
    const newFaculty = await facultyModel.create([facultyData], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};



const createAdminIntoDB = async (password: string, payload: TFaculty) => {
};



export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDb,createAdminIntoDB
};
