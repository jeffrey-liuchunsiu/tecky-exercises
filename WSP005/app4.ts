import express from 'express'

const app = express()

app.get('/test-api', (req, res, next) => {
	res.status(200).send('Success')
})

const PORT = 8080

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`)
})
