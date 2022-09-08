import express from 'express'
// import { Request, Response } from 'express'
import path from 'path'

export const isLoggedIn = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	// console.log(req.session);

	// console.log(req.session?.user);s

	if (req.session.user?.loggedIn) {
		next()
	} else {
		// res.redirect("/");
		// console.log(path.join(__dirname, '/public/login.html'));
		res.status(400).send('/login_status.html')
		// res.status(400).redirect("/login.html");
		// res.sendFile(path.join(__dirname, '/public/login.html'))
	}
}
