var preloadImages =  {
  count: 0 /* keep track of the number of images */
  ,loaded: 0 /* keeps track of how many images have loaded */
  ,onComplete: function(){} /* fires when all images have finished loadng */
  ,onLoaded: function(){} /*fires when an image finishes loading*/
  ,loaded_image: "" /*access what has just been loaded*/
  ,images: [] /*keeps an array of images that are loaded*/
  ,incoming:[] /*this is for the process queue.*/
  /* this will pass the list of images to the loader*/
  ,queue_images: function(images) {
    //make sure to reset the counters
    this.loaded = 0;
    //reset the images array also
    this.images = [];
    //record the number of images
    this.count = images.length;
    //store the image names
    this.incoming = images;
    //start processing the images one by one
    this.process_queue();
  }
  ,process_queue: function(){
    //pull the next image off the top and load it
    this.load_image(this.incoming.shift());
  }
  /* this will load the images through the browser */
  ,load_image: function(image){
    if(image == undefined) return;
    var this_ref = this;
    var preload_image = new Image;
    
    preload_image.onload = function(){
      //store the loaded image so we can access the new info
      this_ref.loaded_image = preload_image;
      //push images onto the stack
      this_ref.images.push(preload_image);
      //note that the image loaded
      this_ref.loaded +=1;
      //fire the onloaded
      (this_ref.onLoaded)();
      //if all images have been loaded launch the call back
      if(this_ref.count == this_ref.loaded){
        (this_ref.onComplete)(); 
      } else {
        this_ref.process_queue();
      }
    }
    preload_image.src = image;
  }
}
