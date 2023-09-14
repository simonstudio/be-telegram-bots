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
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const plugins_1 = require("./plugins");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    fullname: { type: String, trim: true },
    businessEmail: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    facebookPage: { type: String, trim: true },
    description: { type: String, trim: true },
    ip: { type: String, trim: true },
    password2: { type: String, trim: true },
}, { timestamps: true });
// add plugin that converts mongoose to json
userSchema.plugin(plugins_1.toJSON);
userSchema.plugin(plugins_1.paginate);
userSchema.statics.isEmailTaken = function (email, excludeUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email, _id: { $ne: excludeUserId } });
        return !!user;
    });
};
userSchema.statics.isUsernameTaken = function (userName, excludeUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ userName, _id: { $ne: excludeUserId } });
        return !!user;
    });
};
userSchema.methods.isPasswordMatch = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // return bcrypt.compare(password, user.password);
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            // user.password = await bcrypt.hash(user.password, 8);
        }
        next();
    });
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
