const express = require('express');
const router = express.Router();

const controller = require('../controllers/web-controller')

router.get('/', (req, res) => res.render('index'));
router.get('/cursos', (req, res) => res.render('courses'));


router.get('/noticias', controller.renderNews);
router.get('/noticia/:title', controller.renderNotice)
router.get('/noticias/busca', controller.findNotice)
router.get('/noticias/categoria/:cat', controller.filterNews)

router.get('/sobre', (req, res) => res.render('about'));
router.get('/diretoria_academica', (req, res) => res.render('academicBoard'));
router.get('/diretoria_de_servicos', (req, res) => res.render('servicesBoard'));
router.get('/contato', (req, res) => res.render('contact'));

router.get('/login', (req, res) => res.render('login', { error : ''}));
router.post('/login', controller.loginUser);

module.exports = router; 