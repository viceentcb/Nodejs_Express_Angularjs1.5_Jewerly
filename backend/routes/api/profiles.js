var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload user profile on routes with ':username'
router.param('username', function (req, res, next, username) {
  User.findOne({ username: username }).then(function (user) {
    if (!user) { return res.sendStatus(404); }

    req.profile = user;

    return next();
  }).catch(next);
});

router.get('/:username', auth.optional, function (req, res, next) {
  if (req.payload) {
    User.findById(req.payload.id).then(function (user) {
      if (!user) { return res.json({ profile: req.profile.toProfileJSONFor(false) }); }

      return res.json({ profile: req.profile.toProfileJSONFor(user) });
    });
  } else {
    return res.json({ profile: req.profile.toProfileJSONFor(false) });
  }
});

//FOLLOW USER
router.post('/:username/follow', auth.required, async function (req, res, next) {
  var profileId = req.profile._id;

  let user = await User.findById(req.payload.id)
  if (!user) { return res.sendStatus(401); }

  await user.follow(profileId)
  await req.profile.updatefollowersCount()

  let ray = [[user, +10], [req.profile, +20]]
  await user.updatekarma(ray)

  return res.json({ profile: req.profile.toProfileJSONFor(user) });
});

//UNFOLLOW USER
router.delete('/:username/follow', auth.required, async function (req, res, next) {
  var profileId = req.profile._id;

  let user = await User.findById(req.payload.id)
  if (!user) { return res.sendStatus(401); }

  await user.unfollow(profileId)
  await req.profile.updatefollowersCount()

  let ray = [[user, -10], [req.profile, -20]]
  await user.updatekarma(ray)

  return res.json({ profile: req.profile.toProfileJSONFor(user) });


});

module.exports = router;
