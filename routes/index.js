const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
const createController=require('../controllers/create_controller');
const DeleteController=require('../controllers/DeleteController');
console.log('router is lodded');

router.get('/',homeController.home);
router.use('/users', require('./users'));
router.post('/create-list',createController.create1);
router.post('/delete-list',DeleteController.remove);
module.exports=router;