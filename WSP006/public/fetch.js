async function switchImage() {
    const res = await fetch('https://i.insider.com/5fbd515550e71a001155724f?width=700')
    const data = await res.blob()
    console.log(data);
    const objectURL = URL.createObjectURL(data)
    console.log(objectURL);
    const image = document.querySelector(".my-image")

    image.src = objectURL

    console.log(image);
}

// switchImage()