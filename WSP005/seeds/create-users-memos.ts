import { Knex } from "knex";
import XLSX from 'XLSX';
import { hashPassword } from "../hash";

interface User {
    username: string,
    password: string,
}
interface Memo {
    content: string,
    image: string,
}
interface Like {
    user_id: number
    memo_id: number
}

export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    // await knex("table_name").del();

    // // Inserts seed entries
    // await knex("table_name").insert([
    //     { id: 1, colName: "rowValue1" },
    //     { id: 2, colName: "rowValue2" },
    //     { id: 3, colName: "rowValue3" }
    // ]);

    let workbook = XLSX.readFile('./seeds/WSP009-exercise.xlsx')
    let users: User[] = XLSX.utils.sheet_to_json(workbook.Sheets['user'])
    let memos: Memo[] = XLSX.utils.sheet_to_json(workbook.Sheets['memo'])


    await knex('likes').del();
    await knex('users').del();
    await knex('memos').del();

    const hashedUsers: User[] = []
    for (let user of users) {
        let hashedPassword = await hashPassword(user.password)
        user.password = hashedPassword
        hashedUsers.push(user)
    }
    const users_ids = await knex.insert(hashedUsers).into("users").returning("id")
    const memos_ids = await knex.insert(memos).into("memos").returning("id")
    const likes: Like[] = []
    for (let user of users_ids) {
        for (let memo of memos_ids) {
            if (Math.random() > 0.3) {
                likes.push({ user_id: user.id, memo_id: memo.id })
            }
        }
    }
    await knex.insert(likes).into("likes");

};
