var items = new Array();
items.push(new Item(2));
items.push(new Item(1));
items.push(new Item(34));
items.push(new Item(33));
items.push(new Item(32));
items.push(new Item(50));
items.push(new Item(51));
items.push(new Item(255));
items[0].selected = true;

function selectedItem(){
  for(var i = 0; i < items.length; i++){
   if( items[i].selected) return items[i]; 
  }
}

function addOneToItemWithId(id){
  for(var i = 0; i < items.length; i++){
   if( items[i].id == id) items[i].count++; 
  }
}

function removeOneToItemWithId(id){
  for(var i = 0; i < items.length; i++){
   if(items[i].id != id) continue;
   items[i].count--; 
   if(items[i].count < 0){
     items[i].count = 0;
     return false;
   }
   return true;
  }
  return false;
}

function selectItem(id){
  for(var i = 0; i < items.length; i++){
    items[i].selected = false; 
  }
  items[id].selected = true;
}

function drawHUD(){
  var x = 10;
  var y = 10;
  var delta = 64 + 8;
  
  var elements = 8;

  canvas.fillColor("rgb(52,49,102)");
  canvas.fillRect(x - 4,y - 4,elements * delta, delta)
  canvas.fillColor("rgb(0,0,0)");

  for(var i = 0; i < items.length; i++){
    if (items[i].selected) canvas.fillRect(x + i * delta - 4,y - 4,72,72)
    sprite.draw(items[i].id,x + i * delta,y);
    canvas.font('30px sans-serif');
    canvas.fillText(items[i].count, x+i*delta - 3,y+64);
  }
}

function Item(id){
  this.selected = false;
  this.id = id
  this.count = 0;
}
