import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { facultySearchableFields } from "../student/student.constant";
import { TFaculty } from "./faculty.interface";
import { facultyModel } from "./faculty.model";
import AppError from "../../errors/appErrors";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  //   const queryObj = { ...query };
  //   let searchTerm = "";
  //   if (query?.searchTerm) {
  //     searchTerm = query?.searchTerm as string;
  //   }

  //   const searchQuery = facultyModel.find({
  //     $or: facultySearchableFields.map((field) => ({
  //       [field]: { $regex: searchTerm, $options: "i" },
  //     })),
  //   });

  //   //filtering
    // const excludeFields = ["searchTerm", "sort", "limit", "page", 'fields'];
  //   excludeFields.forEach((el) => delete queryObj[el]);

  //   const filterQuery = searchQuery.find(queryObj).populate("academicDepartment");

  //   //sorting
  //   let sort = "-createdAt";
  //   if (query?.sort) {
  //     sort = query.sort as string;
  //   }
  //   const sortQuery = filterQuery.sort(sort);

  //   //limit and pagination:
  //   let page = 1;
  //   let limit = 10;
  //   let skip = 0;

  //   if (query?.limit) {
  //     limit = Number(query?.limit);
  //   }

  //   if (query.page) {
  //     page = Number(query.page);
  //     skip = (page - 1) * limit;
  //   }

  //   const paginationQuery = sortQuery.skip(skip);
  //   const limitQuery = paginationQuery.limit(limit);

  //   //fields query:

  //   let fields = "-__v";

  //   if (query.fields) {
  //     fields = (query?.fields as string).split(",").join(" ");
  //   }

  //   const fieldQuery = await limitQuery.select(fields);

  //     return fieldQuery;

  //using class:
  const modelQuery = facultyModel.find().populate("academicDepartment");

  const facultyQuery = new QueryBuilder(modelQuery, query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = (id: string) => {
  const result = facultyModel.findById(id).populate("academicDepartment");
  return result;
};

const updateSingleFacultyIntoDB = async (
  id: string,
  payload: Partial<TFaculty>
) => {
  const { name, ...remainingData } = payload;

  let modifiedData: Record<string, unknown> = { ...remainingData };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await facultyModel.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const deleteFaculty = await facultyModel.findByIdAndUpdate(
     id,
      { isDelete: true },
      { new: true, session }
    );
    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }

    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const facultiesServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyIntoDB,
  deleteFacultyFromDB,
};
