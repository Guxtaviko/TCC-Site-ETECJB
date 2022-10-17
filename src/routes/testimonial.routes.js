const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('admin/testimonials-management'))
router.get('/novo', (req, res) => res.render('admin/forms/testimonial'))

module.exports = router