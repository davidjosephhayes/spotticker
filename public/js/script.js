jQuery(function($){
	var resize = function(){ $('html,body').css('font-size',window.innerHeight/30); };
	$(window).resize(resize);
	resize();
});

//~ var socket = io.connect(window.location.protocol+'//'+window.location.hostname+':'+window.location.port, {
	//~ 'transports': ['websocket', 'polling']
//~ });
//~ var socket = io.connect();
var socket = io({
	'transports': ['websocket', 'polling']
});

var settings;
socket.on('settings',function(data){
	settings = data;
	if (settings.testmode) console.log(settings);
	if (settings.todisplay.length<=0) settings.todisplay = ['g'];
	if (settings.showBid) $('.goldPrice, .silverPrice, .platinumPrice, .palladiumPrice').addClass('showBid');
	setupUpdate();
});

var allprices;
socket.on('pricesupdate',function(data){
	allprices = data;
	if (settings.testmode) console.log(allprices);
	setupUpdate();
});

var updateintv;
function setupUpdate() {
	if (typeof updateintv != 'undefined' || typeof settings == 'undefined' || typeof allprices == 'undefined') return;
	updateintv = setInterval(function(){
		//~ console.log(settings);
		//~ console.log(prices);
		updateView();
	},settings.screenupdateinterval*1000);
}

var cw = 0;
function updateView(){

	var currentweight = settings.todisplay[cw];
	
	var prices = allprices.prices;
	var bidprices = allprices.bidprices;
	
	$('.currentWeight').text(currentweight);
	$('.goldPrice').html(
		(settings.showBid ? 'Bid: $'+bidprices[currentweight].gold.toFixed(2) + '<br>Ask: ' : '') +
		('$'+prices[currentweight].gold.toFixed(2))
	);
	$('.silverPrice').html(
		(settings.showBid ? 'Bid: $'+bidprices[currentweight].silver.toFixed(2) + '<br>Ask: ' : '') +
		('$'+prices[currentweight].silver.toFixed(2))
	);
	$('.palladiumPrice').html(
		(settings.showBid ? 'Bid: $'+bidprices[currentweight].palladium.toFixed(2) + '<br>Ask: ' : '') +
		('$'+prices[currentweight].palladium.toFixed(2))
	);
	$('.platinumPrice').html(
		(settings.showBid ? 'Bid: $'+bidprices[currentweight].platinum.toFixed(2) + '<br>Ask: ' : '') +
		('$'+prices[currentweight].platinum.toFixed(2))
	);
	
	cw = (cw+1)%settings.todisplay.length;
	
	var u = new Date(allprices.updated);
	if (settings.testmode) console.log(u);
	
	var hours = u.getHours();
	var regularhours = hours%12;
	var am = regularhours==hours ? 'am' : 'pm';
	hours = regularhours==0 ? 12 : regularhours;	
	var minutes = u.getMinutes(); 
	minutes = minutes<10 ? '0'+minutes : minutes;
	var day = u.getDate();
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var month = monthNames[u.getMonth()].substr(0,3);
	$('.lastUpdated').html(hours + ':' + minutes + am + ' ' + month + ' ' + day);
	
	$('.loading-container').hide();
}
