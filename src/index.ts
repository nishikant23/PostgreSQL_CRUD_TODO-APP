import { Client } from "pg";
// ------------------Creation of table---------------------
const client = new Client({
    connectionString : "postgresql://postgres:Pass@nd01@localhost:5432/postgres"
})

const createUserTable = async () => {
    await client.connect();

    try {
        const result = await client.query(`
           

            CREATE TABLE addresses (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                street VARCHAR(255) NOT NULL,
                city VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                pincode VARCHAR(100),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
    `);
    console.log("Database table created successfully : ",result);

    } catch (error) {
        console.error("Error creating table : ", error);

    } finally {
        await client.end;
    }
}

createUserTable();

/////////////////////////////////////////////////////////////////////////////////
// ------------------Insertion in table---------------------

// const client = new Client({
//     host : "localhost",
//     port : 5432,
//     database : "postgres",
//     user : "postgres",
//     password : "Pass@nd01"
// })

// const insertUser = async (username: string, email: string, password: string) => {
    const insertUser = async (user_id: number, street : string, city : string, country : string, pincode : number) => {
    await client.connect();

   try {
    // const inserQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)"; //For user insert
    const inserQuery = "INSERT INTO addresses (user_id, street, city, country, pincode) VALUES ($1, $2, $3, $4, $5)"; //for address insert
    const values = [user_id, street, city, country, pincode];
    const res = await client.query(inserQuery, values);
    console.log("Insertion success !", res);
   } catch (error) {
    console.error("Insertion failed", error);
   } finally {
    await client.end();
   }
}

// insertUser("john", "john@example.com", "john123").catch(console.error); //for user insert
// insertUser(1, "22B Baker street", "London", "UK", 3299019).catch(console.error);
insertUser(6, "Bhayankar Road", "Kurukshetra", "Bharat", 202018).catch(console.error);

/////////////////////////////////////////////////////////////////////////////////
// ------------------Search/Get from table---------------------

// const client  = new Client({
//     host : "localhost",
//     port : 5432,
//     database : "postgres",
//     user : "postgres",
//     password : "Pass@nd01"
// })

const queryUser = async (email: string) => {
    await client.connect();

    try {
        const searchQuery = "SELECT * FROM users WHERE email=$1"
        const value = [email];
        const result = await client.query(searchQuery, value);

        if(result.rows.length > 0){
            console.log("User found with given mail : ", result.rows[0]);
            return result.rows[0];
        } else {
            console.log("Sorry, No user present with given mail");
            return null;
        }
    } catch (error) {
        console.error("Failed to Query the mail !", error);
    } finally {
        await client.end();
    }
}

queryUser("ankit@example.com").catch(console.error);


///////////////////////////////////////////////////////////////////////////////////////////
// ------------------Join of tables---------------------

// const client  = new Client({
//     host : "localhost",
//     port : 5432,
//     database : "postgres",
//     user : "postgres",
//     password : "Pass@nd01"
// })

const joinTables = async () => {
    await client.connect();

    try {
        const joinQuery = "SELECT u.id, u.username, u.email, a.street, a.city, a.country FROM users u JOIN addresses a ON u.id = a.user_id WHERE u.id = 6";
        const response  = await client.query(joinQuery);
        console.log("The joined data from users & adresses table is : ", response);
    } catch (error) {
        console.log("The data u r looking for has some error to fetch.", error);
    }finally {
        await client.end();
    }
}

joinTables().catch(console.error);