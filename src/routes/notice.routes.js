const express = require('express')
const router = express.Router()
const notice = require('../controllers/notice-controller')

const validateInputs = require('../middlewares/validateInputs')
const validateUploads = require('../middlewares/validateUploads')
const upload = require('../middlewares/uploadNoticeImg')

router.get('/', notice.getAll)
router.get('/novo', notice.renderForm)

router.post('/novo', upload.fields([{
    name: 'notice_img', maxCount: 1
}]), 
validateUploads(['notice_img']),
notice.createNew)

router.get('/editar/:id', notice.edit)
router.put('/:id', notice.update)
router.delete('/:id', notice.destroy)
router.get('/busca', notice.search)

module.exports = router