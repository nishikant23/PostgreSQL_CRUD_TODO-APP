import { getClient } from "./utils";


const createTables = async () => {

    const client  = await getClient();

    try {
        const createUserTable = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `

    await client.query(createUserTable);

    const createTodosTable  = `
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL, 
            title VARCHAR(100) NOT NULL,
            description VARCHAR(500) NOT NULL,
            done BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `

    await client.query(createTodosTable);

    console.log("Table Created Succesfully");

    } catch (error) {
        console.log(" Error creating tables.", error);
    } finally {
        await client.end();
    }
}

createTables();