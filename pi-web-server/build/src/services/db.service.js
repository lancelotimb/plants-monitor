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
exports.executeQuery = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const DATABASE_PATH = "../database/database.db";
function executeQuery(sql) {
    return __awaiter(this, void 0, void 0, function* () {
        let db = new sqlite3_1.default.Database(DATABASE_PATH, sqlite3_1.default.OPEN_READONLY, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
        return new Promise(function (resolve, reject) {
            db.all(sql, function cb(err, rows) {
                if (err) {
                    reject({
                        'error': err
                    });
                }
                else {
                    resolve({
                        rows: rows
                    });
                }
                db.close((err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            });
        });
    });
}
exports.executeQuery = executeQuery;
