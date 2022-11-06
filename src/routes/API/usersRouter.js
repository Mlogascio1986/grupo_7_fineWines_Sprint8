const express = require('express');

const userController = require ('../../controllers/API/usersController.js')

const router= express.Router();

router.get('/', userController.userIndexApi);

router.get('/:id', userController.userDetailApi);

router.get('/image/:id', userController.userImageApi);

module.exports = router;