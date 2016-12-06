

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var img = new Image();
img.src = "a.png";
img.onload = function () {
	ctx.drawImage(img, 0, 0, c.width,c.height);
	simplifyPic();
}

document.addEventListener("click",start)


function simplifyPic(){
	var imageData = ctx.getImageData(0, 0, c.width, c.height);
	var data = imageData.data;
	var sum = 0

	for (var i = 0; i < data.length; i += 4) {
			//data[  i  ] = 255 - data[i];     // red
			//data[i + 1] = 255 - data[i + 1]; // green
			//data[i + 2] = 255 - data[i + 2]; // blue
			sum = sum + data[i] +data[i + 1]+data[i + 2]
		}
		sum = ((sum/data.length)*4)/3

	for (var i = 0; i < data.length; i += 4){
		if(data[i] +data[i + 1]+data[i + 2] > sum){
			data[  i  ] = 255 ;     // red
			data[i + 1] = 255 ; // green
			data[i + 2] = 255 ; // blue
		}else{
			data[  i  ] = 100 ;     // red
			data[i + 1] = 100 ; // green
			data[i + 2] = 100 ; // blue
		}
	}

	console.log(sum)
	ctx.putImageData(imageData, 0, 0);
}

function start(event){
	var x = event.layerX;
	var y = event.layerY;
	//console.log("click x:"+x+ " y:" + y)
	//console.log(c.width)
	//var pre = ctx.getImageData(x, y, 1, 1).data; 
	//var start = new Point(x,y)
	//console.log(start)
	//console.log(pre)
	explode(x,y)
	ctx.fillRect(x,y,1,1)
	//var post = ctx.getImageData(x, y, 1, 1).data;
	//	console.log(post)
}
function explode(x,y){
	var pix = ctx.getImageData(x, y, 1, 1).data;
	if(pix[0]+pix[1]+pix[2] < 301){
	 return
	}
	ctx.fillRect(x,y,1,1)	
	setTimeout(function(){
	explode(x+1,y)
	explode(x,y+1)
	explode(x-1,y)
	explode(x,y-1)
	}, 0.1); 
	
}



function Point(x,y){
	this.x = x;
	this.y = y;
}