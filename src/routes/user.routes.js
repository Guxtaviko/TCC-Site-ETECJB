const express = require('express');
const router = express.Router();
const user = require('../controllers/user-controller')

router.get('/', user.getAll)
router.get('/novo', (req, res) => res.render('admin/forms/user', {user: {}}))
router.post('/novo', user.createNew)
router.delete('/:id', user.destroy)
router.get('/busca', user.search)

module.exports = router