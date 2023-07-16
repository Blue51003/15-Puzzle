var rows = 4;
var columns = 4;

var currTile;
var otherTile; //blank tile

var turns = 0;
var time;

var imgOrder = ["10", "6", "1", "16", "8", "15", "12", "4", "9", "3", "7", "11", "13", "5", "14", "2"]

window.onload = function(){
    for (let r=0; r<rows; r++){
        for (let c=0; c<columns; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() +"-"+ c.toString();
            tile.src = "imgs/" +imgOrder.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);
            tile.addEventListener("newgame", newGame);
            tile.addEventListener("won", wonGame);


            document.getElementById("board").append(tile);
        }
    }
    document.getElementById("moves").innerText = 0;
}



function dragStart() {
    currTile = this;
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave(){

}

function dragDrop(){
    otherTile = this;
}

function dragEnd() {

    if (!otherTile.src.includes("imgs/16.jpg")){
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2== c+1;
    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c==c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent){
        let currBlock = currTile.src;
        let otherBlock = otherTile.src;

        currTile.src = otherBlock;
        otherTile.src= currBlock;

        turns+=1;
        document.getElementById("moves").innerText = turns;
    }
    
}

function swapTiles(cell1,cell2) {
    var temp = document.getElementById(cell1).src;
    document.getElementById(cell1).src = document.getElementById(cell2).src;
    document.getElementById(cell2).src = temp;
  }

function newGame(){
    document.getElementById("moves").innerText = 0;
    turns = 0;
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns ; c++){

            var r2 = Math.floor(Math.random()*4 + 1);
            var c2 = Math.floor(Math.random()*4 + 1);

            swapTiles(r.toString() +"-"+ c.toString() , r2.toString() +"-"+ c2.toString());
        }
    }
}

function wonGame(){
    var imgOrder2 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
    flag=0;

    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns ; c++){
            if(document.getElementById(r.toString() +"-"+ c.toString()).src == "imgs/" +imgOrder2.shift()+"jpg"){
                flag=1;
            }
        }
    }
    if (flag==1){

    }
}

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;

    let blankcoord = document.getElementById("board").src("imgs/16.jpg").id.spilt("-");
    let r=parseInt(blankcoord[0]);
    let c=parseInt(blankcoord[1]);

    if (name === 'Control') {
          // Do nothing.
      return;
    }
    if (code=="ArrowDown"){
        var temp = document.getElementById(r.toString() +"-"+ c.toString()).src;
        document.getElementById(r.toString() +"-"+ c.toString()).src = document.getElementById((r+1).toString() +"-"+ c.toString()).src;
        document.getElementById((r+1).toString() +"-"+ c.toString()).src = temp;
    } else if (code=="ArrowUp"){
        var temp = document.getElementById(r.toString() +"-"+ c.toString()).src;
        document.getElementById(r.toString() +"-"+ c.toString()).src = document.getElementById((r-1).toString() +"-"+ c.toString()).src;
        document.getElementById((r-1).toString() +"-"+ c.toString()).src = temp;
    } else if(code=="ArrowLeft"){
        var temp = document.getElementById(r.toString() +"-"+ c.toString()).src;
        document.getElementById(r.toString() +"-"+ c.toString()).src = document.getElementById((r).toString() +"-"+ (c-1).toString()).src;
        document.getElementById((r).toString() +"-"+ (c-1).toString()).src = temp;
    } else if (code=="ArrowRight"){
        var temp = document.getElementById(r.toString() +"-"+ c.toString()).src;
        document.getElementById(r.toString() +"-"+ c.toString()).src = document.getElementById((r).toString() +"-"+ (c+1).toString()).src;
        document.getElementById((r).toString() +"-"+ (c+1).toString()).src = temp;
    }
  }, false);
