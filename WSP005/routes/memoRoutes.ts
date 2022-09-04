import express from 'express'
// import expressSession from 'express-session';
import path from 'path'
import jsonfile from 'jsonfile'
import { form } from '../main'
export const memoRoutes = express.Router()
import { isLoggedIn } from '../guard'
import { logger } from '../logger'

memoRoutes.get('/', async (req: express.Request, res: express.Response) => {
	// console.log(__dirname)
	// console.log(path.join(__dirname, '../uploads'))
	// console.log(path.join('../uploads'))
	// console.log(path.resolve('/uploads', '5bfc380ab3b8e082601d73400.jpg'))
	// console.log(path.resolve('/uploads'))
	// console.log(path.resolve(path.resolve('../public/404.html')))
	// console.log(path.resolve(__dirname,'route.ts'))
	// console.log(path.join(__dirname,'route.ts'))

	try {
		const data = await jsonfile.readFile(path.join('public', 'memos.json'))
		res.status(200).json(data)
	} catch (err : any){
		// res.status(400).sendFile(path.resolve('../public/404.html'))
		res.status(400).send("Get Memo Error: " + err.message)
        logger.error(err.message)
	}
})

memoRoutes.post('/', async (req: express.Request, res: express.Response) => {
	// let content = req.body.content;
	// console.log(content);
	let content: any

	let data = await jsonfile.readFile(path.join('public', 'memos.json'))
	// let filepath
	form.parse(req, async (err, fields, files) => {
		// if(files.length >0)
		let file = Array.isArray(files.image) ? files.image[0] : files.image
		// console.log(file);
		content = fields.content

		// console.log(file.originalFilename)
		// filepath = files.image.PersistentFile.filepath;
		let memoItem: any = {}
		let fileName
		if (file) {
			fileName = file.newFilename
			memoItem.content = content
			memoItem.image = fileName
			memoItem.count = 0
			memoItem.liked_usernames = []
		} else {
			memoItem.content = content
			memoItem.count = 0
			memoItem.liked_usernames = []
		}
		data.push(memoItem)
		// data.push({
		//     content: content,
		//     image: fileName ? fileName : null
		// });
		await jsonfile.writeFile(path.join('public', 'memos.json'), data, {
			spaces: 2
		})
		// res.status(200)//.send("submitted memo")
		res.status(200).json({ memoPosted: true })
	})
	// next()
	// res.redirect("/")
})

memoRoutes.put(
	'/',
	isLoggedIn,
	async (req: express.Request, res: express.Response) => {
		let index = req.body.index
		let content = req.body.content
		// console.log(index);
		// console.log(content);
		try {
			const data = await jsonfile.readFile(
				path.join('public', 'memos.json')
			)
			// console.log(data[index]);
			data[index].content = content
			// console.log(data);
			await jsonfile.writeFile(path.join('public', 'memos.json'), data, {
				spaces: 2
			})
			res.json({ memoUpdated: true })
			// res.status(200).json(data);
		} catch (err: any) {
			res.status(400).send("Update Memo Error: " + err.message)
        	logger.error(err.message)
		}
	}
)

memoRoutes.delete(
	'/',
	isLoggedIn,
	async (req: express.Request, res: express.Response) => {
		let index = req.body.index
		// let content = req.body.content;
		// console.log(index);
		// console.log(content);
		try {
			const data = await jsonfile.readFile(
				path.join('public', 'memos.json')
			)
			// console.log(data[index]);
			data.splice(index, 1)
			// data[index].content = content;
			// console.log(data);
			await jsonfile.writeFile(path.join('public', 'memos.json'), data, {
				spaces: 2
			})
			res.json({ memoDeleted: true })
			// res.status(200).json(data);
		} catch (err: any){
			res.status(400).send("Delete Memo Error: " + err.message)
        	logger.error(err.message)
		}
	}
)

memoRoutes.put(
	'/like',
	isLoggedIn,
	async (req: express.Request, res: express.Response) => {
		let index = req.body.index
		// let count = req.body.count;
		let username = req.session.username
		// console.log(index);
		// console.log(count);
		try {
			const data = await jsonfile.readFile(
				path.join('public', 'memos.json')
			)
			// console.log(data[index]);
			// console.log(data[index].liked_usernames.includes(username));
			if (data[index].liked_usernames.includes(username)) {
				data[index].liked_usernames = data[
					index
				].liked_usernames.filter((item: string) => {
					return item !== username
				})
			} else {
				data[index].liked_usernames.push(username)
			}
			data[index].count = data[index].liked_usernames.length
			await jsonfile.writeFile(path.join('public', 'memos.json'), data, {
				spaces: 2
			})
			res.status(200).json({ likeUpdated: true })
			// res.status(200).json(data);
		} catch (err: any){
			res.status(400).send("Like Memo Error: " + err.message)
        	logger.error(err.message)
		}
	}
)