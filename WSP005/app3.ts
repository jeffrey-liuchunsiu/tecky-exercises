import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import expressSession from 'express-session'

const app = express()

app.use(
	expressSession({
		secret: 'happy',
		resave: true,
		saveUninitialized: true
	})
)

declare module 'express-session' {
	interface SessionData {
		// name?: string
	}
}

app.get('/', (req, res, next) => {
	console.log('1.1')

	req.session
	if (2 > 0.5) {
		next() // Going to run the next middleware
		// return
	}

	console.log('1.2')
	// Skip all middlewares afterwards
	// res.end('Random value smaller than 0.5')
})

app.get('/', (req, res, next) => {
	console.log('2.1')
	if (2 > 0.5) {
		for (let i = 0; i < 10; i++) {
			console.log('2.2')
			// next()
		}
		return
	}
	console.log('2.3')
	// res.end('Random value smaller than 0.5')
})

// app.use((req, res, next) => {
//     res.end(`Random value is greater than 0.5 twice!`)
// })

const PORT = 8080

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`)
})
