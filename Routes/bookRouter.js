const express = require('express')
const bookRouter = express.Router();
const Book = require('../models/bookModel')
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://nadinesk:blahblah123@ds235243.mlab.com:35243/rh')
require('dotenv').config()

var Twitter = require('twitter')


var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


 
var params = {
  //q: 'from:ShannonBeador @RHOC_KellyDodd',
  q: '#rhoc',
  count: 100,
  result_type: 'popular',
  lang: 'en'
}


var params1 = {screen_name: 'ShannonBeador', count:200};

bookRouter.route('/tweetsuser/:scnm')
	.get((req, res) => {
	    client.get('statuses/user_timeline', {screen_name: req.params.scnm, count:200}, function(error, tweets, response) {
			if (!error) {				
					res.json(tweets)
				
		  	}
   		});
	})

bookRouter.route('/tweets')
	.get((req, res) => {
	    client.get('search/tweets', params, function(error, tweets, response) {
			if (!error) {				
					res.json(tweets.statuses)
				
		  	}
   		});
	})

client.get('search/tweets', params, function(error, tweets, response) {
			if (!error) {				
				
				for (var i = 0; i < tweets.statuses.length; i++) {
					let blah = new Book({'title': tweets.statuses[i].text})
					blah.save(); 				
				}
				
				
		  	}
});
	

/*var stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
	  				console.log(event.text); 
					let blah = new Book({'title': event.text, 'author': event.created_at})
					blah.save(); 				
				
				
})
	*/
	
	


bookRouter.route('/')
    .get((req, res) => {
        Book.find({}, (err, books) => {
            res.json(books)
        })  
    })
    .post((req, res) => {
        let book = new Book(req.body);
        book.save();
        res.status(201).send(book) 
    })

// Middleware 
bookRouter.use('/:bookId', (req, res, next)=>{
    Book.findById( req.params.bookId, (err,book)=>{
        if(err)
            res.status(500).send(err)
        else {
            req.book = book;
            next()
        }
    })

})
bookRouter.route('/:bookId')
    .get((req, res) => {
        res.json(req.book)
    }) // end get Books/:bookId 
    .put((req,res) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.save()
        res.json(req.book)
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.book[p] = req.body[p]
        }
        req.book.save()
        res.json(req.book)
    })//patch
    .delete((req,res)=>{
        req.book.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })//delete


module.exports = bookRouter