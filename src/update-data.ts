import { getClient } from "./utils"

const updateTodos = async (user_id: number) => {
    const client = getClient();

    const updateQuery = `UPDATE todos SET done=$1 WHERE user_id=$2`;
    const result = (await client).query(updateQuery,[true,user_id]);
    console.log(`Updated the user with ${user_id} and marked task done`);
}
const userId = 4;
updateTodos(userId);