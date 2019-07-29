import Snake from "/src/Snake.js";
import Food from "/src/Food.js";
import Sound from "/src/Sound.js";
import InputHandler from "/src/input.js";
export default class Game {
  constructor(document, ctx, gameWidth, gameHeight) {
    this.document = document;
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    this.add(new Snake(this));
    this.add(new Food(this));
    this.paused = false;
    this.pressed = {right:false, left:false};
    this.score = 0;
    this.sounds = {
      eat: new Sound(this, "/assets/foodSound.wav"),
      kill: new Sound(this, "/assets/killSound.wav")
    };
    this.state = Game.GAME_STATES().play;
    new InputHandler(this);
    }

    add(gameObj) {
      this.gameObjects.push(gameObj);
    }

    draw() {
      switch (this.state) {
        case Game.GAME_STATES().start: // Start screen
          this.startScreen();
          break;
        case Game.GAME_STATES().play: // Gameplay
          this.gameObjects.forEach((element) => element.draw());
          this.drawScore();
          if (this.paused) {
            this.ctx.fillStyle = "#000";
            this.ctx.font = "15px Arial";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Game Paused, Press 'p' to continue", this.gameWidth/2, this.gameHeight/2);
          }

          break;
        case Game.GAME_STATES().end: // endScreen
          this.endScreen();
          break;
      }
    }

    pause() {
      this.paused = true;
    }

    resume() {
      this.paused = false;
    }

    startScreen() {
      console.log("Start Screen");
    }

    endScreen() {
      this.ctx.fillStyle = "#000";
      this.ctx.font = "20px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(`Final Score: ${this.score}`, this.gameWidth/2, this.gameHeight/2);
      this.ctx.fillText("Press 'Enter' to try again", this.gameWidth/2, this.gameHeight/2 + 30);
    }

    drawScore() {
      this.ctx.font = "15px Arial";
      this.ctx.fillStyle = "#000";
      this.ctx.fillText(`Score: ${this.score}`, this.gameWidth - 70, 30);
    }

    setGameState(state) {
        this.state = state;
    }

    reset() {
      this.gameObjects = [];
      this.add(new Snake(this));
      this.add(new Food(this));
      this.paused = false;
      this.pressed = {right:false, left:false};
      this.score = 0;
      this.sounds = {
        eat: new Sound(this, "/assets/foodSound.wav"),
        kill: new Sound(this, "/assets/killSound.wav")
      };
      this.state = Game.GAME_STATES().play;
    }

    set width(width) {
      this.gameWidth = width;
    }

    set height(height) {
      this.gameHeight = height;
    }

    static GAME_STATES() {
      return {start:0,
              play:1,
              end:2};
    }
    update(dt) {
      if (!this.paused && this.state == Game.GAME_STATES().play) {
        this.gameObjects.forEach((element) => element.update(dt));
      }
    }
}
