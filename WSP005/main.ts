import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import expressSession from 'express-session'
import jsonfile from 'jsonfile'
import formidable from 'formidable'
import fs from 'fs'
import { memoRoutes } from './routes/memoRoutes'
import { userRoutes } from './routes/userRoutes'
import { isLoggedIn } from './guard'
import { logger } from './logger'
import { Client } from 'pg';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import grant from 'grant';

dotenv.config();
export const client = new Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
});

client.connect()
const app = express()
const server = new http.Server(app);
export const io = new SocketIO(server);
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
	expressSession({
		secret: 'jeffrey-secret',
		resave: true,
		saveUninitialized: true
	})
)
//grant need to be after session is created
const grantExpress = grant.express({
	"defaults": {
		"origin": "http://localhost:8080",
		"transport": "session",
		"state": true,
	},
	"google": {
		"key": process.env.GOOGLE_CLIENT_ID || "",
		"secret": process.env.GOOGLE_CLIENT_SECRET || "",
		"scope": ["profile", "email"],
		"callback": "/user/login/google"
	}
});
app.use(grantExpress as express.RequestHandler);

declare module 'express-session' {
	interface SessionData {
		user?: {
			loggedIn?: boolean
			username?: string
			password?: number
			counter?: number
			liked_usernames?: Array<string>
			userId?: number
		}
		grant?: any
	}
}

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

export const form = formidable({
	uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB

	// filter: part => { console.log(part); return part.mimetype?.startsWith('image/') || false; },
	filter: (part) => {
		if (part && part.mimetype) {
			// console.log(part)
			const type = part.mimetype
			if (type.startsWith('image/')) {
				return true
			}
		}
		return false
	},
	// filter: part => part.mimetype?.startsWith('image/') || false,
	filename: (originalName, originalExt, part, form) => {
		let ext = part.mimetype?.split('/').pop()
		let timestamp = Date.now()
		return `${originalName}-${timestamp}.${ext}`
	}
})

app.use(function (req: Request, res: Response, next) {
	let date = new Date()
	let dateString = date.toLocaleDateString()
	let timeString = date.toLocaleTimeString()
	console.log(`[${dateString} ${timeString}] Request: ${req.path}`)
	// console.log(` Request session: `, req.session);

	next()
})

// app.use(function (req: Request, res: Response, next) {
//     // counter++
//     // req.session["counter"] = counter

//     if (req.session.counter) {
//         req.session.counter += 1
//     } else {
//         req.session.counter = 1
//     }
//     // console.log("counter: " + req.session.counter)

//     let object = {
//         counter: req.session["counter"],
//         path: req.path
//     }
//     console.log(object);

//     // res.redirect("/index.html")
//     // console.log(req.session["counter"]);
//     next()

// })

// app.post('/contact', (req, res) => {
//     form.parse(req, (err, fields, files) => {
//         console.log({ err, fields, files })
//         res.redirect('/')
//     })
// })

// app.post("/memo", async (req: Request, res: Response, next) => {

//     // let content = req.body.content;
//     // console.log(content);
//     let content: any

//     let data = await jsonfile.readFile(path.join("public", "memos.json"));
//     // let filepath
//     form.parse(req, async (err, fields, files) => {
//         // if(files.length >0)
//         let file = Array.isArray(files.image) ? files.image[0] : files.image
//         // console.log(file);
//         content = fields.content

//         // console.log(file.originalFilename)
//         // filepath = files.image.PersistentFile.filepath;
//         let memoItem: any = {}
//         let fileName
//         if (file) {
//             fileName = file.newFilename
//             memoItem.content = content;
//             memoItem.image = fileName;
//             memoItem.count = 0;
//             memoItem.liked_usernames=[];
//         } else {
//             memoItem.content = content;
//             memoItem.count = 0;
//             memoItem.liked_usernames=[];
//         }
//         data.push(memoItem)
//         // data.push({
//         //     content: content,
//         //     image: fileName ? fileName : null
//         // });
//         await jsonfile.writeFile(path.join("public", "memos.json"), data, { spaces: 2 });
//         // res.status(200)//.send("submitted memo")
//         res.status(200).json({ memoPosted: true })
//     })
//     // next()
//     // res.redirect("/")
// })

app.use('/memos', memoRoutes)

app.use('/user', userRoutes)

// const isLoggedIn = (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction,
// ) => {
//     console.log(req.session?.user);
//     if (req.session?.user) {
//         next()
//     } else {
//         res.redirect("/");
//     }
// }

// app.put("/memo", isLoggedIn, async (req: Request, res: Response, next) => {
//     let index = req.body.index;
//     let content = req.body.content;
//     // console.log(index);
//     // console.log(content);
//     try {
//         const data = await jsonfile.readFile(path.join("public", "memos.json"));
//         // console.log(data[index]);
//         data[index].content = content;
//         // console.log(data);
//         await jsonfile.writeFile(path.join("public", "memos.json"), data, { spaces: 2 });
//         res.json({ memoUpdated: true })
//         // res.status(200).json(data);
//     } catch {
//         res.status(400).sendFile(path.resolve('./public/404.html'));
//     }
// })

// app.delete("/memo", isLoggedIn, async (req: Request, res: Response, next) => {
//     let index = req.body.index;
//     // let content = req.body.content;
//     // console.log(index);
//     // console.log(content);
//     try {
//         const data = await jsonfile.readFile(path.join("public", "memos.json"));
//         // console.log(data[index]);
//         data.splice(index, 1)
//         // data[index].content = content;
//         // console.log(data);
//         await jsonfile.writeFile(path.join("public", "memos.json"), data, { spaces: 2 });
//         res.json({ memoDeleted: true })
//         // res.status(200).json(data);
//     } catch {
//         res.status(400).sendFile(path.resolve('./public/404.html'));
//     }
// })

// app.put("/like",isLoggedIn, async (req: Request, res: Response, next) => {
//     let index = req.body.index;
//     // let count = req.body.count;
//     let username = req.session.username;
//     // console.log(index);
//     // console.log(count);
//     try {
//         const data = await jsonfile.readFile(path.join("public", "memos.json"));
//         // console.log(data[index]);
//         // console.log(data[index].liked_usernames.includes(username));
//         if(data[index].liked_usernames.includes(username)){
//             data[index].liked_usernames = data[index].liked_usernames.filter((item:string)=>{
//                 return item!== username});
//         }else{
//             data[index].liked_usernames.push(username);
//         }
//         data[index].count = data[index].liked_usernames.length;
//         await jsonfile.writeFile(path.join("public", "memos.json"), data, { spaces: 2 });
//         res.status(200).json({ likeUpdated: true })
//         // res.status(200).json(data);
//     } catch {
//         res.status(400).sendFile(path.resolve('./public/404.html'));
//     }
// })

// app.get('/likedmemo', isLoggedIn, async (req: Request, res: Response, next) => {
// 	// let username = req.session.username
// 	let userId = req.session.userId
// 	// console.log(userId)
// 	// console.log(username);

// 	try {
// 		// let data = await jsonfile.readFile(path.join('public', 'memos.json'))
// 		// let data: any = await client.query(/*sql*/`SELECT * from memos`)
// 		// type Memo = {
// 		//     content?: string,
// 		//     image?: string,
// 		//     count?: number,
// 		//     liked_usernames?: Array<string>
// 		// }

// 		// let result = data.filter((memo: any) => {
// 		// 	return memo.liked_usernames.includes(username)
// 		// })
// 		let result = await client.query(/*sql*/`SELECT * from users 
// 		INNER JOIN likes on likes.user_id = users.id
// 		INNER JOIN memos on likes.memo_id = memos.id
// 		WHERE user_id = ($1)`, [userId])
// 		// console.log(result.rows);

// 		res.status(200).json(result.rows)
// 		// res.status(200).json(data);
// 	} catch {
// 		res.status(400).sendFile(path.resolve('./public/404.html'))
// 	}
// })

// app.use('/memos', memoRoutes);

// app.get("/memos", async (req, res) => {
//     try {
//         const data = await jsonfile.readFile(path.join("public", "memos.json"));
//         res.status(200).json(data);
//     } catch {
//         res.status(400).sendFile(path.resolve('./public/404.html'));
//     }
// })

// app.use("/login", loginRoutes)

// app.post("/login", async (req, res) => {
//     // res.status(200).send("Success Login!");
//     // let username = req.body.username
//     // let password = req.body.password
//     const users = await jsonfile.readFile(path.join("public", "user.json"));

//     form.parse(req, async (err, fields, files) => {
//         // if(files.length >0)
//         // let file = Array.isArray(files.image) ? files.image[0] : files.image
//         // console.log(fields.content);
//         let username = fields.username
//         let password = fields.password
//         console.log("username: ", username);
//         console.log("password: ", password);

//         req.session["user"] = false;
//         for (let user of users) {
//             // for (let key in password){
//             if (user.username === username && user.password === password) {
//                 console.log("login successfully");
//                 // let path1 = path.join("public", "admin.html")
//                 // console.log(path1);
//                 // res.redirect(path.join("", "admin.html"));
//                 req.session["user"] = true;
//                 // res.status(200)
//                 // res.status(200).redirect("/admin.html");
//                 res.status(200).send("/admin.html");
//                 // console.log(req.session["user"]);
//                 return
//             }
//         }
//         // console.log(req.session["user"]);
//         // console.log("login fail");

//         res.status(400).json({ message: "Login Failed" })

//         // res.redirect('/?msg=Login Failed')
//         // res.sendFile(path.resolve('./public/404.html'))

//     })

// })

// admin.html should be inside protected
app.use('/uploads', express.static('uploads'))
app.use(express.static('public'))

app.use(isLoggedIn, express.static('protected'))

app.use((req, res) => {
	res.sendFile(path.resolve('./public/404.html'))
})
const PORT = 8080

server.listen(PORT, () => {
	logger.info(`Listening at http://localhost:${PORT}/`)
	// console.log(`Listening at http://localhost:${PORT}/`)
})
