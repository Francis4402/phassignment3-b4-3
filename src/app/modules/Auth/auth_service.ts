import { httpStatus } from "../../config/status";
import AppError from "../../errors/AppError";
import { User } from "../User/user_model";
import { TLoginUser, TRegisterUser } from "./auth_interface";


const loginUser = async (payload: TLoginUser) => {
    
    const isUserExists = await User.findOne({ id: payload?.email });
    
    console.log(isUserExists);

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
    }

    return {};
}

const registerUser = async (payload: TRegisterUser) => {
    console.log(payload);
    return {};
}

export const AuthServices = {
    loginUser, registerUser
}