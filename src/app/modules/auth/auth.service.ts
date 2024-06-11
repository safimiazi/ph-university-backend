import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {

  //checking if the user is exist:
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  //checking if the user is already deleted:

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is already deleted");
  }
  //checking if the user is blocked:

  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is already blocked !");
  }
  //if password match:
  const isPasswordMatched = await User.isPasswordMatch(
    payload?.password,
    user?.password.toString()
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match!");
  }


//create token and sent to the client:
const jwtPayload = {
userId : user.id,
role: user.role}

const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
  expiresIn: '10d',
})



return {
  accessToken,
  needsPasswordChange: user?.needsPasswordChange
}

};

const changePasswordIntoDB =async (user: {userId: string, role: string}, payload) => {
const result = await User.findOneAndUpdate({
  id: user.userId,
  role: user.role,
})
}
 
export const authServices = {
  loginUser,changePasswordIntoDB
};
