var express = require('express')
var app = express()
app.use('/static', express.static('public'))
var url = require('url');


/****USING Twitter Bot ************/
var TwitterPackage = require('twitter');
var secret = {
  consumer_key: 'gnpAHSRafu9as1yLNqX1i4Sqx',
  consumer_secret: 'Ak4KBG8DD6UrnXdoZEqCnd99Fc7pNZcxLBbbG0XR0BVzCDDvlK',
  access_token_key: '121017115-cXqdmQ2ewT3oJpEf2yMCC0RbWiPPXgLFNryu9lt2',
  access_token_secret: 'WuOvwoWLLtBTBgOh5slkw5McVj1rDJuQTPw8ZiN7RrRfE'
}
var Twitter = new TwitterPackage(secret);
/****USING Twitter Bot ************/



app.get('/twitterProfile', function (req, res) {
  var url_parts = url.parse(req.url, true);
  var screenName = url_parts.query.screenName;
  var params = {screen_name:screenName};
	Twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
		res.send({tweets:tweets});
	  }else{
	    res.send({name:"Jagadeesh"});
	  }
	});

  
  
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})