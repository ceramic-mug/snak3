// TODO: Implement pause button functionality as well as auto-pause
// functionality when user switches focus from the game tab or the canvas
// element (choice TBD)
import Game from "/src/Game.js";
export default class InputHandler {
  constructor(game) {
    document.addEventListener('keydown', event => {
      // console.log(event.keyCode);
      switch (event.keyCode) {
        // Movement controls
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

        // Reset Game
        case 13:
          if (game.state == Game.GAME_STATES().end) {
            game.reset();
          }
          break;
        // Pause/Resume Gameplay
        case 80:
          if (game.state == Game.GAME_STATES().play) {
            if (game.paused) {
              game.resume();
            }
            else {
              game.pause();
            }
          }
      }

    });
      document.addEventListener('keyup', event => {
        switch (event.keyCode) {
          // Movement controls
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
