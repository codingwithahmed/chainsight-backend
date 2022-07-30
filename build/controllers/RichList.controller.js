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
const RichListRouter = (0, express_1.Router)();
RichListRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (yield axios_1.default.get('https://api.ethplorer.io/getTop?apiKey=freekey&criteria=count')).data;
        // let trendingContract = 'https://services.tokenview.com/vipapi/address/richrange/eth_0xe36df5bb57e80629cfc28a31e5f794071c085eca/1/200?apikey=R8UNuoal7yGtw32PlksD'
        //const data = 'sada'   
        console.log("Data : ", data);
        res.status(200).json(data);
    }
    catch (e) {
        console.log("Error");
        res.status(404).json({
            "SUCCES": "FALSE"
        });
    }
}));
exports.default = RichListRouter;
