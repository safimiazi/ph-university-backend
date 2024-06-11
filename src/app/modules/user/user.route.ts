import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "./user.constant";
const router = express.Router();



router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent
);

router.post("/create-faculty",auth(USER_ROLE.admin), validateRequest(createFacultyValidationSchema), userControllers.createFaculty)
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin,
);
export const userRoutes = router;
