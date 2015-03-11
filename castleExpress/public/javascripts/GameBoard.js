//************************************************************//
// Title:    Game Board - Initializer and Checker
// Project:  CastleMind
// Author:   Nic Wolf
// Sources:  None
// Revision: 0.0.3 (3/1/2015)
//************************************************************//
/* Description:
	 Sets up the game board, generating randomly-colored squares
	 and assigns each a unique coodinate and color.

	 TODOS:
		 - Maybe to a custom html tag instead of all that div crap
		 - 
*/
var squares = [];
window.onload = init;

function init() {

	var divGrid = document.getElementById('divGrid');

	// Setup the squares as a grid in the DOM
	for (var row = 1; row < 6; row++) {
		for (var col = 1; col < 6; col++) {
			divGrid.appendChild(newSquare(row, col));
		}
	}

}//end init()


// Setup a "factory" function to create new squares
function newSquare(x, y) {
	// TODO - maybe your own damn html element. this shit'll get confusing later.
	var square = {};
	var squareDiv = document.createElement('div');							// create a new HTMLDivElement
	square.value = [x, y];                        							// assign the grid coordinates to the element's value as an array
	squareDiv.value = square.value;
	squareDiv.className = 'square';                  						//assign the .square style class
	var colorKeys = getAvailable(square);							// determine the possible colors
	var random = Math.floor(Math.random() * colorKeys.length); 	// determine which color is chosen
	square.colorKey = colorKeys[random];
	squareDiv.style.backgroundColor = randomColor(square.colorKey); 						// generate a random color

	// TESTS
	// display the x/y in the square
	squareDiv.innerHTML = x + ", " + y; 
	squares.push(square);
	return squareDiv;
}//end newSquare()

function getAvailable (square) {
	var starting = [0, 1, 2, 3, 4];
	var remove = [];
	squares.forEach(function (elem) {
		console.log(elem);
		if (elem.value[0] === square.value[0] || elem.value[1] === square.value[1]) {
			if (remove.indexOf(elem.colorKey) === -1) {
				remove.push(elem.colorKey);
			}
		}
	});
	var result = starting.reduce(function (prev, current) {
		var res = prev;
		if (remove.indexOf(current) === -1) {
			res.push(current);
		}
		return res;
	},[]);

	console.log(result);

	return result;
}

// Generate a random color as a string to be passed into HTMLElement.style.backgroundColor attribute
function randomColor(number) {
	switch (number) {
		case 0:
			// checkColor(x, y);
			return "#ff0000";
			break;
		case 1:
			// checkColor(x, y);
			return "#ffff00";
			break;
		case 2:
			// checkColor(x, y);
			return "#00ff00";
			break;
		case 3:
			// checkColor(x, y);
			return "#ff00ff";
			break;
		case 4:
			// checkColor(x, y);
			return "#0000ff";
			break;
		default:
			console.log("Switch error!");
	}
}//end randomColor()


// Take the value of HTMLElement.style.backgroundColor
// Retrieve an array of RGB values
// parse values to hex
function getHex(rgbString) {
	// Clip the ends
	rgbString = rgbString.slice(4, 16); // Remove "rgb("
	rgbString = rgbString.slice(0, rgbString.length - 1) // remove ")"

	var colorArray = [];

	// Loop through to get the 3 color values
	for (var h = 0; h < 3; h++) {
		// Assign the color
		var color = rgbString.slice(0, 4);
		color = color.match(/\d{1,3}/i);
		color = color.toString();
		colorArray[h] = color;

		// Clip from the string
		var clip = 0; // Value sets the cursor
		for (var i = 0; i < rgbString.length; i++) {
			if (rgbString.charAt(i) === color.charAt(i)) {
				clip++;
			}
		}
		// Update the rgb string
		rgbString = rgbString.slice(clip + 2, rgbString.length);
	}
	
	return parseRGBtoHex(colorArray);


	//******************************
	// INTERNAL FUNCTIONS
	function parseRGBtoHex(rgbArray) {
		var hex = "#";

		for (var i = 0; i < rgbArray.length; i++) {
			hex += ("0" + parseInt(rgbArray[i]).toString(16)).slice(-2);
		}
		return hex;
	}//end parseRGBtoHEX()

}//end getColors()
