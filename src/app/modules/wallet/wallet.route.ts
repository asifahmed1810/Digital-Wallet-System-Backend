import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { WalletControllers } from "./wallet.controller";

const router=Router();


router.get("/me",checkAuth(...Object.values(Role)), WalletControllers.getMyWallet)


router.post("/deposit",checkAuth(Role.USER ,Role.AGENT), WalletControllers.deposit)

router.post("/withdraw",checkAuth(Role.USER , Role.AGENT),WalletControllers.withDraw)

router.post("/sendMoney",checkAuth(Role.USER , Role.AGENT),WalletControllers.sendMoney)

router.patch("/block/:id", checkAuth(Role.ADMIN), WalletControllers.blockWallet)

router.patch("/unblock/:id", checkAuth(Role.ADMIN), WalletControllers.unblockWallet)


export const WalletRoutes=router;