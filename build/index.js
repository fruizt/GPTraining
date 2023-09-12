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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const addToDB_1 = require("./service/request/addToDB");
const readFromDB_1 = require("./service/request/readFromDB");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
var mongoClient;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = process.env.COSMOS_ENDPOINT;
        mongoClient = new mongodb_1.MongoClient(endpoint);
        yield mongoClient.connect();
    });
}
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, addToDB_1.addToDB)(req, res, mongoClient);
}));
app.get('/read', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, readFromDB_1.readFromDB)(req, res, mongoClient);
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    yield connectToDatabase();
}));
