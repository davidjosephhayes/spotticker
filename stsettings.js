// stsettings.js
// ========
module.exports = {
	
	testmode: true,
	
	pricesupdateinterval: 60, // in minutes
	
	todisplay: ['g','toz','dwt'], // weights to diplay g,toz,dwt
	displaylogoinupdate: true, // display logo in 
	screenupdateinterval: 5, // lengh of time between updating screen and rotating through prices

	styles: {
		
		files: {
			logofile: 'images/companylogo.png', // url for company logo file
		},
		
		colors: {
		
			background: 'pink',
			
			updatesbackground: 'teal',
			updatesborder: 'solid 0.2rem yellow',
			
			logobackground: 'black',
			logoborder: 'solid 0.2rem gold',
			
			goldbackground: 'gray', 
			goldborder: 'solid 0.2rem gold',

			silverbackground: 'brown', 
			silverborder: 'solid 0.2rem silver',
			
			platinumbackground: 'orange', 
			platinumborder: 'solid 0.2rem green',
			
			palladiumbackground: 'red', 
			palladiumborder: 'solid 0.2rem blue',
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
