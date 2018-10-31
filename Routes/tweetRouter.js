const express = require('express')
const tweetRouter = express.Router();
require('dotenv').config()

var Twitter = require('twitter')


var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});





tweetRouter.route('/tweetsuser/:scnm')
	.get((req, res) => {
	    client.get('statuses/user_timeline', {screen_name: req.params.scnm, count:200}, function(error, tweets, response) {
			if (!error) {				
					res.json(tweets)
				
		  	}
   		});
	})



module.exports = tweetRouter