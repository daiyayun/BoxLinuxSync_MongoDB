const fs=require('fs');
// const dir='/home/zejian/Videos';
const dir='/home/zejian/box'
const md5File=require('md5-file');

fs.readdir(dir,function(err,files){
	if(err){
		console.log('failed to read '+dir);
	}
	console.log(files)
	console.log(files.length+" files in total")

	i=2
	file=dir+"/"+files[i];
	fs.stat(file,function(err,stats){
		if(err){
			console.log('failed to get file info');
		}

		console.log(stats);
		md5File(file,function(err,hash){
			if(err){
				console.log('checksum failed');
			}
			console.log('MD5 sum of '+files[i]+'='+hash)
		})
	})
})

