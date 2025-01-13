const express = require('express')
const router = express.Router();
const reviewsController = require('../controller/reviewsController.js');
const { checkInputReviews, checkValueInputReviews, trimString} = require('../middleware/utils.js');

//store
router.post('/', trimString, checkInputReviews, checkValueInputReviews,  reviewsController.store);
//remove
router.delete('/:id', reviewsController.remove)
module.exports = router