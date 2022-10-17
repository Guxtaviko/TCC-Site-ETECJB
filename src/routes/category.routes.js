const express = require('express');
const router = express.Router();
const category = require('../controllers/category-controller')

router.get('/', category.getAll)
router.get('/novo', (req, res) => res.render('admin/forms/category', {category: {}}))
router.post('/novo', category.createNew)
router.get('/editar/:id', category.edit)
router.put('/:id', category.update)
router.delete('/:id', category.destroy)
router.get('/busca', category.search)

module.exports = router;