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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/useCases/auth/userAuth");
const authController = (userDbrepository, userDbRepositoryImpl, authserviceInterface, authServiceImpl) => {
    const dbRepositoryUser = userDbrepository(userDbRepositoryImpl());
    const authService = authserviceInterface(authServiceImpl());
    const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('+++++++++++++++ from controller');
        console.log(req.body);
        const user = req.body;
        console.log(user);
        const token = yield (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
    }));
    return {
        registerUser
    };
};
exports.default = authController;
