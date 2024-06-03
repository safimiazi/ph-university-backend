import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import httpStatus from "http-status";
import AppError from "../../errors/appErrors";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "academicFaculty",
    },
  },
  {
    timestamps: true,
  }
);



academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND,"this is already exist");
  }

  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const id = this.getQuery();
  console.log(id);

  const isDepartmentExist = await AcademicDepartment.findOne(id);

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This department does not exist.");
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "academicDepartment",
  academicDepartmentSchema
);
