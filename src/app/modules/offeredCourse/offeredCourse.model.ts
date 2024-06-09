import mongoose, { Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { days } from "./offeredCourse.constant";

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistraion: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SemesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicFaculty",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "academicDepartment",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    maxCapacity: {
      type: Number,
      default: 10,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [{
      type: String,
      enum: days,
    }],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OfferedCourse = mongoose.model<TOfferedCourse>(
  "OfferedCourse",
  offeredCourseSchema
);
