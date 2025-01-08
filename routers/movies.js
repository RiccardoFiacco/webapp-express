const express = require('express')
const router = express.Router();
const moviesController = require('../controller/moviesController.js');
const { existsId } = require('../middleware/utils.js');
//index
router.get('/', moviesController.index);
//show
router.get('/:id', existsId, moviesController.show);

module.exports = router