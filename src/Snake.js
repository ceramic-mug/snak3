import Segment from "/src/Segment.js";
import Food from "/src/Food.js";
import Game from "/src/Game.js";

// FIXME: Need to fix drawing issues after canvas resize
export default class Snake {
  constructor(game) {
    this.head = new Segment(game, game.gameWidth/2, game.gameHeight/2, 2*Math.PI*Math.random(), null);
    this.game = game;
    this.tail = this.head;
    this.segments = [];
    this.segments.push(this.head);
    this.growSteps = 9;
    this.log = "";
    this.munch = new Audio("../media/munch.mp3");
  }

  draw() {
    this.segments.forEach((element) => element.draw());
  }

  add() {
    let dx = 2*Math.cos(this.tail.vel.dir)*Segment.RADIUS();
    let dy = 2*Math.sin(this.tail.vel.dir)*Segment.RADIUS();

    let newX = this.tail.pos.x - dx;
    let newY = this.tail.pos.y + dy;
    let newDir = this.tail.vel.dir;

    let newSegment = new Segment(this.game, newX, newY, newDir, this.tail)
    this.segments.push(newSegment);
    this.tail = this.segments[this.segments.length - 1];
  }

  eat() {
    // Euclidean distance between food and head
    let foodDistance = Math.sqrt(Math.pow(this.head.pos.x - this.game.gameObjects[1].pos.x, 2) + Math.pow(this.head.pos.y - this.game.gameObjects[1].pos.y, 2));

    // If collision with food has occurred:

    if (foodDistance <= Segment.RADIUS() + Food.RADIUS()) {
      this.munch.play();
      this.game.gameObjects.pop();
      this.growSteps += 15;
      this.game.gameObjects.push(new Food(this.game));
      this.game.score++;
      this.game.sounds.eat.play();
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

    let newX = this.head.pos.x + dt*this.head.vel.mag*Math.cos(this.head.vel.dir);
    if (newX > this.game.gameWidth) {
      newX = newX - this.game.gameWidth;
    }
    else if (newX < 0) {
      newX = this.game.gameWidth - newX;
    }
    let newY = this.head.pos.y - dt*this.head.vel.mag*Math.sin(this.head.vel.dir);

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
    for (let i = 9; i < this.segments.length; i++) {
      if (Segment.euclidDistance(this.head, this.segments[i]) <= 2*Segment.RADIUS()) {
        console.log("Collision between head and segment " + i);
        this.kill();
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
    this.game.sounds.kill.play();
    while (this.segments.length > 0) {
      this.segments.pop();
    }
    this.game.setGameState(Game.GAME_STATES().end);
  }

  log() {
    this.log += ""
  }

  writeScore() {
    this.game.ctx.font = "20px Times";
    this.game.ctx.fillStyle = "#fff";
    this.game.ctx.strokeStyle = "#fff";
    this.game.ctx.fillText(this.game.score, 10, 20);
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
  }
}
