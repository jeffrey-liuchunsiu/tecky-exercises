import express from 'express'
// import expressSession from 'express-session';
import path, { resolve } from 'path'
import jsonfile from 'jsonfile'
export const userRoutes = express.Router()
import { form, client } from '../main'
import { checkPassword, hashPassword } from '../hash';
import fetch from 'cross-fetch';
import crypto from 'crypto'
import { logger } from '../logger'

userRoutes.post('/login', async (req: express.Request, res: express.Response) => {
	// res.status(200).send("Success Login!");
	// let username = req.body.username
	// let password = req.body.password
	// res.sendFile('/public/login.html')

	// res.sendFile(path.join(__dirname, '/public/login.html'))
	// const users = await jsonfile.readFile(path.join('public', 'user.json'))
	form.parse(req, async (err, fields, files) => {
		// if(files.length >0)
		// console.log(fields.content);
		let username = fields.username
		// let file = Array.isArray(files.image) ? files.image[0] : files.image
		let password = Array.isArray(fields.password) ? fields.password[0] : fields.password
		// let password: string = fields.password
		// console.log("username: ", username);
		// console.log("password: ", password);

		if (!username || !password) {
			res.status(401).json({ message: "Incorrect username or password" })
			return
		}

		let user = (await client.query(/*sql*/`Select * from users where username = ($1)`, [username])).rows[0]
		try {
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
		} catch {
			return res.status(401).json({ message: "Incorrect username or password" })
		}

		// req.session.loggedIn = false
		// let userResult = await client.query(/*sql*/`SELECT * FROM users WHERE username=($1) AND password=($2)`,
		// 	[username, password]);

		// // console.log(userResult.rowCount);


		// if (userResult.rowCount > 0) {
		// 	// for (let user of users) {
		// 	// 	// for (let key in password){
		// 	// 	if (user.username === username && user.password === password) {
		// 	// console.log("login successfully");
		// 	// let path1 = path.join("public", "admin.html")
		// 	// console.log(path1);
		// 	// res.redirect(path.join("", "admin.html"));
		// 	// req.session["user"] = true;
		// 	// req.session.user = true
		// 	req.session.loggedIn = true
		// 	req.session.username = userResult.rows[0].username
		// 	req.session.userId = userResult.rows[0].id;
		// 	req.session.save()
		// 	res.status(200)
		// 	// res.status(200).redirect("/admin.html");
		// 	// res.status(200).send("/");
		// 	// res.status(200).json({ message: "Login Successful" })
		// 	console.log("req.session", req.session);
		// 	return
		// 	// 	}
		// 	// }
		// }
		// // console.log(req.session["user"]);
		// // console.log("login fail");

		// res.status(400).send('/login.html')

		// // res.redirect('/?msg=Login Failed')
		// // res.sendFile(path.resolve('./public/404.html'))
	})
})

userRoutes.get('/likedmemo', async (req: express.Request, res: express.Response) => {
	// app.get('/likedmemo', isLoggedIn, async (req: Request, res: Response, next) => {
	// let username = req.session.username
	let userId
	if (req.session.user) {
		userId = req.session.user.userId
	} else {
		return res.status(400).json({ Message: "Please login first" })
	}
	// console.log(userId)
	// console.log(username);

	try {
		// let data = await jsonfile.readFile(path.join('public', 'memos.json'))
		// let data: any = await client.query(/*sql*/`SELECT * from memos`)
		// type Memo = {
		//     content?: string,
		//     image?: string,
		//     count?: number,
		//     liked_usernames?: Array<string>
		// }

		// let result = data.filter((memo: any) => {
		// 	return memo.liked_usernames.includes(username)
		// })
		let result = await client.query(/*sql*/`SELECT * from users 
		INNER JOIN likes on likes.user_id = users.id
		INNER JOIN memos on likes.memo_id = memos.id
		WHERE user_id = ($1)`, [userId])
		// console.log(result.rows);

		res.status(200).json(result.rows)
		// res.status(200).json(data);
	} catch {
		res.status(400).sendFile(path.resolve('./public/404.html'))
	}
})


userRoutes.post('/register', async (req: express.Request, res: express.Response) => {
	try {
		form.parse(req, async (err, fields, files) => {
			let username = fields.username
			let password = Array.isArray(fields.password) ? fields.password[0] : fields.password
			console.log("username: ", username);
			console.log("password: ", password);

			let hashedPassword = await hashPassword(password)

			let result = await client.query(/*sql*/`Insert into users (username, password) values ($1,$2) Returning id`, [username, hashedPassword])
			console.log(result);

			req.session.user = {}
			req.session.user.loggedIn = true
			req.session.user.userId = result.rows[0].id;
			res.status(200).json({ message: "Register Successful" })
		})
	} catch (err) {
		logger.error(err)
		res.status(401).json({ message: "Register Unsuccessful" })
	}
})

userRoutes.get('/login/google', async (req: express.Request, res: express.Response) => {
	console.log("login google");

	const accessToken = req.session?.['grant'].response.access_token;
	const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		method: "get",
		headers: {
			"Authorization": `Bearer ${accessToken}`
		}
	});
	const result = await fetchRes.json();
	// console.log(result);

	const users = (await client.query(`SELECT * FROM users WHERE users.username = $1`, [result.email])).rows;
	let user = users[0];
	// console.log(user);

	if (!user) {
		// Create the user when the user does not exist
		// let password = hashPassword("blablabla")
		const randomString = crypto.randomBytes(32).toString('hex')
		let password = await hashPassword(randomString)

		user = (await client.query(`INSERT INTO users (username,password,created_at,updated_at) 
	            VALUES ($1,$2,NOW(),NOW()) RETURNING *`,
			[result.email, password])).rows[0]
		console.log(user);

	}
	req.session.user = {}
	// if(req.session){
	req.session.user.loggedIn = true
	req.session.user.userId = user.id
	// }
	// return res.status(200).json({ message: "Google Login Successful" })
	return res.redirect('/')
})