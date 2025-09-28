import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError"
import { Wallet } from "./wallet.model"
import httpStatus from "http-status-codes";
import { Transaction } from "../transaction/transaction.model";
import { TransactionStatus, TransactionType } from "../transaction/transaction.interface";

const getMyWallet = async (userId: string) => {
 

  const wallet = await Wallet.findOne({ user: userId }).populate("user", "name email role");

  if (!wallet) {
    
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found ");
  }

  return wallet;
};


const deposit=async(userId:string , amount:number)=>{
  const session= await mongoose.startSession();
  session.startTransaction();

  try {

    const wallet =await Wallet.findOne({user:userId}).session(session);

    if(!wallet || wallet.status === "BLOCKED"){
      throw new AppError(httpStatus.FORBIDDEN,"Wallet not Accessible")
    }

    wallet.balance += amount;
    await wallet.save({session});

    await Transaction.create([
      {
        type:TransactionType.DEPOSIT,
        amount,
        from:userId,
        to:userId,
        status:TransactionStatus.COMPLETED
      },
    ],
    {session}
  );

  await session.commitTransaction();
  return{wallet,message:"Deposit successful"};
    
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }finally{
    session.endSession();
  }

}

const withDraw=async(userId:string , amount:number)=>{
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wallet= await Wallet.findOne({user:userId}).session(session);

    if(!wallet || wallet.status ==="BLOCKED"){
      throw new AppError(httpStatus.FORBIDDEN, "Wallet not accessible");
    }

    if(wallet.balance < amount){
      throw new AppError(httpStatus.BAD_REQUEST , "Insufficient balance");
    }

    wallet.balance -= amount;
    await wallet.save({session});

    await Transaction.create([
      {
        type:TransactionType.WITHDRAW,
        amount,
        from:userId,
        to:userId,
        status:TransactionStatus.COMPLETED
      }
    ],
  {session})

  await session.commitTransaction();

  return {wallet,message:"Withdraw successful"}

  } catch (error) {
    await session.abortTransaction();
    throw error
  }finally{
    session.endSession();
  }
}









export const WalletServices={
    getMyWallet,
    deposit,
    withDraw
}