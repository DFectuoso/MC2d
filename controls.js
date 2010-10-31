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
    case 49:
      selectItem(0);
      break;
    case 50:
      selectItem(1);
      break;
    case 51:
      selectItem(2);
      break;
    case 52:
      selectItem(3);
      break;
    case 53:
      selectItem(4);
      break;
    case 54:
      selectItem(5);
      break;
    case 55:
      selectItem(6);
      break;
    case 56:
      selectItem(7);
      break;
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

// Simple funtion to store the mouseMove into 2 global variables
function mouseMove(ev){ 
 // Get the mouse position relative to the canvas element.
  if (ev.layerX || ev.layerX == 0) { // Firefox
    mousex = ev.layerX;
    mousey = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) { // Opera
    mousex = ev.offsetX;
    mousey = ev.offsetY;
  }
}

function mouseClick(e) { 
  var rightclick = false;
  e = e || window.event;
  if (e.which)
    rightclick = (e.which == 3);
  else if (e.button)
    rightclick = (e.button == 2);
  if(rightclick){
    RIGHT_CLICK = true;
    return true;
  } else  
    player.hit(); 
}

function mouseUnClick(e){
  var rightclick = false;
  e = e || window.event;
  if (e.which)
    rightclick = (e.which == 3);
  else if (e.button)
    rightclick = (e.button == 2);
  if(rightclick){
    RIGHT_CLICK = false;
    player.mineTileX = -1;
    player.mineTileY = -1;
    player.mineProgress = 0;
    return true;
  } 
}
