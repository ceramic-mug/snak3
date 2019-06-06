export default class InputHandler {
  constructor(game) {
    document.addEventListener('keydown', event => {
      // console.log(event.keyCode);
      switch (event.keyCode) {
        case 37:
          game.pressed.left = true;
          break;
        case 65:
          game.pressed.left = true;
          break;
        case 39:
          game.pressed.right = true;
          break;
        case 68:
          game.pressed.right = true;
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
