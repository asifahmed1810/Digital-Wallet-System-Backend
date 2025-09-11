import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth=(...authRoles:string[])=>async(req:Request , res:Response,next:NextFunction)=>{
    try {
        const accessToken=req.headers.authorization;

        if(!accessToken){
            throw new AppError(httpStatus.BAD_REQUEST , "No token received")
        }

        const verifiedToken= verifyToken(accessToken ,envVars.JWT_ACCESS_SECRET) as JwtPayload;

        if(!authRoles.includes(verifiedToken.role)){
            throw new AppError(httpStatus.BAD_REQUEST , "You are not permitted to view this route")
        }

        req.user=verifiedToken;

        next()

    } catch (error) {
        console.log("JWT error", error);
        next(error)
    }
}