"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/controllers/authController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const authserviceInterface_1 = require("../../../application/services/authserviceInterface");
const authServices_1 = require("../../services/authServices");
const userRepositoryMongodb_1 = require("../../database/repositories/userRepositoryMongodb");
const authRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, authController_1.default)(userDbRepository_1.userDbrepository, userRepositoryMongodb_1.userRepositoryMongoDB, authserviceInterface_1.authServiceInterface, authServices_1.authServices);
    router.post('/userRegister', controllers.registerUser);
    return router;
};
exports.default = authRouter;
