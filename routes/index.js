const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const createController=require('../controllers/create_controller');
console.log('router is lodded');

router.get('/',homeController.home);
router.use('/users', require('./users'));
router.post('/create-list',createController.create1);
module.exports=router;