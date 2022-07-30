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
const axios_1 = __importDefault(require("axios"));
const TrendingContractRouter = (0, express_1.Router)();
TrendingContractRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield axios_1.default.get('https://api.ethplorer.io/getTopTokens?apiKey=freekey');
        console.log("Data : Retrived");
        res.status(200).json(JSON.stringify(data.data));
    }
    catch (e) {
        console.log("Error");
        res.status(404).json({
            "SUCCES": "FALSE"
        });
    }
}));
exports.default = TrendingContractRouter;
