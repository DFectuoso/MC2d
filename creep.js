var HORIZONTAL_MOVE_CREEP = 8;

function Creep(){
  this.getRect = function(x,y){
    if(x==null) x = this.x;
    if(y==null) y = this.y;
    return new Rect(x + deltaHead,y,PLAYER_RECT_WIDTH,PLAYER_RECT_HEIGHT);
  }
  this.spawn = function(){
    var first = true
    this.x=0; this.y=0;
    while(map.collide(this.getRect()) || first){
      first = false;
      this.x = Math.floor(Math.random()*64 * MAP_WIDTH);
      this.y = Math.floor(64* (100 + (Math.random() * (MAP_HEIGHT - 100))));
    }
    this.alive = true; 
  }
  this.armAngle = 0;
  this.jumpingTimer = "";
  this.velY = 0;
  this.acelY = 5;
  this.spawn();
  this.img = new Image();
  this.img.src = "manelik.png";
  this.lookingRight = true;
  this.explodeTimer = 0;

  preloadImages.queue_images([this.img.src]);

  this.explode = function(){
    var origX = Math.floor((this.x + 32)/64);
    var origY = Math.floor((this.y + 64)/64);
    var explosionSize = 5;
    var foo = explosionSize;
    for(var i = - explosionSize; i <= explosionSize; i++){
      for(var j = - explosionSize + Math.abs(i); j <= explosionSize - Math.abs(i); j++){
        var tileX = Math.min(map.mapArray[0].length,Math.max(0, origX + j))
        var tileY = Math.min(map.mapArray.length,Math.max(0, origY + i))
        map.mapArray[tileY][tileX] = -1
        if(tileX == Math.floor((player.x + 32)/64) && tileY == Math.floor((player.y + 64)/64)) player.spawn();
      }
      foo++;
    }
    this.explosionTimer = 0;
    this.alive = false;
  }
  
  this.walk = function(){
    if(!this.alive) return;
    if((Math.abs(player.x - this.x) < 100 && Math.abs(player.y - this.y) < 100) || this.explodeTimer > 0) this.explodeTimer++;
    if(this.explodeTimer > 60) this.explode()
    if(player.y < this.y || Math.random() < 0.15) this.jump();
    if(this.explodeTimer > 0 && Math.random() < 0.77) return;
    if(player.x < this.x) this.moveLeft();
    else this.moveRight();
  }

   this.fall = function(map){
    if(!this.alive) return;
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
    if(!map.collide(this.getRect(this.x - HORIZONTAL_MOVE_CREEP,this.y))){
      this.x -= HORIZONTAL_MOVE_CREEP;
      if(!map.collideBottom(this.getRect(this.x,this.y+1)) && this.jumpingTimer == ""){
         this.velY = 8;
         this.jumpingTimer = new Date().getTime();
      }
    }
  }

  this.moveRight = function(){
    this.lookingRight = true;
    if(!map.collide(this.getRect(this.x + HORIZONTAL_MOVE_CREEP,this.y))){
      this.x += HORIZONTAL_MOVE;
       if(!map.collideBottom(this.getRect(this.x,this.y+1)) && this.jumpingTimer == ""){
         this.velY = 8;
         this.jumpingTimer = new Date().getTime();
       }
    }
  }

  this.checkFall = function (){
     if(!map.collideBottom(this.getRect(this.x,this.y+1)) && this.jumpingTimer == ""){
       this.velY = 8;
       this.jumpingTimer = new Date().getTime();
     }
  }

  this.draw = function(screenX,screenY){
    if(!this.alive) return;
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
    this.armAngle -= (Math.random() < 0.3)?0.04:0;
    var m1 = Matrix().translate(armXOrigin,armYOrigin).rotate(-Math.PI/2 + this.armAngle);
    var self = this;
    if(this.explodeTimer == 0){
      canvas.withTransform(m1, function(){
        canvas.drawImage(self.img, sxArm, syArm, widthArm, heightArm,-widthArm,0,widthArm * 4,heightArm * 4);
      });
    }
 
  }; 
}
