const express = require('express');

const productController = require ('../../controllers/API/productsController.js')

const router= express.Router();

router.get("/", productController.productIndexApi);

router.get("/last", productController.lastProductApi);

router.get("/:id", productController.productDetailApi);

module.exports = router;