export default class InputHandler {
  constructor(game) {
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
          game.pressed.left = true;
          console.log("going left");
          break;
        case 65:
          game.pressed.left = true;
          console.log("going left");
          break;
        case 39:
          game.pressed.right = true;
          console.log("going right");
          break;
        case 68:
          game.pressed.right = true;
          console.log("going right");
          break;
        }

      });
      document.addEventListener('keyup', event => {
        switch (event.keyCode) {
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
