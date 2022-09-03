import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import expressSession from 'express-session'
import jsonfile from 'jsonfile';
import formidable from 'formidable'
import fs from 'fs';
import { memoRoutes, loginRoutes } from './routes/routes';
import { isLoggedIn } from './guard';

// let counter = 0;
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    expressSession({
        secret: 'jeffrey-secret',
        resave: true,
        saveUninitialized: true,
    }),
)

declare module 'express-session' {
    interface SessionData {
        username?: string,
        password?: number,
        counter?: number,
        user?: boolean
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
    filter: part => {
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
})


app.use(function (req: Request, res: Response, next) {
    let date = new Date()
    let dateString = date.toLocaleDateString()
    let timeString = date.toLocaleTimeString()
    console.log(`[${dateString} ${timeString}] Request: ${req.path}`);
    console.log(` Request session: `, req.session);


    next()

})

// app.get('/', function (req: Request, res: Response, next) {
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

app.post('/contact', (req, res) => {
    form.parse(req, (err, fields, files) => {
        console.log({ err, fields, files })
        res.redirect('/')
    })
})

app.post("/memo", async (req: Request, res: Response, next) => {

    // let content = req.body.content;
    // console.log(content);
    let content: any

    let data = await jsonfile.readFile(path.join("public", "memos.json"));
    // let filepath
    form.parse(req, async (err, fields, files) => {
        // if(files.length >0)
        let file = Array.isArray(files.image) ? files.image[0] : files.image
        // console.log(fields.content);
        content = fields.content

        // console.log(file.originalFilename)
        // filepath = files.image.PersistentFile.filepath;
        let memoItem: any = {}
        let fileName
        if (file) {
            fileName = file.originalFilename
            memoItem.content = content;
            memoItem.image = fileName;
        } else {
            memoItem.content = content;
        }
        data.push(memoItem)
        // data.push({
        //     content: content,
        //     image: fileName ? fileName : null
        // });
        await jsonfile.writeFile(path.join("public", "memos.json"), data, { spaces: 2 });
        // res.status(200)//.send("submitted memo")
        res.status(200).json({ memoPosted: true })
    })
    // next()
    // res.redirect("/")
})


app.use('/memos', memoRoutes);

app.use(loginRoutes)

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
app.put("/memo", async (req: Request, res: Response, next) => {
    let index = req.body.index;
    let content = req.body.content;
    // console.log(index);
    // console.log(content);
    try {
        const data = await jsonfile.readFile(path.join("public", "memos.json"));
        // console.log(data[index]);
        data[index].content = content;
        // console.log(data);
        await jsonfile.writeFile(path.join("public", "memos.json"), data, { spaces: 2 });
        res.json({ memoUpdated: true })
        // res.status(200).json(data);
    } catch {
        res.status(400).sendFile(path.resolve('./public/404.html'));
    }
})

app.delete("/memo", isLoggedIn, async (req: Request, res: Response, next) => {
    let index = req.body.index;
    // let content = req.body.content;
    // console.log(index);
    // console.log(content);
    try {
        const data = await jsonfile.readFile(path.join("public", "memos.json"));
        // console.log(data[index]);
        data.splice(index, 1)
        // data[index].content = content;
        // console.log(data);
        await jsonfile.writeFile(path.join("public", "memos.json"), data, { spaces: 2 });
        res.json({ memoDeleted: true })
        // res.status(200).json(data);
    } catch {
        res.status(400).sendFile(path.resolve('./public/404.html'));
    }
})


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
app.use(express.static("public"))

app.use(isLoggedIn, express.static('protected'))


app.use((req, res) => {
    res.sendFile(path.resolve('./public/404.html'))
})
const PORT = 8080

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})
