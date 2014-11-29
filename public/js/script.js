jQuery(function($){
	var resize = function(){ $('html,body').css('font-size',window.innerHeight/40); };
	$(window).resize(resize);
	resize();
});

var socket = io.connect(window.location.protocol+'//'+window.location.hostname);

var settings;
socket.on('settings',function(data){
	settings = data;
	if (settings.todisplay.length<=0) settings.todisplay = ['g'];
	setupUpdate();
});

var prices;
socket.on('pricesupdate',function(data){
	prices = data;
	setupUpdate();
});

var updateintv;
function setupUpdate() {
	if (typeof updateintv != 'undefined' || typeof settings == 'undefined' || typeof prices == 'undefined') return;
	updateintv = setInterval(function(){
		//~ console.log(settings);
		//~ console.log(prices);
		updateView();
	},settings.screenupdateinterval*1000);
}

var cw = 0;
function updateView(){
	// adrian start
	var currentweight = settings.todisplay[cw];
	
	$('.currentWeight').text(currentweight);
	$('.goldPrice').html('$'+prices[currentweight].gold.toFixed(2));
	$('.silverPrice').html('$'+prices[currentweight].silver.toFixed(2));
	$('.palladiumPrice').html('$'+prices[currentweight].palladium.toFixed(2));
	$('.platinumPrice').html('$'+prices[currentweight].platinum.toFixed(2));
	
	cw = (cw+1)%settings.todisplay.length;
	
	var u = new Date(prices.updated);
	var hours = u.getHours();
	var am = hours%12==hours ? 'am' : 'pm';
	hours = hours==0 ? 12 : hours;
	var minutes = u.getMinutes(); 
	var day = u.getDate();
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var month = monthNames[u.getMonth()].substr(0,3);
	$('.lastUpdated').html(hours + ':' + minutes + ' ' + am + ' - ' + day + ' ' + month);
	
	$('.loading-container').hide();
	// adrian end
}