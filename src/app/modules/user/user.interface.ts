import { Types } from "mongoose"

export enum Role{
    ADMIN="ADMIN",
    USER="USER",
    AGENT="AGENT"
}


export enum IsActive{
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    BLOCKED="BLOCKED"
}

export interface IAuthProvider{
    provider:"google"| "credentials",
    providerId:string
}


export interface IUser{
    name:string,
    email:string,
    password ?:string,
    role ?:Role,
    phone ?:string,
    picture ?:string,
    isActive ?: IsActive,
    isApproved ?:string,
    auths:IAuthProvider[],
    wallet?:Types.ObjectId[]
}