const express=require('express');
const router=express.Router();
const featuresController=require('../controllers/features_controller');

router.get('/todo/:id',featuresController.home);
router.post('/todo/create-list',featuresController.create1);
router.post('/todo/delete-list',featuresController.remove);

router.get('/calculator',featuresController.calculator);
module.exports=router;