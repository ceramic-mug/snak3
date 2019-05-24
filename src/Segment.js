export default class Segment {

  constructor(game, x, y, dir, parent) {
    // FIXME:
    this.game = game;
    this.radius = 5;
    this.pos= {};
    this.pos.x = x;
    this.pos.y = y;
    this.parent = parent;
    // Each segment has it's own magnitude and direction, on which forces
    // will act and change the velocity.
    // The snake inherits it's velocity from the segment designated as head
    // Direction is in terms of radians ccw from pos x axis
    this.vel = {mag: 0.1, dir: dir};
  }

  draw() {
    // FIXME:
    this.game.ctx.fillStyle = "#000";
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.game.ctx.stroke();
    this.game.ctx.fill();
  }

  update(dt){
  // FIXME:
    if (this.parent) {
      let dist = Math.sqrt((this.pos.x-this.parent.pos.x)**2 + (this.pos.y-this.parent.pos.y)**2)

      let diam = 2*this.radius;

      let dx = this.parent.pos.x - this.pos.x;
      let dy = this.parent.pos.y - this.pos.y;

      let dTheta = this.parent.vel.dir-this.vel.dir;

      let responsiveness = 1/diam;

      this.vel.dir += responsiveness*(dTheta);

      this.pos.x = this.parent.pos.x - diam*Math.cos(this.vel.dir);

      this.pos.y = this.parent.pos.y + diam*Math.sin(this.vel.dir);

      return
  }
    this.pos.x = this.pos.x + this.vel.mag * dt * Math.cos(this.vel.dir);

    this.pos.y = this.pos.y - this.vel.mag * dt * Math.sin(this.vel.dir);
  }
}
