import Knex from "knex";
import XLSX from 'XLSX';
const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
export const knex = Knex(knexConfig);

interface User {
    username: string;
    password: (string | number);
    level: string
}

interface Category {
    name: string
}

interface File {
    name: string;
    content: string;
    is_file: number;
    category: string;
    category_id: number | null;
    owner: string;
    user_id: number | null;

}

export async function importData(knex) {
    const txn = await knex.transaction();

    try {
        let workbook = XLSX.readFile("./seeds/BAD004-exercise.xlsx")
        let user: User[] = XLSX.utils.sheet_to_json(workbook.Sheets['user'])
        let category: Category[] = XLSX.utils.sheet_to_json(workbook.Sheets['category'])
        let file: File[] = XLSX.utils.sheet_to_json(workbook.Sheets['file'])

        await txn('file').del();
        await txn('user').del();
        await txn('category').del();

        let usersId = await txn.insert(user).into("user").returning(['username', 'id'])
        let categoryId = await txn.insert(category).into("category").returning('id')

        const categoryData = category.map((category, index) =>
            ({ ...category, ...categoryId[index] })
        );
        const userData = user.map((user, index) =>
            ({ ...user, ...usersId[index] })
        );

        for (let fileItem of file) {

            let category = categoryData.filter(category => category.name == fileItem.category)
            let user = userData.filter(user => user.username == fileItem.owner)
            // console.log(category);
            // console.log(user);
            if (category[0]) {
                fileItem.category_id = category[0].id
            } else {
                fileItem.category_id = null
            }
            if (user[0]) {
                fileItem.user_id = user[0].id
            } else {
                fileItem.user_id = null
            }
        }
        // console.log(file);

        await txn.insert(file).into("file")
        await txn.commit();
        return;
    } catch (e) {
        await txn.rollback();
        return
    }
};

importData(knex)