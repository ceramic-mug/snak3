// speak friend and enter

// KeyboardEvent() Object will be useful for mapping keys to specific actions
// Of our snake guy

// Just read that ARRAYS CAN BE MANIPULATED WITH PUSH AND POP!!! (ARRAYS in js
// are built as stacks)

// 2D array that contains all of the information about the playing field
var field;
var c = document.getElementById("sCanvas");
var ctx = c.getContext("2d");
drawField();


/*
Things below this comment are functions called by the above ^^
*/

function drawField() {
  var width = 500;
  var height = 500;
  for (var i = 0; i <= width; i = i + width/20){

    // Set line color
    ctx.strokeStyle = 'black';

    // Vertical line
    ctx.moveTo(i,0);
    ctx.lineTo(i,height);
    ctx.stroke();

    // Horizontal line
    ctx.moveTo(0,i);
    ctx.lineTo(width,i);
    ctx.stroke();
  }
}

function buildField() {
  field = new Array(20);
  for (var i = 0; i < field.length; i++) {
    field[i] = new Array(20)
  }
  for (var i = 0; i < field.length; i++) {
    for (var j = 0; j < field[i].length; j++) {
      field[i][j] = 0;
    }
  }
}

function snake() {
  this.head = head,
    this.color = randomSnakeColor(),
    this.move = move(),
    this.x = x,
    this.y = y,
}

// A node-like class that allows us to chain together
// bodyparts of the snake and add them as we need to
function bodyPart() {
  this.x = x,
    this.y = y,
    this.next,
}

// Define the location of little food dots and generate them ocassionaly
function food() {

}

// Specify a color for a newly generated snake
function randomSnakeColor() {

}

// Move the snake to a new location specified by its orientation
function move() {

}

// Turn the snake according to KeyboardEvent()
function turn() {

}

// Draw the current state of the game
function draw() {

}

// Start the game
function start() {

}

// End the game
function stop() {

}

// Eat some food
function eat() {

}

// After eating some food, grow a bit
function grow() {

}

// When you run into yourself
function die() {
}
