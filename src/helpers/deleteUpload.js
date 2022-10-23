const fs = require('fs')

const deleteUpload = (req) => {
    if(req.files !== undefined) {
        for (const key in req.files) {
            if (Object.hasOwnProperty.call(req.files, key)) {
                const field = req.files[key][0];
                fs.unlink(field.path, (err) => {
                    if (err) throw(err)
                })
            }
        }
    }
}

module.exports = deleteUpload