const express = require('express');
const router = express.Router();
const employee = require('../controllers/employee-controller')
const validateInputs = require('../middlewares/validateInputs')

router.get('/', employee.getAll)
router.get('/novo', (req, res) => res.render('admin/forms/employee', {employee: {}}))
router.post('/novo', validateInputs(['id'], 'employee'), employee.createNew)
router.get('/editar/:id', employee.edit)
router.put('/:id', employee.update)
router.delete('/:id', employee.destroy)
router.get('/busca', employee.search)

module.exports = router;