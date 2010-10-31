var MAP_WIDTH = 500;
var MAP_HEIGHT = 256;

//##### DEMO MAP MAP DEMO DEMO MAP MAP DEMO #######////
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
//##### DEMO MAP MAP DEMO DEMO MAP MAP DEMO #######////

function Map(sprite, screenSizeX,screenSizeY){
  this.screenX = player.x - screenSizeX/2;
  this.screenY = player.y - screenSizeY/2;
  this.screenSizeX = screenSizeX;
  this.screenSizeY = screenSizeY;
  this.sprite = sprite;

  this.getOne = function(x,y){
    if(x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return 1;
    else if(this.mapArray[y][x] != -1) return 1;
    else return 0;
  }
  this.getManyByY = function(x,y,max,delta){
    var total = 0;
    for(var i = 1; i <= max; i++){
      total += this.getOne(x,y + delta * i);
    }
    return total;
  }
  this.getSurround = function(x,y){
    return this.getOne(x-1,y+1) + this.getOne(x  ,y+1) + this.getOne(x+1,y+1) +
           this.getOne(x-1,y  ) + this.getOne(x  ,y  ) + this.getOne(x+1,y  ) +
           this.getOne(x-1,y-1) + this.getOne(x  ,y-1) + this.getOne(x+1,y-1); 
  }

  this.generateRandomMap =  function(){
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
      this.mapArray[i] = mapRow;
    }
  }

  this.updateAll = function(){
    // update once everything
    for(var update = 0; update < 3; update++){
      var newMap = new Array();
      for(var i = 0; i < MAP_HEIGHT; i++){
        newMap[i] = new Array();
        for(var j = 0; j < MAP_WIDTH; j++){
          newMap[i][j] = (this.getSurround(j,i) > 5)?2:-1; 
        }
      }
      this.mapArray = newMap;
    }
  }

  this.updateLandLine = function(){
    // just near the nice original line of terrein +20/-20
    for(var update = 0; update < 20; update++){
      var newMap = new Array();
      for(var i = 0; i < MAP_HEIGHT; i++){
        newMap[i] = new Array();
        for(var j = 0; j < MAP_WIDTH; j++){
          if(i < 80 || i > 120) {
            newMap[i][j] = this.mapArray[i][j]; 
            continue;
          }
          newMap[i][j] = (this.getSurround(j,i) > 5)?2:-1; 
        }
      }
      this.mapArray = newMap;
    }
  }
 
  this.updateGrass = function(){
    for(var i = 0; i < MAP_HEIGHT; i++){
      for(var j = 0; j < MAP_WIDTH; j++){
        if(this.mapArray[i][j] == 2 && this.getManyByY(j,i,10,-1) == 0) 
          this.mapArray[i][j] = 3; 
        if(this.mapArray[i][j] == 3 && this.getManyByY(j,i,10,-1) > 0) 
          this.mapArray[i][j] = 2; 
      }
    }
  }

  this.addLava = function(){
    for(var i = Math.floor(MAP_HEIGHT * .91); i < MAP_HEIGHT; i++){
      for(var j = 0; j < MAP_WIDTH; j++){
        if(this.mapArray[i][j] == -1) 
          this.mapArray[i][j] = 255; 
      }
    }
  }

  this.addStone = function(){
    for(var i = 110; i < MAP_HEIGHT; i++){
      for(var j = 0; j < MAP_WIDTH; j++){
        if(i < 115 && this.mapArray[i][j] == 2) { this.mapArray[i][j] =(Math.random() < 0.1)?1:2; continue; }
        if(i < 120 && this.mapArray[i][j] == 2) { this.mapArray[i][j] =(Math.random() < 0.2)?1:2; continue; }
        if(i < 125 && this.mapArray[i][j] == 2) { this.mapArray[i][j] =(Math.random() < 0.3)?1:2; continue; }
        if(i < 130 && this.mapArray[i][j] == 2) { this.mapArray[i][j] =(Math.random() < 0.4)?1:2; continue; }
        if(i < 125 && this.mapArray[i][j] == 2) { this.mapArray[i][j] =(Math.random() < 0.5)?1:2; continue; }
        if(i < 140 && this.mapArray[i][j] == 2) { this.mapArray[i][j] =(Math.random() < 0.6)?1:2; continue; }
        if(this.mapArray[i][j] == 2) this.mapArray[i][j] =(Math.random() < 0.9)?1:2; 
      }
    }
  }

  this.addOre = function(xTop,xBottom,id, randomVar){
    for(var i = xTop; i < xBottom-1; i++){
      for(var j = 1; j < MAP_WIDTH - 1; j++){
        if(this.mapArray[i][j] == 1 && Math.random() < randomVar) { 
          this.mapArray[i][j] = id; 
          if(this.mapArray[i+1][j+1] == 1) this.mapArray[i+1][j+1] = id; 
          if(this.mapArray[i  ][j+1] == 1) this.mapArray[i  ][j+1] = id; 
          if(this.mapArray[i-1][j+1] == 1) this.mapArray[i-1][j+1] = id; 
          if(this.mapArray[i+1][j  ] == 1) this.mapArray[i+1][j  ] = id; 
          if(this.mapArray[i-1][j  ] == 1) this.mapArray[i-1][j  ] = id; 
          if(this.mapArray[i+1][j-1] == 1) this.mapArray[i+1][j-1] = id; 
          if(this.mapArray[i  ][j-1] == 1) this.mapArray[i  ][j-1] = id; 
          if(this.mapArray[i-1][j-1] == 1) this.mapArray[i-1][j-1] = id; 
        }
      }
    }
  }

  this.generateMap = function(){
    this.generateRandomMap();
    this.updateAll();
    this.updateLandLine();
    this.addLava();
    this.addStone();
    this.addOre(100,256,34, 0.020/2);// carbon
    this.addOre(100,256,33, 0.015/2);// iron
    this.addOre(140,256,32, 0.010/2);// gold 
    this.addOre(180,256,50, 0.002/2);// diamond
    this.addOre(180,256,51, 0.008/2);// red 
    this.updateGrass();
  }
 
  this.checkCamaraLimits = function(){
    if(this.screenX < 0) this.screenX = 0;
    if(this.screenY < 0) this.screenY = 0;
    if(this.screenX + this.screenSizeX > this.mapArray[0].length * 64) this.screenX = this.mapArray[0].length*64 - this.screenSizeX;
    if(this.screenY + this.screenSizeY > this.mapArray.length * 64) this.screenY = this.mapArray.length*64 - this.screenSizeY;
  }


  this.draw = function(){
    var firstTileLeft = Math.floor(this.screenX/64); 
    var firstTileTop  = Math.floor(this.screenY/64); 

    var lastTileRight  = Math.ceil((this.screenX + this.screenSizeX)/64); 
    var lastTileBottom = Math.ceil((this.screenY + this.screenSizeY)/64); 

    for(var i = firstTileTop; i < lastTileBottom; i++){
      for (var j = firstTileLeft; j < lastTileRight; j++){
        if(this.mapArray[i][j] != -1 && (this.getOne(j+1,i) == 0 || this.getOne(j-1,i) == 0 || this.getOne(j,i+1) == 0 || this.getOne(j,i-1) == 0) ){
          this.sprite.draw(this.mapArray[i][j], (j - firstTileLeft) * 64 - this.screenX % 64, (i - firstTileTop) * 64 - this.screenY % 64);

          if(i == player.mineTileY && j == player.mineTileX && player.mineProgress> 0){
            var percentile = Math.floor(player.mineProgress / MINE_PROGRESS * 10);
            percentile = Math.min(percentile,9);
            this.sprite.draw(240 + percentile, (j - firstTileLeft) * 64 - this.screenX % 64, (i - firstTileTop) * 64 - this.screenY % 64);
          }
       } else if(this.mapArray[i][j] != -1){
          canvas.fillColor("rgb(33,33,33)");
          canvas.fillRect((j-firstTileLeft)*64 - this.screenX % 64,(i-firstTileTop) * 64 - this.screenY % 64,64,64)
        }
 
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

  this.mapArray = new Array();
  this.generateMap();
  this.checkCamaraLimits();
}

