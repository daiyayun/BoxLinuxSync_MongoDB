var mongodb = require('mongodb');
var GridStore = mongodb.GridStore;
//var test = require('assert');
//var fs = require('fs');
var ObjectID = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;
var GridStore = mongodb.GridStore;

MongoClient.connect('mongodb://localhost:27017/grifs', function(err, db){
	var fileId = new ObjectID();
	var url = '/home/yayun/test.txt';
	var gridStore = new GridStore(db, fileId, url, 'w');

//	var fileSize = fs.statSync(url).size;
//	var data = fs.readFileSync(url);

	gridStore.open(function(err,gridStore){
		gridStore.writeFile(url, function(err, doc) {

      // Read back all the written content and verify the correctness
      		if(!err){
      			console.log('bon');
      		}
      		db.close();
       
      	});

	});
});