
import fs from 'fs';
import path from 'path';

// async function listAllJs(studyPath: string) {
//     // The process.cwd() gives current
//     // working directory
//     try {

//         let filenames = await fs.promises.readdir(path)

//         // // If promise resolved and
//         // // data are fetched
//         // .then(filenames => {
//         for (let filename of filenames) {
//             console.log(filename)
//         }
//         // })

//         // If promise is rejected
//     }
//     catch {
//         (err: any) => {
//             console.log(err)
//         }
//     }
// }



async function listAllJsRecursive(studyPath: string) {
    const rootPath = studyPath

    // let pathArray = [rootPath]
    // The process.cwd() gives current
    // working directory
    try {

        let filenames = await fs.promises.readdir(studyPath)

        // // If promise resolved and
        // // data are fetched
        // .then(filenames => {
        for (let filename of filenames) {
            console.log("filename: ", filename)

            if (!filename.includes(".")) {
                let subPath = path.join(rootPath, filename)
                console.log("subPath: ", subPath);
                try {
                    await listAllJsRecursive(subPath);
                } catch {
                    (err: any) => {
                        console.log(err)
                    }
                }
            }
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


listAllJsRecursive('C:\\Users\\JeffreyLiu\\Documents\\tecky-exercises\\WEF002');