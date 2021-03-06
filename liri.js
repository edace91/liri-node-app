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
	var screeName = 'YeahEd';
	var Twitter = require('twitter');

	// Import the twitter keys and assign it to a variable
	var twitterKeys = require('./keys').twitterKeys;
	//create the twitter client ID
	//https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=20
	var client = new Twitter({
 		consumer_key: twitterKeys.consumer_key,
 		consumer_secret: twitterKeys.consumer_secret,
  		access_token_key: twitterKeys.access_token_key,
  		access_token_secret: twitterKeys.access_token_secret
	});

	var params = {screen_name: 'YeahEd', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
  		if(error){ console.log(error)
  		} else {
  			for ( var i = 0; i < tweets.length; i++){
  				console.log(tweets[i].created_at + " : " + tweets[i].text); 
  				console.log("             ");
  			}
  		
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
	
}

	spotify.search({ type: 'track', query: songName }, function(err, data) {
    	
    	if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    	}else {
    		//console.log(JSON.stringify(data, null, 2));
    		console.log( "Artist: ")
    		console.log( data.tracks.items[0].artists[0].name);
    		console.log( "URL: ")
    		console.log( data.tracks.items[0].artists[0].uri);
    	}
	});
}

// the Omdb function output the following: 
// Title, Year, IMDB Rating, Country, Language, 
// Plot, Actors, Rotten Tomatoes Rating & URL.
function movie(movieName){
	var request = require('request');

	var nodeArgs = process.argv;

	var movieName = "";

	if (process.argv[3] == null){

		movieName = "Mr.Nobody";

	}else{

		for (var i=3; i<nodeArgs.length; i++){

			if (i>3 && i< nodeArgs.length){

			movieName = movieName + "+" + nodeArgs[i];

			}

			else {

			movieName = movieName + nodeArgs[i];
			}
			
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

  		var content = data.split(",");
  		var action = content[0];


			// Print each element (item) of the array/ 
			

			
			switch(content){
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
	})
}