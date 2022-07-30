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
const express_1 = require("express");
const Authentication_middleware_1 = __importDefault(require("../middlewares/Authentication.middleware"));
const Ethplorer_service_1 = require("../services/Ethplorer.service");
const WalletRouter = (0, express_1.Router)();
WalletRouter.use(Authentication_middleware_1.default);
WalletRouter.get('/analyze', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore    
    const User = req.user;
    if (req.user) {
        //@ts-ignore
        const AddrressInfo = yield (0, Ethplorer_service_1.getAddressInfo)(req.query.address, res);
        res.json(AddrressInfo);
    }
}));
exports.default = WalletRouter;
