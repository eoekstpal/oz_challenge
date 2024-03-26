const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretText = 'superSecret';
const refreshSecretText = 'supersuperSecret';

const posts = [
  {
    username: 'jack',
    title: 'Post 1'
  },
  {
    username: 'jennifer',
    title: 'Post 2'
  }
]

let refreshTokens = [];

app.use(express.json());
app.use(cookieParser());

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt를 이용해서 토근 생성 (payload, secretText)
  // 유효기간 추가
  const accessTocken = jwt.sign(user, 
    secretText,
    // cookie 유효기간 
    { expiresIn: '30s' });

  // jwt를 이용해서 refreshToken 생성
  const refreshToken = jwt.sign(user,
    refreshSecretText,
    { expiresIn: '1d' })

    refreshTokens.push(refreshToken);
   
    // refreshToken을 쿠키에 넣어주기
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })

  res.json({ accessTocken: accessTocken });
})

app.get('/posts', authMiddleware, (req, res) => {
  res.json(posts);
})

function authMiddleware(req, res, next) {
  // 토큰을 request headers에서 가져오기
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] 
  if (token == null) return res.sendStatus(401);

  // 토큰이 있으면 유효한 토큰인지 확인
  jwt.verify(token, secretText, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}
// cookie 가져오기 (cookie-parser)
app.get('/refresh', (req, res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(403);

  const refreshToken = cookies.jwt;
  if(!refreshToken.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, refreshSecretText, (err, user) => {
    if(err) return res.sendStatus(403);
    const accessToken = jwt.sign({ name: user.name },
      secretText,
      { expiresIn: '30s' }
      )
      res.json({ accessToken });
  })
})

const port = 4000;
app.listen(port, () => {
  console.log('listening on port' + port);
})