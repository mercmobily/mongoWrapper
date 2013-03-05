# mongoWrapper

A [node.js](http://nodejs.org) module for mongodb.

It's the smallest wrapper you will ever, ever see.

Usage:

    var mw = require('mongowrapper');


    mw.connect('mongodb://localhost/yourdatabase', {}, function( err, db ){
      // db is defined here
      // `mw.db` is also available
    }


Modules can then:

    
    var mw = require('mongowrapper'),
        db = mw.db;


    // ...
    db.findOne({ _id: someId } , function( err, doc ){
      // ...
    });
    

_Note:_ db might not be set by the time your modules get to it. Unless you are using the callback, you shouldn't use `mw.db` without checking if it's !== null.


# Bonus functions

The module comes with two important bonus functions:

### `mw.ObjectId()`

When called without a parameter, this function will return a new `ObjectId` object:

    var newId = new mw.ObjectId();

When called with a parameter, this function will convert the string into an `ObjectId` object:


    var newId = new mw.ObjectId('123456789012345678901234);

It will create ObjectId objects using either the `BSONNative` (when/if available) or the fallback (slower) `BSONPure` function.

### `mw.checkObjectId()`

It checks if the string passed is a valid Mongo object id (a 24-byte long string with hex characters in it).

    console.log( mw.checkObjectId('12345678901234567890ABCD' ) ); // true
    console.log( mw.checkObjectId('ABCDEF78901234567890ABCD' ) ); // false

If you pass it an ObjectId, it will also return true:

    console.log( mw.checkObjectId( new mw.ObjectId('123456789012345678901234')  ) );

Watch out, as ObjectId will throw an `Error()` if the string passed is not a legal `ObjectId`.


## Why use this rather than the plain Mongo native driver?

This is as close as you will ever get to the native mongo driver. Other wrappers will wrap operations in functions which will queue requests till the connection to the database is established. This is not the case here, as the existance of the `mw.db` variable can be checked at runtime.

With this wrapper, you get:

* An easy way to "reach" the `db` variable from other modules
* A nice, powerful `ObjectId()` functions to create ObjectIds from scratch or based on a string, using the native function when possible
* A simple function to check if a string is OK to construct an ObjectId.


