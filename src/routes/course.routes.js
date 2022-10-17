const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('admin/courses-management'))
router.get('/novo', (req, res) => res.render('admin/forms/course'))

module.exports = router