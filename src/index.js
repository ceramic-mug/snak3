import Game from '/src/Game.js';
import Snake from '/src/Snake.js';
let canvas = document.getElementById("sCanvas");
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
let context = canvas.getContext('2d');
// Instantiate Game class

let game = new Game(document, context, GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

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
