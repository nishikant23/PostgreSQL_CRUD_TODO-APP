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
const utils_1 = require("./utils");
const insertData = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, utils_1.getClient)();
    try {
        const insertUser = `
        INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id
    `;
        const usersValue = ['raju@gmail.com', 'raj123'];
        const usersResp = yield client.query(insertUser, usersValue);
        const insertTodo = `
        INSERT INTO todos (user_id, title, description, done) VALUES ($1, $2, $3, $4) RETURNING id
    `;
        const todoValues = [usersResp.rows[0].id, 'Riding bike', 'Bike is love, riding with her is fire', false];
        yield client.query(insertTodo, todoValues);
        console.log("Entries success");
    }
    catch (error) {
        console.log("Error inserting data", error);
    }
    finally {
        yield client.end();
    }
});
insertData().catch(console.error);
