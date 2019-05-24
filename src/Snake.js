import Segment from "/src/Segment.js";
import Food from "/src/Food.js";
export default class Snake {
  constructor(game) {
    // FIXME:
    this.head = new Segment(game, game.gameWidth/2, game.gameHeight/2, 0, null);
    this.game = game;
    this.tail = this.head;
    this.segments = [];
    this.segments.push(this.head);
    // Magnitude specifies absolute speed in pixels/unit time, direction is
    // conventional angular direction measured in degrees counterclockwise from
    // positive x-axis
    this.vel = this.head.vel;
    this.radVel = this.head.vel.mag*Math.E*Math.PI/180;
  }

  draw() {
    // FIXME:
    // console.log("Drawing Snake");
    this.segments.forEach((element) => element.draw());
  }

  add() {
    // this.segments.forEach((element) => element.radius +=0.2);
    let newX = this.segments[this.segments.length - 1].pos.x - 2*Math.cos(this.segments[this.segments.length - 1].vel.dir)*this.segments[this.segments.length - 1].radius;
    let newY = this.segments[this.segments.length - 1].pos.y + 2*Math.sin(this.segments[this.segments.length - 1].vel.dir)* this.segments[this.segments.length - 1].radius;
    let newDir = this.segments[this.segments.length - 1].vel.dir;
    this.segments.push(new Segment(this.game, newX, newY, newDir, this.segments[this.segments.length - 1]));
    this.tail = this.segments[this.segments.length - 1];
  }

  eat() {
    // Euclidean distance between food and head
    let foodDistance = Math.sqrt(Math.pow(this.head.pos.x - this.game.gameObjects[1].pos.x, 2) + Math.pow(this.head.pos.y - this.game.gameObjects[1].pos.y, 2));

    if (foodDistance <= this.head.radius + this.game.gameObjects[1].radius) {
      this.game.gameObjects.pop();
      this.add();
      this.game.gameObjects.push(new Food(this.game));
    }
  }

  update(dt) {
    // FIXME:
    // console.log("Updating Snake");
    if (this.game.pressed.left) {
      this.head.vel.dir += dt * this.radVel;
      // this.head.vel.mag -= dt * this.radVel/Math.PI;
      // this.head.vel.mag -= dt * this.radVel;
    }
    else if (this.game.pressed.right) {
      this.head.vel.dir -= dt * this.radVel;
      // this.head.vel.mag -= dt * this.radVel/Math.PI;
      // this.head.vel.mag -= dt * this.radVel;
    }
    this.eat();
    this.segments.forEach((element) => element.update(dt));
    // this.head.vel.mag = 0.1;
  }
}
