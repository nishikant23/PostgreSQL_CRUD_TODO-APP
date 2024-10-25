import { Client } from "pg";

export const getClient  = async () => {
    const client = new Client({
        connectionString : "postgresql://postgres:Pass@nd01@localhost:5432/postgres"
    })
    await client.connect();
    return client;
}

