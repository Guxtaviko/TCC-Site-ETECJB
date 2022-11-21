const fs = require('fs')

const validateUploads = (fields) => {
    return (req, res, next) => {
    if(req.files != undefined) {
        if(Object.keys(req.files).length != fields.length) {
            fields.forEach(field => {
                if(req.files[field] !== undefined) {
                fs.unlink(req.files[field][0].path, (err) => {
                    if (err) throw(err)
                })
                }
            })
        }
    }
        next()
    }
}

module.exports = validateUploads