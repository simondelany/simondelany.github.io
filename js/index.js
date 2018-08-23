var canvas = document.getElementById('canvas');
var frame = document.createElement('canvas');
var ctx = frame.getContext('2d');
var render = document.getElementById('render');
frame.width = render.width;
frame.height = render.height;
ctx.drawImage(render, 0,0);
//var renderData = ctx.getImageData(0,0,frame.with, frame.height);
//var renderPixels = renderData.data;
var yPos = frame.height -1;
var context = canvas.getContext("2d");
canvas.width = Math.floor(canvas.width*1.5);
canvas.height = Math.floor(canvas.height*1.5);
var width = canvas.width;
var height = canvas.height;
var stride = 4;
var pos = 0;
var buffer = [];
var bIndex = [];

function shuffle(array) {
  for (var i = array.length -1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function fillBuffer() {
  buffer = [];
  if (yPos > -1 ) {
    for (var xPos = 0; xPos < width; xPos++) {
      var i = getI(xPos,yPos,frame.width,stride);
      buffer.push(0);//(renderPixels[i  ]);
      buffer.push(0);//(renderPixels[i+1]);
      buffer.push(0);//(renderPixels[i+2]);
      buffer.push(255);
      bIndex.push(xPos);
    } 
  } 
  yPos -= 1;
  shuffle(bIndex);
}



var imdata = context.getImageData(0,0,width,height);
var pixels = imdata.data;


for (var i = 0; i < pixels.length; i++) {
  pixels[i] = 0;
}



context.putImageData(imdata,0,0);

/*
context.font = "1em Arial";
context.fillText("Site Under Construction...", 0,height-5);

imdata = context.getImageData(0,0,width,height);
pixels = imdata.data;
*/

function dot(x, y) {
  context.fillRect(x,y,1,1);
}

function getI(x,y,width,stride) {
  var i = (y * (width * stride) + (x * stride));
  return i;
}

function setPixel(x,y,r,g,b,a) {
  var i = getI(x,y,width,stride);
  pixels[i  ] = r;
  pixels[i+1] = g;
  pixels[i+2] = b;
  pixels[i+3] = a;
}

function cycle() {
  //add pixels on top
  
  
  //drop existing pixels
  //get current image data
  //var imdata = context.getImageData(0,0,width,height);
  //var pixels = imdata.data;
  
  /*
  for (var y = height -2; y > -1; y-=1) {
    for (var x = 0; x < width; x ++) {
      document.getElementById('para').innerHTML = [x,y];
      var i = getI(x,y,width,stride);
      var ii = getI(x,y+1,width,stride);
      if (pixels[i] < 125 && pixels[ii] > 125) {
        setPixel(x,y,255,255,255,255);
        setPixel(x,y+1,0,0,0,255);
      }
    }
  }
  */
  for (var y = height -2; y > -1; y-=1) {
    for (var x = 0; x < width; x ++) {
      var i = getI(x,y,width,stride);
      var ii = getI(x,y+1,width,stride);
      if(pixels[ii+3] < 255 && pixels[i+3] == 255) {
        setPixel(x,y+1,pixels[i],pixels[i+1],pixels[i+2],255);
        setPixel(x,y,255,255,255,0); 
      }
    }
  }
  
  if (pos < width) {
    pos += 0.1;
  }
  
  
  
  
  for(var i = 0; i < Math.floor(pos); i ++) {
    if (bIndex.length < 1) {
      fillBuffer();
    }
  
    var index = bIndex.pop();
    var iiii = index * stride;
    setPixel(index,10,buffer[iiii],buffer[iiii+1],buffer[iiii+2],255);
  }
 
  context.putImageData(imdata,0,0);
}


setInterval(cycle, 100);