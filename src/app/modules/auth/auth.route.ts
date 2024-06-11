import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { authValidation } from "./auth.validation";
import { authControllers } from "./auth.controller";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authControllers.loginUser
);
router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(authValidation.changePasswordValidationSchema),
  authControllers.changePassword
);


export const authRoutes = router;
