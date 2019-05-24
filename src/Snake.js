import Segment from "/src/Segment.js";
import Food from "/src/Food.js";
export default class Snake {
  constructor(game) {
    // FIXME:
    this.head = new Segment(game, this, game.gameWidth/2, game.gameHeight/2, 0, null);
    this.game = game;
    this.tail = this.head;
    this.segments = [];
    this.segments2 = [];
    this.segments.push(this.head);
    // Magnitude specifies absolute speed in pixels/unit time, direction is
    // conventional angular direction measured in degrees counterclockwise from
    // positive x-axis
    this.vel = this.head.vel;
    this.radVel = this.head.vel.mag*Math.E*Math.PI/180;
    this.segNum = 1;
  }

  draw() {
    // FIXME:
    // console.log("Drawing Snake");
    this.segments.forEach((element) => element.draw());
  }

  add(segArray) {
    // For making our snake grow fatter when it eats
    // this.segments.forEach((element) => element.radius +=0.2);

    // New x and new y calculated relative to the last
    let newX = this.tail.pos.x - 2*Math.cos(this.tail.vel.dir)*this.tail.radius;
    let newY = this.tail.pos.y + 2*Math.sin(this.tail.vel.dir)* this.tail.radius;
    let newDir = this.tail.vel.dir;

    // Add the new segment to the segment array
    // FIXME: remember to pass in which segments array the guy should be added to
    this.segArray.push(new Segment(this.game, this, newX, newY, newDir, this.tail));

    // Update tail to the guy we just pushed to the segments array
    this.tail = this.segments[this.segments.length - 1];

    // The index of this segment in the segments array
    this.tail.index = this.segNum - 1;

    // Update the snake segments number
    this.segNum += 1;
  }

  eat() {

    let food = this.game.gameObjects[1];
    // Euclidean distance between food and head
    let foodDistance = Math.sqrt(Math.pow(this.head.pos.x - food.pos.x, 2) + Math.pow(this.head.pos.y - food.pos.y, 2));

    // Collision
    if (foodDistance <= this.head.radius + food.radius) {
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
    this.segments.forEach((element) => if (element!=null) {element.update(dt)});
    // this.head.vel.mag = 0.1;
  }
}
