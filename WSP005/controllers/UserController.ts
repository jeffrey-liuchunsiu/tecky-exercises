import express from 'express'
import SocketIO from 'socket.io';
import { Request, Response } from "express"
import UserService from "../services/UserService";
import { checkPassword, hashPassword } from "../hash";
import { form, formParsePromise } from '../utils/upload';
import User from '../models/UserModels';
import path from "path";
import { logger } from "../logger";
import crypto from 'crypto'
import fetch from 'cross-fetch';

export default class UserController {
    private service: UserService;
    private io: SocketIO.Server;
    constructor(service: UserService,
        io: SocketIO.Server) {
        this.service = service;
        this.io = io;
    }

    getUsers = async (req: Request, res: Response) => {
        res.json(await this.service.getUsers());
    }
    register = async (req: Request, res: Response) => {
        // try {
        //     const username = req.body.username
        //     const password = req.body.password

        //     if (!username || !password) {
        //         res.status(400).json({
        //             message: 'Invalid username or password'
        //         })
        //         return
        //     }
        //     this.service.register(username, password)
        //     res.json({ message: 'User created' })
        // } catch (error) {
        //     console.log(error)
        //     res.status(500).json({ message: 'Internal server error' })
        // }

        try {
            form.parse(req, async (err, fields, files) => {
                let username = fields.username as string
                let password = Array.isArray(fields.password) ? fields.password[0] : fields.password
                // console.log("username: ", username);
                // console.log("password: ", password);

                let hashedPassword = await hashPassword(password)

                // let result = await client.query(/*sql*/`Insert into users (username, password) values ($1,$2) Returning id`, [username, hashedPassword])
                let userId = await this.service.register(username, password)
                console.log(userId);

                req.session.user = {}
                req.session.user.loggedIn = true
                if (userId) {
                    req.session.user.userId = userId;
                }
                res.json({ message: "Register Successful" })
            })
        } catch (err) {
            logger.error(err)
            res.status(401).json({ message: "Register Unsuccessful" })
        }
    }
    likedMemos = async (req: Request, res: Response) => {
        // let userId = req.params.userId

        // if (!Number(userId)) {
        //     res.status(400).json({
        //         message: 'Invalid user id'
        //     })
        //     return
        // }

        // const memos = await this.service.likedMemos(parseInt(userId))

        // res.json({
        //     message: 'Success',
        //     data: {
        //         memos: memos,
        //         memoCount: memos.length
        //     }
        // })

        let userId: number
        if (req.session.user) {
            userId = req.session.user.userId as number
        } else {
            res.status(400).json({ Message: "Please login first" })
            return
        }
        // console.log(userId)
        // console.log(username);

        try {

            let result = await this.service.likedMemos(userId)
            // console.log(result.rows);

            res.json(result)
            // res.status(200).json(data);
        } catch {
            res.status(400).sendFile(path.resolve('./public/404.html'))
        }
    }


    login = async (req: Request, res: Response) => {


        try {
            let parsedResult = await formParsePromise(req)
            // console.log({ parsedResult })
            let fields = parsedResult.fields
            const username = fields.username;
            const password = fields.password;
            console.log('parse done', { username, password })
            // const username = req.body.username
            // const password = req.body.password

            // let password: string = fields.password
            // console.log("username: ", username);
            // console.log("password: ", password);

            if (!username || !password) {
                console.log("not all");
                res.status(401).json({ message: "Incorrect email or password" });
                return;
            }

            let user = await this.service.getUser(username)
            // let user = (await client.query(/*sql*/ `Select * from users where username = ($1)`, [username])).rows[0];
            console.log(user);
            if (!user || Object.keys(user).length === 0) {
                console.log("user not true");
                res.status(401).json({ message: "Incorrect email or password" });
                return;
            }

            const match = await checkPassword(password, user.password);
            // console.log(match);

            req.session.user = {};
            if (!match) {
                console.log("password not true");
                res.status(401).json({ message: "Incorrect username or password" });
                return;
            }

            req.session.user.loggedIn = true;
            req.session.user.username = user.username;
            // req.session.user.useremail = user.useremail;
            req.session.user.userId = user.id;
            // req.session.user.userimage = user.image;

            // req.session.user.password = user.password;
            req.session.save();
            res.status(200).json({ message: "Login Successful", data: { user: req.session["user"] } });
            console.log("req.session", req.session);
        } catch (err) {
            console.log(err);

            res.status(500).json({ message: "Internal Server error" });
        }

    }

    // login=async (req: Request, res: Response) => {
    //     console.log('userRoutes - [/login]')
    //     const username = req.body.username
    //     const password = req.body.password

    //     if (!username || !password) {
    //         res.status(400).json({
    //             message: 'Invalid username or password'
    //         })
    //         return
    //     }

    //     let dbUser = await this.service.getUser(username)

    //     if (!dbUser) {
    //         res.status(400).json({
    //             message: 'Invalid username or password'
    //         })
    //         return
    //     }

    //     let isMatched = await checkPassword(password, dbUser.password)

    //     if (!isMatched) {
    //         res.status(400).json({
    //             message: 'Invalid username or password'
    //         })
    //         return
    //     }

    //     let {
    //         password: dbUserPassword,
    //         id,
    //         created_at,
    //         updated_at,
    //         ...sessionUser
    //     } = dbUser

    //     req.session['user'] = sessionUser

    //     res.status(200).json({
    //         message: 'Success login',
    //         user:sessionUser
    //     })
    // }


    loginGoogle = async (req: Request, res: Response) => {
        // // 如果google in 成功，就會拎到 一個 access token
        // // access token 係用黎換番google 既 user profile
        // const accessToken = req.session?.['grant'].response.access_token

        // // fetch google API, 拎 user profile
        // const fetchRes = await fetch(
        //     'https://www.googleapis.com/oauth2/v2/userinfo',
        //     {
        //         method: 'get',
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`
        //         }
        //     }
        // )
        // const googleProfile = await fetchRes.json()
        // let user = await this.service.googleLogin(googleProfile.email)

        // if (!user) {
        //     user = await this.service.googleAddUser(googleProfile.email)
        // }
        // if (req.session) {
        //     req.session['user'] = googleProfile
        // }
        // res.redirect('/')


        console.log("login google");

        const accessToken = req.session?.['grant'].response.access_token;
        const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: "get",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const googleProfile = await fetchRes.json();
        // console.log(result);

        // const users = (await client.query(`SELECT * FROM users WHERE users.username = $1`, [result.email])).rows;
        let user = await this.service.getUser(googleProfile.email)
        // let user = users[0];
        // console.log(user);

        let userId = user.id;
        if (!user) {
            // Create the user when the user does not exist
            // let password = hashPassword("blablabla")
            const randomString = crypto.randomBytes(32).toString('hex')
            let password = await hashPassword(randomString)

            // user = (await client.query(`INSERT INTO users (username,password,created_at,updated_at) 
            //         VALUES ($1,$2,NOW(),NOW()) RETURNING *`,
            // 	[result.email, password])).rows[0]
            userId = await this.service.register(googleProfile.email, password)
            console.log(user);

        }
        req.session.user = {}
        // if(req.session){
        req.session.user.loggedIn = true
        req.session.user.userId = userId
        // }
        // return res.status(200).json({ message: "Google Login Successful" })
        return res.redirect('/')

    }
    // logout = async (req: Request, res: Response) => {
    //     req.session.destroy(() => {
    //         console.log('user logged out')
    //     })
    //     res.redirect('/')
    // }
    // me = async (req: Request, res: Response) => {
    //     res.json({
    //         message: 'Success retrieve user',
    //         data: {
    //             user: req.session['user'] ? req.session['user'] : null
    //         }
    //     })
    // }
}