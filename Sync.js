module.exports = {
	go:function(dir,url){

		var mongodb = require('mongodb'),
			fs = require('fs'),
			md5File = require('md5-file');

		var MongoClient = mongodb.MongoClient,
			GridStore = mongodb.GridStore,
			ObjectID = mongodb.ObjectID;
			

		MongoClient.connect(url, function(err, db){
			if(err){
				return console.log('Unable to connect to the mongoDB server. Error:', err);
			}
			
			console.log('Connection established to', url);

			var collection = db.collection('fs.files');

			// read the files
			var files = fs.readdirSync(dir);
			console.log(files.length + ' files in the directory.');
			
			//for(let i = 0; i < files.length; i ++ ){
				
			var i = 0;
			var loop = function(){
					if(i >= files.length) {
						db.close();
						return console.log('done !');
					}
					var file_name = dir + '/' + files[i];
								
					var stats = fs.statSync(file_name);
					//console.log('i = ',i);
					//console.log("file name0 is " + file_name);
					i ++;

					// skip the directories
					if(!stats.isDirectory()){
					// check the type and the size of the file
								//console.log("file name is " + file_name);
						var sp = file_name.split('.');
						var file_type = sp[sp.length - 1]; 
						//var check_type = ( (file_type === 'pdf')||(file_type === 'doc')||(file_type === 'docx')||(file_type === 'ppt')||(file_type === 'pptx')||(file_type === 'jpeg')||(file_type === 'png')(file_type === 'jpg');
						var check_type = ( (file_type === 'pdf')||(file_type === 'doc')||(file_type === 'docx')||(file_type === 'ppt')||(file_type === 'pptx')||(file_type === 'jpeg')||(file_type === 'jpg')||(file_type === 'png') );
						var check_size = (stats.size < 8000000);
						//console.log("file_type is " + file_type);
						//console.log("check_type is " + check_type);
						//console.log("check_size is " + check_size);

						if(check_size&&check_type){
						// check the existence in the database
							//console.log("file name1 is " + file_name);
							
							//the problem is here.
							collection.find({'filename':file_name}).toArray(function(err,docs){
							    //console.log("file name2 is " + file_name);
			    				if(err) {
			    					return console.log('error reading collection');
			    				}
			    				// if file not found, then insert it to the database
			    				if(docs.length < 1){
			    					var fileId = new ObjectID();
			    					var gridStore = new GridStore(db, fileId, file_name, 'w');
			    					// gridStore.open(function(err,gridStore){
			    					// 	if(err){
			    					// 		return console.log('faied to open gridStore');
			    					// 	}

									gridStore.writeFile(file_name, function(err, doc) {
		      							if(err){
		      								return console.log('cannot insert the document');
		      							}
		      							console.log(file_name + ' is inserted to the database.');
		       							
		       							return loop();      							
		      						});
									// });
			    				}
			    				//if file found, then compare with the database and decide if we need to update
			    				else{
			    					md5File(file_name, function(err, hash){
										if(err){
											return console.log('checksum failed');
										}
										// if the file has changed, then update
										if(hash !== docs[0].md5){
											var gridStore = new GridStore(db, docs[0]._id, file_name, 'w');
											//gridStore.open(function(err,gridStore){
											gridStore.writeFile(file_name, function(err, doc) {
		      									if(err){
		      										return console.log('cannot update the document');
		      									}
		      									console.log(file_name + ' is updated to the database.');	
		      									
		      									return loop();	      									
		      								});
											//});
										} else { 
											console.log(file_name,' already exists.');
											return loop();
										}
									});
			    				}
			    			});
			   			    //console.log("file name3 is " + file_name);
						} else { 
							return loop();		
						}

					} else {  
						return loop();
					}
				};
			loop();
			//db.close();
		});
	}
}