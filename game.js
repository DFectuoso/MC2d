// A place to keep the keys that are pressed
var LEFT_KEY = false;
var RIGHT_KEY = false;
var UP_KEY = false;
var DOWN_KEY = false;
var ENTER_KEY= false;
var RIGHT_CLICK = false;
var mousex = 0;
var mousey = 0;

var canvas;
var map;
var player;
var sprite;
var creep = new Array();
var creepCount = 50;

$(document).ready(function () {
  player = new Player();
  sprite = new Sprite('textures.png')
  map = new Map(sprite, $(window).width(), $(window).height());
  player.spawn();
  for(var i = 0; i < creepCount; i++){
    creep[i] = new Creep();
  }
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
    document.onmouseup = mouseUnClick;
    document.onmousemove = mouseMove;
    processGame();
}

function drawBlueSky(){
  var transitionY = 110*64;
  var screenY = map.screenY;
  var screenHeight = $(window).width();

  var blueHeight = Math.min($(window).width(), transitionY - screenY);

  var skyGradient = canvas.createLinearGradient(0, 0, $(window).width(), blueHeight);
  skyGradient.addColorStop(0, "white");
  skyGradient.addColorStop(1, "rgb(118,173,246)"); 
  canvas.context().fillStyle = skyGradient;
  canvas.fillRect(0,0,$(window).width(),blueHeight);


  var groundGradient = canvas.createLinearGradient(0, 0, 0, $(window).height() -  blueHeight);
  groundGradient.addColorStop(0, "rgb(66,66,66)");
  groundGradient.addColorStop(1, "rgb(33,33,33)"); 
  canvas.context().fillStyle = groundGradient;
  canvas.fillRect(0,blueHeight,$(window).width(),$(window).height() - blueHeight);
}

function move(){
  player.fall(map);
  for(var i = 0; i < creepCount; i++){
    creep[i].fall(map);
  }
  map.moveCamaraForPlayerMoveTo(player.x,player.y);
  map.updateGrass();
}

function draw(){
  drawBlueSky();
  map.draw();
  for(var i = 0; i < creepCount; i++){
    creep[i].draw(map.screenX,map.screenY);
  }
  player.draw(map.screenX,map.screenY);
  drawHUD();
}

function controls(){
  if(UP_KEY) player.jump();
  if(RIGHT_KEY) player.moveRight();
  if(LEFT_KEY) player.moveLeft();
  if(RIGHT_CLICK) player.mine();
  for(var i = 0; i < creepCount; i++){
    creep[i].walk();
  }
}

function processGame(){
  move();
  controls();
  draw();
  setTimeout("processGame();", 1);
}
