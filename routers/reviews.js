const express = require('express')
const router = express.Router();
const reviewsController = require('../controller/reviewsController.js');
const { checkInputReviews } = require('../middleware/utils.js');

//store
router.post('/', checkInputReviews,  reviewsController.store);

module.exports = router