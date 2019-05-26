export default class InputHandler {
  constructor(game) {
    document.addEventListener('keydown', event => {
      // console.log(event.keyCode);
      switch (event.keyCode) {
        case 32:
          game.pressed.space = true;
          break;
        case 37:
          game.pressed.left = true;
          // console.log("going left");
          break;
        case 65:
          game.pressed.left = true;
          // console.log("going left");
          break;
        case 39:
          game.pressed.right = true;
          // console.log("going right");
          break;
        case 68:
          game.pressed.right = true;
          // console.log("going right");
          break;
        }

      });
      document.addEventListener('keyup', event => {
        switch (event.keyCode) {
          // DEBUG: wanted a way to track positions of all segments
          case 32:
            if (game.pressed.space) {
              for (let i = 0; i < game.gameObjects[0].segments.length; i = i + 1) {
                let element = game.gameObjects[0].segments[i];
                console.log(element.pos.x + ", " + element.pos.y);
              }
            }
            game.pressed.space = false;
            break;
          case 37:
            game.pressed.left = false;
            break;
          case 65:
            game.pressed.left = false;
            break;
          case 39:
            game.pressed.right = false;
            break;
          case 68:
            game.pressed.right = false;
            break;
          }

        });
    }
  }
