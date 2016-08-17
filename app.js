// This is all setting up the server

//step6a: declare mongo url
var mongo_url = 'mongodb://localhost/mymdb_db'; //mongodb://username:password@host:port/db; on localhost, mongodb usually run on port 27017
//step6b: require mongoose module
var mongoose = require('mongoose');
//step6c: connect mongoose to the app
mongoose.connect(mongo_url);

// //step6a: declare mongo url
// var mongo_url = 'mongodb://localhost/mymdb'; //mongodb://username:password@host:port/db; on localhost, mongodb usually run on port 27017
// //step6b: require mongoose module
// var mongoose = require('mongoose');
// //step6c: connect mongoose to the app
// mongoose.connect(mongo_url);
//
// //step7: set the schema; this is how the json structure will look like
// var movieSchema = new mongoose.Schema({
//   title: String,
//   publishedYear: Number,
//   director: String,
//   actor: String
// }); //Schema is a constructor within the object of mongoose; pass an object into Schema
//
// //step8: register Schema; models are fancy constructors compiled from Schema
//  var Movie = mongoose.model('Movie', movieSchema); //mongooese will look for plural of first argument e.g. db.movies

//step12: require Actor & Movie modules that were exported from actor.js & movie.js
var Movie = require('./models/movie'); //refers to movie.js
var Actor = require('./models/actor'); //refers to actor.js

//Step1: require installed modules
var express = require('express');
var bodyParser = require('body-parser');

//Step2: run express as declared on line2
var app = express();

//step13b: set all middlewares
//body-parser
app.use(bodyParser.json()); //parses read data in json format
app.use(bodyParser.urlencoded({ extended: false})); //if requested data is in urlencoded format, it understands what the encoding is

//step13: set up the routes BEFORE listening to the port; "listen to these possible routes"
//step13a: list all movies
app.route('/movies') //app listens to route /movies and listen to whether the db is called via a callback to mongo i.e. .find() method
    .get( function(req, res, next) { //.get is an event listener
      Movie.find({}, function(err, movies) {
        if(err) return next(err); //throw and error and move on if there's an error
        res.json(movies); //respond with a json file of movies
      }); //find everything, therefore {}; the callback anon function is an ajax call to mongo
      // res.send('list all movies'); this is just a placeholder
    } )
    .post( function(req, res, next) {
      console.log(req.body);
      var new_movie = new Movie(req.body);
      new_movie.save( function(err) {
        if(err) return next(err);
        res.json(new_movie);
      });
    });

app.route('/movies/:movie_id')
    .get(function(req, res, next) {
      var movie_id = req.params.movie_id;
      Movie.findOne({
        _id: movie_id
      }, function(err, movie) {
        if(err) return next(err);
        res.json(movie);
      });
    })
    .put(function(req, res, next) {
      // res.send(req.body);
      var movie_id = req.params.movie_id;
      Movie.findByIdAndUpdate(movie_id, req.body, function(err, movie) {
        if(err) return next(err);
        res.json(movie);
      });
    });

app.route('/actors') //app listens to route /actors and listen to whether the db is called via a callback to mongo i.e. .find() method
    .get( function(req, res, next) { //.get is an event listener
      Actor.find({}, function(err, actors) {
        if(err) return next(err); //throw and error and move on if there's an error
        res.json(actors); //respond with a json file of actors
      }); //find everything, therefore {}; the callback anon function is an ajax call to mongo
      // res.send('list all movies'); this is just a placeholder
    } )
    .post( function(req, res, next) {
      console.log(req.body);
      var new_actor = new Actor(req.body);
      new_actor.save( function(err) {
        if(err) return next(err);
        res.json(new_actor);
      });
    });

app.route('/actors/:actor_id') //app listens to route /actors and listen to whether the db is called via a callback to mongo i.e. .find() method
    .get( function(req, res, next) { //.get is an event listener
      var actor_id = req.params.actor_id;
      // res.json(req.params);
      Actor.findOne({
        _id: actor_id
      }, function(err, actor) {
        if(err) return next(err);
        res.json(actor);
      }
    );
      // Actor.find({}, function(err, actors) {
      //   if(err) return next(err); //throw and error and move on if there's an error
      //   res.json(actors); //respond with a json file of actors
      // }); //find everything, therefore {}; the callback anon function is an ajax call to mongo
    } )
    .put( function(req, res, next) { //Update
      // res.send(req.body);
      var actor_id = req.params.actor_id;
      Actor.findByIdAndUpdate(actor_id, req.body, function(err, actor) {
        if(err) return next(err);
        res.json(actor);
      });
      // var new_actor = new Actor(req.body);
      // new_actor.save( function(err) {
      //   if(err) return next(err);
      //   res.json(new_actor);
      // });
    });


//step3: set the port
var port = 7000; //can be anything
app.set('port', port);

//step4: listen to the port
app.listen(app.get('port'), function() {
  console.log('running on port: ' + app.get('port'));
});

//AT THIS POINT --> we can try to run "node app" in terminal and got to localhost:7000 --> we'll see CANNOT GET /

//step5: go to terminal and install mongoose --> npm install mongoose --save

//step9: create "models" folder

//step10: create "movie.js" in "models" folder; copied all of mongo stuff into movie.js
