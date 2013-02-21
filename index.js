var mongo = require('mongodb');

function MongoWrapper() {
  this.db = null;
};

var mongoWrapper = new MongoWrapper;
module.exports = exports = mongoWrapper;

// This means that you can do `new include('mongoWrapper').MongoWrapper()`
mongoWrapper.MongoWrapper = MongoWrapper;



// ObjectId is the most handy method of all. This will work with
// native BSON or Pure BSON
mongoWrapper.ObjectId = function() {
	if (!mongo.BSONNative || !mongo.BSONNative.ObjectID) {
	  return function(id) {
		return mongo.BSONPure.ObjectID.createFromHexString(id);
	  };
	}
	return function(id) {
		return new mongo.BSONNative.ObjectID(id);
	};
}();

mongoWrapper.checkObjectId = function( s ){
  return new RegExp("^[0-9a-fA-F]{24}$").test(s);
}

MongoWrapper.prototype.connect = function(url, options, cb ){

  var that = this;
  var MongoClient = mongo.MongoClient;

  MongoClient.connect( url, function( err, db ){
    
    if( err ) {
      console.log( err );
    } else {
      that.db = db;
    }
    cb( err, db );
  });
}
