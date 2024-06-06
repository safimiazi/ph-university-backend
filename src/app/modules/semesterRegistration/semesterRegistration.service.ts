import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { AcademicSemester } from "../academicSemester/accademicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationModel } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/queryBuilder";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {

//check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
const isThereAnyUpcomingOrOgoingSemester = await semesterRegistrationModel.findOne({
    $or: [{status: 'UPCOMING'}, {status: 'ONGOING'}],
})
if(isThereAnyUpcomingOrOgoingSemester){
    throw new AppError(
        httpStatus.BAD_REQUEST, `There is already a ${isThereAnyUpcomingOrOgoingSemester.status} registered semester`
    )
}

  const academicSemester = payload?.academicSemester;
  //check if semester is exist:
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found!"
    );
  }

  //check if the semester registration is exsits:
  const isSemesterRegistrationExists = await semesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered!"
    );
  }

  const result = await semesterRegistrationModel.create(payload);
  return result;
};

const updateSemesterRegistrationFromDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
 //check if the semester registration is exsits:
 const isSemesterExists = await semesterRegistrationModel.findById(id);
 if (!isSemesterExists) {
   throw new AppError(
     httpStatus.BAD_REQUEST,
     "This semester is not exists!"
   );
 }

//if requested semester registration is ended, we will not updated anything
const requestedSemesterStatus = isSemesterExists.status;
if(requestedSemesterStatus === 'ENDED'){
throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${requestedSemesterStatus}`)
}

 



};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    semesterRegistrationModel.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB =async (id: string) => {
    const result = await semesterRegistrationModel.findById(id);
    return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  updateSemesterRegistrationFromDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
};
