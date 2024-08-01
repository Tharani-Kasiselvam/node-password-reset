const express = require('express')
const router = express.Router()

const pwdresetController = require('../controllers/pwdresetContoller')

router.get('/users',pwdresetController.getUser)

module.exports = router