
window.onload = () => {
    loadMemos();
    // test()
};

// function test() {

document.querySelector('#memo-form')
    .addEventListener('submit', async (event) => {
        event.preventDefault(); // To prevent the form from submitting synchronously
        const form = event.target;
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
        const res = await fetch('/memo', {
            method: "POST",
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // },
            // body: JSON.stringify(formObject)
            body: formData
        })
        // .then((res) => {
        form.content.value = "輸入内容"
        // });
        if (res.status === 200) {
            loadMemos()
        }
        // // document.querySelector("#memo-input").innerHTML = "輸入内容"
        // // Clear the form here

    });


document.querySelector('#login-form')
    .addEventListener('submit', async (event) => {
        event.preventDefault(); // To prevent the form from submitting synchronously
        const form = event.target;
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
            method: "POST",
            // body: JSON.stringify(formObject)
            body: formData
        })
        if (res.status === 200) {
            let toPage = await res.text()
            console.log('toPage = ', toPage)
            console.log("login successful");
            // window.location = toPage
        }
        // // document.querySelector("#memo-input").innerHTML = "輸入内容"
        // // Clear the form here

    });

document.querySelector('.liked-word')
    .addEventListener('submit', async (event) => {
        window.location = ""
    });


export async function loadMemos() {
    const res = await fetch('/memos'); // Fetch from the correct url
    const memos = await res.json();
    const memosContainer = document.querySelector('.memo-area');
    memosContainer.innerHTML = ""

    // console.log(memosContainer.innerHTML);
    let index = 0
    for (let memo of memos) {
        memosContainer.innerHTML +=
            `<div class="col-lg-3 memo-without-login">
            <div class="memo-input-item">
                <button class="delete"><i class="bi bi-trash-fill"></i></button>
                <form action="/">
                    <textarea class="memo-input" id="memo-input-${index}" name="memo-text">${memo.content}</textarea>
                </form>
                <button class="edit"><i class="bi bi-pencil-square"></i></i>
            </div>
        </div>`
        index++
    }

    const memoDivs = [...document.querySelectorAll('.memo-without-login')];
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
        memoDiv.querySelector('.edit').addEventListener('click', async (event) => {
            // Do your fetch  logic here
            // console.log(event.currentTarget);
            let textarea = document.querySelector(`#memo-input-${index}`)
            // console.log(textarea.value);
            let formObject = {
                index: index,
                content: textarea.value
            };
            const res = await fetch('/memo', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObject)
            })
        });
        memoDiv.querySelector('.delete').addEventListener('click', async (event) => {
            // Do your fetch  logic here
            // console.log(event.currentTarget);
            // let textarea = document.querySelector(`#memo-input-${index}`)
            // console.log(textarea.value);
            let formObject = {
                index: index
                // content: textarea.value
            };
            const res = await fetch('/memo', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObject)
            })
                .then(() => {
                    loadMemos()
                })
        });

    }
}