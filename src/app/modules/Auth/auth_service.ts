import config from "../../config";
import { httpStatus } from "../../config/status";
import AppError from "../../errors/AppError";
import { TUser } from "../User/user_interface";
import { User } from "../User/user_model";
import jwt from 'jsonwebtoken';


const loginUserFromDB = async (payload: TUser) => {
    
    const isUserExists = await User.findOne({email: payload.email});

    console.log(isUserExists);

    if(!isUserExists) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const isBlocked = isUserExists.isBlocked;

    if(isBlocked === true) {
        throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked !');
    }

    if(! await User.isPasswordMatched(payload?.password, isUserExists?.password))
        throw new AppError(httpStatus.UNAUTHORIZED, 'Password do not matched!');

    const jwtPayload = {
        useremail: isUserExists.email,
        role: isUserExists.role,
    };

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret as string,
        {expiresIn: '10d'}
    );

    return {accessToken};
}

export const AuthServices = {
    loginUserFromDB
}