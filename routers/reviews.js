const express = require('express')
const router = express.Router();
const reviewsController = require('../controller/reviewsController.js');
const { existsId, checkInput } = require('../middleware/utils.js');

//store
router.post('/', checkInput,  reviewsController.store);

module.exports = router