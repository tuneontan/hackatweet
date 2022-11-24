var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
       });

      newUser.save().then(() => {
        res.json({ result: true });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

//   User.findOne({ username: req.body.username, password: req.body.password }).then(data => {
//     if (data) {
//       res.json({ result: true });
//     } else {
//       res.json({ result: false, error: 'User not found' });
//     }
//   });
// });


User.findOne({ username: req.body.username }).then(data => {
  if (bcrypt.compareSync(req.body.password, data.password)) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
 });
})

module.exports = router;
