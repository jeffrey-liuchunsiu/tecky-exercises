import express from 'express'
// import expressSession from 'express-session';
import path from 'path'
import jsonfile from 'jsonfile'
export const loginRoutes = express.Router()
import { form, client } from '../main'

loginRoutes.post('/', async (req: express.Request, res: express.Response) => {
	// res.status(200).send("Success Login!");
	// let username = req.body.username
	// let password = req.body.password
	// res.sendFile('/public/login.html')

	// res.sendFile(path.join(__dirname, '/public/login.html'))
	const users = await jsonfile.readFile(path.join('public', 'user.json'))
	form.parse(req, async (err, fields, files) => {
		// if(files.length >0)
		// let file = Array.isArray(files.image) ? files.image[0] : files.image
		// console.log(fields.content);
		let username = fields.username
		let password = fields.password
		// console.log("username: ", username);
		// console.log("password: ", password);

		req.session['user'] = false
		let userResult = await client.query(/*sql*/`SELECT * FROM users WHERE username=($1) AND password=($2)`,
			[username, password]);

		console.log(userResult.rowCount);


		if (userResult.rowCount > 0) {
			// for (let user of users) {
			// 	// for (let key in password){
			// 	if (user.username === username && user.password === password) {
			// console.log("login successfully");
			// let path1 = path.join("public", "admin.html")
			// console.log(path1);
			// res.redirect(path.join("", "admin.html"));
			// req.session["user"] = true;
			req.session.user = true
			req.session.username = userResult.rows[0].username
			req.session.userId = userResult.rows[0].id;
			req.session.save()
			res.status(200)
			// res.status(200).redirect("/admin.html");
			// res.status(200).send("/");
			// res.status(200).json({ message: "Login Successful" })
			console.log("req.session", req.session);
			return
			// 	}
			// }
		}
		// console.log(req.session["user"]);
		// console.log("login fail");

		res.status(400).send('/login.html')

		// res.redirect('/?msg=Login Failed')
		// res.sendFile(path.resolve('./public/404.html'))
	})
})
