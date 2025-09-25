import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError"
import { Wallet } from "./wallet.model"
import httpStatus from "http-status-codes";

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

    

    
  } catch (error) {
    
  }

}









export const WalletServices={
    getMyWallet
}