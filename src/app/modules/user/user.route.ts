import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
const router = express.Router();



router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent
);

router.post("/create-faculty", validateRequest(createFacultyValidationSchema), userControllers.createFaculty)

export const userRoutes = router;
