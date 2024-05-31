"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const githubRoutes_1 = __importDefault(require("./githubRoutes"));
const router = (0, express_1.Router)();
router.use("/github", githubRoutes_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map