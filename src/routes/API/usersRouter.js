const express = require('express');

const userController = require ('../../controllers/API/usersController.js')

const router= express.Router();

router.get('/', userController.userIndexApi);

router.get('/:id', userController.userDetailApi);

module.exports = router;