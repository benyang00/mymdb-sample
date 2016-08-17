//step6a: declare mongo url
// var mongo_url = 'mongodb://localhost/mymdb_db'; //mongodb://username:password@host:port/db; on localhost, mongodb usually run on port 27017
//step6b: require mongoose module
var mongoose = require('mongoose');
//step6c: connect mongoose to the app
// mongoose.connect(mongo_url);

//step7: set the schema; this is how the json structure will look like
var actorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    index: true
  },
  age: Number,
  website: {
    type: String,
    trim: true,
    get: function(url) {
      if(!url) return url;

      if( url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0 ) {
        url = 'http://' + url;
      }
      return url;
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}); //Schema is a constructor within the object of mongoose; pass an object into Schema

//step14: register the getter
actorSchema.set('toJSON', { getters: true, virtuals: true});

//step15: register a virtual attribute
actorSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

//step8: register Schema; models are fancy constructors compiled from Schema
var Actor = mongoose.model('Actor', actorSchema); //mongooese will look for plural of first argument e.g. db.movies

//step11: make this available to other files; exported as "Actor" class
module.exports = Actor;
