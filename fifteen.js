/*
	Menghong chhay
	Student id: 1210470
	Section : DB
	Description: javascript that handle all the behaviour for this game
	feature: multiple pictures
*/

"use strict";

// global variables
var numTiles = 15;
var size = 4;
var tileSize = 100;
var emptyRow = 3;
var emptyCol = 3;
(function() {
	window.addEventListener("load", function() {
		// create and display tiles on the screen
		createTile();
		var allTiles = document.querySelectorAll(".tile");
		for (var i = 0; i < allTiles.length; i++) {
			allTiles[i].addEventListener("click", moveTile);
			allTiles[i].addEventListener("mouseover", mouseOver);
			allTiles[i].addEventListener("mouseout", mouseOut);
		}
		// add drop box for multiple background picture
		handleMultiPic();
		document.getElementById("shufflebutton").addEventListener("click", shuffle);
	});

	// handle multiple pictures
	function handleMultiPic() {
		var multiplePic = document.createElement("select");
		document.getElementById("controls").appendChild(multiplePic);
		var option1 = document.createElement("option");
		// first picture
		option1.setAttribute("value", "background");
		option1.setAttribute("selected", "selected");
		option1.innerHTML= "background";
		multiplePic.appendChild(option1);
		// second picture
		var option2 = document.createElement("option");
		option2.setAttribute("value", "background2");
		option2.innerHTML= "background2";
		multiplePic.appendChild(option2);
		// thrid picture
		var option3 = document.createElement("option");
		option3.setAttribute("value", "background3");
		option3.innerHTML= "background3";
		multiplePic.appendChild(option3);

		// forth picture
		var option4 = document.createElement("option");
		option4.setAttribute("value", "background4");
		option4.innerHTML= "background4";
		multiplePic.appendChild(option4);

		// fifth picture
		var option5 = document.createElement("option");
		option5.setAttribute("value", "background5");
		option5.innerHTML= "background5";
		multiplePic.appendChild(option5);

		multiplePic.addEventListener("change", changePic);
	}

	// change background picture
	function changePic() {
		var picture = this.options[this.selectedIndex].value + ".jpg";
		var allTiles = document.querySelectorAll(".tile");
		for (var i = 0; i < allTiles.length; i++) {
			allTiles[i].style.backgroundImage = 'url(' + picture + ')';
		}
	}
	// create tiles
	function createTile() {
		for (var i = 0; i < numTiles; i++) {
			var tile = document.createElement("div");
			tile.innerHTML = i + 1;
			tile.classList.add("tile");
			document.getElementById("puzzlearea").appendChild(tile);
			var yPosition = Math.floor(i / size) * tileSize;
			var xPosition = (i % size) * tileSize;
			tile.style.top = yPosition + "px";
			tile.style.left = xPosition + "px";
			tile.style.backgroundImage="url('background.jpg')";
			tile.id = "tile-" + (yPosition / tileSize) + "-" + (xPosition / tileSize);
			// position the image
			tile.style.backgroundPosition = (-xPosition) + "px" + " " + (-yPosition) + "px";
		}
	}

	// move tiles to empty square
	function moveTile() {
		if (testMove(this)) {
			moveToEmpty(this);
		}
	}

	// test if this tile is movable
	function testMove(thisTile) {
		var tileRow = parseInt(thisTile.style.top);
		var tileCol = parseInt(thisTile.style.left);
		// check its surrouding tiles for empty slot
		var surroundingTiles = checkNeighborTiles(tileRow / tileSize, tileCol / tileSize);
		for (var i = 0; i < surroundingTiles.length; i += 2) {
			if (surroundingTiles[i] == emptyCol && surroundingTiles[i + 1] == emptyRow) {
				return true;
			}
		}
		return false;
	}

	// get all the neighborTiles
	function checkNeighborTiles(thisRow, thisCol) {
		var nearbyTiles = [];
		// left tile of the current tile
		var col = thisCol - 1;
		var row = thisRow;
		nearbyTiles.push(col);
		nearbyTiles.push(row);
		
		// right tile of the current tile
		col = thisCol + 1;
		// same row as the left tile
		nearbyTiles.push(col);
		nearbyTiles.push(row);

		// bottom tile of the current tile
		col = thisCol;
		row = thisRow + 1;
		nearbyTiles.push(col);
		nearbyTiles.push(row);

		// top tile of the current tile
		// same col as the bottom
		row = thisRow - 1;
		nearbyTiles.push(col);
		nearbyTiles.push(row);
		return nearbyTiles;
	}

	// move tile to the empty space
	function moveToEmpty(thisTile) {
		var tileRow = parseInt(thisTile.style.top) / tileSize;
		var tileCol = parseInt(thisTile.style.left) / tileSize;
		// change id
		thisTile.id = "tile-" + emptyRow + "-" + emptyCol;
		// move it to the empty space
		var emptyTileTop = emptyRow * tileSize;
		var emptyTileLeft = emptyCol * tileSize;
		thisTile.style.top = emptyTileTop + "px";
		thisTile.style.left = emptyTileLeft + "px";

		// change the empty tile to be the currently replaced tile
		emptyRow = tileRow;
		emptyCol = tileCol;
	}

	// handle mouse hover in
	function mouseOver() {
		if (testMove(this)) {
			this.classList.add("moveable");
		}
	}

	// handle mouse hover out
	function mouseOut() {
		this.classList.remove("moveable");
	}
	
	// shuffle the tiles
	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var relatedTiles = filterForRelatedTile(emptyRow, emptyCol);
			var rand = Math.floor(Math.random() * relatedTiles.length);
			moveToEmpty(relatedTiles[rand]);
		}
	}

	// select only related tiles
	function filterForRelatedTile(tileRow, tileCol) {
		var relatedTiles = [];
		var relatedTilesPos = checkNeighborTiles(tileRow, tileCol);
		for (var i = 0; i < relatedTilesPos.length; i +=2 ) {
			var tileCol = relatedTilesPos[i];
			var tileRow = relatedTilesPos[i + 1];
			var correctTile = getTile(tileRow, tileCol);
			if (correctTile) {
				relatedTiles.push(correctTile);
			}
		}
		return relatedTiles;
	}
	// get the tile we need based on the col and row
	function getTile(row, col) {
		return document.getElementById("tile-" + row + "-" + col);
	}
})();