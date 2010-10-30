var HORIZONTAL_MOVE = 10;
var PLAYER_RECT_WIDTH = 24;
var PLAYER_RECT_HEIGHT= 118;;
var deltaHead = 3; 
var deltaArm = 8;
function Player(){

  this.jumpingTimer = "";
  this.velY = 0;
  this.acelY = 5;
  this.x = 200;
  this.y = 64*100;
  this.img = new Image();
  this.img.src = "char.png";
  this.lookingRight = true;

  preloadImages.queue_images([this.img.src]);

  this.leftClick = function(){
    var screenReadyX = this.x - screenX;
    var screenReadyY = this.y - screenY; 
    var widthArm =  4;
    var heightHead = 10;
    var armXOrigin = screenReadyX + deltaArm + deltaHead + widthArm;
    var armYOrigin = screenReadyY + heightHead * 4 + deltaArm;
    
    var angle = Math.atan2(armYOrigin - mousey,armXOrigin - mousex) * 180/Math.PI;
    console.log(angle)
    if (angle>0 && angle < 90)
      map.mapArray[Math.floor(this.y/64)][Math.floor(this.x/64) - 1] = 3; 
    if (angle>90 && angle < 180)
      map.mapArray[Math.floor(this.y/64)][Math.floor(this.x/64) + 1] = 3; 
    if (angle<0 && angle > -90)
      map.mapArray[Math.floor(this.y/64) + 1][Math.floor(this.x/64) - 1] = 3; 
    if (angle<-90 && angle > -180)
      map.mapArray[Math.floor(this.y/64) + 1][Math.floor(this.x/64) + 1] = 3; 
    // Get the nearest thing, outside of us, that we are position
    // if its not 3
    // MAKE THAT B#@!#@! 3
  }

  this.getRect = function(x,y){
    if(x==null) x = this.x;
    if(y==null) y = this.y;
    return new Rect(x + deltaHead,y,PLAYER_RECT_WIDTH,PLAYER_RECT_HEIGHT);
  }

  this.fall = function(map){
    if (this.jumpingTimer == "") return;
    this.velY -= this.acelY;
    var tempY = this.y - this.velY; 

    if (map.collideBottom(this.getRect(this.x,tempY))) {
      while(!map.collideBottom(this.getRect(this.x,this.y+1))){
        this.y++;
      }
      this.jumpingTimer = "";
      return;
    }

    if (!map.collide(this.getRect(this.x,tempY))) {
      this.y = tempY;
    }
  }

  this.jump = function(){
    if (this.jumpingTimer == ""){
      this.jumpingTimer = new Date().getTime();
      this.velY = 30;//30
    } else {
      var delta = new Date().getTime() - this.jumpingTimer;
      this.velY += Math.max(0,(5 - (delta/100))/2)
    }
  }

  this.moveLeft = function(){
    this.lookingRight = false;
    if(!map.collide(this.getRect(this.x - HORIZONTAL_MOVE,this.y))){
      this.x -= HORIZONTAL_MOVE;
      if(!map.collideBottom(this.getRect(this.x,this.y+1)) && this.jumpingTimer == ""){
         this.velY = 8;
         this.jumpingTimer = new Date().getTime();
      }
    }
  }

  this.moveRight = function(){
    this.lookingRight = true;
    if(!map.collide(this.getRect(this.x + HORIZONTAL_MOVE,this.y))){
      this.x += HORIZONTAL_MOVE;
       if(!map.collideBottom(this.getRect(this.x,this.y+1)) && this.jumpingTimer == ""){
         this.velY = 8;
         this.jumpingTimer = new Date().getTime();
       }
    }
  }

  this.draw = function(screenX,screenY){
    var sxHead, syHead, widthHead, heightHead;
    var sxBody, syBody, widthBody, heightBody;
    var sxArm, syArm, widthArm, heightArm;
    var sxLegs, syLegs, widthLegs, heightLegs;
    if (this.lookingRight){
      sxHead = 0;
      syHead = 8;
      widthHead = 10;
      heightHead = 8;

      sxBody = 20;
      syBody = 20;
      widthBody = 8;
      heightBody = 12;

      sxArm= 48;
      syArm = 20;
      widthArm = 4;
      heightArm = 12;
  
      sxLegs = 4;
      syLegs = 20;
      widthLegs = 8;
      heightLegs = 12;
    } else {
      sxHead = 14;
      syHead = 8;
      widthHead = 10;
      heightHead = 8;

      sxBody = 20;
      syBody = 20;
      widthBody = 8;
      heightBody = 12;
  
      sxArm= 48;
      syArm = 20;
      widthArm = 4;
      heightArm = 12;

      sxLegs = 4;
      syLegs = 20;
      widthLegs = 8;
      heightLegs = 12;
    }
     
    var screenReadyX = this.x - screenX;
    var screenReadyY = this.y - screenY; 
    // head
    canvas.drawImage(this.img, sxHead, syHead, widthHead, heightHead,screenReadyX,screenReadyY,widthHead * 4,heightHead * 4);
    // body
    canvas.drawImage(this.img, sxBody, syBody, widthBody, heightBody,screenReadyX + deltaHead,screenReadyY + heightHead * 4,widthBody * 4,heightBody * 4);
   // legs
    canvas.drawImage(this.img, sxLegs, syLegs, widthLegs, heightLegs,screenReadyX + deltaHead,screenReadyY + heightHead * 4 + heightBody * 4,widthLegs * 4,heightLegs * 4);
    // arm

    var armXOrigin = screenReadyX + deltaArm + deltaHead + widthArm;
    var armYOrigin = screenReadyY + heightHead * 4 + deltaArm;
    var angle = Math.atan2(armYOrigin - mousey,armXOrigin - mousex);
    var m1 = Matrix().translate(armXOrigin,armYOrigin).rotate(angle).rotate(Math.PI/2);
    var self = this;
    canvas.withTransform(m1, function(){
      canvas.drawImage(self.img, sxArm, syArm, widthArm, heightArm,-widthArm,0,widthArm * 4,heightArm * 4);
    });
 
  }; 
}
