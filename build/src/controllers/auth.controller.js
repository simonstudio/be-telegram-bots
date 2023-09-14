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
exports.logout = exports.login = exports.register = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_service_1 = require("../services/user.service");
const token_service_1 = require("../services/token.service");
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.createUser)(req.body);
    const token = yield (0, token_service_1.generateAuthTokens)(user);
    res.status(http_status_1.default.OK).send({ message: 'user created successfully', user, token });
}));
exports.register = register;
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_service_1.getUserByEmail)(email);
    if (!user) {
        return res.status(http_status_1.default.UNAUTHORIZED).send({
            message: 'Invalid credentials',
        });
    }
    // const isPasswordMatch = await user.isPasswordMatch(password);
    // if (!isPasswordMatch) {
    //   return res.status(httpStatus.UNAUTHORIZED).send({
    //     message: 'Invalid credentials',
    //   });
    // }
    const token = yield (0, token_service_1.generateAuthTokens)(user);
    res.status(http_status_1.default.OK).send({ message: 'login successful', user, token });
}));
exports.login = login;
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    yield (0, token_service_1.removeToken)(user);
    res.status(http_status_1.default.OK).send({
        message: 'logout successful',
        status: true,
    });
}));
exports.logout = logout;
