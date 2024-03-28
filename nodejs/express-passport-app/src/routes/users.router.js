const express = require('express');
const usersRouter = express.Router();
const passport = require('passport');
const User = require('../models/users.model');
const sendMail = require('../mail/mail');
const welcome = require('../mail/welcome_template');

usersRouter.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ msg: info });
    }

    req.logIn(user, function (err) {
      if (err) { return next(err); }
      res.redirect('/');
    })
  })(req, res, next);
});

// passport 0.5.0버전
usersRouter.post('/logout', (req, res, next) => {
  req.logOut()
    res.redirect('/login')
})
// //passport 0.6.0버전
// app.post('/logout', (req, res, next) => {
//   req.logOut(function (err) {
//     if (err) { return next (err); }
//     res.redirect('/')
//   })
// })

usersRouter.post('/signup', async (req, res) => {
  // user 객체 생성
  const user = new User(req.body);
  try {
    // user 컬렉션에 user 저장
    await user.save('test@naver.com', 'semi', welcome());
    // 이메일 보내기
    sendMail();
    res.redirect('/login');
    } catch (error) {
    console.error(error);
  }
});

usersRouter.get('/google', passport.authenticate('google'));

usersRouter.get('/google/callback', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
}));

usersRouter.get('/kakao',passport.authenticate('kakao'));
usersRouter.get('/kakao/callback', passport.authenticate('kakao', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
}));

module.exports = usersRouter;