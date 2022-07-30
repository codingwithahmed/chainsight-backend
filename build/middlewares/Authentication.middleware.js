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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const User_model_1 = __importDefault(require("../models/User.model"));
function authentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let privateKey = config_1.default.get('PRIVATE_KEY');
        const bearerHeader = req.headers.authorization;
        console.log(bearerHeader);
        if (typeof bearerHeader != 'undefined') {
            // @ts-ignore
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            /* Verify token */
            try {
                //@ts-ignore
                let requestData = yield jsonwebtoken_1.default.verify(bearerToken, privateKey);
                //@ts-ignore
                if (requestData.type === 'access') {
                    //@ts-ignore
                    let users = yield User_model_1.default.find({ email: requestData.email });
                    if (users.length < 1) {
                        res.sendStatus(400);
                        return;
                    }
                    else {
                        // @ts-ignore
                        req.user = users[0];
                        console.log(users.length);
                    }
                    //@ts-ignore
                    req.user = users[0];
                }
                else {
                    res.sendStatus(400);
                }
            }
            catch (e) {
                res.sendStatus(400);
                return;
            }
            next();
        }
        else {
            res.sendStatus(400);
            return;
        }
    });
}
exports.default = authentication;
