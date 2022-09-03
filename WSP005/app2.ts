import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import expressSession from 'express-session'

const app = express()


app.use(
    expressSession({
        secret: 'kjhakhkhklh',
        resave: true,
        saveUninitialized: true,
    }),
)

declare module 'express-session' {
    interface SessionData {
        // password: number
        // name?: string
    }
}

app.get('/', (req, res, next) => {
    req.session
    if (Math.random() > 0.5) {
        next() // Going to run the next middleware
        return
    }
    // Skip all middlewares afterwards
    res.end('Random value smaller than 0.5')
})

app.get('/', (req, res, next) => {
    if (Math.random() > 0.5) {
        next()
        return
    }
    res.end('Random value smaller than 0.5')
})

app.use((req, res, next) => {
    res.end(`Random value is greater than 0.5 twice!`)
})

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})