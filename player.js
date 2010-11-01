var HORIZONTAL_MOVE = 10;
var PLAYER_RECT_WIDTH = 24;
var PLAYER_RECT_HEIGHT= 118;;
var deltaHead = 3; 
var deltaArm = 8;
var MINE_PROGRESS = 0;//30
function Player(){
  this.mineTileX = 0;
  this.mineTileY = 0;
  this.mineProgress = 0;
  this.mineAngle = 0;

  this.jumpingTimer = "";
  this.velY = 0;
  this.acelY = 5;
  this.x = 200;
  this.y = 64*100;
  this.img = new Image();
  this.img.src = "char.png";
  this.lookingRight = true;

  preloadImages.queue_images([this.img.src]);

  this.getArmOriginXGlobal = function(){
    var widthArm =  4;
    var screenReadyX = this.x;
    return screenReadyX + deltaArm + deltaHead + widthArm;
  }

  this.getArmOriginYGlobal = function(){
    var heightHead = 10;
    var screenReadyY = this.y; 
    return screenReadyY + heightHead * 4 + deltaArm;
  }

  this.getArmOriginX = function(){
    var widthArm =  4;
    var screenReadyX = this.x - map.screenX;
    return screenReadyX + deltaArm + deltaHead + widthArm;
  }

  this.getArmOriginY = function(){
    var heightHead = 10;
    var screenReadyY = this.y - map.screenY; 
    return screenReadyY + heightHead * 4 + deltaArm;
  }

  this.mine= function(){
    var armOriginX = this.getArmOriginX();
    var armOriginY = this.getArmOriginY();
    
    var angle = Math.atan2(armOriginY - mousey,armOriginX - mousex) * 180/Math.PI;
    var deltaX = Math.cos(angle*Math.PI/180) * 64;
    var deltaY = Math.sin(angle*Math.PI/180) * 64;
    for(var i = 0; i < 5; i++){
      var pointX = Math.floor((this.getArmOriginXGlobal() - deltaX * i)/64);
      var pointY = Math.floor((this.getArmOriginYGlobal() - deltaY * i)/64);
      if(map.mapArray[pointY][pointX] != -1) {
        // We have found a target, lets either start, continue or finish mining
        // Should we start?
        if(pointX != this.mineTileX || pointY != this.mineTileY){
          this.mineTileY = pointY;
          this.mineTileX = pointX;
          this.mineProgress = 0;
          break;
        }
        // Should we continue?
        if(this.mineProgress < MINE_PROGRESS){
          this.mineProgress++;
          break;
        }
        this.mineProgress = 0; 
        this.mineTileY = -1;
        this.mineTileX = -1;
        if (map.mapArray[pointY][pointX] == 3) map.mapArray[pointY][pointX] = 2;
        addOneToItemWithId(map.mapArray[pointY][pointX])
        map.mapArray[pointY][pointX] = -1;
        break;
      }
    }
    if(!map.collideBottom(this.getRect(this.x,this.y+1)) && this.jumpingTimer == ""){
      this.velY = 8;
      this.jumpingTimer = new Date().getTime();
    }
  }

  this.hit = function(){
    var armOriginX = this.getArmOriginX();
    var armOriginY = this.getArmOriginY();
    
    var angle = Math.atan2(armOriginY - mousey,armOriginX - mousex) * 180/Math.PI;
    var deltaX = Math.cos(angle*Math.PI/180) * 64;
    var deltaY = Math.sin(angle*Math.PI/180) * 64;
    for(var i = 3; i > 0; i--){
      var pointX = Math.floor((this.getArmOriginXGlobal() - deltaX * i)/64);
      var pointY = Math.floor((this.getArmOriginYGlobal() - deltaY * i)/64);
      if(map.mapArray[pointY][pointX] == -1) {
        map.mapArray[pointY][pointX] = selectedItem().id;
        // Check if we are colliding now, if we are... remove it
        if(map.collide(this.getRect()) || !removeOneToItemWithId(selectedItem().id)) {
          map.mapArray[pointY][pointX] = -1;
          continue;
        }
        break;
      }
    }
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
    this.mineAngle = (this.mineProgress > 0 && this.mineProgress % 5 == 0)?Math.random():0;
    var m1 = Matrix().translate(armXOrigin,armYOrigin).rotate(angle).rotate(Math.PI/2).rotate(this.mineAngle/2);
    var self = this;
    canvas.withTransform(m1, function(){
      if(self.lookingRight)
        canvas.withTransform(Matrix().translate(30,0).rotate(Math.PI/4), function(){sprite.draw(224, -widthArm,0);})
      if(!self.lookingRight)
        canvas.withTransform(Matrix().translate(-20,0).rotate(Math.PI/4), function(){sprite.draw(225, -widthArm,0);})

      canvas.drawImage(self.img, sxArm, syArm, widthArm, heightArm,-widthArm,0,widthArm * 4,heightArm * 4);
    });
  }; 
}
