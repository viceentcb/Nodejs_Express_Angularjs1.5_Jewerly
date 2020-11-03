let router = require('express').Router();
router.use('/users', require('./users'));
router.use('/jewels', require('./jewels'));
router.use('/comments', require('./comments'));


module.exports=router
