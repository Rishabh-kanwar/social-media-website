const express=require('express');
const router=express.Router();
const allController=require('../controllers/games_controller');

router.get('/pong',allController.pong);
router.get('/snakes',allController.snake);
module.exports=router;