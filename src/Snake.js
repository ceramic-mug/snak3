import Segment from "/src/Segment.js";
import Food from "/src/Food.js";
export default class Snake {
  constructor(game) {
    this.head = new Segment(game, game.gameWidth/2, game.gameHeight/2, 0, null);
    this.game = game;
    this.tail = this.head;
    this.segments = [];
    this.segments.push(this.head);
    this.growSteps = 9;
    this.log = "";
  }

  draw() {
    this.segments.forEach((element) => element.draw());
  }

  add() {
    let prevSegment = this.segments[this.segments.length - 1];
    let dx = 2*Math.cos(prevSegment.vel.dir)*Segment.RADIUS();
    let dy = 2*Math.sin(prevSegment.vel.dir)* Segment.RADIUS();

    let newX = prevSegment.pos.x - dx;
    let newY = prevSegment.pos.y + dy;
    let newDir = prevSegment.vel.dir;

    let newSegment = new Segment(this.game, newX, newY, newDir, prevSegment)
    this.segments.push(newSegment);
    this.tail = this.segments[this.segments.length - 1];
  }

  eat() {
    // Euclidean distance between food and head
    let foodDistance = Math.sqrt(Math.pow(this.head.pos.x - this.game.gameObjects[1].pos.x, 2) + Math.pow(this.head.pos.y - this.game.gameObjects[1].pos.y, 2));

    // If collision with food has occurred:

    if (foodDistance <= Segment.RADIUS() + Food.RADIUS()) {
      this.game.gameObjects.pop();
      this.growSteps += 15;
      this.game.gameObjects.push(new Food(this.game));
      this.game.score++;
    }
  }

  move(dt) {
    // Implement Josh's buffer idea for the Snake
    /*
      1. create new head
      2. remove last element (tail)
      3. Set new last element as tail

      -- With the new buffer movement regime the wrapping is really
      easy. Doing it our old way, where each segment gets its
      directions so to speak from the segment before it, made it
      really complicated
    */

    let newX = this.head.pos.x + 2*dt*this.head.vel.mag*Math.cos(this.head.vel.dir);
    if (newX > this.game.gameWidth) {
      newX = newX - this.game.gameWidth;
    }
    else if (newX < 0) {
      newX = this.game.gameWidth - newX;
    }
    let newY = this.head.pos.y - 2*dt*this.head.vel.mag*Math.sin(this.head.vel.dir);

    if (newY > this.game.gameHeight) {
      newY = newY - this.game.gameHeight;
    }
    else if (newY < 0) {
      newY = this.game.gameHeight - newY;
    }

    let newHead = new Segment(this.game, newX, newY, null);
    newHead.vel.dir = this.head.vel.dir;
    this.segments = [newHead].concat(this.segments.slice(0, this.segments.length - 1 ));
    this.head = this.segments[0];
    this.tail = this.segments[this.segments.length - 1];
  }

  checkSelfCollide() {
    for (let i = 4; i < this.segments.length; i++) {
      if (Segment.euclidDistance(this.head, this.segments[i]) <= 2*Segment.RADIUS()) {
        console.log("Collision between head and segment " + i);
        // this.kill();
      }
    }
  }

  changeDir(dt) {
    if (this.game.pressed.left) {
      this.head.vel.dir += dt * Segment.RADVEL();
    }
    else if (this.game.pressed.right) {
      this.head.vel.dir -= dt * Segment.RADVEL();
    }
    // console.log(this.head.vel.dir);
  }

  kill() {
    while (this.segments.length > 0) {
      this.segments.pop();
    }
    this.game.pause();
    this.game.endScreen();
  }

  log() {
    this.log += ""
  }

  update(dt) {
    // Smoothly grow snake
    if (this.growSteps > 0) {
      this.growSteps--;
      this.add();
    }
    this.checkSelfCollide();
    this.changeDir(dt);
    this.eat();
    this.move(dt);
    this.segments.forEach((element) => element.update(dt));
    // this.head.vel.mag = 0.1;
  }
}
