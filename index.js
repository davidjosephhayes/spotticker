var	express = require('express'),
	app = express(),
	io = require('socket.io'),
	fs = require('fs'),
	request = require('request'),
	lessMiddleware = require('less-middleware'),
	stsettings = require('./stsettings');
	
// serve static content
app.use(lessMiddleware(__dirname + 'public/less',
	{ dest: __dirname + 'public/css' }, // options
    {}, // parser
    { compress: 'auto' } // complier
));
app.use(express.static(__dirname + '/public'));

// server up main page
app.get('/',function(req,res){
	fs.readFile(__dirname + '/index.html',function(err,data){
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
});

// setup server
var server = app.listen(1337);
var socket = io.listen(server);

// setup basics
var settings = JSON.parse(JSON.stringify(stsettings)); //console.log(settings);
var prices = JSON.parse(JSON.stringify(settings.pricesdefault)); //console.log(prices);

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
			
			for (var i=0; i<settings.todisplay.length; i++) {
				var obj = prices.prices[settings.todisplay[i]];
				for (var j in obj) {
					if (!obj.hasOwnProperty(j)) continue;
					obj[j] = newprices[j]*stsettings.gconvert[i];
				}
			}
			
			socket.emit('pricesupdate',prices);
			
		} catch(e) { console.log(e); }
	});
}

