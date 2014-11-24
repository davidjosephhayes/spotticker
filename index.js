var	express = require('express'),
	app = express(),
	io = require('socket.io'),
	fs = require('fs'),
	request = require('request'),
	path = require('path'),
	less = require('less-middleware'),
	stsettings = require('./stsettings');
	
// serve static content
console.log(path.join(__dirname, 'source', 'less'));
app.use(less(path.join(__dirname, 'source', 'less'), {
  dest: path.join(__dirname, 'public')
}));
app.use(express.static(path.join(__dirname, 'public')));

// server up main page
app.get('/',function(req,res){
	fs.readFile(__dirname + '/index.html',function(err,data){
		res.sendFile(__dirname + '/index.html');
	});
});

// setup server
var server = app.listen(1337);
var socket = io.listen(server);

// setup basics
var settings = JSON.parse(JSON.stringify(stsettings)); //console.log(settings);
var prices = JSON.parse(JSON.stringify(settings.pricesdefault)); // console.log(prices);

// creating a new websocket to keep the content updated without any AJAX request
socket.sockets.on('connection',function(socket){ // console.log(socket);
	socket.emit('settings',settings);
	socket.emit('pricesupdate',prices);
});

// update prices on an interval
updateinterval();
var updateintervalintv = setInterval(updateinterval,settings.pricesupdateinterval * 1000 * 60);
function updateinterval() {
	request.get('http://www.xmlcharts.com/cache/precious-metals.php?format=json&currency=usd', function(error,response,body){
		if (error || response.statusCode != 200) return false;
		try {
			var newprices = JSON.parse(response.body);
			
			prices.updated = new Date();
			
			//~ for (var i=0; i<settings.todisplay.length; i++) {
				//~ var obj = prices.prices[settings.todisplay[i]];
				//~ for (var j in obj) {
					//~ if (!obj.hasOwnProperty(j)) continue;
					//~ obj[j] = newprices[j]*stsettings.gconvert[i];
				//~ }
			//~ }
			
			socket.emit('pricesupdate',prices);
			
		} catch(e) { console.log(e); }
	});
}

