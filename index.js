// include modules
var	express = require('express'),
	app = express(),
	fs = require('fs'),
	io = require('socket.io'),
	request = require('request'),
	path = require('path'),
	less = require('less-middleware');
	
// include settings
var defaultsettingslocation = path.join(__dirname, 'stsettings.dist.js');
var settingslocation = path.join(__dirname, 'stsettings.js');
if (!fs.existsSync(settingslocation)) { // copy distribution settings if none are specified
	var defaultsettingsdata = fs.readFileSync(defaultsettingslocation).toString();
	fs.writeFileSync(settingslocation,defaultsettingsdata);
}
stsettings = fs.existsSync(settingslocation) ? require('./stsettings') : require('./stsettings.dist');
	
// setup basics
var settings = JSON.parse(JSON.stringify(stsettings)); //console.log(settings);
var prices = JSON.parse(JSON.stringify(settings.pricesdefault)); // console.log(prices);
	
// serve static content
app.use(less(path.join(__dirname,'source','less'),{
	dest: path.join(__dirname, 'public'),
	options: {
		compiler: {
			compress: !settings.testmode,
		},
	},
	preprocess: {
		path: function(pathname, req) {
			return pathname.replace('/css/','/'); 
		},
		less : function(src, req){
			var varString = '';
			for (var key in settings.styles.files){
				if (!settings.styles.files.hasOwnProperty(key)) continue;
				varString += '@' + key + ':~"../' + settings.styles.files[key] + '";';
			}
			for (var key in settings.styles.colors){
				if (!settings.styles.colors.hasOwnProperty(key)) continue;
				varString += '@' + key + ':' + settings.styles.colors[key] + ';';
			}
			return varString + src;
		}
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
		var url = settings.url;
		url += '&code='+encodeURIComponent(settings.code); // console.log(url);
		request.get(url, function(error,response,body){
			if (error || response.statusCode != 200) return false;
			try {
				var newprices = JSON.parse(response.body);
				if ('error' in newprices) {
					throw new Error(newprices.error);
					return false;
				}
				updateprices(newprices);						
			} catch(e) { console.log(e); }
		});
	}
	
	function updateprices(newprices) {
		prices.updated = new Date(newprices.updated*1000);
		for (var i=0; i<settings.todisplay.length; i++) {
			var meas = settings.todisplay[i];
			for (var j in prices[meas]) {
				if (!prices[meas].hasOwnProperty(j)) continue;
				prices[meas][j] = newprices.prices[j]*settings.gconvert[meas]; 
			}
		}
		socket.emit('pricesupdate',prices);
	}
}
