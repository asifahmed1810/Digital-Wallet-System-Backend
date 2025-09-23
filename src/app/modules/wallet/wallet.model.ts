import { model, Schema } from "mongoose";
import { IWallet, Wallet_Status } from "./wallet.interface";

const walletSchema=new Schema<IWallet>({
    user:{type:Schema.Types.ObjectId , ref:"User", required:true , unique:true},
    balance:{type:Number , default:Number(50)},
    status:{type:String , enum:Object.values(Wallet_Status),
        default:Wallet_Status.ACTIVE 
    }
},{
    timestamps:true
})




export const Wallet=model<IWallet>("Wallet",walletSchema)