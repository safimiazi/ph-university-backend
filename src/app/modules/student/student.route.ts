import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/:id", StudentControllers.getSingleStudent);

router.delete("/:id", StudentControllers.deleteStudent);
router.patch(
  "/:id",
  validateRequest(studentValidations.updateStudentValidationSchema),

  StudentControllers.updatedStudent
);

router.get("/", StudentControllers.getAllStudents);

export const StudentRoutes = router;
