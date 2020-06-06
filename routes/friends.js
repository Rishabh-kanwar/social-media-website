const express=require('express');
const router=express.Router();
const friendsController=require('../controllers/friends_controller')


 router.get('/sendreq/:id',friendsController.sendreq);
 router.get('/accept/:id',friendsController.accept);
 router.get('/reject/:id',friendsController.reject);
 router.get('/destroy/:id',friendsController.destroy);



module.exports=router;