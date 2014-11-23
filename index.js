var	express = require('express'),
	app = express(),
	io = require('socket.io'),
	fs = require('fs'),
	request = require('request');
	
// serve static content
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

// creating a new websocket to keep the content updated without any AJAX request
socket.sockets.on('connection',function(socket){
	console.log('A socket connected!');
	getPrices();
});

getPrices();
function getPrices(){
	request.get('http://www.xmlcharts.com/cache/precious-metals.php?format=json&currency=usd', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//~ console.log(response.body);
			try {
				//~ var prices = JSON.parse(response.body);
				socket.emit('prices',response.body);
				//~ console.log(prices);
			} catch(e) {
				//~ console.log(e);
			}
		}
	});
}
