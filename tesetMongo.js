//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
//<<<<<<< HEAD
var url = 'mongodb://localhost:27017/grifs';
//var url1 = 'mongodb://192.168.3.6:27017/grifs';
//var url='mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.
    var collection=db.collection('fs.files');
    collection.find({filename:'test_doc.docx'}).toArray(function(err,docs){
    	if(err){console.log('error reading collection')}
    		else{
    			console.log(docs);
    			console.log(docs[0].md5);
    		}
    })





    //Close connection
    db.close();
  }
});