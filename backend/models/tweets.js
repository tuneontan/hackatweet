const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    image: String,
	firstname: String,
	username: String,
    date: Date
});

const Tweet = mongoose.model('users', tweetSchema);

module.exports = Tweet;