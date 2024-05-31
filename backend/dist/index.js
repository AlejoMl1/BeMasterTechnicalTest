"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(cookieParser());
//print in the console every time exists a request
app.use(morgan("dev"));
//Middleware to set the headers
app.use((req, res, next) => {
    // update to match the domain you will make the request from
    //!this will have to change in deployment to match the frontend domain
    res.header("Access-Control-Allow-Origin", config_1.CORS_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    //configure the type of headers the backend is going to accept
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //the diferents methods for the request
    res.header("Access-Control-Allow-Methods", "GET");
    //the execution has to continue
    next();
});
app.use("/", index_1.default);
app.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT}`);
});
//# sourceMappingURL=index.js.map