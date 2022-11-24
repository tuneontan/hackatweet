var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const { post } = require(".");

// SIGNUP ROOTS

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["firstname", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });

      newUser.save().then(() => {
        res.json({ result: true, user:newUser });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post('/signin', (req, res) => {

  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
User.findOne({ username: req.body.username }).then(data => {

 

  if(data==null){

   res.json({result:false})
  }else{


 
  if (bcrypt.compareSync(req.body.password, data.password)) {
    res.json({ result: true,user:data })
  } else {
    res.json({ result: false });
  }
  }




 });
})
// SIGNIN ROOTS

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["firstname", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  });
});

// ADD TWEET ROOTS

let = tweets = [];

router.post("/tweets", (req, res) => {
  const newTweet = new Tweet
  tweets.push(req.body);
});

// SEARCH HASHTAG ROOTS

router.get("/searchTweets", (req, res) => {
  res.json(tweet);
}); 

// DELETE TWEET ROOTS

router.delete("tweets", (req, res) => {
  tweets = [];
  res.json(tweets);
});

router.get('/user/infos', (req, res) => {
  User.findOne({ username: req.body.username }).then(data => {

  })

})

router.post('/tweets', (req, res) => {





})
module.exports = router;
