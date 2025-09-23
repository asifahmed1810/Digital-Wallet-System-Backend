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









export const WalletServices={
    getMyWallet
}