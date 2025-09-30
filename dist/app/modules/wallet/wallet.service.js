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
exports.WalletServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const wallet_model_1 = require("./wallet.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const transaction_model_1 = require("../transaction/transaction.model");
const transaction_interface_1 = require("../transaction/transaction.interface");
const wallet_interface_1 = require("./wallet.interface");
const getMyWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ user: userId }).populate("user", "name email role");
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Wallet not found ");
    }
    return wallet;
});
const deposit = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const wallet = yield wallet_model_1.Wallet.findOne({ user: userId }).session(session);
        if (!wallet || wallet.status === "BLOCKED") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Wallet not Accessible");
        }
        wallet.balance += amount;
        yield wallet.save({ session });
        yield transaction_model_1.Transaction.create([
            {
                type: transaction_interface_1.TransactionType.DEPOSIT,
                amount,
                from: userId,
                to: userId,
                status: transaction_interface_1.TransactionStatus.COMPLETED
            },
        ], { session });
        yield session.commitTransaction();
        return { wallet, message: "Deposit successful" };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const withDraw = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const wallet = yield wallet_model_1.Wallet.findOne({ user: userId }).session(session);
        if (!wallet || wallet.status === "BLOCKED") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Wallet not accessible");
        }
        if (wallet.balance < amount) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Insufficient balance");
        }
        wallet.balance -= amount;
        yield wallet.save({ session });
        yield transaction_model_1.Transaction.create([
            {
                type: transaction_interface_1.TransactionType.WITHDRAW,
                amount,
                from: userId,
                to: userId,
                status: transaction_interface_1.TransactionStatus.COMPLETED
            }
        ], { session });
        yield session.commitTransaction();
        return { wallet, message: "Withdraw successful" };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const sendMoney = (fromUserId, toUserId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const senderWallet = yield wallet_model_1.Wallet.findOne({ user: fromUserId }).session(session);
        const receiverWallet = yield wallet_model_1.Wallet.findOne({ user: toUserId }).session(session);
        if (!senderWallet || senderWallet.status === wallet_interface_1.Wallet_Status.BLOCKED) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Sender Wallet not accessible");
        }
        if (!receiverWallet || receiverWallet.status === wallet_interface_1.Wallet_Status.BLOCKED) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Receiver wallet not accessible ");
        }
        if (senderWallet.balance < amount) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Insufficient Balance");
        }
        senderWallet.balance -= amount;
        receiverWallet.balance += amount;
        yield senderWallet.save({ session });
        yield receiverWallet.save({ session });
        yield transaction_model_1.Transaction.create([
            {
                type: transaction_interface_1.TransactionType.TRANSFER,
                amount,
                from: fromUserId,
                to: toUserId,
                status: transaction_interface_1.TransactionStatus.COMPLETED
            }
        ], { session });
        yield session.commitTransaction();
        return { message: "Transfer Successful" };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const blockWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findByIdAndUpdate(walletId, {
        status: wallet_interface_1.Wallet_Status.BLOCKED,
        new: true
    });
    if (!wallet_model_1.Wallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Wallet not found");
    }
    return { message: "Wallet Blocked", data: wallet };
});
const unblockWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findByIdAndUpdate(walletId, {
        status: wallet_interface_1.Wallet_Status.ACTIVE,
        new: true
    });
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Wallet not found");
    }
    return { message: "Wallet unblocked", data: wallet };
});
exports.WalletServices = {
    getMyWallet,
    deposit,
    withDraw,
    sendMoney,
    blockWallet,
    unblockWallet
};
