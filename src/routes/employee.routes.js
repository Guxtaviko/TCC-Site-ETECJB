const express = require('express');
const router = express.Router();
const employee = require('../controllers/employee-controller')
const validateInputs = require('../middlewares/validateInputs')
const onlyLetter = require('../middlewares/onlyLetter')

router.get('/', employee.getAll)
router.get('/novo', (req, res) => res.render('admin/forms/employee', {
    employee: {},
    errors: {}
}))
router.post('/novo', validateInputs(['id'], 'employee'), onlyLetter(['id'], 'employee'), employee.createNew)
router.get('/editar/:id', employee.edit)
router.put('/:id', validateInputs(['id'], 'employee'), onlyLetter(['id'], 'employee'), employee.update)
router.delete('/:id', employee.destroy)
router.get('/busca', employee.search)

module.exports = router;