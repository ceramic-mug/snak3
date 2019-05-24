import Snake from "/src/Snake.js";
import Food from "/src/Food.js";
export default class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    this.add(new Snake(this));
    this.add(new Food(this));
    this.pressed = {right:false, left:false};
    }

    add(gameObj) {
      this.gameObjects.push(gameObj);
    }

    draw() {
      this.gameObjects.forEach((element) => element.draw());
    }

    update(dt) {
      this.gameObjects.forEach((element) => element.update(dt));
    }
}
