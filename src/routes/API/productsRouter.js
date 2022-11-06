const express = require('express');

const productController = require ('../../controllers/API/productsController.js')

const router= express.Router();

router.get('/', productController.productIndexApi);

router.get('/:id', productController.productDetailApi);

module.exports = router;