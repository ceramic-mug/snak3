export default class Segment {

  constructor(game, snake, x, y, dir, parent) {
    // FIXME:
    this.game = game;
    this.radius = 5;
    this.pos= {};
    this.pos.x = x;
    this.pos.y = y;
    this.parent = parent;
    this.snake = snake;
    // Each segment has it's own magnitude and direction, on which forces
    // will act and change the velocity.
    // The snake inherits it's velocity from the segment designated as head
    // Direction is in terms of radians ccw from pos x axis
    this.vel = {mag: 0.1, dir: dir};

    // which segment is this?
    this.index;
  }

  draw() {
    // FIXME:
    this.game.ctx.fillStyle = "green";
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.game.ctx.stroke();
    this.game.ctx.fill();
  }

  update(dt){
  // FIXME:

  // If this is a body (non-head) segment
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

      // Check to see if the segment ran off the page
      // FIXME ~ axis left
      if (this.pos.x-this.radius<0 && (this.vel.dir<3*Math.PI/2) && (this.vel.dir>Math.PI/2)) {
        this.snake.segments2.push(new Segment(this.game, this.snake, this.pos.x+this.game.gameWidth, this.pos.y, this.vel.dir, ));
        console.log("Made new segment on the other side");
      }

      return
  }

  // If this is the head

    this.pos.x = this.pos.x + this.vel.mag * dt * Math.cos(this.vel.dir);

    this.pos.y = this.pos.y - this.vel.mag * dt * Math.sin(this.vel.dir);

    // There exists no place-holder for head in segments2 (that is, this is
    // the first time our snake has run off the screen)

    if (this.snake.segments2[0]!=null){
      return;
    }

    let offLeft = (this.pos.x - this.radius < 0) && (this.vel.dir < 3*Math.PI/2) && (this.vel.dir>Math.PI/2);
    let offRight = (this.pos.x + this.radius > this.game.gameWidth) && ((this.vel.dir < Math.PI/2) || (this.vel.dir > 3*Math.PI/2));
    let offTop = (this.pos.y - this.radius < 0) && (this.vel.dir < Math.PI) && (this.vel.dir > 0);
    let offBottom = (this.pos.y + this.radius > this.game.gameWidth) && (this.vel.dir > Math.PI) && (this.vel.dir < 2*Math.PI);

    if (offLeft) {
      if (this.snake.segments2.length == 0) {
      this.snake.segments2.push(new Segment(this.game, this.snake, this.pos.x+this.game.gameWidth, this.pos.y, this.vel.dir, null));
      console.log("Made new head on the other side");
      this.snake.head = this.snake.segments2[0];
      return;
    }
    // There already exists a place holder for a new head in segments2
    }
    this.snake

  }

  //small functions for computing the x and y coordinates of a segments2
  // segment that pops up on the other side of the canvas

  // In case the segment goes off the screen to the right
  comeLeft() {
    this.pos.x -= this.game.gameWidth;
  }

  // In case the segment goes off the screen to the left
  comeRight() {
    this.pos.x += this.game.gameWidth;
  }

  // In case the segment goes off the bottom of the screen
  comeUp() {
    this.pos.y += this.game.gameHeight;
  }

  // In case the segment goes off the top of the screen
  comeDown() {
    this.pos.y -= this.game.gameHeight;
  }
}
