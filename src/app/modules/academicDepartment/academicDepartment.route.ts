import express from "express";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import validateRequest from "../../middlwares/validateRequest";
import { academicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),
 academicDepartmentControllers.createAcademicDepartment
);
router.get("/", academicDepartmentControllers.getAllAcademicDepartment);
router.get("/:departmentId", academicDepartmentControllers.getSingleAcademicDepartment);
router.patch(
  "/:departmentId",
  validateRequest(academicDepartmentValidation.updatedAcademicDepartmentValidationSchema),
  academicDepartmentControllers.updateAcademicDepartment
);


export const AcademicDepartmentRoutes = router;

