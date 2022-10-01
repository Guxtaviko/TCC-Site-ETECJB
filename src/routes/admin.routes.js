const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => res.render('admin/dashboard'))
router.get('/cursos', (req, res) => res.render('admin/courses-management'))
router.get('/depoimentos', (req, res) => res.render('admin/testimonials-management'))
router.get('/funcionarios', (req, res) => res.render('admin/employees-management'))
router.get('/usuarios', (req, res) => res.render('admin/users-management'))

router.get('/noticia', (req, res) => res.render('admin/forms/notice'))
router.get('/curso', (req, res) => res.render('admin/forms/course'))
router.get('/depoimento', (req, res) => res.render('admin/forms/testimonial'))
router.get('/funcionario', (req, res) => res.render('admin/forms/employee'))
router.get('/usuario', (req, res) => res.render('admin/forms/user'))


module.exports = router;