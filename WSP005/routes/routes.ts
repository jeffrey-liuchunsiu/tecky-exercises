import express from 'express';
// import expressSession from 'express-session';
import path from 'path';
import jsonfile from 'jsonfile';
export const memoRoutes = express.Router();
export const loginRoutes = express.Router();
import { form } from '../main';
// import { mainModule } from 'process';



memoRoutes.get('/', getMemos);

export async function getMemos(req: express.Request, res: express.Response) {
    try {
        const data = await jsonfile.readFile(path.join("public", "memos.json"));
        res.status(200).json(data);
    } catch {
        res.status(400).sendFile(path.resolve('../public/404.html'));
    }
}

// app.get("/memos", async (req, res) => {
//     try {
//         const data = await jsonfile.readFile(path.join("public", "memos.json"));
//         res.status(200).json(data);
//     } catch {
//         res.status(400).sendFile(path.resolve('./public/404.html'));
//     }
// })

loginRoutes.post('/login', loginRoute);
// memoRoutes.get('/memos', getMemos);

// app.post("/login", async (req, res) => {
export async function loginRoute(req: express.Request, res: express.Response) {
    // res.status(200).send("Success Login!");
    // let username = req.body.username
    // let password = req.body.password
    const users = await jsonfile.readFile(path.join("public", "user.json"));

    form.parse(req, async (err, fields, files) => {
        // if(files.length >0)
        // let file = Array.isArray(files.image) ? files.image[0] : files.image
        // console.log(fields.content);
        let username = fields.username
        let password = fields.password
        console.log("username: ", username);
        console.log("password: ", password);

        req.session["user"] = false;

        for (let user of users) {
            // for (let key in password){
            if (user.username === username && user.password === password) {
                console.log("login successfully");
                // let path1 = path.join("public", "admin.html")
                // console.log(path1);
                // res.redirect(path.join("", "admin.html"));
                // req.session["user"] = true;
                req.session.user = true;
                req.session.save()
                res.status(200)
                // res.status(200).redirect("/admin.html");
                // res.status(200).send("/");
                // res.status(200).json({ message: "Login Successful" })
                console.log("req.session.user", req.session.user);
                return
            }
        }
        // console.log(req.session["user"]);
        // console.log("login fail");

        res.status(400).json({ message: "Login Failed" })

        // res.redirect('/?msg=Login Failed')
        // res.sendFile(path.resolve('./public/404.html'))

    })

}