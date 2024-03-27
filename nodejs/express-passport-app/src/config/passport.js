const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;

// req.login(user) 호출되면
passport.serializeUser((user, done) => {
  done(null, user.id);
})

// client => session => request
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})

passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password'},
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLocaleLowerCase() })

        if(!user) {
          return done(null, false, { msg: `Email ${email} not found` });
        }
        user.comparePassword( password, (err, isMatch) => {
          if (err) { return done(err) };

          if (isMatch) { return done(null, user) }
          return done(null, false, {msg: 'invalid email or password.'})
        })
      } catch (error) {
        return done(error);
    }
  }
))

// [ERROR] MongooseError: Model.findOne() no longer accepts a callback
// => async await으로 고쳐줌

// passport.use('local',new LocalStrategy({ usernameField: 'email', passwordField: 'password'},
//   (email, password, done) => {
//     User.findOne({
//       email: email.toLocaleLowerCase()
//     }, (err, user) => {
//       if (err) return done(err);

//       if(!user) {
//         return done(null, false, { msg: `Email ${email} not found` });
//       }

//       user.comparePassword( password, (err, isMatch) => {
//         if (err) return done(err);

//         if (isMatch) {
//           return done(null, user);
//         }

//         return done(null, false, {msg: 'invalid email or password.'})
//       })
//     })
//   }
// ))