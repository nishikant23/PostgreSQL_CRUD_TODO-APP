import { getClient } from "./utils"

const getAllUsers = async () => {
    const client  = await getClient();
    
    const getQuery = `SELECT* FROM users`
    const allUsers = await client.query(getQuery);
    
    const userIds: number[] = []; //array to store IDS: number

    for(let user of allUsers.rows) {
        //console.log(`ID = ${user.id}, password is : ${user.password}`);
        userIds.push(user.id);
    }
    return userIds;
    
    // console.log("all users  = ", allUsers);
}

// const getUserByEmail = async (email : string) => {
//     const client  = await getClient();

//     const getuserbyemail = ` SELECT* FROM users WHERE email=$1`;
//     const emailvalue = [email];
//     const emailUserResp = await client.query(getuserbyemail, emailvalue);
//     console.log("User email : ", emailUserResp);
//     for(let id of emailUserResp.rows) {
//         return `${id.id}`;
//     }
   
// }

const getTodos = async () => {
    const client = await getClient();

    const getTodosByID = `SELECT* FROM todos WHERE user_id=$1`
    const getUsersID = await getAllUsers(); //returns an arrsay of allusers ID only
 
    const todoResponse:any[] = [] //is an empty array of anytype
    for(let value of getUsersID) { //iterate over IDS-holding variable
        const result = await client.query(getTodosByID, [value]); //query for each 'user_id'
        todoResponse.push(...result.rows); //pushed into 'todoResponse' on each iteration
    }
    
    for(let val of todoResponse){ //extracting eachtype data individualy from 'todoResponse'
        console.log(`ID : ${val.id},User_Num : ${val.user_id}, Title : ${val.title}, Description : ${val.description}, isDone : ${val.done}, Name : ${val.email}`);
    }

    // // const todoValue  = userid;
    // const todoResponse = await client.query(getTodosByID, [userid]);
    // for(let val of todoResponse.rows) {
    //     console.log(`ID : ${val.id}, Title : ${val.title}, Description : ${val.description}, isDone : ${val.done}, Name : ${val.email}`);
    // }
}

// getAllUsers();
// getUserByEmail("devgan@gmail.com");


// const userIDToFetch = async () => {
//     const client = await getClient();
//     const getQuery = `SELECT* FROM users`
//     const allUsers = await client.query(getQuery);
//     const userIds: number[] = [];

//     for(let user of allUsers.rows) {
//         //console.log(`ID = ${user.id}, password is : ${user.password}`);
//         userIds.push(user.id);
//     }
//     return userIds;
// }
// const answer = async () => {
//     let ans = await userIDToFetch();
//     console.log(ans);
// }

// answer();


// getTodos();



getTodos();