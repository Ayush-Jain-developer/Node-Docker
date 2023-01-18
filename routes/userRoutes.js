const express = require ('express')
const UserAuth = require('../controller/authController')


const router = express.Router()

router.post('/api/signUp', UserAuth.signUp)
router.post('/api/login', UserAuth.login)
module.exports = router