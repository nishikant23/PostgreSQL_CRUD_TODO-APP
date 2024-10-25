import { getClient } from "./utils"

const deleteData = async (email: string) => {
    const client = await getClient();

   try {
    const deleteQuery =  `DELETE FROM users WHERE email=$1`
    const values = [email];

    const response  = await client.query(deleteQuery, values);

     console.log("Deleted entry : ", response);
   } catch (error) {
     console.log("Error in deleteing");
   } finally {
    await client.end();
   }
}

const deleteTodo = async (user_id: number) => {
    const client = await getClient();

   try {
    const deleteQuery =  `DELETE FROM todos WHERE user_id=$1`
    const values = [user_id];

    const response  = await client.query(deleteQuery, values);

     console.log("Deleted Todo entry : ", response);
   } catch (error) {
     console.log("Error in deleteing");
   } finally {
    await client.end();
   }
}

// deleteData("ankit@gm,ail.com");
deleteTodo(3);