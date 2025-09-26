import { model, Schema } from "mongoose";
import { ITransaction, TransactionStatus, TransactionType } from "./transaction.interface";


const transactionSchema= new Schema<ITransaction>({
    type:{type:String , enum:Object.values(TransactionType), required:true},
    amount:{type:Number,required:true},
    from:{type:Schema.Types.ObjectId , ref:"User"},
    to:{type:Schema.Types.ObjectId, ref:"User"},
    status:{type:String , enum:Object.values(TransactionStatus), default:TransactionStatus.COMPLETED}
},{
    timestamps:true
})

export const Transaction=model<ITransaction>("Transaction",transactionSchema);