var MAP_WIDTH = 500;
var MAP_HEIGHT = 256;

var demoMapGlobalX = 0;
var demoMapGlobalY = 0;
function demoMap(){
  demoMapGlobalX += 64;
  demoMapGlobalY += 64;
  player.x = demoMapGlobalX;
  player.y = demoMapGlobalY;
  map.screenX = demoMapGlobalX - map.screenSizeX/2; 
  map.screenY = demoMapGlobalY - map.screenSizeY/2; 
  if(demoMapGlobalY > MAP_HEIGHT* 64 || demoMapGlobalX > MAP_WIDTH * 64) return;
  setTimeout("demoMap();", 66);
}

function Map(sprite, screenSizeX,screenSizeY){
  this.screenX = player.x - screenSizeX/2;
  this.screenY = player.y - screenSizeY/2;
  this.screenSizeX = screenSizeX;
  this.screenSizeY = screenSizeY;
  this.sprite = sprite;

  this.generateMap = function(){
    var map = new Array();
    function getOne(x,y){
      if(x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return 1;
      else if(map[y][x] != -1) return 1;
      else return 0;
    }
    function getSurround(x,y){
      return getOne(x-1,y+1) + getOne(x  ,y+1) + getOne(x+1,y+1) +
             getOne(x-1,y  ) + getOne(x  ,y  ) + getOne(x+1,y  ) +
             getOne(x-1,y-1) + getOne(x  ,y-1) + getOne(x+1,y-1); 
    }

    for(var i = 0; i < MAP_HEIGHT; i++){
      var mapRow = new Array();
      for(var j = 0; j < MAP_WIDTH; j++){
        if(i < 100) {
          mapRow[j] = -1; continue;
        }
        if(i < 120){
          mapRow[j] = (Math.random() < 0.18)?-1:2; continue;
        }
        if(i < 140){
          mapRow[j] = (Math.random() < 0.20)?-1:2; continue;
        }
        if(i < 160){
          mapRow[j] = (Math.random() < 0.25)?-1:2; continue;
        }
        if(i < 180){
          mapRow[j] = (Math.random() < 0.30)?-1:2; continue;
        }
        if(i < 200){
          mapRow[j] = (Math.random() < 0.35)?-1:2; continue;
        }
        if(i < 240){
          mapRow[j] = (Math.random() < 0.38)?-1:2; continue;
        }
        mapRow[j] = 2;
      }
      map[i] = mapRow;
    }

    // update once everything
    for(var update = 0; update < 3; update++){
      var newMap = new Array();
      for(var i = 0; i < MAP_HEIGHT; i++){
        newMap[i] = new Array();
        for(var j = 0; j < MAP_WIDTH; j++){
          newMap[i][j] = (getSurround(j,i) > 5)?2:-1; 
        }
      }
      map = newMap;
    }

    // just near the nice original line of terrein +20/-20
    for(var update = 0; update < 20; update++){
      var newMap = new Array();
      for(var i = 0; i < MAP_HEIGHT; i++){
        newMap[i] = new Array();
        for(var j = 0; j < MAP_WIDTH; j++){
          if(i < 80 || i > 120) {
            newMap[i][j] = map[i][j]; 
            continue;
          }
          newMap[i][j] = (getSurround(j,i) > 5)?2:-1; 
        }
      }
      map = newMap;
    }
    // Put greens
    var newMap = new Array();
    for(var i = 0; i < MAP_HEIGHT; i++){
      newMap[i] = new Array();
      for(var j = 0; j < MAP_WIDTH; j++){
        if(map[i][j] == 2 && getOne(j,i-1) == 0) {
          newMap[i][j] = 3; 
          continue;
        }
        newMap[i][j] = (getSurround(j,i) > 5)?2:-1; 
      }
    }
    map = newMap;


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
    if(percentajeX < 30) this.screenX = this.screenX - 17;
    if(percentajeX > 70) this.screenX = this.screenX + 17;
    if(percentajeY < 30) this.screenY = this.screenY - 17;
    if(percentajeY > 70) this.screenY = this.screenY + 17;
    this.checkCamaraLimits();
  }
}

