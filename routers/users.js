const express = require('express')
const router = express.Router();
const userController = require('../controller/userController.js');
const { checkInputReviews, checkValueInputReviews, trimString} = require('../middleware/utils.js');

//index
router.get('/', (req, res)=> {
    console.log(req.body)
    res.send("get degli user")
});

module.exports = router