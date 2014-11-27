// stsettings.js
// ========
module.exports = {
	
	testmode: true,
	
	pricesupdateinterval: 60, // in minutes
	
	todisplay: ['g','toz','dwt'], // weights to diplay g,toz,dwt
	screenupdateinterval: 5, // lengh of time between updating screen and rotating through prices
	
	logofile: 'images/companylogo.png', // url for company logo file
	displaylogoinupdate: true, // display logo in 
	
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
