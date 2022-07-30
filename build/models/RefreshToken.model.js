"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const refreshTokenSchema = new mongoose_1.default.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
});
const RefreshToken = mongoose_1.default.model('RefreshToken', refreshTokenSchema);
exports.default = RefreshToken;
