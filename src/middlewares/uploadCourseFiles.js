const multer = require('multer')

module.exports = (multer ({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let type
            if (file.fieldname == 'course_img') type = 'imgs';
            else type = 'curricula'
            cb(null, `./src/public/uploads/courses/${type}`)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + '_' + file.originalname.toLowerCase().split(' ').join('_'))
        }
    }),
    fileFilter: (req, file, cb) => {
        let extension
        if(file.fieldname == 'course_img') {
            extension = ['image/png', 'image/jpeg', 'image/jpg'].find(acceptFormat => acceptFormat == file.mimetype)
        } else {
            extension = ['application/pdf'].find(acceptFormat => acceptFormat == file.mimetype)
        }
        if(extension) return cb(null, true)

        return cb(null, false)
    }
}))