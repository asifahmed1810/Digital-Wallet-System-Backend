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
exports.WalletControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const wallet_service_1 = require("./wallet.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getMyWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const wallet = yield wallet_service_1.WalletServices.getMyWallet(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Wallet retrieved successfully",
        data: wallet
    });
}));
const deposit = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    const result = yield wallet_service_1.WalletServices.deposit(req.user.id, amount);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Transaction successful",
        data: result
    });
}));
const withDraw = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    const result = yield wallet_service_1.WalletServices.withDraw(req.user.id, amount);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Balance withdraw successfully",
        data: result
    });
}));
const sendMoney = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { toUserId, amount } = req.body;
    const result = yield wallet_service_1.WalletServices.sendMoney(req.user.id, toUserId, amount);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Transfer successful",
        data: result
    });
}));
const blockWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_service_1.WalletServices.blockWallet(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Wallet Blocked successfully",
        data: result
    });
}));
const unblockWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_service_1.WalletServices.unblockWallet(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Wallet Unblock successfully",
        data: result
    });
}));
exports.WalletControllers = {
    getMyWallet,
    deposit,
    withDraw,
    sendMoney,
    blockWallet,
    unblockWallet
};
