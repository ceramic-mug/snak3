export default class Segment {
  constructor(game, x, y, dir, parent) {
    this.game = game;
    this.pos= {};
    this.pos.x = x;
    this.pos.y = y;
    this.parent = parent;

    if (!this.parent) {
      this.index = 0;
    }
    else {
      this.index = this.parent.index + 1;
    }
    // The snake inherits it's velocity from the segment designated as head
    // Direction is in terms of radians ccw from pos x axis
    console.log(this.index);
    this.vel = {mag: 0.05, dir: dir};
  }
  static RADVEL() {
    return 0.5*Math.PI/180;
  }

  static RADIUS() {
    return 3;
  }

  draw() {
    this.game.ctx.fillStyle = "#000";
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.pos.x, this.pos.y, Segment.RADIUS(), 0, 2 * Math.PI);
    this.game.ctx.stroke();
    this.game.ctx.fill();
  }

  update(dt) {
  }
}
