// Load the fs package to read and write
// Load the libraries to grab from 
// Grab the request package...
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');


// Import the twitter keys and assign it to a variable
var twitterKeys = require('./keys');
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
// Take in action and information to search from user and pass through arguments
var action = process.argv[2];
var info = process.argv[3];

//switch between all the Liri commands and the Functions that correspond
switch(action){
	case 'my-tweets':
		tweets();
	break;
	case 'spotify-this-song':
		spotify();
	break;
	case 'movie-this':
		movie();
	break;
	case 'do-what-it-says':
		itSays();
	break;
}

//the twitter function will output the following:
//show your last 20 tweets and when they were created
function tweets(){

	//https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=20
	var params = {screen_name: 'yeahEd'};

	client.get('statuses/user_timeline.json?screen_name=twitterapi&count=20', params, function(error, tweets, response) {
  		if(error) throw error;
    	console.log(tweets);  // The favorites. 
  		console.log(response);
  		
	});
}

//the Spotify function will output the following:
//Artist(s), The song's name, preview link, The album.
function spotify(){

	var nodeSong = info;

	var songName = "";

	for (var i=2; i<nodeSong.length; i++){

		if (i>2 && i < nodeSong.length){

			songName = songName + "+" + nodeSong[i];
		}

		else{

			songName = songName + nodeSong[i];
		}
		console.log(songName);
	}

	spotify.search({ type: 'track', query: songName }, function(err, data) {
    	
    	if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    	}else {
    		console.log(data);
    	}
	});
}

// the Omdb function output the following: 
// Title, Year, IMDB Rating, Country, Language, 
// Plot, Actors, Rotten Tomatoes Rating & URL.
function movie(){

	var nodeArgs = info;

	var movieName = "";

	for (var i=2; i<nodeArgs.length; i++){

		if (i>2 && i < nodeArgs.length){

			movieName = movieName + "+" + nodeArgs[i];
		}

		else{

			movieName = movieName + nodeArgs[i];
		}
		console.log(movieName);
	}

	request('http://www.omdbapi.com/?t='+ movieName + '&y=&plot=short&r=json', function (error, response, body) {
		// If the request is successful (i.e. if the response status code is 200)
		console.log(body);
		if (!error && response.statusCode == 200) {
		console.log(body);
		// Parse the body of the site and recover just the imdbRating
		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
		console.log( JSON.parse(body)["Year"])
		}
	});
}

//take the text inside of random.txt and then use it to call one of LIRI's commands.
function itSays(){

	fs.readFile('random.txt', 'utf8', function (err, data){

  		var things = data.split(", ");
  		for (var i=0; i<things.length; i++){

			// Print each element (item) of the array/ 
			console.log(things[i]);
		}
	});
}