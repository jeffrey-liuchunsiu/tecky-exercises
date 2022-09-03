import readline from 'readline';
import fs from 'fs';
import path from 'path';

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export function askQuestion(question: string): Promise<string> {
    // let answerResult: string | number
    return new Promise<string>(function (resolve, reject) {
        readLineInterface.question(question, (answer: string) => {
            resolve(answer)
        });
    });
}



export async function listAllJsRecursive(studyPath: string) {
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
            // console.log("filename: ", filename)

            if (!filename.includes(".")) {
                let subPath = path.join(rootPath, filename)
                // console.log("subPath: ", subPath);
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

