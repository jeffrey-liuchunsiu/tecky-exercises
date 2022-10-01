// import { Client } from 'pg';
import Knex from 'knex';
const knexConfig = require('../knexfile.ts');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
import { hashPassword } from '../hash';
// import Memo from '../models/MemoModel';
import User from '../models/UserModels';
export default class UserService {
    private knex
    constructor() {
        this.knex = knex;
    }

    async getUsers(): Promise<User[]> {
        // const usersBuild = this.knex
        //     .select("*")
        //     .from("users");

        // console.log(usersBuild);

        // usersBuild.innerJoin()


        const users: User[] = await this.knex
            .select("*")
            .from("users");
        return users;
    }

    async login(username: string): Promise<any> {

        const user: User[] = await this.knex
            .select("*")
            .from("users")
            .where("username", username);
        return user;
    }

    async likedMemos(userId: number) {
        let result: any[] = await this.knex
            .select("*")
            // .select("memos.id", "memos.content", "memos.image", "memos.created_at", "memos.updated_at")
            .from("users")
            .innerJoin("likes", 'likes.user_id', '=', 'users.id')
            .innerJoin("memos", 'likes.memo_id', '=', 'memos.id')
            .where("user_id", userId);
        //     .query(
        //         `
        //     select 
        //     memos.id,
        //     memos.content,
        //     memos.image,
        //     memos.created_at,
        //     memos.updated_at
        //     from likes inner join memos on memos.id = likes.memo_id
        //     where likes.user_id = $1
        // `,
        //         [userId]
        //     )).rows
        return result;
    }

    // async getUsers(): Promise<User[]> {
    //     const results: User[] = (await this.client.query(/* sql */ `SELECT * FROM users`)).rows
    //     return results;
    // }


    async register(username: string, password: string) {
        let hashedPassword = await hashPassword(password)
        // await this.knex.query(
        //     `insert into users (username, password) values ($1, $2)`,
        //     [username, hashedPasword]
        // )
        let userId: number = (await this.knex
            .insert([{
                "username": username,
                "password": hashedPassword,
                "created_at": new Date().toISOString(),
                "updated_at": new Date().toISOString()
            }
            ])
            .into("users")
            .returning("id"))[0];
        return userId
    }
    // async likedMemos(userId: number) {
    //     let result:Memo[] = (await this.client.query(
    //         `
    //     select 
    //     memos.id,
    //     memos.content,
    //     memos.image,
    //     memos.created_at,
    //     memos.updated_at
    //     from likes inner join memos on memos.id = likes.memo_id
    //     where likes.user_id = $1
    // `,
    //         [userId]
    //     )).rows
    //     return result;
    // }
    // async getUser(username:string) {
    //     let userResult = await this.client.query(
    //         `select * from users where username = $1`,
    //         [username]
    //     )
    //     let dbUser:User = userResult.rows[0]
    //     return dbUser;
    // }

    async getUser(username: string): Promise<User> {

        const user: User = (await this.knex
            .select("*")
            .from("users")
            .where("username", username))[0];
        return user;
    }

    // async googleAddUser(email:string){
    //     return (await this.client.query(
    //         `INSERT INTO users (username,password)
    //         VALUES ($1,$2) RETURNING *`,
    //         [email, ""]
    //     )).rows[0] as User
    // }
}

let userService = new UserService()

// async function main() {

//     // let users = await userService.getUsers()
//     // let user = await userService.login("jeffrey@gmail.com")
//     // let memo = await userService.likedMemos(14)

//     // let userInput = {
//     //     "username": "jeffrey44@gmail.com",
//     //     "password": "helloworld",
//     // }
//     // let userId = await userService.register("jeffrey44@gmail.com", "helloworld")
//     let user = await userService.getUser("jeffrey44@gmail.com")
//     console.log(user);
// }

// main()
