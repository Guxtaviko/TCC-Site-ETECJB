const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/cursos', (req, res) => res.render('courses'));
router.get('/noticias', (req, res) => res.render('news'))
router.get('/sobre', (req, res) => res.render('about'))
router.get('/diretoria_academica', (req, res) => res.render('academicBoard'))
router.get('/diretoria_de_servicos', (req, res) => res.render('servicesBoard'))
router.get('/contato', (req, res) => res.render('contact'))

router.get('/login', (req, res) => res.render('login'))

module.exports = router;