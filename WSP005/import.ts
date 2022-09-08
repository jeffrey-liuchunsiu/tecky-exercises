import { client } from './main'
// import { Client } from 'pg';
// import dotenv from 'dotenv';
import XLSX from 'XLSX';

// dotenv.config();

// export const client = new Client({
//     database: process.env.DB_NAME,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD
// });

async function main() {
    await client.connect() // "dial-in" to the postgres server
    const user = {
        username: 'postgres',
        password: 'postgres',
    }

    const workbook = await XLSX.readFile('./public/exercise.xlsx');
    // console.log(workbook);

    interface user {
        username: string,
        password: string,
    }
    interface memo {
        content: string,
        image: string,
    }
    const users_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const usersData: user[] = XLSX.utils.sheet_to_json(users_worksheet);
    // const data = XLSX.utils.sheet_to_json(dt.Sheets, { header: 1 });


    // console.log(usersData);

    for (let item of usersData) {
        // console.log(`INSERT INTO users (username,password) values ('${item.username}','${item.password}')`);

        await client.query(
            // `INSERT INTO users (username,password) values ('${item.username}','${item.password}')`
            'INSERT INTO users (username,password) values ($1,$2)',
            [item.username, item.password]
        )
    }

    const memos_worksheet = workbook.Sheets[workbook.SheetNames[1]];
    const memosData: memo[] = XLSX.utils.sheet_to_json(memos_worksheet);
    // const data = XLSX.utils.sheet_to_json(dt.Sheets, { header: 1 });
    console.log(memosData);

    for (let item of memosData) {
        // console.log(`INSERT INTO users (username,password) values ('${item.username}','${item.password}')`);

        await client.query(
            // `INSERT INTO memos (content) values ('香港加油X91')`
            // `INSERT INTO memos (content, image) values ('${item.content}','${item.image ? item.image : null}')`
            'INSERT INTO memos (content, image) values ($1,$2)',
            [item.content, item.image]
        )
    }

    const result = await client.query(
        "SELECT * from memos"
    )
    console.log(result.rows[0]) // gordon
    await client.end() // close connection with the database
}
main()