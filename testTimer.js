const dir = '/home/zejian/Downloads',
	url = 'mongodb://localhost:27017/test',
	interval = 3000,
	duration = 10000;

var sync=require('/home/zejian/BoxLinuxSync_MongoDB/testSyncRead.js');
var d0=new Date();
var t0=d0.getTime();

console.log('Synchronisation will be trigered one every '+interval/1000+' s.');
console.log('Auto Synchronisation will stop in '+duration/1000+' seconds');
var autoSync=setInterval(function(){
			  sync.go(dir,url);
			  let d1=new Date();
			  let t1=d1.getTime();
			  if((t1-t0)>=duration){
			  	clearInterval(autoSync);
			  	console.log('Auto synchronization stopped.')
			  }

			},interval)

