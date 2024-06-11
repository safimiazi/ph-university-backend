import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
    id: String;
    password: String;
    needsPasswordChange: Boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: Boolean;
}


export interface UserModel extends Model<TUser> {
isUserExistsByCustomId(id:string): Promise<TUser>
isPasswordMatch(userPass: string, hashingPass: string): Promise<boolean>
}



export type TUserRole = keyof typeof USER_ROLE;

