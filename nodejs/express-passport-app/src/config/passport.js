const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

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

const LocalStrategyConfig = new LocalStrategy({ usernameField: 'email', passwordField: 'password'},
  (email, password, done) => {
    User.findOne({
      email: email.toLocaleLowerCase()
    }, (err, user) => {
      if (err) return done(err);

      if(!user) {
        return done(null, false, { msg: `Email ${email} not found` });
      }

      user.comparePassword( password, (err, isMatch) => {
        if (err) return done(err);

        if (isMatch) {
          return done(null, user);
        }

        return done(null, false, {msg: 'invalid email or password.'})
      })
    })
  }
)
passport.use('local', LocalStrategyConfig);

const googleStrategyConfig = new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID, 
		clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
		callbackURL: "/auth/google/callback", 
		scope: ["email", "profile"],
}, (accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }, (err, existingUser) => {
        if (err) { return done(err); }

        if (existingUser) {
          return done (null, existingUser);
        } else {
            const user = new User();
            user.email = profile.emails[0].value;
            user.googleId = profile.id;
            user.save((err) => {
              console.log(err);
              if (err) { return done(err); }
              done (null, user);
            })
          }})     
      }
  );
  passport.use('google', googleStrategyConfig);

  const kakaoStrategyConfig = new KakaoStrategy({
      clientID: process.env.KAKAO_CLIENT_ID, 
      callbackURL: "/auth/kakao/callback", 
  }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ kakaoId: profile.id }, (err, existingUser) => {
          if (err) { return done(err); }
          if (existingUser) {
            return done (null, existingUser);
          } else {
              const user = new User();
              user.kakaoId = profile.id;
              user.email = profile._json.kakao_account.email;
              user.save((err) => {
                console.log(err);
                if (err) { return done(err); }
                done (null, user);
              })
            }})     
        }
    );
    passport.use('kakao', kakaoStrategyConfig);