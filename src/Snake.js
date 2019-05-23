import Segment from "/src/Segment.js";

export default class Snake {
  constructor(game) {
    // FIXME:
    this.head = new Segment(game, game.gameWidth/2, game.gameHeight/2);
    this.segments = [];
    this.segments.add(this.head);
    this.vel = {x: 0, y: 0};
  }

  draw() {
    // FIXME:
    this.segments.forEach((element) => element.draw());
  }

  add(segment) {
    // FIXME:
    this.segments.add(segment);
  }

  update() {
    // FIXME:
    this.segments.forEach((element) => element.update());
  }
}
