const express = require('express');
const router = express.Router();
const forgotController=require('../controllers/forgot_password_controller');

router.get('/get-email',forgotController.getEmail);
router.post('/check',forgotController.check);



module.exports = router;