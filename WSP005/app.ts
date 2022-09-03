import express from 'express'
import { Request, Response } from 'express'
import path from 'path'

const app = express()

app.get('/', function (req: Request, res: Response) {
    // res.end('Hello World')
    res.json({
        name: "jeffrey"
    })
})

// app.use(express.static("public"))
app.use(express.static("assets"))

// console.log(path.resolve('assets', 'test.txt'));
app.get('/text', (req, res) => {

    res.sendFile(path.resolve('public', 'assets', 'test.txt'))
})
const PORT = 8080

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})
