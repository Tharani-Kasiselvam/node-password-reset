const express = require('express')
const router = express.Router()

const pwdresetController = require('../controllers/pwdresetContoller')

router.post('/pwdreset',pwdresetController.createToken)
router.post('/password-reset/:userId/:tokenStr',pwdresetController.passwordReset)

module.exports = router