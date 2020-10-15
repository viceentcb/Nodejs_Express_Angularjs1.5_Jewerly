var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.get('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    // console.log('findid',user);
    if (!user) { return res.sendStatus(401); }

    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.put('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    // console.log(user);
    if (!user) { return res.sendStatus(401); }

    // only update fields that were actually passed...
    if (typeof req.body.user.username !== 'undefined') {
      user.username = req.body.user.username;
    }
    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.bio !== 'undefined') {
      user.bio = req.body.user.bio;
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function () {
      return res.json({ user: user.toAuthJSON() });
    });
  }).catch(next);
});

router.post('/users/login', function (req, res, next) {

  //console.log(req.body.user);
  //res.json({user: req.body.user});

  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      console.log('el usuario ', user);
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      // console.log('enta else local');
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function (req, res, next) {

  // console.log(req.body.user)
  User.find({ id_social: req.body.user.username }).then(function (user) {
      console.log(user[0]);

    if (user[0]) {
      console.log("Nombre de usuario en uso")
      return res.status(422).json("This username are already created");
    } else {
      var user = new User();
      user.id_social = req.body.user.username;
      user.username = req.body.user.username;
      user.email = req.body.user.email;
      user.setPassword(req.body.user.password);

      user.save().then(function () {
        return res.json({ user: user.toAuthJSON() });
      }).catch(next);
    }

  //   if (user[0]) {
  //     console.log("Nombre de usuario en uso")
  //     return res.status(422).json("This username are already created");
  //   } else if (checkmail(req.body.user) === true) {
  //     console.log("Correo electronico en uso")
  //     return res.status(422).json("This email are already created");
  //   } else {
  //     var user = new User();
  //     user.id_social = req.body.user.username;
  //     user.username = req.body.user.username;
  //     user.email = req.body.user.email;
  //     user.setPassword(req.body.user.password);
  //     user.save().then(function () {
  //       return res.json({ user: user.toAuthJSON() });
  //     }).catch(next);
  //   }


  });
});



router.post("/users/sociallogin", function (req, res) {

  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for (var key in sessions) {
    sessionUser = JSON.parse(sessions[key]).passport.user;
  }

  User.find({ _id: sessionUser }, function (err, user) {
    // console.log(user)
    user = user[0];

    if (err) return done(err);
    // if the user is found then log them in
    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() }); // user found, return that user
    } else {
      return res.status(422).json(err);
    }
  });
});


router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  }));


router.get("/auth/github", passport.authenticate("github"));
router.get("/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  }));

// let checkmail = function (user_info) {
//   User.find({ "$expr": { "$eq": ["$id_social", "$username"] }, email: user_info.email }, { email: 1, _id: 0 })
//     .then(function (user) {

      // let key= (user[0]? true:false)
      // return key

      // --------------------------------------
      // return (user[0]? true:false)

//     })
// }

module.exports = router;
