import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";


const authProviderSchema=new Schema<IAuthProvider>({
    provider:{type:String, required:true},
    providerId:{type:String,required:true}
},
{
    versionKey:false,
    _id:false
}
)


const userSchema=new Schema<IUser>({
    name:{type:String , required:true},
    email:{type:String, required:true , unique:true},
    password:{type:String},
    phone:{type:String},
    role:{ 
        type:String,
        enum:Object.values(Role),
        default:Role.USER
    },
    picture:{type:String},
    isActive:{
        type:String,
        enum:Object.values(IsActive),
        default:IsActive.ACTIVE
    },
    isApproved:{type:Boolean, default:false},   //only for agents
    commissionRate:{type:Number ,default:0},
    auths:[authProviderSchema]
},
{
    timestamps:true,
    versionKey:false
})


export const User=model<IUser>("User",userSchema)