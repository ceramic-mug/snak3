import Snake from "/src/Snake.js";
export default class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameObjects = [];
    }

    draw() {
      this.gameObjects.forEach((element) => element.draw());
    }

    update(dt) {
      this.gameObjects.forEach((element) => element.update(dt));
    }
}
