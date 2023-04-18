"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./src/frameworks/webserver/server"));
const express_2 = __importDefault(require("./src/frameworks/webserver/express"));
const appErrors_1 = __importDefault(require("./src/utils/appErrors"));
const routes_1 = __importDefault(require("./src/frameworks/webserver/routes"));
const DbConnection_1 = __importDefault(require("./src/frameworks/database/DbConnection"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, DbConnection_1.default)();
(0, express_2.default)(app);
(0, routes_1.default)(app);
app.all('*', (req, res, next) => {
    next(new appErrors_1.default('Not found', 404));
});
(0, server_1.default)(server).startServer();
