var mongodb = require('mongodb'),
	fs = require('fs'),
	md5File = require('md5-file');

var dir = '/home/yayun/Downloads',
	MongoClient = mongodb.MongoClient,
	ObjectID = mongodb.ObjectID,
	url = 'mongodb://localhost:27017/grifs';

MongoClient.connect(url, function(err, db){
	if(err){
		return console.log('Unable to connect to the mongoDB server. Error:', err);
	}
	
	console.log('Connection established to', url);

	var collection=db.collection('fs.files');

	// read the files
	fs.readdir(dir,function(err,files){
		if(err){
			return console.log('failed to read '+dir);
		}
		for(let i = 0; i < files.length; i ++ ){
			var file_name = dir + '/' + files[i];
			fs.stat(file_name,function(err,stats){
				if(err){
					return console.log('failed to get file info');
				}


				// skip the directories
				if(!stats.isDirectory()){

				// check the existence in the database
					collection.find({'filename':'hehe'}).toArray(function(err,docs){
	    				if(err) {
	    					return console.log('error reading collection');
	    				}
	    				// if file not found
	    				if(docs.length < 1){
	    					var fileId = new ObjectID();
	    					var gridStore = new GridStore(db, fileId, file_name, 'w');
	    					gridStore.open(function(err,gridStore){
								gridStore.writeFile(url, function(err, doc) {
	      							if(err){
	      								return console.log('cannot insert the document');
	      							}
	      					
	       
	      						});
							});
	    				}
	    			});
				}
			});
		}
	});
	db.close();
});