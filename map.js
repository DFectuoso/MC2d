function Map(sprite){
  this.sprite = sprite;

  this.mapArray = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [ 3, 3, 3,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [ 2, 2, 2, 3, 3,-1,-1,-1,-1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [ 2, 2, 2, 2, 2, 3, 3,-1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [ 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ]

  this.draw = function(){
    for(var i = 0; i < this.mapArray.length; i++){
      for (var j = 0; j < this.mapArray[i].length; j++){
        if(this.mapArray[i][j] != -1)
          this.sprite.draw(this.mapArray[i][j], j * 64, i * 64);
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



}
