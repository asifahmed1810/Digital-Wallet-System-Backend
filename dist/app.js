"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = require("./app/Routes");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173", // local frontend
        "https://digital-wallet-system-frontend.vercel.app", // your deployed frontend (if any)
    ],
    credentials: true, // allow cookies/auth headers
}));
app.use("/api/v1", Routes_1.router);
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Digital Wallet System Backend"
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
