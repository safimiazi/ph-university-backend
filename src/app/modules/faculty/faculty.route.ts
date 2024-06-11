import express from "express";
import { facultyControllers } from "./faculty.controller";
import validateRequest from "../../middlwares/validateRequest";
import { facultyValidatoins } from "./faculty.validation";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", auth(USER_ROLE.admin), facultyControllers.getAllFaculties);
router.get("/:id", facultyControllers.getSingleFaculty);
router.patch(
  "/:id",
  validateRequest(facultyValidatoins.updateFacultyValidationSchema),
  facultyControllers.updateSingleFaculty
);
router.delete("/:id", facultyControllers.deleteFaculty);

export const facultyRoutes = router;
