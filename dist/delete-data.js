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
const deleteData = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, utils_1.getClient)();
    try {
        const deleteQuery = `DELETE FROM users WHERE email=$1`;
        const values = [email];
        const response = yield client.query(deleteQuery, values);
        console.log("Deleted entry : ", response);
    }
    catch (error) {
        console.log("Error in deleteing");
    }
    finally {
        yield client.end();
    }
});
const deleteTodo = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, utils_1.getClient)();
    try {
        const deleteQuery = `DELETE FROM todos WHERE user_id=$1`;
        const values = [user_id];
        const response = yield client.query(deleteQuery, values);
        console.log("Deleted Todo entry : ", response);
    }
    catch (error) {
        console.log("Error in deleteing");
    }
    finally {
        yield client.end();
    }
});
// deleteData("ankit@gm,ail.com");
deleteTodo(3);
