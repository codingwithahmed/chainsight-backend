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
const config_1 = __importDefault(require("config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RefreshToken_model_1 = __importDefault(require("../models/RefreshToken.model"));
const AuthenticationRouter = (0, express_1.Router)();
AuthenticationRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email;
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let password = req.body.password;
    /* checking for duplicate email */
    let existingUser = yield User_model_1.default.find({
        email: email
    });
    if (existingUser.length > 0) {
        res.sendStatus(400);
        return;
    }
    /* Hashing password */
    let saltRounds = config_1.default.get('SALT_ROUNDS');
    let hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const newUser = new User_model_1.default({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword
    });
    try {
        yield newUser.save();
        res.status(200).json({
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name
        });
    }
    catch (e) {
        res.status(400).json({
            error: e
        });
    }
}));
AuthenticationRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email;
    let password = req.body.password;
    let users = yield User_model_1.default.find({
        email: email
    });
    if (users.length === 0) {
        res.status(400).json({
            'message': 'No user exists with this email.'
        });
        return;
    }
    let hashedPassword = users[0].password;
    if (yield !bcrypt_1.default.compare(password, hashedPassword)) {
        res.sendStatus(400);
        return;
    }
    /* generate jwt */
    let privateKey = config_1.default.get('PRIVATE_KEY');
    let access_token = yield jsonwebtoken_1.default.sign({ email: users[0].email, type: 'access' }, privateKey, { expiresIn: 60 * 15 });
    let refresh_token = yield jsonwebtoken_1.default.sign({ email: users[0].email, type: 'refresh' }, privateKey, { expiresIn: 60 * 30 });
    res.status(200).json({
        'access_token': access_token,
        'refresh_token': refresh_token
    });
}));
AuthenticationRouter.post('/refresh_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let privateKey = config_1.default.get('PRIVATE_KEY');
    let oldRefreshToken = req.body.refresh_token;
    let user = { email: '' };
    /* Verify token */
    try {
        //@ts-ignore
        user = yield jsonwebtoken_1.default.verify(oldRefreshToken, privateKey);
    }
    catch (e) {
        res.sendStatus(400);
        return;
    }
    /* generate jwt */
    let access_token = yield jsonwebtoken_1.default.sign({ email: user.email }, privateKey, { expiresIn: 60 * 15 });
    let refresh_token = yield jsonwebtoken_1.default.sign({ email: user.email }, privateKey, { expiresIn: 60 * 30 });
    let newRefreshToken = new RefreshToken_model_1.default({
        token: refresh_token
    });
    try {
        yield newRefreshToken.save();
        res.status(200).json({
            'access_token': access_token,
            'refresh_token': refresh_token
        });
    }
    catch (e) {
        res.sendStatus(400);
    }
}));
exports.default = AuthenticationRouter;
