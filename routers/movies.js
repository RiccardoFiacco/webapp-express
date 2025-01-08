const express = require('express')
const router = express.Router();
const moviesController = require('../controller/moviesController.js');
const { existsId, checkInput } = require('../middleware/utils.js');
//index
router.get('/', moviesController.index);
//show
router.get('/:id', existsId, moviesController.show);
//store
router.post('/', checkInput,  moviesController.store);
//remove
router.delete('/:id', existsId,  moviesController.remove);
module.exports = router