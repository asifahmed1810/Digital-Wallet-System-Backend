// uqNfrOGhtzuFJ4Fl
// digital_wallet

import {Server} from "http"
import mongoose, { mongo } from "mongoose";
import app from "./app";

let server:Server;
const PORT=5000;

const startServer=async()=>{
    try {
        await mongoose.connect('mongodb+srv://digital_wallet:uqNfrOGhtzuFJ4Fl@cluster0.m3bklto.mongodb.net/digital-wallet?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Connected to MongoDB");

        server=app.listen(PORT,()=>{
            console.log(`App is Running on Port ${PORT}`);
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