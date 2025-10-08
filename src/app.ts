import express, { Request, Response } from"express"
import cookieParser from "cookie-parser";
import cors from "cors";

import { router } from "./app/Routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";


import notFound from "./app/middlewares/notFound";


const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://digital-wallet-system-backend-mu.vercel.app", // your deployed frontend (if any)
    ],
    credentials: true, // allow cookies/auth headers
  })
);







app.use("/api/v1",router)

app.get('/',(req:Request , res:Response)=>{
    res.status(200).json({
        message:"Welcome to Digital Wallet System Backend"
    })
})


app.use(globalErrorHandler)

app.use(notFound)



export default app;