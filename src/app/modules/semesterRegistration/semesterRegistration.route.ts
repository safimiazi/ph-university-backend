import express from "express";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import validateRequest from "../../middlwares/validateRequest";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";
const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidation
  ),
  semesterRegistrationControllers.createSemesterRegistration
);
router.get(
  "/:id",
  semesterRegistrationControllers.getSingleSemesterRegistration
);

router.patch(
  "/:id",
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidation
  ),
  semesterRegistrationControllers.updateSemesterRegistration
);

router.get("/", semesterRegistrationControllers.getAllSemesterRegistration);
router.delete("/:id", semesterRegistrationControllers.deleteSemesterRegistration);

export const semesterRegistrationRoutes = router;
