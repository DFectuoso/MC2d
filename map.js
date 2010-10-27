var MAP_WIDTH = 25;
var MAP_HEIGHT = 31;

function Map(sprite, screenSizeX,screenSizeY){
  this.screenX = 0;
  this.screenY = 0;
  this.screenSizeX = screenSizeX;
  this.screenSizeY = screenSizeY;
  this.sprite = sprite;

  this.generateMap = function(){
    var map = new Array();
    for(var i = 0; i < MAP_HEIGHT; i++){
      var mapRow = new Array();
      for(var j = 0; j < MAP_WIDTH; j++){
        mapRow[j] = (i < MAP_HEIGHT / 2 || (j + (i%2)) %2 == 0)?-1:3;
      }
      map[i] = mapRow;
    }
    return map;
  }

  this.mapArray = this.generateMap();
  this.checkCamaraLimits = function(){
    if(this.screenX < 0) this.screenX = 0;
    if(this.screenY < 0) this.screenY = 0;
    if(this.screenX + this.screenSizeX > this.mapArray[0].length * 64) this.screenX = this.mapArray[0].length*64 - this.screenSizeX;
    if(this.screenY + this.screenSizeY > this.mapArray.length * 64) this.screenY = this.mapArray.length*64 - this.screenSizeY;
  }


  this.checkCamaraLimits();

  this.draw = function(){
    var firstTileLeft = Math.floor(this.screenX/64); 
    var firstTileTop  = Math.floor(this.screenY/64); 

    var lastTileRight  = Math.ceil((this.screenX + this.screenSizeX)/64); 
    var lastTileBottom = Math.ceil((this.screenY + this.screenSizeY)/64); 

    for(var i = firstTileTop; i < lastTileBottom; i++){
      for (var j = firstTileLeft; j < lastTileRight; j++){
        if(this.mapArray[i][j] != -1)
          this.sprite.draw(this.mapArray[i][j], (j - firstTileLeft) * 64 - this.screenX % 64, (i - firstTileTop) * 64 - this.screenY % 64);
      }
    }
  }; 

  this.collide = function(rect){
    return (this.collideTop(rect) || this.collideBottom(rect));
  }

  this.collideTop = function(rect){
    var leftX   = Math.floor((rect.x)/64);
    var rightX  = Math.floor((rect.x + rect.width)/64);
    var topY    = Math.floor((rect.y)/64);
    if(topY    < 0 || topY    >= this.mapArray.length) return true;
    if(leftX   < 0 || leftX   >= this.mapArray[0].length) return true;
    if(rightX  < 0 || rightX  >= this.mapArray[0].length) return true;

    if(this.mapArray[topY   ][leftX ] != -1) return true; 
    if(this.mapArray[topY   ][rightX] != -1) return true; 
    return false;
  }

  this.collideBottom = function(rect){
    var leftX   = Math.floor((rect.x)/64);
    var rightX  = Math.floor((rect.x + rect.width)/64);
    var bottomY = Math.floor((rect.y + rect.height)/64);
    if(bottomY < 0 || bottomY >= this.mapArray.length) return true;
    if(leftX   < 0 || leftX   >= this.mapArray[0].length) return true;
    if(rightX  < 0 || rightX  >= this.mapArray[0].length) return true;

    if(this.mapArray[bottomY][leftX ] != -1) return true; 
    if(this.mapArray[bottomY][rightX] != -1) return true; 
    return false;
  }
  
  this.moveCamaraForPlayerMoveTo = function(x,y){
    var deltaX = x - this.screenX;
    var deltaY = y - this.screenY;
    var percentajeX = deltaX/this.screenSizeX * 100;
    var percentajeY = deltaY/this.screenSizeY * 100;
    if(percentajeX < 30) this.screenX = this.screenX - 5;
    if(percentajeX > 70) this.screenX = this.screenX + 5;
    if(percentajeY < 30) this.screenY = this.screenY - 5;
    if(percentajeY > 70) this.screenY = this.screenY + 5;
    this.checkCamaraLimits();
  }
}

