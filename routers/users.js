const express = require('express')
const router = express.Router();
const usersController = require('../controller/usersController.js')

//index
router.post('/login', usersController.index);
//post
router.post('/registration', usersController.store);


module.exports = router