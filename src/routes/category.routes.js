const express = require('express');
const router = express.Router();
const category = require('../controllers/category-controller')
const validateInputs = require('../middlewares/validateInputs')

router.get('/', category.getAll)
router.get('/novo', (req, res) => res.render('admin/forms/category', {
    category: {},
    errors: {}
}))
router.post('/novo', validateInputs(['id'], 'category'), category.createNew)
router.get('/editar/:id', category.edit)
router.put('/:id', validateInputs(['id'], 'category'), category.update)
router.delete('/:id', category.destroy)
router.get('/busca', category.search)

module.exports = router;