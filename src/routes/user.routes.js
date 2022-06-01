const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller')
const { authJWT, authen } = require("../middlewares")

router.post('/', [authJWT.verifyToken, authJWT.isAdmin, /* authen.checkRolesExisted */], userCtrl.createUser)

router.get('/', [authJWT.verifyToken, authJWT.isAdmin], userCtrl.getUser)

router.get('/:userId', [authJWT.verifyToken, authJWT.isAdmin], userCtrl.getUserById)

router.put('/:userId', [authJWT.verifyToken, authJWT.isAdmin], userCtrl.updateUserById)

router.delete('/:userId', [authJWT.verifyToken, authJWT.isAdmin], userCtrl.deleteUserById)

module.exports = router