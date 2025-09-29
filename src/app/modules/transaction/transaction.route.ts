import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TransactionControllers } from "./transaction.controller";

const router=Router();


router.get("/me" , checkAuth(Role.USER , Role.ADMIN), TransactionControllers.getMyTransactions);

router.get("/" , checkAuth(Role.ADMIN),TransactionControllers.getAllTransactions)

export const TransactionRoutes=router;