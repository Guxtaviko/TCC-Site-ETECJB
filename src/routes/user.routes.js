const express = require('express');
const router = express.Router();
const user = require('../controllers/user-controller')
const validateInputs = require('../middlewares/validateInputs')

router.get('/', user.getAll)
router.get('/novo', (req, res) => res.render('admin/forms/user', {
    user: {},
    errors: {}
}))
router.post('/novo', validateInputs(['id'], 'user'), user.createNew)
router.delete('/:id', user.destroy)
router.get('/busca', user.search)

module.exports = router