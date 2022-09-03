import fs from 'fs';

function listAllJs(path: string) {
    // The process.cwd() gives current
    // working directory
    fs.promises.readdir(path)

        // If promise resolved and
        // data are fetched
        .then(filenames => {
            for (let filename of filenames) {
                console.log(filename)
            }
        })

        // If promise is rejected
        .catch(err => {
            console.log(err)
        })
}

async function listAllJs2(path: string) {
    // The process.cwd() gives current
    // working directory
    try {

        let filenames = await fs.promises.readdir(path)

        // // If promise resolved and
        // // data are fetched
        // .then(filenames => {
        for (let filename of filenames) {
            console.log(filename)
        }
        // })

        // If promise is rejected
    }
    catch {
        (err: any) => {
            console.log(err)
        }
    }
}


listAllJs2('C:\\Users\\JeffreyLiu\\Documents\\tecky-exercises');