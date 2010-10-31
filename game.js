// A place to keep the keys that are pressed
var LEFT_KEY = false;
var RIGHT_KEY = false;
var UP_KEY = false;
var DOWN_KEY = false;
var ENTER_KEY= false;
var mousex = 0;
var mousey = 0;

var canvas;
var map;
var player;
var sprite;

$(document).ready(function () {
  player = new Player();
  sprite = new Sprite('textures.png')
  map = new Map(sprite, $(window).width(), $(window).height());

  preloadImages.onComplete = function(){
    startGame();
  }
});

function ResizeCanvas() {
  $("canvas").attr("height", $(window).height());
  $("canvas").attr("width", $(window).width());
  map.screenSizeY = $(window).height();
  map.screenSizeX = $(window).width();
  map.checkCamaraLimits();
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
    document.onmousedown = mouseClick;
    document.onmousemove = mouseMove;
    processGame();
}

function drawBlueSky(){
  canvas.fillColor("rgb(118,173,246)");
  canvas.fillRect(0,0,$(window).width(),$(window).height());
}

function move(){
  player.fall(map);
  map.moveCamaraForPlayerMoveTo(player.x,player.y);
  map.updateGrass();
}

function draw(){
  drawBlueSky();
  map.draw();
  player.draw(map.screenX,map.screenY);
  drawHUD();
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
  setTimeout("processGame();", 1);
}
