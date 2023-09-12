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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToDB = void 0;
function addToDB(req, res, client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tag, subTag, resource } = req.body;
            const database = client.db("Documentation");
            const collection = database.collection("Documentation");
            const result = yield collection.insertOne({ tag: tag.toUpperCase(), subTag, resource });
            res.status(200).json({ message: "Good request", result });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Bad request" });
        }
    });
}
exports.addToDB = addToDB;
