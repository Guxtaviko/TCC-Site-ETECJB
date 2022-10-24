const multer = require('multer')

module.exports = (multer ({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './src/public/uploads/news')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + '_' + file.originalname.toLowerCase())
        }
    }),
    fileFilter: (req, file, cb) => {
        const extension = ['image/png', 'image/jpeg', 'image/jpg'].find(acceptFormat => acceptFormat == file.mimetype)

        if(extension) return cb(null, true)

        req.fileType = 'Wrong file type'
        return cb(null, false)
    }
}))