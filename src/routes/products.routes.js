const express = require('express')
const router = express.Router()

const productsCtrl = require('../controllers/products.controllers')
const { authJWT } = require("../middlewares")

router.post('/', [authJWT.verifyToken, authJWT.isModerator], productsCtrl.createProduct)

router.get('/', productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.put('/:productId', [authJWT.verifyToken, authJWT.isAdmin], productsCtrl.updateProductById)

router.delete('/:productId', [authJWT.verifyToken, authJWT.isAdmin], productsCtrl.deleteProductById)

module.exports = router