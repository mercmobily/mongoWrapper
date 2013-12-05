/*Copyright (C) 2013 Tony Mobily

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var mongo = require('mongodb');

function MongoWrapper() {
  this.db = null;
};

var mongoWrapper = new MongoWrapper;
module.exports = exports = mongoWrapper;

// This means that you can do `new include('mongowrapper').MongoWrapper()`
mongoWrapper.MongoWrapper = MongoWrapper;


// ObjectId is the most handy method of all. This will work with
// native BSON or Pure BSON
mongoWrapper.ObjectId = function( id ){
  if( id instanceof mongo.ObjectID ) return id;
  return mongo.ObjectID( id );
}


/*function() {
	if (!mongo.BSONNative || !mongo.BSONNative.ObjectID) {
	  return function(id) {
                if( id instanceof mongo.ObjectID ) return id;
		return mongo.BSONPure.ObjectID.createFromHexString(id);
	  };
	}
	return function(id) {
                // if( id instanceof mongo.BSONNative.ObjectID ) return id;
                if( id instanceof mongo.ObjectID ) return id;
		return new mongo.BSONNative.ObjectID(id);
	};
}();
*/

mongoWrapper.checkObjectId = function( s ){

  // It already is a mongo.ObjectID
  if( s instanceof mongo.ObjectID ) return true;

  // It's a string
  return new RegExp("^[0-9a-fA-F]{24}$").test(s);
}

MongoWrapper.prototype.connect = function(url, options, cb ){

  var self = this;
  var MongoClient = mongo.MongoClient;

  MongoClient.connect( url, options, function( err, db ){
    
    if( err ) {
      console.log( err );
    } else {
      self.db = db;
    }
    cb( err, db );
  });
}
