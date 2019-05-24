export default class Food {
  constructor(game) {
    this.game = game;
    this.radius = 10;
    this.pos = {x: (Math.random() * this.game.gameWidth) + 1,
                y: (Math.random() * this.game.gameHeight) + 1
              };
    if (this.pos.x + this.radius > this.game.gameWidth) {
      this.pos.x -= (this.pos.x + this.radius - this.game.gameWidth);
    }
    else if (this.pos.x - this.radius < 0) {
      this.pos.x += (this.radius - this.pos.x);
    }

    if (this.pos.y + this.radius > this.game.gameHeight) {
      this.pos.y -= (this.pos.y + this.radius - this.game.gameHeight);
    }
    else if (this.pos.y - this.radius < 0) {
      this.pos.y += (this.radius - this.pos.y);
    }
    console.log(this.pos);
  }
  draw() {
    this.game.ctx.fillStyle = "#f00";
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.game.ctx.stroke();
    this.game.ctx.fill();
  }
  update(dt) {

  }
}
