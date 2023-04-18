"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const ServerConfig = (server) => {
    const startServer = () => {
        server.listen(config_1.default.port, () => {
            console.log("Server started on port " + config_1.default.port);
        });
    };
    return {
        startServer
    };
};
exports.default = ServerConfig;
