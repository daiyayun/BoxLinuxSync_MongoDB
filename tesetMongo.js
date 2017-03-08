//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://192.168.3.6:27017/grifs';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.
    var collection=db.collection('fs.files');
    collection.find().toArray(function(err,docs){
    	if(err){console.log('error reading collection')}
    		else{
    			console.log(docs);
    		}
    })





    //Close connection
    db.close();
  }
});