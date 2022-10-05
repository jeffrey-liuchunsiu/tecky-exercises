import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

async function main() {

  let firstResult = await knex.raw(
       /*sql*/ `SELECT
        file.user_id,
        COUNT(file.user_id) 
      FROM
        file
      GROUP BY file.user_id`
  )
  console.log(firstResult.rows);

  let secondResult = await knex.raw(
        /*sql*/ `SELECT
         file.category_id,
         COUNT(file.category_id) 
       FROM
         file
       GROUP BY file.category_id`
  )
  console.log(secondResult.rows);

  let thirdResult = await knex.raw(
        /*sql*/ `SELECT owner, category,
        COUNT(owner)
        FROM file
        Inner join category
            On file.category_id = category.id
        where owner = 'alex' and category = 'Important'
        GROUP BY owner, category;`
  )
  console.log(thirdResult.rows);

  let forthResult = await knex.raw(
        /*sql*/ `SELECT file.user_id,
    COUNT(file.user_id)
    FROM file
    GROUP BY file.user_id
    HAVING count(file.user_id) > 700;`
  )
  console.log(forthResult.rows);

  // const result = await knex
  //     .select("*")
  //     .from("users");
  // console.log(result)
  // const users:any=[];
  // users.push({username:"peter",password:""})
  // users.push({username:"tony",password:""})
  // users.push({username:"james",password:""})
  // users.push({username:"dickson",password:""})
  // const result = await knex.insert(users).into("users");

  // const builder = knex.select("*").from("users");
  // if(false){
  //     builder.limit(1)
  // }else{
  //     builder.limit(100)
  // }
  // const result = await builder;
  // console.log(result);
  // knex.destroy();
}
main()