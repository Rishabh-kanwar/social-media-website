const express = require('express');
const router = express.Router();

const toggleController=require('../controllers/likes_controller');

router.post('/toggle',toggleController.toggleLike);

module.exports = router;