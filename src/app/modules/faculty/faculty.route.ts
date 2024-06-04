import express from "express";
import { facultyControllers } from "./faculty.controller";
import validateRequest from "../../middlwares/validateRequest";
import { facultyValidatoins } from "./faculty.validation";

const router = express.Router();

router.get("/", facultyControllers.getAllFaculties);
router.get("/:id", facultyControllers.getSingleFaculty);
router.patch(
  "/:id",
  validateRequest(facultyValidatoins.updateFacultyValidationSchema),
  facultyControllers.updateSingleFaculty
);
router.delete("/:id", facultyControllers.deleteFaculty);

export const facultyRoutes = router;
