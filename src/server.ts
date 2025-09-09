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