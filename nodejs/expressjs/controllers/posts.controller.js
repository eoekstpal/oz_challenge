const path = require('path');

function getPost(req, res) {
  res.render('posts', {
    templateName: 'post'
  })
  // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'snowdog.jpeg'));
  // res.send('<div><h1>title</h1></div>')
}

module.exports = {
  getPost
}