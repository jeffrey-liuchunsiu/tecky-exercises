import UserService from "../services/UserService";
import SocketIO from 'socket.io';
import { Request, Response } from "express"
import { checkPassword } from "../hash";
import { form } from '../main'

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
        try {
            const username = req.body.username
            const password = req.body.password

            if (!username || !password) {
                res.status(400).json({
                    message: 'Invalid username or password'
                })
                return
            }
            this.service.register(username, password)
            res.json({ message: 'User created' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    likedMemos = async (req: Request, res: Response) => {
        let userId = req.params.userId

        if (!Number(userId)) {
            res.status(400).json({
                message: 'Invalid user id'
            })
            return
        }

        const memos = await this.service.likedMemos(parseInt(userId))

        res.json({
            message: 'Success',
            data: {
                memos: memos,
                memoCount: memos.length
            }
        })
    }


    login = async (req: Request, res: Response) => {
        form.parse(req, async (err: any, fields: any, files: any) => {
            try {
                const username = fields.username;
                const password = fields.password;

                // let password: string = fields.password
                // console.log("username: ", useremail);
                // console.log("password: ", password);

                if (!username || !password) {
                    res.status(401).json({ message: "Incorrect email or password" });
                    return;
                }

                let user = await this.service.getUser(username)
                // let user = (await client.query(/*sql*/ `Select * from users where username = ($1)`, [username])).rows[0];
                console.log(user);
                if (!user || Object.keys(user).length === 0) {
                    res.status(401).json({ message: "Incorrect email or password" });
                    return;
                }

                const match = await checkPassword(password, user["user"].password);
                // console.log(match);

                req.session.user = {};
                if (!match) {
                    res.status(401).json({ message: "Incorrect username or password" });
                    return;
                }

                req.session.user.loggedIn = true;
                req.session.user.username = user["user"].username;
                // req.session.user.useremail = user.useremail;
                req.session.user.userId = user["user"].id;
                // req.session.user.userimage = user.image;

                // req.session.user.password = user.password;
                req.session.save();
                res.json({ message: "Login Successful", data: { user: req.session["user"] } });
                console.log("req.session", req.session);
            } catch (err) {
                console.log(err);

                res.status(500).json({ message: "Internal Server error" });
            }
        });
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
        // 如果google in 成功，就會拎到 一個 access token
        // access token 係用黎換番google 既 user profile
        const accessToken = req.session?.['grant'].response.access_token

        // fetch google API, 拎 user profile
        const fetchRes = await fetch(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        const googleProfile = await fetchRes.json()
        let user = await this.service.googleLogin(googleProfile.email)

        if (!user) {
            user = await this.service.googleAddUser(googleProfile.email)
        }
        if (req.session) {
            req.session['user'] = googleProfile
        }
        res.redirect('/')

    }
    logout = async (req: Request, res: Response) => {
        req.session.destroy(() => {
            console.log('user logged out')
        })
        res.redirect('/')
    }
    me = async (req: Request, res: Response) => {
        res.json({
            message: 'Success retrieve user',
            data: {
                user: req.session['user'] ? req.session['user'] : null
            }
        })
    }
}