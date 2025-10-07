"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
const userTokens_1 = require("../../utils/userTokens");
const setCookie_1 = require("../../utils/setCookie");
const mongoose_1 = require("mongoose");
const credentialsLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = yield auth_service_1.AuthServices.credentialsLogin(req.body);
    const userTokens = (0, userTokens_1.createUserTokens)({
        _id: new mongoose_1.Types.ObjectId(loginInfo.userId),
        email: loginInfo.email,
        role: loginInfo.role
    });
    (0, setCookie_1.setAuthCookie)(res, userTokens);
    const user = {
        email: loginInfo.email,
        role: loginInfo.role,
        _id: loginInfo.userId
    };
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User logged in successfully",
        data: {
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
            user
        }
    });
}));
exports.AuthControllers = {
    credentialsLogin
};
