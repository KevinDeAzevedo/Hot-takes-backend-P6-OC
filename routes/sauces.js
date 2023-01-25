const express = require('express')
const sauceCtrl = require('../controllers/sauce')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getSauce)

module.exports = router