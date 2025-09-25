import mongoose from "mongoose";


export enum TransactionStatus {
    PENDING="PENDING",
    COMPLETED="COMPLETED",
    REVERSED="REVERSED"
}


export enum TransactionType{
    DEPOSIT="DEPOSIT",
    WITHDRAW="WITHDRAW",
    TRANSFER="TRANSFER"

}


export interface ITransaction {
    type:TransactionType,
    amount:number,
    from:mongoose.Types.ObjectId,
    to:mongoose.Types.ObjectId,
    status:TransactionStatus
}