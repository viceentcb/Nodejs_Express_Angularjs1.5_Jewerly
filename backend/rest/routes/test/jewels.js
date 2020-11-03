let router = require('express').Router();
let mongoose = require('mongoose');
var Jewel = mongoose.model('Jewel');
var User = mongoose.model('User');
const faker = require('faker')
let utils_jewels = require('./utils_jewels');


router.get('/:qty', async (req, res, next) => {
   await utils_jewels.jewels(req, res, next, 'jewel')
})



module.exports = router