export default class Food {
  constructor(game) {
    this.game = game;
    this.pos = {x: (Math.random() * this.game.gameWidth) + 1,
                y: (Math.random() * this.game.gameHeight) + 1
              };
    this.reposition();
  }

  reposition() {
    if (this.pos.x + Food.RADIUS() > this.game.gameWidth) {
      this.pos.x -= (this.pos.x + Food.RADIUS() - this.game.gameWidth);
    }
    else if (this.pos.x - Food.RADIUS() < 0) {
      this.pos.x += (Food.RADIUS() - this.pos.x);
    }

    if (this.pos.y + Food.RADIUS() > this.game.gameHeight) {
      this.pos.y -= (this.pos.y + Food.RADIUS() - this.game.gameHeight);
    }
    else if (this.pos.y - Food.RADIUS() < 0) {
      this.pos.y += (Food.RADIUS() - this.pos.y);
    }
  }
  
  static RADIUS() {
    return 3;
  }

  draw() {
    this.game.ctx.fillStyle = "#f00";
    this.game.ctx.strokeStyle = "rgba(0,0,0,0)";
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.pos.x, this.pos.y, Food.RADIUS(), 0, 2 * Math.PI);
    this.game.ctx.stroke();
    this.game.ctx.fill();
  }
  
  update(dt) {
    // Account for game canvas resizing
    this.reposition();
  }
  
}
