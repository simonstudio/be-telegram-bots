"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config/config"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const router = express_1.default.Router();
const defaultRoutes = [{ path: '/users', route: user_route_1.default }];
const devRoutes = [];
defaultRoutes.forEach((route) => router.use(route.path, route.route));
/* istanbul ignore next */
if (config_1.default.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}
exports.default = router;
