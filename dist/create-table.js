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
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, utils_1.getClient)();
    try {
        const createUserTable = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `;
        yield client.query(createUserTable);
        const createTodosTable = `
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL, 
            title VARCHAR(100) NOT NULL,
            description VARCHAR(500) NOT NULL,
            done BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `;
        yield client.query(createTodosTable);
        console.log("Table Created Succesfully");
    }
    catch (error) {
        console.log(" Error creating tables.", error);
    }
    finally {
        yield client.end();
    }
});
createTables();
