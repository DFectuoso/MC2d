// A place to keep the keys that are pressed
var LEFT_KEY = false;
var RIGHT_KEY = false;
var UP_KEY = false;
var DOWN_KEY = false;
var ENTER_KEY= false;

var canvas;
var map;

$(document).ready(function () {
  map = new Map(new Sprite('textures.png'));

  preloadImages.onComplete = function(){
    startGame();
  }
});

function ResizeCanvas() {
  $("canvas").attr("height", $(window).height());
  $("canvas").attr("width", $(window).width());
}

function startGame(){
    ResizeCanvas();
    $(window).resize(ResizeCanvas); 
    canvas = $("canvas").powerCanvas();
    document.onkeyup  = controlsUp;
    document.onkeydown  = controlsDown;
    processGame();
}

function processGame(){
  canvas.fillColor("rgb(118,207,198)");
  canvas.fillRect(0,0,$(window).width(),$(window).height());
  map.draw();

//  if(LEFT_KEY) sprite.x = sprite.x - 1;
//  if(RIGHT_KEY) sprite.x = sprite.x + 1;
//  if(UP_KEY) sprite.y = sprite.y - 1;
//  if(DOWN_KEY) sprite.y = sprite.y +1;
  setTimeout("processGame();", 66);
}
