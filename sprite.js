var NUMBER_OF_IMAGE_PER_ROW = 16;
var ORIGINAL_SIZE = 16;
var DESTINATION_SIZE = 64;

function Sprite(imageSrc){
  this.img = new Image();
  this.img.src = imageSrc;

  preloadImages.queue_images([this.img.src]);

  this.draw = function(imgNumber, x, y){
    var row = Math.floor(imgNumber / NUMBER_OF_IMAGE_PER_ROW);
    var column = imgNumber - row * NUMBER_OF_IMAGE_PER_ROW; 
 
    var sx = column * ORIGINAL_SIZE;
    var sy = row * ORIGINAL_SIZE;

    canvas.drawImage(this.img, sx, sy, ORIGINAL_SIZE,ORIGINAL_SIZE,x,y,DESTINATION_SIZE,DESTINATION_SIZE);
  }; 
}
