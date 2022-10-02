
import formidable from 'formidable'
export const uploadDir = 'uploads'

export const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB

    // filter: part => { console.log(part); return part.mimetype?.startsWith('image/') || false; },
    filter: (part) => {
        if (part && part.mimetype) {
            // console.log(part)
            const type = part.mimetype
            if (type.startsWith('image/')) {
                return true
            }
        }
        return false
    },
    // filter: part => part.mimetype?.startsWith('image/') || false,
    filename: (originalName, originalExt, part, form) => {
        let ext = part.mimetype?.split('/').pop()
        let timestamp = Date.now()
        return `${originalName}-${timestamp}.${ext}`
    }
})