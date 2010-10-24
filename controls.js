var controlsUp = function(ev) {
  arrows=((ev.which)||(ev.keyCode));
  switch(arrows) {
    case 13:
      ENTER_KEY = false;
      break;
    case 40:
    case 83:
      DOWN_KEY = false;
      break;
    case 38:
    case 87:
      UP_KEY = false;
      break;
    case 39:
    case 68:
      RIGHT_KEY = false;
      break;
    case 37:
    case 65:
      LEFT_KEY = false;
      break;
  }
}

/// VERY BORING, Check for key down and key up and store the STATE of ARROWS, WASD and enter
var controlsDown = function(ev) {
  arrows=((ev.which)||(ev.keyCode));
  switch(arrows) {
    case 13:
      ENTER_KEY = true;
      break;
    case 40:
    case 83:
      DOWN_KEY = true;
      break;
    case 38:
    case 87:
      UP_KEY = true;
      break;
    case 39:
    case 68:
      RIGHT_KEY = true;
      break;
    case 37:
    case 65:
      LEFT_KEY = true;
      break;
  }
}
