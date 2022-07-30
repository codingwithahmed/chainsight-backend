"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const body_parser_1 = __importDefault(require("body-parser"));
const Authentication_controller_1 = __importDefault(require("./controllers/Authentication.controller"));
const Db_1 = __importDefault(require("./utils/Db"));
const Wallet_controller_1 = __importDefault(require("./controllers/Wallet.controller"));
const Token_controller_1 = __importDefault(require("./controllers/Token.controller"));
const RichList_controller_1 = __importDefault(require("./controllers/RichList.controller"));
const cors_1 = __importDefault(require("cors"));
const Admin_controller_1 = __importDefault(require("./controllers/Admin.controller"));
const TrendingContract_controller_1 = __importDefault(require("./controllers/TrendingContract.controller"));
const app = (0, express_1.default)();
const PORT = config_1.default.get('PORT');
/* Middlewares */
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
/* Routers */
app.use('/api/authentication', Authentication_controller_1.default);
app.use('/api/wallet', Wallet_controller_1.default);
app.use('/api/token', Token_controller_1.default);
app.use('/api/richlist', RichList_controller_1.default);
app.use('/api/admin', Admin_controller_1.default);
app.use('/trendingcontracts', TrendingContract_controller_1.default);
app.listen(PORT, () => {
    console.log(`Server started successfully at http://localhost:${PORT}`);
    (0, Db_1.default)();
});
