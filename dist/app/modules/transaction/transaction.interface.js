"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.TransactionStatus = void 0;
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["COMPLETED"] = "COMPLETED";
    TransactionStatus["REVERSED"] = "REVERSED";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "DEPOSIT";
    TransactionType["WITHDRAW"] = "WITHDRAW";
    TransactionType["TRANSFER"] = "TRANSFER";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
