function Map(sprite){
  this.sprite = sprite;

  this.mapArray = [
    [67,67,67,67,67,67,67,67,67,67],
    [67,67,67,67,67,67,67,67,67,67],
    [67,67,67,67,67,67,67,67,67,67],
    [67,67,67,67,67,67,67,67,67,67],
    [67,67,67,67,67,67,67,67,67,67],
    [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ]

  this.draw = function(){

    for(var i = 0; i < this.mapArray.length; i++){
      for (var j = 0; j < this.mapArray[i].length; j++){
        this.sprite.draw(this.mapArray[i][j], j * 64, i * 64);
      }
    }


  }; 

}
