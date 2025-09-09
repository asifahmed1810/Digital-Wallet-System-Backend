/* eslint-disable no-console */
// uqNfrOGhtzuFJ4Fl
// digital_wallet

import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server:Server;


const startServer=async()=>{
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("Connected to MongoDB");

        server=app.listen(envVars.PORT,()=>{
            console.log(`App is Running on Port ${envVars.PORT}`);
        })
        
    } catch (error) {
        console.log(error);
    }
}

startServer()



process.on("unhandledRejection",(err)=>{
    console.log("Unhandled Rejection detected... Server shutting down",err);

    if (server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1);
})


process.on("uncaughtException",(err)=>{
    console.log("Uncaught exception error", err);

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("SIGTERM",()=>{
    console.log("SIGTERM signal received... server shutting down ");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})


process.on("SIGINT",()=>{
    console.log("SIGINT signal received.... server shutting down ");

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})