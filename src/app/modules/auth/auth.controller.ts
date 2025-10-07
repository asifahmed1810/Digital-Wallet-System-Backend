/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { Types } from "mongoose";


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const loginInfo = await AuthServices.credentialsLogin(req.body); 
  
    const userTokens = createUserTokens({
        _id:  new Types.ObjectId(loginInfo.userId),
        email: loginInfo.email,
        role: loginInfo.role
    });

   
    setAuthCookie(res, userTokens);

    
    const user = {
        email: loginInfo.email,
        role: loginInfo.role,
        _id: loginInfo.userId
    };

 
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: {
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
            user
        }
    });
});

export const AuthControllers = {
    credentialsLogin
};
