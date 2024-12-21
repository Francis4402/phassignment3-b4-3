import { Types } from "mongoose";
import config from "../../config";
import { TUser } from "./user_interface";
import { User } from "./user_model"

const createUserIntoDB = async (payload: Partial<TUser>): Promise<TUser> => {

    payload.password = payload.password || (config.default_pass as string);
  
    payload.role = payload.role || "user";
  
    const result = await User.create(payload);
  
    return result;
};

const findUserById = async (userId: Types.ObjectId) => {
    const user = await User.findById(userId);
    return user;
};


export const UserServices = {
    createUserIntoDB, findUserById
}