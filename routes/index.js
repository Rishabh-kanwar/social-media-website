const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/forgot', require('./reset-pass'));
router.use('/features', require('./features'));
router.use('/games', require('./games'));
router.use('/likes', require('./likes'));
router.use('/search', require('./search'));
router.use('/friends', require('./friends'));


// for any further routes, access from here
///router.use('/routerName', require('./routerfile));


//including the route of the api\
router.use('/api',require('./api'));



module.exports = router;