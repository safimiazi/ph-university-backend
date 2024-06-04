import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
const router = express.Router();



router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent
);

router.post("/create-faculty", validateRequest(createFacultyValidationSchema), userControllers.createFaculty)
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin,
);
export const userRoutes = router;
