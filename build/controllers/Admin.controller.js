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
const User_model_1 = __importDefault(require("../models/User.model"));
const AdminRouter = (0, express_1.Router)();
AdminRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield User_model_1.default.find();
        // console.log(data)
        res.status(201).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}));
AdminRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, first_name, last_name, password } = req.body;
    try {
        User_model_1.default.create({
            email, first_name, last_name, password
        });
        try {
            res.json({
                "Success": true,
            }).status(201);
        }
        catch (err) {
            res.json({
                "Success": false,
            }).status(401);
        }
    }
    catch (error) {
        console.log(error);
        res.json(error).status(404);
    }
}));
exports.default = AdminRouter;
