const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    minLength: 5
  },
  googleId: {
    type: String,
    unique: true
  }
})

const saltRounds = 10;
userSchema.pre('save', function (next) {
  let user = this;
  // 비밀번호가 변경될 때만
  if (user.isModified('password')) {
    // salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      })
    })
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // bcrypt compare
  // plain password => client에서 온 pw
  // this.password => 데이터베이스에 있는 pw
  bcrypt.compare(plainPassword, this.password, function (err, inMatch) {
    if (err) return cb(err);
    cb(null, inMatch);
  })
}

const User = mongoose.model('User', userSchema);

module.exports = User;