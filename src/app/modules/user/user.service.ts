import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs";


const createUser=async(payload:Partial<IUser>)=>{
    const {email,password, ...rest}=payload;

    const isUserExist= await User.findOne({email});

    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST ,"User already exist")
    }

    const authProvider:IAuthProvider={provider:"credentials", providerId:email as string}

    const hashPassword=await bcryptjs.hash(password as string,10 )

    const user=await User.create({
        
        email,
        password:hashPassword,
        auths:[authProvider],
        ...rest
    })

    return user;
}

const getAllUsers=async()=>{
    const users=await User.find({})

    const totalUser= await User.countDocuments();



    return {
        data:users,
        meta:{
            total:totalUser
        }
    }
}


export const UserServices={
    createUser,
    getAllUsers
}