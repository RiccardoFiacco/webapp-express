const express = require('express')
const router = express.Router();
const reviewsController = require('../controller/reviewsController.js');
const { checkInputReviews, checkValueInputReviews } = require('../middleware/utils.js');

//store
router.post('/', checkInputReviews, checkValueInputReviews,  reviewsController.store);

module.exports = router