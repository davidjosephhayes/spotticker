// stsettings.js
// ========
module.exports = {
	
	testmode: true,
	
	url: 'http://kearneycoincenter.com/index.php?option=com_kccprice&task=getPrices', // update url
	code: '', // prices code
	
	pricesupdateinterval: 1, // in minutes
	
	todisplay: ['g','toz','dwt'], // weights to diplay g,toz,dwt
	displaylogoinupdate: true, // display logo in 
	screenupdateinterval: 5, // lengh of time between updating screen and rotating through prices

	styles: {
		
		files: {
			logofile: 'images/companylogo.png', // url for company logo file
		},
		
		colors: {
		
			background: 'black',
			
			updatesbackground: 'teal',
			updatesborder: 'yellow',
			
			logobackground: 'black',
			logoborder: 'gold',
			
			goldbackground: 'gray', 
			goldborder: 'gold',

			silverbackground: 'brown', 
			silverborder: 'silver',
			
			platinumbackground: 'orange', 
			platinumborder: 'green',
			
			palladiumbackground: 'red', 
			palladiumborder: 'blue',
		},
	},
	
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
