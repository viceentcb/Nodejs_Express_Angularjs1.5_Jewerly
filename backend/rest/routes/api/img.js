var router = require('express').Router();
var mongoose = require('mongoose');
var Jewel = mongoose.model('Jewel');

// return a list of tags
router.get('/', function(req, res, next) {
  Jewel.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

module.exports = router;
