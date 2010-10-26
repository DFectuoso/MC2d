// A place to keep the keys that are pressed
var LEFT_KEY = false;
var RIGHT_KEY = false;
var UP_KEY = false;
var DOWN_KEY = false;
var ENTER_KEY= false;

var canvas;
var map;
var player;

$(document).ready(function () {
  map = new Map(new Sprite('textures.png'));
  player = new Player();

  preloadImages.onComplete = function(){
    startGame();
  }
});

function ResizeCanvas() {
  $("canvas").attr("height", $(window).height());
  $("canvas").attr("width", $(window).width());
}

function Rect(x,y,width,height){
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
}

function startGame(){
    ResizeCanvas();
    $(window).resize(ResizeCanvas); 
    canvas = $("canvas").powerCanvas();
    document.onkeyup  = controlsUp;
    document.onkeydown  = controlsDown;
    processGame();
}

function drawBlueSky(){
  canvas.fillColor("rgb(118,173,246)");
  canvas.fillRect(0,0,$(window).width(),$(window).height());
}

function move(){
  player.fall(map);
}

function draw(){
  drawBlueSky();
  map.draw();
  player.draw();
}

function controls(){
  if(UP_KEY) player.jump();
  if(RIGHT_KEY) player.moveRight();
  if(LEFT_KEY) player.moveLeft();
}

function processGame(){
  move();
  controls();
  draw();
  setTimeout("processGame();", 66);
}
