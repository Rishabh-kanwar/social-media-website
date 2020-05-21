const express=require('express');
const router=express.Router();
const allController=require('../controllers/todo');

router.get('/:id',allController.home);
router.post('/create-list',allController.create1);
router.post('/delete-list',allController.remove);

module.exports=router;