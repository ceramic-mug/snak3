import Game from '/src/Game.js';

let canvas = document.getElementById("sCanvas");
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
let context = canvas.getContext('2d');

// Instantiate Game class
let game = new Game(context, GAME_WIDTH, GAME_HEIGHT);
function gameLoop() {
  // FIXME:

}

requestAnimationFrame(gameLoop);
