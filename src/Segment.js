export default class Segment {
  constructor(game, x, y, dir, parent) {
    // FIXME:
    this.game = game;
    this.radius = 5;
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
    // Each segment has it's own magnitude and direction, on which forces
    // will act and change the velocity.
    // The snake inherits it's velocity from the segment designated as head
    // Direction is in terms of radians ccw from pos x axis
    console.log(this.index);
    this.vel = {mag: 0.1, dir: dir};
    this.radVel = 2*this.vel.mag*Math.PI/180;
    this.lastDir = dir;
  }

  draw() {
    // FIXME:
    this.game.ctx.fillStyle = "#000";
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.game.ctx.stroke();
    this.game.ctx.fill();
  }

  update(dt) {
  // FIXME:
    this.lastDir = this.vel.dir;
    if (this.index == 0) {
      if (this.game.pressed.left) {
        this.vel.dir += dt * this.radVel;
      }
      else if (this.game.pressed.right) {
        this.vel.dir -= dt * this.radVel;
      }
    }

    if (this.parent) {
      // let dist = this.radius * 2;
      let omega = Math.abs(this.parent.vel.dir-this.parent.lastDir)/dt;
      let turnRadius = this.vel.mag/omega;
      let dTheta = 2*Math.asin(this.radius/turnRadius);

      this.vel.dir = this.parent.vel.dir + dTheta;
    }

    this.pos.x = this.pos.x + this.vel.mag * dt * Math.cos(this.vel.dir);
    this.pos.y = this.pos.y - this.vel.mag * dt * Math.sin(this.vel.dir);

    if (this.pos.x + this.radius > this.game.gameWidth) {
      this.pos.x = this.game.gameWidth - this.radius;
    }
    if (this.pos.x - this.radius < 0) {
      this.pos.x = this.radius;
    }
    if (this.pos.y + this.radius > this.game.gameHeight) {
      this.pos.y = this.game.gameHeight - this.radius;
    }
    if (this.pos.y - this.radius < 0) {
      this.pos.y = this.radius;
    }
  }
}
