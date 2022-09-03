import fs from 'fs';

async function fsWriteFilePromise(file: string, content: string, options: { flag: string }) {
    return await new Promise(function (resolve, reject) {
        fs.writeFile(file, content, options, function (err: any) {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}