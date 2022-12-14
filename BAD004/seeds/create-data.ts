import { Knex } from "knex";
import XLSX from 'XLSX';

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

export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    // await knex("table_name").del();

    // // Inserts seed entries
    // await knex("table_name").insert([
    //     { id: 1, colName: "rowValue1" },
    //     { id: 2, colName: "rowValue2" },
    //     { id: 3, colName: "rowValue3" }
    // ]);
    let workbook = XLSX.readFile("./seeds/BAD004-exercise.xlsx")
    let user: User[] = XLSX.utils.sheet_to_json(workbook.Sheets['user'])
    let category: Category[] = XLSX.utils.sheet_to_json(workbook.Sheets['category'])
    let file: File[] = XLSX.utils.sheet_to_json(workbook.Sheets['file'])

    await knex('file').del();
    await knex('user').del();
    await knex('category').del();

    // let users = user.map(item => item.username)
    let usersId = await knex.insert(user).into("user").returning(['username', 'id'])

    // const [Important, Urgent, Useful, Not_Urgent, Not_Important] = await knex.insert(category).into("category").returning('id')
    let categoryId = await knex.insert(category).into("category").returning('id')
    // console.log(Important.id);

    const categoryData = category.map((category, index) =>
        ({ ...category, ...categoryId[index] })
    );
    const userData = user.map((user, index) =>
        ({ ...user, ...usersId[index] })
    );

    // console.log(categoryData);
    // console.log(userData);


    // const [Important, Urgent, Useful, Not Urgent, Not Important] = Object.values(categoryId)
    // let categoryName = category.map(item => item.name)
    // let categoryId = categoriesId.map(item => item.id)
    // const [...categoryName] = categoryId

    // console.log(category);

    // let categoryArray = []
    // for (let i = 0; i < category.length; i++) {
    //     let name = category[i].name;
    //     let id = categoryId[i].id;
    //     let item = {}
    //     item[name] = id
    //     //@ts-ignore
    //     categoryArray.push(item)
    // }
    // console.log(categoryArray);
    // console.log(categoryArray.filter(item => item == "Not Urgent"))

    for (let fileItem of file) {
        // console.log(categoryName[fileItem.category]);
        // console.log(fileItem.category);
        // console.log(categoryArray[fileItem.category]);
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

    await knex.insert(file).into("file")
};
