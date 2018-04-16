// add code to read and set any environment variables with the dotenv package
require("dotenv").config();


// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var request = require('request');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var omdb = require('omdb');
var fs = require("fs");

var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

//this is my first attempt at using switch statements instead of "if" statements
switch (process.argv[2]) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        if (process.argv[3] === undefined) {
            // If no song is provided then your program will default to "The Sign" by Ace of Base.
            var songName = "The Sign";
            spotifyRun(songName);
        } else {
            var songName = process.argv.slice(3).join(' ');
            spotifyRun(songName);
        }
        break;
    case 'movie-this':
        console.log("This is supposed to do something with a movie");
        break;
    case 'do-what-it-says':

        console.log("surprise!");
        break;
    default:
        console.log(
            "Instructions: run one of the following commands:"
            + "\n 1) node liri.js my-tweets"
            + "\n ---This will show my last 20 tweets and when they were created."
            + '\n 2) node liri.js spotify-this-song "song name here"'
            + "\n ---This will show song info"
            + '\n 3) node node liri.js movie-this "movie name here"'
            + "\n ---This will show movie info"
            + '\n 4) node liri.js do-what-it-says'
            + "\n ---This is a surprise"
        )
}

function myTweets() {
    var params = {
        // screen_name: "PlayPlay4School",
        count: 20,
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {
            //I couldn't get the regular for loop to work
            tweets.forEach(function (item) {
                var tweetDisplay =
                    item.text
                    + "\n"
                    + "Created On: " + item.created_at
                    + "\n ------------------------------- \n -------------------------------"
                console.log(tweetDisplay);
            })

        } else {
            console.log("Error");
        }
    });
};

function spotifyRun(songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function (error, data) {
        if (!error) {
            data.tracks.items.forEach(function (item) {
                var spotifyDisplay =
                    "Artist Name: " + item.album.artists[0].name
                    + "\n Song Name: " + item.name
                    + "\n Preview Link: " + item.album.external_urls.spotify
                    + "\n Album: " + item.album.name
                    + "--------------------------------------------------------"
                console.log(spotifyDisplay);
            })
        } else {
            return console.log('Error occurred: ' + error);
        }
    });
}

// node liri.js movie-this '<movie name here>'
// This will output the following information to your terminal/bash window:
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

// It's on Netflix!


// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.




// node liri.js do-what-it-says
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
    var songName = "The Sign";
    spotifyRun(songName);
    });
};