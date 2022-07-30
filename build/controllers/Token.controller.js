"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authentication_middleware_1 = __importDefault(require("../middlewares/Authentication.middleware"));
const Token_service_1 = require("../services/Token.service");
const TokenRouter = (0, express_1.Router)();
TokenRouter.use(Authentication_middleware_1.default);
TokenRouter.get('/list', (req, res) => {
    res.json((0, Token_service_1.listTokens)());
});
TokenRouter.get('/analyze', (req, res) => {
    let address = req.query.address;
    // @ts-ignore
    res.json((0, Token_service_1.getTokenData)(address));
});
exports.default = TokenRouter;
