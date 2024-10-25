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
const updateTodos = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, utils_1.getClient)();
    const updateQuery = `UPDATE todos SET done=$1 WHERE user_id=$2`;
    const result = (yield client).query(updateQuery, [true, user_id]);
    console.log(`Updated the user with ${user_id} and marked task done`);
});
const userId = 4;
updateTodos(userId);
