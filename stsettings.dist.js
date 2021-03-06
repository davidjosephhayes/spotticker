// stsettings.js
// ========
module.exports = {
	
	testmode: true,
	
	url: 'http://kearneycoincenter.com/index.php?option=com_kccprice&task=getPrices', // update url
	code: '', // prices code
	
	pricesupdateinterval: 60, // in minutes
	
	todisplay: ['g','toz','dwt'], // weights to diplay g,toz,dwt
	screenupdateinterval: 5, // lengh of time between updating screen and rotating through prices in seconds
	
	launchmidori: false, // spawn midori in full screen at url after server is up

	showBid: false, // show the unmodified bid price as well as the modified price
	pricemodifiers: { // amount to modify price (useful for adding a profit margin or getting the bid price closer to ask)
		gold: {
			fixed: 0,
			ratio: 1,
		},
		silver: {
			fixed: 0,
			ratio: 1,
		},
		platinum: {
			fixed: 0,
			ratio: 1,
		},
		palladium: {
			fixed: 0,
			ratio: 1,
		},
	},
		
	styles: {
		
		files: {
			logofile: 'images/bbslogo.png', // url for company logo file
		},
		
		colors: {
		
			background: 'black',
			
			updatesbackground: '#34495e',
			updatesborder: '#2c3e50',
			
			logobackground: '#2c3e50',
			logoborder: '#2c3e50',
			
			goldbackground: '#34495e', 
			goldborder: '#2c3e50',

			silverbackground: '#34495e', 
			silverborder: '#2c3e50',
			
			platinumbackground: '#34495e', 
			platinumborder: '#2c3e50',
			
			palladiumbackground: '#34495e', 
			palladiumborder: '#2c3e50',
			
			headingscolor: '#f1c40f',
			pricescolor: '#ffffff',
		},
	},
	
	
	// no edit below here 
	gconvert: { // conversion from grams to other weight/mass measurements
		'g': 1,
		'toz': 31.1034768,
		'dwt': 1.55517384,
	},
	
	pricesdefault: {
		"updated": false,
		"g": {
			"gold": 0,
			"palladium": 0,
			"platinum": 0,
			"silver": 0,
		},
		"toz": {
			"gold": 0,
			"palladium": 0,
			"platinum": 0,
			"silver": 0,
		},
		"dwt": {
			"gold": 0,
			"palladium": 0,
			"platinum": 0,
			"silver": 0,
		},
	},
};
