import { Types } from "mongoose";


export enum Wallet_Status{
    ACTIVE="ACTIVE",
    BLOCKED="BLOCKED"
}

export interface IWallet{
    user:Types.ObjectId,
    balance:number,
    status:Wallet_Status,
}