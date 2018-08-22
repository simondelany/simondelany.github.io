var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
canvas.width = canvas.width * 3;
canvas.height = canvas.height * 3;
var width = canvas.width;
var height = canvas.height;
var stride = 4;
var pos = 0;



var imdata = context.getImageData(0,0,width,height);
var pixels = imdata.data;


for (var i = 0; i < pixels.length; i++) {
  pixels[i] = 255;
}



context.putImageData(imdata,0,0);

context.font = "30px Arial";
context.strokeText("Site Under Construction...", 0,height/2);

imdata = context.getImageData(0,0,width,height);
pixels = imdata.data;


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
      if(pixels[i] < 255 && pixels[ii] == 255) {
        setPixel(x,y,255,255,255,255); 
        setPixel(x,y+1,0,0,0,255);
      }
    }
  }
  pos = Math.floor(Math.random()*width)-1;     
  setPixel(pos,10,0,0,0,255);
  
  pos ++;
  pos = pos % width;
  context.putImageData(imdata,0,0);
}


setInterval(cycle, 80);