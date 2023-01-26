const express = require('express')
const sauceCtrl = require('../controllers/sauce')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, multer, sauceCtrl.createSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getSauce)

router.post('/:id/like', auth, sauceCtrl.affinitySauce)

module.exports = router