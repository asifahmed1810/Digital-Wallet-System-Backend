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
exports.TransactionServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const transaction_model_1 = require("./transaction.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getMyTransactions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find({
        $or: [{ from: userId }, { to: userId }],
    })
        .populate("from", "name email")
        .populate("to", "name email")
        .sort({ createdAt: -1 });
    if (!transactions) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No transaction found");
    }
    return transactions;
});
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find()
        .populate("from", "name email")
        .populate("to", "name email")
        .sort({ createdAt: -1 });
    return transactions;
});
exports.TransactionServices = {
    getMyTransactions,
    getAllTransactions
};
