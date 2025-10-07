import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
    }

    const jwtPayload = {
        userId: isUserExist._id.toString(),
        email: isUserExist.email,
        role: isUserExist.role,
    };

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES);

    return {
        userId: isUserExist._id.toString(),
        email: isUserExist.email,
        role: isUserExist.role,
        accessToken,
        refreshToken
    };
};

export const AuthServices = {
    credentialsLogin
};
