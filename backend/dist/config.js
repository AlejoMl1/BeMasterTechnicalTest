"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_URL = exports.API_PORT = exports.PORT = void 0;
require("dotenv").config();
exports.PORT = Number(process.env.PORT) || 3000;
exports.API_PORT = Number(process.env.API_PORT);
exports.CORS_URL = String(process.env.CORS_URL) || "*";
//# sourceMappingURL=config.js.map