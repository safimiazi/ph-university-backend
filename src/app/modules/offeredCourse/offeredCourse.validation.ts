import { string, z } from "zod";
import { days } from "./offeredCourse.constant";
import AppError from "../../errors/appErrors";
import httpStatus from "http-status";
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const timeSchema = z.string().refine((time) => timeRegex.test(time), {
  message: "Invalid time format. Expected HH:MM",
});

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistraion: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...days] as [string, ...string[]])),
      startTime: timeSchema,
      endTime: timeSchema,
    })
    .refine((body) => {
      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);
      if (start > end) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Start time should be before end time"
        );
      }
      return true;
    }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...days] as [string, ...string[]])),
      startTime: timeSchema,
      endTime: timeSchema,
    })
    .refine((body) => {
      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);
      if (start > end) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Start time should be before end time"
        );
      }
      return true;
    }),
});

export const offeredCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
