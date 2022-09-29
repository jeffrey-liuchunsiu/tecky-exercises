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
        const users: User[] = await this.knex
            .select("*")
            .from("users");
        return users;
    }

    async login(): Promise<any> {
        try {
            form.parse(req, async (err, fields, files) => {
                let username = fields.username
                let password = Array.isArray(fields.password) ? fields.password[0] : fields.password

                if (!username || !password) {
                    res.status(401).json({ message: "Incorrect username or password" })
                    return
                }

                let user = (await client.query(/*sql*/`Select * from users where username = ($1)`, [username])).rows[0]

                const match = await checkPassword(password, user.password);
                req.session.user = {}
                if (match) {
                    // if (req.session) {
                    // 	req.session.loggedIn = true
                    // }
                    // if(req.session.user){
                    req.session.user.loggedIn = true
                    // }
                    req.session.user.username = user.username
                    req.session.user.userId = user.id;
                    req.session.save()
                    res.status(200).json({ message: "Login Successful" })
                    console.log("req.session", req.session);
                    return
                    // return res.redirect('/'); // To the protected page.
                } else {
                    return res.status(401).json({ message: "Incorrect username or password" })
                }

            })
        } catch {
            return res.status(401).json({ message: "Incorrect username or password" })
        }
    }

    // async getUsers(): Promise<User[]> {
    //     const results: User[] = (await this.client.query(/* sql */ `SELECT * FROM users`)).rows
    //     return results;
    // }


    // async register(username: string, password: string) {
    //     let hashedPasword = await hashPassword(password)
    //     await this.client.query(
    //         `insert into users (username, password) values ($1, $2)`,
    //         [username, hashedPasword]
    //     )
    // }
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
    // async googleLogin(email:string) {
    //     const users = (
    //         await this.client.query(`SELECT * FROM users WHERE username = $1`, [
    //             email
    //         ])
    //     ).rows
    //     let user: User= users[0]
    //     return user;
    // }
    // async googleAddUser(email:string){
    //     return (await this.client.query(
    //         `INSERT INTO users (username,password)
    //         VALUES ($1,$2) RETURNING *`,
    //         [email, ""]
    //     )).rows[0] as User
    // }
}

let userService = new UserService()

async function main() {

    let users = await userService.getUsers()
    console.log(users);
}

main()
