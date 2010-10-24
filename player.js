function Player(){
  this.x = 100;
  this.y = 100;
  this.img = new Image();
  this.img.src = "char.png";
  this.lookingRight = true;

  preloadImages.queue_images([this.img.src]);

  this.draw = function(){
    var sxHead, syHead, widthHead, heightHead;
    var sxBody, syBody, widthBody, heightBody;
    var sxArm, syArm, widthArm, heightArm;
    var sxLegs, syLegs, widthLegs, heightLegs;
    var deltaHead = 3; 
    var deltaArm = 8;
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
      
    // head
    canvas.drawImage(this.img, sxHead, syHead, widthHead, heightHead,this.x,this.y,widthHead * 4,heightHead * 4);
    // body
    canvas.drawImage(this.img, sxBody, syBody, widthBody, heightBody,this.x + deltaHead,this.y + heightHead * 4,widthBody * 4,heightBody * 4);
    // arm
    canvas.drawImage(this.img, sxArm, syArm, widthArm, heightArm,this.x + deltaArm + deltaHead,this.y + heightHead * 4 + deltaArm,widthArm * 4,heightArm * 4);
    // legs
    canvas.drawImage(this.img, sxLegs, syLegs, widthLegs, heightLegs,this.x + deltaHead,this.y + heightHead * 4 + heightBody * 4,widthLegs * 4,heightLegs * 4);

  }; 
}
