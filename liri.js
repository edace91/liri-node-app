// Load the fs package to read and write
var fs = require('fs');

// Take in action command and information to search from user and pass through arguments
var action = process.argv[2];

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

	var Twitter = require('twitter');

	// Import the twitter keys and assign it to a variable
	var twitterKeys = require('./keys');
	//create the twitter client ID
	//https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=20
	var client = new Twitter({
 		consumer_key: process.env.TWITTER_CONSUMER_KEY,
 		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	var params = {screen_name: 'yeahEd'};

	client.get('statuses/user_timeline.json?screen_name=twitterapi&count=20', params, function(error, tweets, response){
  		if(error){ console.log(error)
  		} else {
  		console.log(JSON.stringify(tweets, null, 2));
  		console.log(JSON.stringify(response, null, 2));
  		}
	});
}


//the Spotify function will output the following:
//Artist(s), The song's name, preview link, The album.
function spotify(){

	var spotify = require('spotify');

	var nodeArgs = process.argv;

	var songName = "";

	for (var i=3; i<nodeArgs.length; i++){

	if (i>3 && i < nodeArgs.length){

		songName = songName + " " + nodeArgs[i];
	}

	else{

		songName = songName + nodeArgs[i];
	}
	console.log(songName);
}

	spotify.search({ type: 'track', query: songName }, function(err, data) {
    	
    	if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    	}else {
    		console.log(JSON.stringify(data, null, 2));
    	}
	});
}

// the Omdb function output the following: 
// Title, Year, IMDB Rating, Country, Language, 
// Plot, Actors, Rotten Tomatoes Rating & URL.
function movie(){
	var request = require('request');

	var nodeArgs = process.argv;

	var movieName = "";

	for (var i=3; i<nodeArgs.length; i++){

		if (i>3 && i< nodeArgs.length){

		movieName = movieName + "+" + nodeArgs[i];

		}

		else {

		movieName = movieName + nodeArgs[i];
		}
		
	}

	request('http://www.omdbapi.com/?t='+ movieName + '&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
	
	if (!error && response.statusCode == 200) {
		
		// Parse the body of the site and recover just the imdbRating
		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
		console.log( "The movie title: " + JSON.parse(body)["Title"] +
			"\nThe movie release year: " + JSON.parse(body)["Year"] +
			"\nThe movie imdb rating: " +JSON.parse(body)["imdbRating"] +
			"\nThe movie Country of origin: " +JSON.parse(body)["Country"] +
			"\nThe movie language: " +JSON.parse(body)["Language"] +
			"\nThe movie plot: " +JSON.parse(body)["Plot"] +
			"\nThe movie actors: " +JSON.parse(body)["Actors"] +
			"\nThe movie Rotten Tomatoes score: " +JSON.parse(body)["tomatoMeter"] +
			"\nThe movie Rotten Tomatoes url: " +JSON.parse(body)["tomatoURL"]);
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