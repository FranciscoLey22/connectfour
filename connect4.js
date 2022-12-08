/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// var WIDTH = 7;
// var HEIGHT = 6;
// replace var with const/let;
const WIDTH = 7; // Update ES2015
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	for (let y = 0; y < HEIGHT; y++) {
		//<-loop through the height(y) to create the number of rows
		//create an empty array and loop through the width to create null cells
		//for the number of columns
		let cells = [];
		for (let x = 0; x < WIDTH; x++) {
			//add empty cells/null values to each row
			cells.push(null);
		}
		//add a new row
		board.push(cells);
	}
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById("board");

	// TODO: add comment for this code
	//var top = document.createElement("tr");
	//creating a top row to be clicked for 'dropping' a game piece.
	const top = document.createElement("tr"); //-ES2015
	//assigning an id of 'column-top' to the top row.
	top.setAttribute("id", "column-top");
	//making the top cells clickable by adding an event listener
	top.addEventListener("click", handleClick);

	//creating the columns/cells for the top row
	// for (var x = 0; x < WIDTH; x++) {
	for (let x = 0; x < WIDTH; x++) {
		//- update ES2015
		// var headCell = document.createElement("td");
		//creating the top row cells/columns
		const headCell = document.createElement("td"); //- update ES2015
		//assigning an ID to the top cells/columns (x coordinate)
		headCell.setAttribute("id", x);
		//appending/inserting the html columns/cells
		top.append(headCell);
	}
	//appending the HTML table with the top row/columns/cells
	htmlBoard.append(top);

	//Using JS to create HTML table elements.  First loop(y) creates the 6 rows.
	// for (var y = 0; y < HEIGHT; y++) {
	for (let y = 0; y < HEIGHT; y++) {
		//ES2015 update
		const row = document.createElement("tr"); //creating a table row
		//Second loop(x) creates the 7 columns.
		// for (var x = 0; x < WIDTH; x++) {
		for (let x = 0; x < WIDTH; x++) {
			//ES2015 update
			const cell = document.createElement("td"); //creating table cells in each row
			cell.setAttribute("id", `${y}-${x}`); //creating a cell id with a y and x coordinate
			//appending/inserting the cells into each row
			row.append(cell);
		}
		//appending/inserting the rows
		htmlBoard.append(row);
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
	// TODO: write the real version of this, rather than always returning 0
	//return 0;

	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (!board[y][x]) {
			return y;
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
	const piece = document.createElement("div");
	//adding a class of chip to the new inserted div
	piece.classList.add("piece");
	//adding a class indicating the player
	piece.classList.add(`p${currPlayer}`);

	//finding the location that the chip gets appended to
	const location = document.getElementById(`${y}-${x}`);
	//appending/inserting the new div on the html game board
	location.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
	const message = document.createElement("h2");
	const gameBoard = document.getElementById("body");
	message.innerText = `${msg} - Click New Game to play again`
	gameBoard.append(message);
	alert(`${msg}`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	//var x = +evt.target.id;
	const x = +evt.target.id; //ES2015 update

	// get next spot in column (if none, ignore click)
	// var y = findSpotForCol(x); - update to ES2015
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// if (board.every(row => row.every(cell => cell))) {
	// 	return endGame('Tie!');
	//   }

	// check for win
	if (checkForWin()) {
		return setTimeout(endGame(`PLAYER ${currPlayer} WINS`), 2000);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	// for (let y = 0; y < HEIGHT; y++) {
	// 	for (let x = 0; x < WIDTH; x++) {
	// 		//loop through the rows and columns w/two loops to check if a null value exists
	// 		//if one exists keep playing
	// 		if (board[y][x] === null) {
	// 			return;
	// 		}
	// 	}
	// 	//if no null value exists and the game and prompt a tie game
	// 	return endGame("Player Tie");
	// }
	// CHECK FOR TIE
	if (board.every(row => row.every(cell => cell))) {
		return endGame('TIE GAME');
	  }
	// switch players
	// TODO: switch currPlayer 1 <-> 2
	if (currPlayer === 1) {
		currPlayer = 2;
	} else {
		currPlayer = 1;
	}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(
			([y, x]) =>
				y >= 0 &&
				y < HEIGHT &&
				x >= 0 &&
				x < WIDTH &&
				board[y][x] === currPlayer
		);
	}

	// TODO: read and understand this code. Add comments to help you.

	// for (var y = 0; y < HEIGHT; y++) {
	//   for (var x = 0; x < WIDTH; x++) {
	//     var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
	//     var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
	//     var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
	//     var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
	for (let y = 0; y < HEIGHT; y++) {
		//ES2015 update
		for (let x = 0; x < WIDTH; x++) {
			//check for 4 in a row in the horizontal direction
			const horiz = [
				[y, x],
				[y, x + 1],
				[y, x + 2],
				[y, x + 3],
			];
			//check for 4 in a row in the vertical direction
			const vert = [
				[y, x],
				[y + 1, x],
				[y + 2, x],
				[y + 3, x],
			];
			//check for 4 in a row in the diagonal right direction
			const diagDR = [
				[y, x],
				[y + 1, x + 1],
				[y + 2, x + 2],
				[y + 3, x + 3],
			];
			//check for 4 in a row in the diagonal left direction
			const diagDL = [
				[y, x],
				[y + 1, x - 1],
				[y + 2, x - 2],
				[y + 3, x - 3],
			];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
