import Game from '/src/Game.js';
import Snake from '/src/Snake.js';
let canvas = document.getElementById("sCanvas");
let GAME_WIDTH = canvas.width;
let GAME_HEIGHT = canvas.height;
let context = canvas.getContext('2d');
let scale = 0.5; // The relative scale of the canvas, vertically and horizontally
// Instantiate Game class

function resizeCanvas() {
  canvas.width = scale*window.innerWidth;
  canvas.height = scale*window.innerHeight;
  GAME_WIDTH = canvas.width;
  GAME_HEIGHT = canvas.height;
}

resizeCanvas();

let game = new Game(document, context, GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

/*
 Adding Music to be playing in the background during game
*/
let music = new Audio("../media/bensound-dreams.mp3");

// music.play();

function gameLoop(timestamp) {
  // FIXME:
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  game.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw();
  game.update(dt);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
