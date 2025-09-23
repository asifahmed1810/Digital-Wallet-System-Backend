/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { WalletServices } from "./wallet.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const getMyWallet =catchAsync(async(req:Request , res:Response , next:NextFunction)=>{
    
    const userId=req.user.id;
    const wallet= await WalletServices.getMyWallet(userId);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Wallet retrieved successfully",
        data:wallet
    })

})



export const WalletControllers={
    getMyWallet
}