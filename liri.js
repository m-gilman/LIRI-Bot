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

var inputString1 = process.argv[2];
var inputString2 = process.argv[3];

runTheProgram();

function runTheProgram() {
    //this is my first attempt at using switch statements instead of "if" statements
    switch (inputString1) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            if (inputString2 === undefined) {
                // If no song is provided then your program will default to "The Sign" by Ace of Base.
                var songName = "The Sign Ace of Base";
                spotifyRun(songName);
            } else {
                var songName = inputString2;
                spotifyRun(songName);
            }
            break;
        case 'movie-this':
            if (inputString2 === undefined) {
                // If no movie is provided the program will default to "Mr. Nobody".
                var movieName = "Mr. Nobody";
                console.log('If you haven\'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/'
                    + '\n It\'s on Netflix!');
                movieInfo(movieName);
            } else {
                var movieName = inputString2;
                movieInfo(movieName);
            }
            break;
        case 'do-what-it-says':
            doIt();
            break;
        default:
            console.log(
                "Instructions: run one of the following commands:"
                + "\n 1) node liri.js my-tweets"
                + "\n ---This will show my last 20 tweets and when they were created."
                + '\n 2) node liri.js spotify-this-song "song name here"'
                + "\n ---This will show song info"
                + '\n 3) node liri.js movie-this "movie name here"'
                + "\n ---This will show movie info"
                + '\n 4) node liri.js do-what-it-says'
                + "\n ---This is a surprise"
            );
    };
};


function myTweets() {
    var params = {
        // screen_name: "PlayPlay4School",
        count: 20,
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {
            tweets.forEach(function (item) {
                var tweetDisplay =
                    item.text
                    + "\n"
                    + "Created On: " + item.created_at
                    + "\n ------------------------------- \n -------------------------------"
                console.log(tweetDisplay);
            })
        } else {
            return console.log('Error occurred: ' + error);
        }
    });
};

function spotifyRun(songName) {
    spotify.search({
        type: 'track',
        query: songName,
        limit: 1
    }, function (error, data) {
        if (!error) {
            data.tracks.items.forEach(function (item) {
                var spotifyDisplay =
                    "Artist Name: " + item.album.artists[0].name
                    + "\n Song Name: " + item.name
                    + "\n Preview Link: " + item.album.external_urls.spotify
                    + "\n Album: " + item.album.name
                    + "\n --------------------------------------------------------"
                console.log(spotifyDisplay);
            });
        } else {
            return console.log('Error occurred: ' + error);
        };
    });
};

// node liri.js movie-this '<movie name here>'


// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
function movieInfo(movieName) {
    request("https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error) {
            var item = JSON.parse(body);
            var movieDisplay = 
            "Title of the movie: " + item.Title
            + "\n Year of Release: " + item.Year
            + "\n IMDB Rating: " + item.Ratings[0].Value
            + "\n Rotten Tomatoes Rating: " + item.Ratings[1].Value
            + "\n Country of Production: " + item.Country
            + "\n Language: " + item.Language
            + "\n Plot: " + item.Plot
            + "\n Actors: " + item.Actors
            + "\n --------------------------------------------------------"
        console.log(movieDisplay);
        } else {
            return console.log('Error occurred: ' + error);
        }
    });
}

// node liri.js do-what-it-says
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        var dataArr = data.split(",");
        inputString1 = dataArr[0];
        inputString2 = dataArr[1];
        // console.log(dataArr[0]);
        // console.log(dataArr[1]);
        runTheProgram();
    });
};