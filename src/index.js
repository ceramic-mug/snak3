import Game from '/src/Game.js';
import Snake from '/src/Snake.js';

// Create the canvas
const scale = 0.5; // The relative horizontal scale of the canvas
var canvas = document.createElement('canvas'); // create the element
canvas.id = 'canvas';
canvas.width = scale * window.innerWidth;
canvas.height = 0.75 * canvas.width;
var body = document.getElementsByTagName("body")[0]; // get body element
body.appendChild(canvas); // add canvas to body element


let GAME_WIDTH = canvas.width;
let GAME_HEIGHT = canvas.height;
let context = canvas.getContext('2d');

let game = new Game(document, context, GAME_WIDTH, GAME_HEIGHT);

setInterval(function () {
  updateCanvasDimensions(context);
}, 100);

let lastTime = 0;

// Adding Music to be playing in the background during game

let music = new Audio("../media/bensound-dreams.mp3");

// music.play();

<<<<<<< HEAD
function resize() { // FIXME: I don't think this is doing anything helpful
  GAME_WIDTH  = canvas.width;
  GAME_HEIGHT = canvas.height;
  game.gameWidth = GAME_WIDTH;
  game.gameHeight = GAME_HEIGHT;
}


function gameLoop(timestamp) {
  resize(); // FIXME: I don't think is doing anything helpful
=======
function updateCanvasDimensions(context) {
  const newGameWidth = scale * window.innerWidth;
  const newGameHeight = 0.75 * newGameWidth;

  if (context.canvas.width !== newGameWidth) {
    context.canvas.width = newGameWidth;
    context.canvas.height = newGameHeight;
    game.width = newGameWidth;
    game.height = newGameHeight;
    GAME_WIDTH = newGameWidth;
    GAME_HEIGHT = newGameHeight;
  }
  
}
function gameLoop(timestamp) {
>>>>>>> Implemented dynamic game canvas resize
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  game.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw();
  game.update(dt);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
