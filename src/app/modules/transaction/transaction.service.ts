import AppError from "../../errorHelpers/AppError"
import { Transaction } from "./transaction.model"
import httpStatus from "http-status-codes";

const getMyTransactions=async(userId:string)=>{
    const transactions= await Transaction.find({
        $or:[{from:userId} , {to:userId}],
    })
    .populate("from" , "name email")
    .populate("to" , "name email")
    .sort({createdAt:-1})

    if(!transactions){
        throw new AppError(httpStatus.NOT_FOUND , "No transaction found")
    }

    return transactions;


}

const getAllTransactions =async()=>{
    const transactions=await Transaction.find()
    .populate("from", "name email")
    .populate("to", "name email")
    .sort({createdAt:-1})

    return transactions;
}



export const TransactionServices={
    getMyTransactions,
    getAllTransactions

}