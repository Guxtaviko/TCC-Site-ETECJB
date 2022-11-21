const express = require('express')
const router = express.Router()
const course = require('../controllers/course-controller')

const validateInputs = require('../middlewares/validateInputs')
const validateUploads = require('../middlewares/validateUploads')
const onlyNumber = require('../middlewares/onlyNumber')

const upload = require('../middlewares/uploadCourseFiles')

router.get('/', course.getAll)
router.get('/novo', (req, res) => res.render('admin/forms/course', {
    course: {},
    errors: {}
}))

router.post('/novo', 
upload.fields([{
    name: 'course_img', maxCount: 1
}, {
    name: 'course_curriculum', maxCount: 1
}]), 
validateUploads(['course_img', 'course_curriculum']), 
validateInputs(['id', 'course_img', 'course_curriculum'], 'course'),
onlyNumber(['course_workload', 'course_vacancies'], 'course'),
course.createNew)

router.get('/editar/:id', course.edit)
router.put('/:id', validateInputs(['id'], 'course'), course.update)
router.delete('/:id', course.destroy)
router.get('/busca', course.search)

module.exports = router