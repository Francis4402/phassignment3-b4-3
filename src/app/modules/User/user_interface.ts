import { Model } from "mongoose";

export type TUser = {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(email: string): Promise<TUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}