/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TransactionServices } from "./transaction.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const getMyTransactions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await TransactionServices.getMyTransactions(
      req.user.id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Transaction retrieved successfully",
      data: transaction,
    });
  }
);

const getAllTransactions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const transactions = await TransactionServices.getAllTransactions();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All transactions retrieved successfully",
      data: transactions,
    });
  }
);


export const TransactionControllers={
    getMyTransactions,
    getAllTransactions
}