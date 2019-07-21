import Game from '/src/Game.js';
import Snake from '/src/Snake.js';

// Create the canvas
const scale = 0.5; // The relative scale of the canvas, vertically and horizontally
var canvas = document.createElement('canvas'); // create the element
canvas.id = 'canvas';
canvas.width = scale * window.innerWidth;
canvas.height = scale * window.innerHeight;
var body = document.getElementsByTagName("body")[0]; // get body element
body.appendChild(canvas); // add canvas to body element


let GAME_WIDTH = canvas.width;
let GAME_HEIGHT = canvas.height;

let context = canvas.getContext('2d');

// Instantiate Game class

let game = new Game(document, context, GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

/*
 Adding Music to be playing in the background during game
*/
let music = new Audio("../media/bensound-dreams.mp3");

// music.play();

function resize() { // FIXME: I don't think this is doing anything helpful
  GAME_WIDTH  = canvas.width;
  GAME_HEIGHT = canvas.height;
  game.gameWidth = GAME_WIDTH;
  game.gameHeight = GAME_HEIGHT;
}


function gameLoop(timestamp) {
  resize(); // FIXME: I don't think is doing anything helpful
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  game.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw();
  game.update(dt);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
