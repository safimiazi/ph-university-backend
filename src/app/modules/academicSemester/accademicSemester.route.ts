import express from "express";
import { AcademicSemesterControllers } from "./accademicSemester.controller";
import validateRequest from "../../middlwares/validateRequest";
import { AcademicSemesterValidations } from "./accademicSemester.validation";
const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);
router.get(
  "/:id",
  AcademicSemesterControllers.getSingleAcademicSemester
);

router.patch(
  "/:id",
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
);

router.get("/", AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;
