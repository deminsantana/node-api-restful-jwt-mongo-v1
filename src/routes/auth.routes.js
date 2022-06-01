const express = require('express')
const router = express.Router()

const authCtrl = require('../controllers/auth.controller')
const {authen} = require('../middlewares')

router.post('/signup', [authen.checkDuplicateUsernameOrEmail, /* authen.checkRolesExisted */], authCtrl.signUp);

router.post('/signin', authCtrl.signIn)

module.exports = router