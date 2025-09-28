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


const deposit=catchAsync(async(req:Request , res:Response , next:NextFunction)=>{
    const {amount}=req.body;
    const result=await WalletServices.deposit(req.user.id , amount)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Transaction successful",
        data:result
    })
})

const withDraw=catchAsync(async(req:Request , res:Response , next:NextFunction)=>{
    const {amount}=req.body;
    const result=await WalletServices.withDraw(req.user.id , amount);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Balance withdraw successfully",
        data:result
    })
})

const sendMoney=catchAsync(async(req:Request , res:Response , next:NextFunction)=>{
    const {toUserId , amount}=req.body;
    const result=await WalletServices.sendMoney(req.user.id , toUserId , amount)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Transfer successful",
        data:result
    })
})



export const WalletControllers={
    getMyWallet,
    deposit,
    withDraw,
    sendMoney
}