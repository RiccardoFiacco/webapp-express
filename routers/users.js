const express = require('express')
const router = express.Router();
const usersRouter = require('../controller/usersController.js') 
const { checkInputReviews, checkValueInputReviews, trimString} = require('../middleware/utils.js');

//index
router.get('/', moviesController.index);

module.exports = router