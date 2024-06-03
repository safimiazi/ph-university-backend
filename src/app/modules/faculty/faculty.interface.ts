import { Model, Types } from "mongoose";

export type TFacultyUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGender = "male" | "female" | "other";

 export type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TFacultyUserName;
  gender: TGender;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: Types.ObjectId;
  isDelete: boolean;
};



export interface FacultyModel extends Model<TFaculty> {
    isUserExists(id: string): Promise<TFaculty | null>;
  }

