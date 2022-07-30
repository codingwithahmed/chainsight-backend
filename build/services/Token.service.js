"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenData = exports.listTokens = void 0;
const tokens_eth_js_1 = __importDefault(require("../utils/tokens-eth.js"));
function listTokens() {
    let loadedTokens = (0, tokens_eth_js_1.default)();
    return loadedTokens;
}
exports.listTokens = listTokens;
function getTokenData(address) {
    let tokenList = listTokens();
    let reqToken = tokenList.find(token => token.address === address);
    return reqToken;
}
exports.getTokenData = getTokenData;
