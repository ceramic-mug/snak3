# Brainstorming file for Boundary Conditions

Now that I think about it, we can handle the transition between edges just via the drawing element.

When a segment's area lies partially outside of the drawing canvas, i.e. ~

```javascript
if ((this.pos.x+this.radius > this.game.gameWidth) || (this.pos.x - this.radius < 0) || (this.pos.y - this.radius < 0) || (this.pos.y + this.radius > this.game.gameHeight))
```

~ we need to calculate the start and stop angles for

```javascript
this.game.ctx.arc(this.pos.x, this.pos.y, this.radius, STARTANGLE, STOPANGLE)
```
