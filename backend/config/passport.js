var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
const { required } = require('../routes/auth');
var User = mongoose.model('User');
var GitHubStrategy = require('passport-github2').Strategy;
var socialKeys = require('../credentials/credentials.json');


//serializeUser_SOCIAL_LOGIN
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//deserializeUser
passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
});

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function (email, password, done) {
  User.findOne({ email: email }).then(function (user1) {
    console.log("LOCAL LOCAL LOCAL LOCAL LOCAL")

    console.log("user =" + user1)
    console.log("user =" + user1.id_social)
    console.log("user =" + user1.username)


    User.findOne({ email: user1.email, id_social: user1.username }).then(function (user) {

      console.log("IDSOCIAL IDSOCIAL IDSOCIAL IDSOCIAL")
      console.log("user =" + user)
      console.log("user =" + user.id_social)
      console.log("user =" + user.username)

      if (!user || !user.validPassword(password)) {

        return done(null, false, { errors: { 'email or password': 'is invalid' } })
      }
      return done(null, user);
    }).catch(done);

  }).catch(done);
}));



passport.use(new GitHubStrategy({
  clientID: socialKeys.GITHUB_CLIENT_ID,
  clientSecret: socialKeys.GITHUB_CLIENT_SECRET,
  callbackURL: socialKeys.GITHUB_CALLBACK,
  scope: 'user:email',
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    console.log('profile= ' + profile)
    console.log('profile= ' + profile.id.toString())
    User.findOne({ id_social: profile.id.toString() }, function (err, user) {
      console.log("user= " + user)


      if (err)
        return done(err);
      // if the user is found then log them in
      if (user) {
        return done(null, user);
      } else {
        if (!profile.emails[0].value) {
          return done("The email is private");
        } else {
          var user = new User({
            id_social: profile.id,
            username: profile.username,
            type: "client",
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          user.save(function (err) {
            //if(err){
            console.log(err);
            return done(null, user);
            //}
          });
        }
      }
    });
  }
));