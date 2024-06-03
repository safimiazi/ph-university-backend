import express from "express";
import { facultyControllers } from "./faculty.controller";
import validateRequest from "../../middlwares/validateRequest";
import { facultyValidatoins } from "./faculty.validation";

const router = express.Router();

router.get("/", facultyControllers.getAllFaculties);
router.get("/:facultyId", facultyControllers.getSingleFaculty);
router.patch(
  "/:facultyId",
  validateRequest(facultyValidatoins.updateFacultyValidationSchema),
  facultyControllers.updateSingleFaculty
);
router.delete("/:facultyId", facultyControllers.deleteFaculty);

export const facultyRoutes = router;
