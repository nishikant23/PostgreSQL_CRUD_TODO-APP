import { getClient } from "./utils"

const insertData = async () => {

    const client = await getClient();

    try {
    const insertUser = `
        INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id
    `
    const usersValue = ['raju@gmail.com', 'raj123'];

    const usersResp = await client.query(insertUser, usersValue);



    const insertTodo = `
        INSERT INTO todos (user_id, title, description, done) VALUES ($1, $2, $3, $4) RETURNING id
    `
    const todoValues = [usersResp.rows[0].id, 'Riding bike', 'Bike is love, riding with her is fire', false];

    await client.query(insertTodo, todoValues);

    console.log("Entries success");
    } catch (error) {
    console.log("Error inserting data", error);
    }  finally {
        await client.end();
    }
}

insertData().catch(console.error);