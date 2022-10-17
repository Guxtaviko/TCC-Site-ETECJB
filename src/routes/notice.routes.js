const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('admin/news-management'))
router.get('/novo', (req, res) => res.render('admin/forms/notice'))

module.exports = router