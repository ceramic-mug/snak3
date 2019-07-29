import Game from '/src/Game.js';
import Sound from '/src/Sound.js';

const scale = 0.7; // The relative horizontal scale of the canvas
const fps = 60;
const frame_interval = 1 / (fps * 1000);
let lastTime = 0;
let context;
let game;

function updateCanvasDimensions(context) {
  const newGameWidth = scale * window.innerWidth;
  const newGameHeight = window.innerHeight;

  if (context.canvas.width !== newGameWidth) {
    context.canvas.width = newGameWidth;
    context.canvas.height = newGameHeight;
    game.width = newGameWidth;
    game.height = newGameHeight;
  }
}

function populatePage() {
  const body = document.getElementsByTagName("body")[0];
  const left_padding = document.createElement("div");
  const right_padding = document.createElement("div");
  const canvas_div = document.createElement("div");
  const canvas = document.createElement('canvas'); // create the element

  canvas.id = 'canvas';
  canvas.width = scale * window.innerWidth;
  canvas.height = 0.75 * canvas.width;
  context = canvas.getContext('2d');
  left_padding.className = right_padding.className = "side_flex_pad";
  canvas_div.className = "canvas_div";
  
  left_padding.style.flexBasis = right_padding.style.flexBasis = `${(1 - scale) * 50}\%`;
  canvas_div.style.flexBasis = `${scale * 100} \%`;
  body.appendChild(left_padding);
  body.appendChild(canvas_div);
  body.appendChild(right_padding);

  canvas_div.appendChild(canvas);

  setInterval(function () {
    updateCanvasDimensions(context);
  }, 100);
}

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  game.ctx.clearRect(0, 0, game.gameWidth, game.gameHeight);
  game.draw();
  game.update(dt);
  requestAnimationFrame(gameLoop, frame_interval);
}

function startGame() {
  game = new Game(document, context, canvas.width, canvas.height);
  let music = new Sound(game, "../media/bensound-dreams.mp3");
  // music.play();

  requestAnimationFrame(gameLoop, frame_interval);
}



populatePage();
startGame();
