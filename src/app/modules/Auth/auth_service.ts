import config from "../../config";
import { httpStatus } from "../../config/status";
import AppError from "../../errors/AppError";
import { TUser } from "../User/user_interface";
import { User } from "../User/user_model";
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TUser) => {
    
    const user = await User.isUserExistsByCustomId(payload.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
    }
    
    if (payload?.isBlocked === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked!');
    }

    if(! await User.isPasswordMatched(payload?.password, user?.password))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');

    const jwtPayload = {
        useremail: user.email,
        role: user.role,
    };

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret as string,
        {expiresIn: '10d'}
    );

    return {
        accessToken,
    };
}

export const AuthServices = {
    loginUser
}