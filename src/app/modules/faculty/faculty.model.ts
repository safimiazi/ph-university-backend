import { Schema, model } from "mongoose";
import { TFaculty, TFacultyUserName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";

const userNameSchema = new Schema<TFacultyUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
    trim: true,
    maxlength: [20, "First Name can not be more than 20 characters!"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required!"],
    maxlength: [20, "Last Name can not be more than 20 characters!"],
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is Required"],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "Email is requird"],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is Required"],
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: "{VALUE} is not a valid blood group",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    profileImg: {
      type: String,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "academic department is required"],
      ref: "academicDepartment",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

facultySchema.virtual("fullName").get(function () {
  return (
    this.name?.firstName + "" + this.name?.middleName + "" + this.name?.lastName
  );
});

facultySchema.pre("find", function (next) {
  this.find({ isDelete: { $ne: true } });

  next();

});
facultySchema.pre("findOne", function (next) {
  this.find({ isDelete: { $ne: true } });

  next();

});

export const facultyModel = model<TFaculty>("Faculty", facultySchema);
