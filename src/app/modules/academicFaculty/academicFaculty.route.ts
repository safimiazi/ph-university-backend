import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { academicValidation } from "./academicFaculty.validation";
import { academicControllers } from "./academicFaculty.controller";
const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(academicValidation.academicFacultyValidationSchema),
  academicControllers.createAcademicFaculty
);
router.get("/", academicControllers.getAllAcademicFaculty);
router.get("/:id", academicControllers.getSingleAcademicFaculty);
router.patch(
  "/:id",
  validateRequest(academicValidation.academicFacultyValidationSchema),
  academicControllers.updateAcademicFaculty
);


export const AcademicFacultyRoutes = router;

