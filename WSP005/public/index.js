window.onload = () => {
	loadMemos()
	// test()
}

// function test() {

document
	.querySelector('#memo-form')
	.addEventListener('submit', async (event) => {
		event.preventDefault() // To prevent the form from submitting synchronously
		const form = event.target
		const formData = new FormData()
		let content = form.content.value
		// console.log("content: ", content);
		let image = form.image.files[0]
		// console.log(form.image);
		// console.log("image: ", image);
		formData.append('content', content)
		formData.append('image', image)
		// console.log(formData);
		// let formObject = {
		//     content: textarea.value
		// };
		// //... create your form object with the form inputs
		// const res =
		const res = await fetch('/memos', {
			method: 'POST',
			// headers: {
			//     "Content-Type": "multipart/form-data"
			// },
			// body: JSON.stringify(formObject)
			body: formData
		})
		// .then((res) => {
		form.content.value = ''
		// });
		if (res.status === 200) {
			loadMemos()
		}
		// // document.querySelector("#memo-input").innerHTML = "輸入内容"
		// // Clear the form here
	})

document
	.querySelector('#login-form')
	.addEventListener('submit', async (event) => {
		event.preventDefault() // To prevent the form from submitting synchronously
		const form = event.target
		const formData = new FormData()
		let username = form.username.value
		// console.log("username: ", username);
		let password = form.password.value
		// console.log("password: ", password);
		formData.append('username', username)
		formData.append('password', password)
		// let textarea = document.querySelector("#memo-form")
		// console.log(formData);
		// let formObject = {
		//     content: textarea.value
		// };
		// console.log(form);
		// //... create your form object with the form inputs
		let res = await fetch('/login', {
			method: 'POST',
			// body: JSON.stringify(formObject)
			body: formData
		})
		if (res.status === 400) {
			let toPage = await res.text()
			// console.log("toPage = ", toPage);
			window.location = toPage
		}
		// // document.querySelector("#memo-input").innerHTML = "輸入内容"
		// // Clear the form here
	})

document
	.querySelector('.liked-word')
	.addEventListener('click', async (event) => {
		console.log('filter')
		let res = await fetch('/likedmemo')
		// console.log(result);
		if (res.status === 400) {
			let toPage = await res.text()
			window.location = toPage
		} else if (res.status === 200) {
			let data = await res.json()
			loadMemos(data)
		}
	})

document
	.querySelector('.liked-button')
	.addEventListener('click', async (event) => {
		console.log('filter')
		let res = await fetch('/likedmemo')
		// console.log(result);
		if (res.status === 400) {
			let toPage = await res.text()
			window.location = toPage
		} else if (res.status === 200) {
			let data = await res.json()
			loadMemos(data)
		}
	})

export async function loadMemos(data) {
	let res
	let memos
	if (data) {
		memos = data
	} else {
		res = await fetch('/memos') // Fetch from the correct url
		memos = await res.json()
	}
	// console.log(memos);
	const memosContainer = document.querySelector('.memo-area')
	memosContainer.innerHTML = ''

	// console.log(memosContainer.innerHTML);
	let index = 0
	for (let memo of memos) {
		let imageHTML
		if (memo.image) {
			imageHTML = `
      <div>
        <img src="uploads\\${memo.image}" alt="memo-image" class="image">
      </div>`
		} else {
			imageHTML = ''
		}

		memosContainer.innerHTML += `<div class="col-lg-3 memo-without-login">
            <div class="memo-input-item">
              <div class="count-container count-${index}">${memo.count}</div>
                <button class="delete"><i class="bi bi-trash-fill"></i></button>
                <form action="/">
                    <textarea class="memo-input memo-input-${index}" name="memo-text">${memo.content}</textarea>
                </form>
                <button class="like"><i class="bi bi-hand-thumbs-up"></i></button>
                <button class="edit"><i class="bi bi-pencil-square"></i></button>
            </div>
            ${imageHTML}
        </div>`
		index++
	}

	const memoDivs = [...document.querySelectorAll('.memo-without-login')]
	// for (const memoDiv of memoDivs) {
	//     const id = memoDiv.getAttribute('data-id')
	//     memoDiv.querySelector('.bi-pencil-square').addEventListener('click', async (event) => {
	//         // logic for updating memo
	//     });
	//     memoDiv.querySelector('.bi-trash-fill').addEventListener('click', async (event) => {
	//         // logic for deleting memo
	//     });
	// }
	for (let index in memoDivs) {
		const memoDiv = memoDivs[index]
		// console.log(memoDiv);
		memoDiv
			.querySelector('.edit')
			.addEventListener('click', async (event) => {
				// Do your fetch  logic here
				// console.log(event.currentTarget);
				let textarea = document.querySelector(`.memo-input-${index}`)
				// console.log(textarea.value);
				let formObject = {
					index: index,
					content: textarea.value
				}
				const res = await fetch('/memos', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formObject)
				})
				if (res.status === 400) {
					let toPage = await res.text()
					window.location = toPage
				} else {
					loadMemos()
				}
			})
		memoDiv
			.querySelector('.delete')
			.addEventListener('click', async (event) => {
				// Do your fetch  logic here
				// console.log(event.currentTarget);
				// let textarea = document.querySelector(`#memo-input-${index}`)
				// console.log(textarea.value);
				let formObject = {
					index: index
					// content: textarea.value
				}
				const res = await fetch('/memos', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formObject)
				})
				if (res.status === 400) {
					let toPage = await res.text()
					window.location = toPage
				} else {
					loadMemos()
				}
			})
		memoDiv
			.querySelector('.like')
			.addEventListener('click', async (event) => {
				// Do your fetch  logic here
				// console.log(event.currentTarget);
				// let count = document.querySelector(`.count-${index}`).innerHTML;
				let countObject = {
					index: index
					// count: count,
				}
				// console.log(countObject);
				const res = await fetch('/memos/like', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(countObject)
				})
				let toPage = await res.text()

				if (res.status === 400) {
					window.location = toPage
				} else {
					loadMemos()
				}
			})
	}
}
