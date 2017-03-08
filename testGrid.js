var fs = require('fs'),
	mongo = require('mongodb');
	//Grid = mongo.Grid;

//Connect to the db
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/grifs";
MongoClient.connect(url, function(err,db){
	if(err) {
    	console.log('Unable to connect to the mongoDB server. Error:', err);
  	}else {
    //HURRAY!! We are connected. :)
   		console.log('Connection established to', url);

		var grid = new mongo.Grid(db, 'fs');
		var buffer = fs.readFile('/home/yayun/box/test_doc.docx');
		grid.put(buffer,{},function(err, fileInfo){
			console.log("test_doc.docx is put in the mongodb!");
			console.log(fileInfo);
		});
	}
});