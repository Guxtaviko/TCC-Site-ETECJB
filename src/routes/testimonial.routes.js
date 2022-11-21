const express = require('express')
const router = express.Router()
const testimonial = require('../controllers/testimonial-controller')

const validateInputs = require('../middlewares/validateInputs')
const onlyNumber = require('../middlewares/onlyNumber')

const upload = require('../middlewares/uploadTestimonialImg')

router.get('/', testimonial.getAll)
router.get('/novo', (req, res) => res.render('admin/forms/testimonial', {
    testimonial: {},
    errors: {}
}))

router.post('/novo', upload.fields([{
    name: 'testimonial_img', maxCount: 1
}]),
validateInputs(['id', 'testimonial_img'], 'testimonial'),
onlyNumber(['testimonial_year'], 'testimonial'), 
testimonial.createNew)

router.get('/editar/:id', testimonial.edit)
router.put('/:id', validateInputs(['id'], 'testimonial'), onlyNumber(['testimonial_year'], 'testimonial'), testimonial.update)
router.delete('/:id', testimonial.destroy)
router.get('/busca', testimonial.search)

module.exports = router