import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { semesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { facultyModel } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import QueryBuilder from "../../builder/queryBuilder";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistraion,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  // if semester registration id is exists:
  const isSemesterRegistrationExists =
    await semesterRegistrationModel.findById(semesterRegistraion);
  const academicSemester = isSemesterRegistrationExists?.academicSemester;
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester Registration not found");
  }

  // if academicFaculty id is exists:
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "academicDepartment not found");
  }

  // if course id is exists:
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // if faculty id is exists:
  const isfacultyExists = await facultyModel.findById(faculty);

  if (!isfacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "faculty not found");
  }

  // if academicFaculty id is exists:
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "academicFaculty not found");
  }

  //check if the department is belong to faculty:
  const isDepartmentBelongtoFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    academicDepartment,
  });
  if (isDepartmentBelongtoFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not belog to ${isAcademicFacultyExists.name}`
    );
  }

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({ semesterRegistraion, course, section });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course with same section is already exists!`
    );
  }

  //get the schedules of the faculties:
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistraion,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time! choose other time or date`
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  
  const modelQuery = OfferedCourse.find()
    .populate("semesterRegistraion")
    .populate("academicSemester")
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("course")
    .populate("faculty");

  const offeredCourseQuery = new QueryBuilder(modelQuery, query)
    .filter()
    .sort()
    .paginate()
    .fields();

    
  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id)
    .populate("semesterRegistraion")
    .populate("academicSemester")
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("course")
    .populate("faculty");
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Can not found this offered course"
    );
  }
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isFacultyExists = await facultyModel.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "faculty not found!");
  }

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course not found!");
  }

  const semesterRegistraion = isOfferedCourseExists?.semesterRegistraion;

  const semesterRegistraionStatus =
    await semesterRegistrationModel.findById(semesterRegistraion);
  if (semesterRegistraionStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course at it is ${semesterRegistraionStatus?.status}`
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistraion,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time! choose other time or date`
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, `offered course does not exists!`);
  }

  const semesterRegistraion = isOfferedCourseExists.semesterRegistraion;

  const semesterRegistraionStatus =
    await semesterRegistrationModel.findById(semesterRegistraion);
  if (semesterRegistraionStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `you can not delete offered course coause semester registration is not UPCOMING`
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};
export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};
