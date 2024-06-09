import { Types } from "mongoose";

export type days = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type TOfferedCourse = {
    semesterRegistraion: Types.ObjectId;
    academicSemester?: Types.ObjectId;
    academicFaculty:Types.ObjectId;
    academicDepartment: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    maxCapacity:number;
    section: number;
    days: days[];
    startTime: string;
    endTime: string;
}

export type TSchedule = {
    days: days[];
    startTime: string;
    endTime: string;
  };
  