var	express = require('express'),
	app = express(),
	io = require('socket.io'),
	request = require('request'),
	path = require('path'),
	less = require('less-middleware'),
	stsettings = require('./stsettings');
	
// setup basics
var settings = JSON.parse(JSON.stringify(stsettings)); //console.log(settings);
var prices = JSON.parse(JSON.stringify(settings.pricesdefault)); // console.log(prices);
	
// serve static content
app.use(less(path.join(__dirname, 'source', 'less'), {
	dest: path.join(__dirname, 'public'),
	options: {
		compiler: {
			compress: !settings.testmode,
		},
	},
	preprocess: {
		path: function(pathname, req) {
			return pathname.replace('/css/', '/');
		},
	},
	debug: settings.testmode,
	force: settings.testmode,
}));
app.use(express.static(path.join(__dirname, 'public')));

// server up main page
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

// setup server
var server = app.listen(1337);
var socket = io.listen(server);

// creating a new websocket
socket.sockets.on('connection',function(socket){ // console.log(socket);
	socket.emit('settings',settings);
	socket.emit('pricesupdate',prices);
});

// update prices on an interval
updateinterval();
var updateintervalintv = setInterval(updateinterval,settings.pricesupdateinterval * 1000 * 60);
function updateinterval() {
	
	if (settings.testmode) {
		var newprices = {
			"gold": 38.74486 * (0.75 + Math.random()*0.5),
			"palladium": 25.33479 * (0.75 + Math.random()*0.5),
			"platinum": 39.54541 * (0.75 + Math.random()*0.5),
			"silver": 0.53113 * (0.75 + Math.random()*0.5),
		};
		updateprices(newprices);
	} else {
		request.get('http://www.xmlcharts.com/cache/precious-metals.php?format=json&currency=usd', function(error,response,body){
			if (error || response.statusCode != 200) return false;
			try {
				var newprices = JSON.parse(response.body);
				updateprices(newprices);						
			} catch(e) { console.log(e); }
		});
	}
	
	function updateprices(newprices) {
		prices.updated = new Date();
		for (var i=0; i<settings.todisplay.length; i++) {
			var meas = settings.todisplay[i];
			var obj = prices[meas];
			for (var j in obj) {
				if (!obj.hasOwnProperty(j)) continue;
				obj[j] = newprices[j]*settings.gconvert[meas]; 
			}
		}
		socket.emit('pricesupdate',prices);
	}
}
